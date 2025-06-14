import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HubIcon from "@mui/icons-material/Hub";
import { useNavigate } from "react-router-dom";

export default function BarraNavegacao() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        {/* Lado esquerdo */}
        <Box
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" }); // ← força o scroll
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
          }}
        >
          <TrendingUpIcon sx={{ fontSize: 40, color: "#05467f" }} />
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <HubIcon sx={{ fontSize: 40, color: "#05467f" }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#05467f" }}>
              Rede Licitações
            </Typography>
            <Typography variant="body2" sx={{ color: "#05467f" }}>
              Conquiste mais licitações, preocupe-se menos.
            </Typography>
          </Box>
        </Box>

        {/* Menu à direita */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            sx={{ color: "#05467f" }}
            onClick={() => {
              navigate("/Inicio");
              window.scrollTo({ top: 0, behavior: "smooth" }); // ← força o scroll
            }}
          >
            Início
          </Button>
          <Button
            sx={{ color: "#05467f" }}
            onClick={() => {
              if (window.location.pathname === "/Inicio") {
                const elemento = document.getElementById("secao-pesquisa");
                if (elemento) {
                  elemento.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                localStorage.setItem("rolarPara", "pesquisa");
                navigate("/Inicio");
              }
            }}
          >
            Assistente IA
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
