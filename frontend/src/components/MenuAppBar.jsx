import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Controle Financeiro
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/usuarios">
            Usuários
          </Button>
          <Button color="inherit" component={RouterLink} to="/metas">
            Metas
          </Button>
          <Button color="inherit" component={RouterLink} to="/transacoes">
            Transações
          </Button>
          <Button color="inherit" component={RouterLink} to="/categorias">
            Categorias
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar;