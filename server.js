import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const upload = multer({ storage: multer.memoryStorage() });
const ai = new GoogleGenAI({});

app.post('/api/avaliar-curriculo', upload.single('curriculo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhum currículo enviado.' });
        }

        const descricaoVaga = req.body.contextoVaga;
        if (!descricaoVaga) {
            return res.status(400).json({ erro: 'O contexto da vaga é obrigatório.' });
        }

        const pdfBase64 = req.file.buffer.toString("base64");

        const prompt = `
        Você é um recrutador de RH Digital sênior e especialista em sistemas ATS. Analise o currículo em anexo para a seguinte vaga:
        CONTEXTO DA VAGA: ${descricaoVaga}

        Retorne estritamente um objeto JSON válido (sem blocos de texto formatados em markdown fora do JSON) estruturado exatamente num destes 3 formatos.
        IMPORTANTE: As dicas de melhoria devem ser detalhadas (pelo menos 3 dicas acionáveis) e o "modelo_curriculo" deve conter uma estrutura completa (Cabeçalho, Resumo, Skills, Experiência com bullet points de resultados e Formação).

        1. Se o currículo estiver em branco ou inválido:
        {
          "status": "invalido", 
          "mensagem": "O currículo enviado está em branco ou não possui formatação adequada para leitura ATS.", 
          "sugestao": "Recomendamos estruturar o currículo com dados claros e em formato de texto limpo.",
          "modelo_curriculo": "[NOME COMPLETO]\\n[Email] | [Telefone]\\n\\nRESUMO\\nProfissional com foco em...\\n\\nCOMPETÊNCIAS\\n• [Competência 1]\\n\\nEXPERIÊNCIA\\n[Empresa] - [Cargo]\\n• [Realização 1]"
        }

        2. Se reprovado por não atender aos requisitos:
        {
          "status": "reprovado", 
          "motivos": ["Falta experiência com [Tecnologia]", "O currículo não apresenta resultados mensuráveis"], 
          "dicas_melhorias": ["Destaque projetos no GitHub que utilizem [Tecnologia]", "Use a fórmula 'Fiz X usando Y que gerou Z' nas experiências", "Crie uma seção clara de Hard Skills"],
          "modelo_curriculo": "[NOME COMPLETO]\\n[Email] | [LinkedIn]\\n\\nRESUMO PROFISSIONAL\\nPerfil alinhado com a vaga de [Cargo], focado em...\\n\\nHARD SKILLS\\n• [Tecnologia 1], [Tecnologia 2]\\n\\nEXPERIÊNCIA PROFISSIONAL\\n[Empresa] - [Cargo]\\n• Liderou o projeto X utilizando a tecnologia Y, gerando Z% de melhoria.\\n\\nFORMAÇÃO ACADÊMICA\\n[Curso] - [Instituição]"
        }

        3. Se aprovado:
        {
          "status": "aprovado", 
          "mensagem": "Parabéns! O perfil atende plenamente aos requisitos da vaga e está apto para a próxima fase."
        }
        `;

        const interaction = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: [
                {
                    type: "text",
                    text: prompt
                },
                {
                    type: "document",
                    data: pdfBase64,
                    mime_type: req.file.mimetype
                }
            ]
        });

        const responseText = interaction.output_text;

        let jsonLimpo = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const firstBrace = jsonLimpo.indexOf('{');
        const lastBrace = jsonLimpo.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            jsonLimpo = jsonLimpo.substring(firstBrace, lastBrace + 1);
        }

        const respostaIA = JSON.parse(jsonLimpo);
        res.json(respostaIA);

    } catch (error) {
        console.error("Erro na avaliação:", error);
        res.status(500).json({ 
            status: 'reprovado', 
            motivos: ['A API atingiu o limite de uso gratuito ou encontra-se indisponível.'], 
            dicas_melhorias: ['Utilize o painel de demonstração (varinha mágica) no canto inferior direito para continuar a apresentação sem interrupções.'],
            modelo_curriculo: 'Erro de comunicação externa com a IA.'
        });
    }
});

const PORT = process.env.PORT || 3000;

// Apenas inicia o servidor localmente se não estiver no Vercel (produção)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor a correr em http://localhost:${PORT}`);
    });
}

// Exportação essencial para o Vercel reconhecer o Express
export default app;