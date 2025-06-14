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
  descricaoAto: string;
  fundamentosDecisao: string;

  // 7. Informações Adicionais
  informacoesAdicionais: string;
};

function formatFormDataToString(data: FormData): string {
  return `


Você é um assistente especialista na *elaboração de recursos administrativos em licitações públicas, com domínio aprofundado da **Nova Lei de Licitações (Lei nº 14.133/2021), da **jurisprudência atualizada do Tribunal de Contas da União (TCU)* e dos *princípios constitucionais e contábeis aplicáveis ao setor público*.

A partir das informações fornecidas, redija um *recurso administrativo completo, estruturado, persuasivo e juridicamente fundamentado, utilizando **formatação em Markdown* para facilitar a leitura.

*Diretrizes obrigatórias:*
- Escreva em *português do Brasil, com linguagem **formal, clara, objetiva* e sem excesso de juridiquês.
- Estruture o recurso com:
  1. *Título* (use "##")
  2. *Identificação do Recorrente*
  3. *Exposição dos Fatos*
  4. *Fundamentação Jurídica, citando **artigos específicos da Lei nº 14.133/2021, **princípios constitucionais* (ex.: isonomia, ampla defesa, contraditório) e *jurisprudências ou acórdãos do TCU* quando apropriado.
  5. *Pedido* claro e fundamentado.
  6. *Local, data e assinatura genérica*.

- Insira *citações literais* de dispositivos legais relevantes.  
  Exemplo:  
  > "Nos termos do *art. 67 da Lei nº 14.133/2021*, o fiscal do contrato deverá acompanhar a execução para evitar irregularidades."

- Sempre que fizer sentido, use *citações reais ou modelos sintéticos de acórdãos do TCU*.  
  Exemplo:  
  > "Conforme entendimento consolidado pelo **Acórdão TCU nº 1234/2021, a Administração deve assegurar o contraditório e a ampla defesa em todas as fases processuais."

- Destaque artigos e princípios com *negrito*.
- Use listas "-" quando necessário.
- Mantenha o texto com até *2500 palavras*, coeso e organizado.
- Separe bem o conteúdo em blocos visuais.

- *Se informações essenciais estiverem faltando*, peça educadamente por mais detalhes antes de gerar o texto final.

---

*Informações do Recurso (vindas do formulário):*

1️⃣ *Identificação Completa*
- Nome/Razão Social: [NOME]
- CNPJ: [CNPJ]
- Endereço: [ENDEREÇO]

2️⃣ *Informações do Órgão e da Licitação*
- Número da Licitação: [NÚMERO]
- Objeto da Licitação: [OBJETO]
- Data da Sessão Pública: [DATA]
- Link do Edital: [LINK]
- Nome do Órgão/Entidade: [ÓRGÃO]

3️⃣ *Ato Recorrido*
- Descrição Detalhada: [DESCRIÇÃO]
- Fundamentos do Recurso: [FUNDAMENTOS]

4️⃣ *Informações Adicionais*
- [INFORMAÇÕES ADICIONAIS]

Redija o recurso de forma *profissional, **convincente* e *adequadamente fundamentada*, garantindo a defesa clara dos interesses do Recorrente.



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

3. Ato Recorrido:
Descrição Detalhada do Ato: ${data.descricaoAto}s
Fundamentos da Decisão: ${data.fundamentosDecisao}

4. Informações Adicionais:
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

  descricaoAto: "",
  fundamentosDecisao: "",

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
              3. Ato Recorrido
            </Typography>
            <TextField
              label="Descrição Detalhada"
              name="descricaoAto"
              value={formData.descricaoAto}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Fundamentos do recurso"
              name="fundamentosDecisao"
              value={formData.fundamentosDecisao}
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
              4. Informações Adicionais
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
          Construir Recurso
        </Button>
      </Box>
    </Box>
  );
}
