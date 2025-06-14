import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore
import NET from "vanta/dist/vanta.net.min";

export default function TelaCapa() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x05467f,
        backgroundColor: 0x000000,
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const handleClick = () => {
    localStorage.removeItem("rolarPara");
    window.location.href = "/Inicio"; // CORRETO: vai para sua tela principal de IA
  };

  return (
    <div
      ref={vantaRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={handleClick}
    >
      {/* 🎥 Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          filter: "brightness(0.5)", // escurece um pouco para o texto ficar legível
        }}
      >
        <source src="/FundoPrimario.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo em HTML5.
      </video>

      {/* Texto em cima */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)", // ✅ AJUSTADO: sombra mais suave e realista
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            margin: 0,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Rede Licitações
        </h1>
        <p
          style={{
            fontSize: "1.8rem", // ✅ Um pouco maior
            marginTop: "1rem",
            maxWidth: "80%",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          A primeira IA especialista em recursos e contrarrazões para o mercado
          público.
        </p>
        <p style={{ fontSize: "1.2rem", marginTop: "2rem", fontWeight: 400 }}>
          Clique em qualquer lugar para continuar
        </p>
      </div>
    </div>
  );
}
