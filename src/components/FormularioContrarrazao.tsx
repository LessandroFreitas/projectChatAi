import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";

type FormData = {
  // 1. Identificação Completa - Recorrente
  nomeRazaoSocial: string;
  cnpj: string;
  endereco: string;

  // 1. Identificação Completa - Órgão/Entidade
  nomeOrgao: string;

  // 2. Informações da Licitação
  numeroLicitacao: string;
  objetoLicitacao: string;
  dataSessaoPublica: string;
  linkEdital: string;

  // 3. Ato Recorrido
  nomeDaEmpresaRecorrente: string;
  resumoDaTeseDoRecurso: string;

  //4. Fundamentação da Contrarrazão
  argumentoDeDefesa: string;

  // 5. Informações Adicionais
  informacoesAdicionais: string;
};

function formatFormDataToString(data: FormData): string {
  return `

Você é um assistente especialista na *elaboração de Contrarrazões Administrativas em processos licitatórios, com profundo conhecimento da **Lei nº 14.133/2021 (Nova Lei de Licitações), da jurisprudência do **Tribunal de Contas da União (TCU)* e dos princípios constitucionais e administrativos aplicáveis.

Sua tarefa é redigir uma *Contrarrazão Administrativa COMPLETA, estruturada como peça jurídica*, com as seguintes diretrizes obrigatórias:

---

## 📌 *ESTRUTURA OBRIGATÓRIA DA PEÇA*

A resposta deve conter, na ordem, os seguintes *capítulos numerados*:

1. *TÍTULO:* Use ## — Exemplo: “CONTRARRAZÕES AO RECURSO ADMINISTRATIVO”  
2. *1. DOS FATOS:* Apresente de forma objetiva o contexto da licitação, da empresa manifestante, e o que o recurso questiona.
3. *2. DA SÍNTESE DAS ALEGAÇÕES DO RECORRENTE:* Explique de forma resumida o teor do recurso, mantendo imparcialidade.
4. *3. DA FUNDAMENTAÇÃO JURÍDICA:* Desenvolva os argumentos de defesa com base:
   - Nos *artigos específicos da Lei nº 14.133/2021*
   - Nos *princípios constitucionais* (isonomia, contraditório, ampla defesa, interesse público, eficiência)
   - Em *citações diretas de dispositivos legais*
   - Inclua *jurisprudência real ou modelo realista do TCU* como reforço.
   - Organize em parágrafos robustos, com citações em *blockquote* ou Markdown.

5. *4. DA IMPROCEDÊNCIA DO RECURSO:* Argumente de forma clara e firme por que o recurso deve ser rejeitado, listando ponto a ponto as falhas do recorrente, se houver.
6. *5. DO PEDIDO:* Solicite explicitamente o conhecimento e o IMPROVIMENTO do recurso, mantendo-se a decisão que favorece a empresa manifestante.
7. *6. LOCAL, DATA E ASSINATURA:* Finalize com localidade genérica, data e menção de assinatura.

---

## 📌 *FORMATAÇÃO*

- Escreva em *português do Brasil, linguagem **jurídica técnica*, mas clara e sem excesso de rebuscamento.
- Use *Markdown*:  
  - Títulos de capítulos como ## e ###
  - *Negrito* para artigos de lei e princípios
  - Listas - quando listar argumentos
  - Citações literais em > blockquote
- O texto final deve parecer *uma peça jurídica formal, **não um resumo*.
- Máximo de *1000 palavras*.

---

## 📌 *INFORMAÇÕES DO FORMULÁRIO (preencher):*

1️⃣ *Identificação do Manifestante*
- Nome/Razão Social: [NOME]
- CNPJ: [CNPJ]
- Endereço: [ENDEREÇO]

2️⃣ *Informações da Licitação*
- Número da Licitação: [NÚMERO]
- Objeto da Licitação: [OBJETO]
- Data da Sessão Pública: [DATA]
- Link do Edital: [LINK]
- Nome do Órgão/Entidade: [ÓRGÃO]

3️⃣ *Identificação do Recurso Contestável*
- Nome da Empresa Recorrente: [EMPRESA_RECORRENTE]
- Número do Recurso: [NUMERO_RECURSO]
- Resumo da Tese do Recurso: [TESE_RECURSO]

4️⃣ *Fundamentação da Contrarrazão*
- Argumentos de Defesa: [ARGUMENTOS_DEFESA]

5️⃣ *Informações Adicionais*
- [INFORMAÇÕES_ADICIONAIS]

---

## 🎯 *OBJETIVO FINAL*

Entregar uma *Contrarrazão Administrativa formal, coerente, fundamentada, com citações legais, doutrinárias e jurisprudenciais, defendendo os interesses da empresa **manifestante*, com estrutura de peça pronta para protocolo administrativo.

Se informações faltarem, solicite gentilmente mais detalhes antes de redigir.


1. Identificação Completa
Do Recorrente:
Nome/Razão Social completa: ${data.nomeRazaoSocial}
CNPJ: ${data.cnpj}
Endereço completo: ${data.endereco}

2. Informações do Órgão e da licitação:
Número da Licitação: ${data.numeroLicitacao}
Objeto da Licitação: ${data.objetoLicitacao}
Data da Sessão Pública: ${data.dataSessaoPublica}
Link para o Edital: ${data.linkEdital}
Nome do Órgão/Entidade: ${data.nomeOrgao}

3. Recurso relacionado.
Nome da empresa recorrente: ${data.nomeDaEmpresaRecorrente}
Resmo da tese do recurso: ${data.resumoDaTeseDoRecurso}

4. Fundamentação da Contrarrazão
Argumento da defesa: ${data.argumentoDeDefesa}

5. Informações Adicionais:
Informações adicionais relevantes: ${data.informacoesAdicionais}
  `.trim();
}

