import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 0,
        width: "100%",
        background: "#05467f",
        textAlign: "center",
        
      }}
    >
        <Typography variant="body2" sx={{ color: "#fff" }}>
             © {new Date().getFullYear()} Rede Licitações.
        </Typography>

        <Typography variant="body2" sx={{ color: "#fff", py: 2 }}>
            Todos os direitos reservados.
        </Typography>
    </Box>
  );
}