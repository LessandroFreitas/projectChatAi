import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MeuFormulario from "./components/Formulario";
import Resultado from "./services/ConfigurarAgente";
import Formulario2 from "./components/FormularioContrarrazao";
import BarraNavegacao from "./components/BarraNavegacao";
import PaginaInicial from "./components/PaginaInicial";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import TelaCapa from "./components/TelaCapa";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* TelaCapa SEM barra e sem footer */}
        <Route path="/" element={<TelaCapa />} />

        {/* Outras páginas COM barra e footer */}
        <Route
          path="/inicio"
          element={
            <>
              <BarraNavegacao />
              <Box sx={{ flex: 1, width: "100%" }}>
                <PaginaInicial />
              </Box>
              <Footer />
            </>
          }
        />
        <Route
          path="/recurso"
          element={
            <>
              <BarraNavegacao />
              <Box sx={{ flex: 1, width: "100%" }}>
                <MeuFormulario />
              </Box>
              <Footer />
            </>
          }
        />
        <Route
          path="/contrarrazao"
          element={
            <>
              <BarraNavegacao />
              <Box sx={{ flex: 1, width: "100%" }}>
                <Formulario2 />
              </Box>
              <Footer />
            </>
          }
        />
        <Route
          path="/resultado"
          element={
            <>
              <BarraNavegacao />
              <Box sx={{ flex: 1, width: "100%" }}>
                <Resultado />
              </Box>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}