const INITIAL_STATE: FormData = {
  nomeRazaoSocial: "",
  cnpj: "",
  endereco: "",

  nomeOrgao: "",
  numeroLicitacao: "",
  objetoLicitacao: "",
  dataSessaoPublica: "",
  linkEdital: "",

  nomeDaEmpresaRecorrente: "",
  resumoDaTeseDoRecurso: "",

  argumentoDeDefesa:"",
  informacoesAdicionais: "",
};

export default function FormularioRecurso() {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const navigate = useNavigate();

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formattedText = formatFormDataToString(formData);
      console.log("Texto formatado:", formattedText);

      navigate("/resultado", {
        state: { texto: formattedText },
      });
    } catch (error) {
      console.error("Erro ao navegar:", error);
    }
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", pt: 25 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 800,
          mx: "auto",
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
        noValidate
        autoComplete="off"
      >
        {/* CARD 1 - Identificação Completa */}
        <Card elevation={3} sx={{ borderRadius: 4, mb: 3 }}>
          <CardContent sx={{ px: 7, pt: 7, pb: 10 }}>
            <Typography variant="h5" gutterBottom>
              1. Identificação Completa
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Do Recorrente
            </Typography>
            <TextField
              label="Nome/Razão Social completa"
              name="nomeRazaoSocial"
              value={formData.nomeRazaoSocial}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="CNPJ"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Endereço completo"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          </CardContent>
        </Card>

        {/* CARD 2 - Informações da Licitação */}
        <Card elevation={3} sx={{ borderRadius: 4, mb: 3 }}>
          <CardContent sx={{ px: 7, pt: 7, pb: 10 }}>
            <Typography variant="h5" gutterBottom>
              2. Informações do Órgão e da licitação
            </Typography>
            <TextField
              label="Número da Licitação (Pregão, Concorrência, etc.)"
              name="numeroLicitacao"
              value={formData.numeroLicitacao}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Objeto da Licitação"
              name="objetoLicitacao"
              value={formData.objetoLicitacao}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Data da Sessão Pública"
              name="dataSessaoPublica"
              type="date"
              value={formData.dataSessaoPublica}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Link para o Edital"
              name="linkEdital"
              value={formData.linkEdital}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nome do Órgão/Entidade"
              name="nomeOrgao"
              value={formData.nomeOrgao}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          </CardContent>
        </Card>

        {/* CARD 3 - Ato Recorrido */}
        <Card elevation={3} sx={{ borderRadius: 4, mb: 3 }}>
          <CardContent sx={{ px: 7, pt: 7, pb: 10 }}>
            <Typography variant="h5" gutterBottom>
              3. Identificação do recurso contestado
            </Typography>
            <TextField
              label="Nome da empresa recorrente"
              name="nomeDaEmpresaRecorrente"
              value={formData.nomeDaEmpresaRecorrente}
              onChange={handleChange}
              fullWidth
              minRows={3}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Resumo da tese do recurso"
              name="resumoDaTeseDoRecurso"
              value={formData.resumoDaTeseDoRecurso}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              sx={{ mb: 2 }}
            />
          </CardContent>
        </Card>

        {/* CARD 4 - Informações Adicionais */}
        <Card elevation={3} sx={{ borderRadius: 4, mb: 3 }}>
          <CardContent sx={{ px: 7, pt: 7, pb: 10 }}>
            <Typography variant="h5" gutterBottom>
              4. Fundamentação da Contrarrazão
            </Typography>
            <TextField
              label="Argumento da defesa"
              name="argumentoDeDefesa"
              value={formData.argumentoDeDefesa}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              sx={{ mb: 4 }}
            />
          </CardContent>
        </Card>

        {/* CARD 5 - Informações Adicionais */}
        <Card elevation={3} sx={{ borderRadius: 4, mb: 3 }}>
          <CardContent sx={{ px: 7, pt: 7, pb: 10 }}>
            <Typography variant="h5" gutterBottom>
              5. Informações Adicionais
            </Typography>
            <TextField
              label="Informações adicionais relevantes"
              name="informacoesAdicionais"
              value={formData.informacoesAdicionais}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              sx={{ mb: 4 }}
            />
          </CardContent>
        </Card>

        {/* Botão Final */}
        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "#05467f",
            width: "300px",
            mt: 6,
            mb: 8,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "8px",
            boxShadow: 2,
            mx: "auto",
          }}
        >
          Construir Contrarrazão
        </Button>
      </Box>
    </Box>
  );
}
