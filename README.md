# 🚀 RH Digital — Triagem Inteligente de Currículos com IA

![Badge Status](https://img.shields.io/badge/Status-Concluído%20%2F%20Em%20Produção-emerald?style=for-the-badge)
![Tecnologias](https://img.shields.io/badge/Tech-Node.js%20%7C%20Express%20%7C%20Tailwind%20%7C%20Gemini%20API-indigo?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge)

Plataforma web inteligente desenvolvida para otimizar e automatizar o processo de triagem e análise de currículos (PDF) com base em requisitos específicos de vagas corporativas, integrando **Processos Gerenciais**, análise de compatibilidade via IA e agendamento direto de entrevistas.

---

## 🎯 Objetivo do Projeto
O **RH Digital** foi criado com o intuito de aplicar conceitos modernos de **Tecnologia em Processos Gerenciais**, unindo a automação tecnológica com a eficiência de fluxos de recrutamento e seleção (R&S). A ferramenta simula um sistema ATS (*Applicant Tracking System*) corporativo, reduzindo gargalos operacionais e direcionando os candidatos aprovados para uma agenda automatizada.

---

## ✨ Funcionalidades Principais

* **🤖 Análise por Inteligência Artificial (Google Gemini):** Lê currículos em formato PDF e avalia de forma estruturada o alinhamento com a vaga descrita.
* **📊 Classificação em Três Cenários:**
  1. **Aprovado:** O perfil atende aos requisitos e exibe de imediato o **Google Calendar** embutido para agendamento da entrevista.
  2. **Reprovado:** Aponta os motivos da recusa, lista melhorias acionáveis e fornece um **modelo de currículo ideal** completo (focado em métricas e resultados).
  3. **Inválido / Em Branco:** Identifica falhas estruturais no documento e orienta o candidato com um guia prático de formatação *ATS-Friendly*.
* **🛡️ Modo Apresentação / Contingência:** Painel de simulação interativo (Varinha Mágica) integrado para garantir demonstrações fluidas e sem interrupções mesmo em caso de limites de API.
* **🌙 Dark Mode Nativo:** Interface moderna desenvolvida com Tailwind CSS, totalmente responsiva e adaptada para ambientes corporativos.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, Tailwind CSS (CDN), FontAwesome, JavaScript (Vanilla).
* **Back-end:** Node.js, Express.js, Multer (gestão de ficheiros em memória).
* **Inteligência Artificial:** Google GenAI SDK (`@google/genai` com o modelo `gemini-3.8-flash`).
* **Deploy & Hospedagem:** Vercel (Serverless Functions).

---

## ⚙️ Como Executar o Projeto Localmente

Se desejar clonar e executar a aplicação na sua máquina, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/MicaelNCosta/Projeto-RH-IA.git](https://github.com/MicaelNCosta/Projeto-RH-IA.git)
   cd Projeto-RH-IA