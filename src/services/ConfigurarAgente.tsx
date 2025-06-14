import { useState, useRef, useEffect, type JSX } from "react";
import type { Chat } from "@google/genai";
import { createAgentChat } from "./IaService";
import Markdown from "react-markdown";
import { useLocation } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function App(): JSX.Element {
  const location = useLocation();
  const texto: string = location.state?.texto ?? "Nenhum texto recebido.";
  const chatRef = useRef<Chat | null>(null);

  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setConfigured] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // SystemPrompt não precisa ser estado porque não muda dinamicamente
  const systemPrompt = `
    Você é um especialista e mestre em licitações, recursos administrativos e leis, com foco na nova Lei de Licitações 14.133/2021 e normas do TCU. 
    Doutor em Direito com especializações e mestre em Contabilidade. 
    Gere um recurso administrativo completo, forte, robusto e impecável, com rigor técnico, jurídico, contábil, doutrinário e jurisprudencial. 
    Siga um padrão formal, estruturado em blocos e com mais de 2.500 palavras.
    Use os dados a seguir para elaborar o recurso:
    ${texto}
  `;

  // Ref para garantir que só execute uma vez a configuração do agente
  const initializedRef = useRef(false);

  useEffect(() => {
    // Evita chamadas duplicadas (React 18 Strict Mode ou re-render)
    if (initializedRef.current) return;
    initializedRef.current = true;

    const init = async () => {
      setLoading(true);
      try {
        chatRef.current = await createAgentChat(systemPrompt);
        setConfigured(true);
        // Inicializa o histórico com a mensagem do usuário (dados do form)
        setHistory([{ role: "user", text: texto }]);

        // Envia a mensagem inicial ao agente
        const resp = await chatRef.current.sendMessage({ message: texto });
        setHistory((h) => [...h, { role: "assistant", text: resp.text ?? "" }]);
      } catch (err: any) {
        alert("Erro ao configurar agente: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [systemPrompt, texto]); // SystemPrompt e texto vêm da URL, se mudar, reconfigura

  // Função para enviar mensagens do usuário ao agente
  const sendMessage = async () => {
    if (!input.trim() || !chatRef.current) return;
    setLoading(true);
    setHistory((h) => [...h, { role: "user", text: input }]);
    const msg = input;
    setInput("");
    try {
      const resp = await chatRef.current.sendMessage({ message: msg });
      setHistory((h) => [...h, { role: "assistant", text: resp.text ?? "" }]);
    } catch (err: any) {
      setHistory((h) => [
        ...h,
        { role: "assistant", text: `Erro: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h1>Agente Especialista em Licitações</h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 12,
          height: "60vh",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        {history.map((msg, i) => {
          if (i === 0) return null;

          return (
            <div
              key={i}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                margin: "8px 0",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: 16,
                  background: msg.role === "user" ? "#05467F" : "#e5e5ea",
                  color: msg.role === "user" ? "#fff" : "#000",
                  maxWidth: "80%",
                }}
              >
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div style={{ marginTop: 12, display: "flex" }}>
        <textarea
          style={{
            flex: 1,
            height: 60,
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            marginLeft: 8,
            padding: "0 16px",
            borderRadius: 8,
            background: "#05467F",
            color: "#fff",
            border: "none",
          }}
        >
          {loading ? "⏳" : "Enviar"}
        </button>
      </div>
    </div>
  );
}
