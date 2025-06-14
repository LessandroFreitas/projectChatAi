import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import type { Chat } from "@google/genai";
import { createAssistenteChat } from "../services/CreateIAChat";
import ReactMarkdown from "react-markdown";

export default function PaginaInicial() {
  const navigate = useNavigate();
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const rolarPara = localStorage.getItem("rolarPara");
    if (rolarPara === "pesquisa") {
      const elemento = document.getElementById("secao-pesquisa");
      if (elemento) {
        setTimeout(() => {
          elemento.scrollIntoView({ behavior: "smooth" });
          localStorage.removeItem("rolarPara");
        }, 300);
      }
    }
  }, []);

  useEffect(() => {
    const initChat = async () => {
      try {
        chatRef.current = await createAssistenteChat();
      } catch (err: any) {
        setResposta("Erro ao conectar com o assistente de IA.");
      }
    };
    initChat();
  }, []);

  async function handlePerguntar() {
    if (!pergunta.trim() || !chatRef.current) return;

    setResposta(""); // limpa resposta anterior
    setLoading(true);
    try {
      const respostaIA = await chatRef.current.sendMessage({
        message: pergunta,
      });
      setResposta(respostaIA.text ?? "Sem resposta gerada.");
    } catch (err: any) {
      setResposta("Erro ao gerar resposta: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* SEÇÃO 1 - Com imagem de fundo e botões */}
      <Box
        sx={{
          minHeight: "80vh",
          backgroundImage: "url('/FundoServicos5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          pt: 15,
          textAlign: "center",
        }}
      >
        <Box sx={{ maxWidth: 600, color: "#fff", mt: -8 }}>
          <Typography variant="h4" gutterBottom>
            Bem-vindo à Rede Licitações
          </Typography>

          <Box
            sx={{ mt: 10, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/recurso")}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                width: "100%",
                py: 2,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "8px",
                boxShadow: 5,

                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  color: "#05467f",
                  borderColor: "#05467f",
                },
              }}
            >
              Acessar IA de Criação de Recurso
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/contrarrazao")}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                width: "100%",
                py: 2,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "8px",
                boxShadow: 5,

                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  color: "#05467f",
                  borderColor: "#05467f",
                },
              }}
            >
              Acessar IA de Criação de Contrarrazão
            </Button>
          </Box>
        </Box>
      </Box>

      {/* SEÇÃO 2 - Nova área com fundo claro para perguntas */}
      <Box
        id="secao-pesquisa"
        sx={{
          scrollMarginTop: "93px", // <- ajustar pesquisa
          backgroundColor: "#ebf1f9",
          py: 12,
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: 3,
            p: { xs: 3, md: 6 },
            width: "100%",
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#05467f",
              mb: 3, // 🔁 Adicionado espaçamento inferior ao título
            }}
          >
            Especialista Virtual em Licitações Públicas
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 680, // 🔁 Limitando a largura para melhor leitura
              mx: "auto",
            }}
          >
            Tire suas dúvidas com nossa inteligência artificial especializada na
            <strong> Nova Lei de Licitações (Lei nº 14.133/2021)</strong> e na
            jurisprudência atualizada do <strong>TCU</strong>.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 680,
              mx: "auto",
            }}
          >
            Obtenha respostas claras, fundamentadas e seguras.
          </Typography>

          <TextField
            label="Digite sua dúvida"
            variant="outlined"
            fullWidth
            onKeyDown={(key) => {
              if(key.code == 'Enter'){
                handlePerguntar()
              }
            }}
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            sx={{ background: "#f9f9f9", borderRadius: "8px", mt: 5 }}
            helperText="Exemplo: 'Qual o prazo para interpor recurso?' ou 'O que é atestado de capacidade técnica?'"
          />

          <Button
            onClick={handlePerguntar}
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: "#05467f",
              "&:hover": {
                backgroundColor: "#03365f",
              },
              width: 220,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: 4,
              mx: "auto",
            }}
          >
            Consultar Agora
          </Button>

          {loading ? (
            <Typography mt={4} variant="body1" color="text.secondary">
              Carregando resposta da IA...
            </Typography>
          ) : (
            resposta && (
              <Box mt={4} sx={{ textAlign: "left", color: "#333" }}>
                <ReactMarkdown>{resposta}</ReactMarkdown>
              </Box>
            )
          )}
        </Box>
      </Box>
    </>
  );
}
