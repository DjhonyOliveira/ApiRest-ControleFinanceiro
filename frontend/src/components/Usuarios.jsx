import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Snackbar,
  Alert,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

function Usuarios() {
    const [usuarios, setUsuarios]     = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [modalOpen, setModalOpen]   = useState(false);
    const [editMode, setEditMode]     = useState(false);
    const [nome, setNome]             = useState("");
    const [email, setEmail]           = useState("");
    const [snackbar, setSnackbar]     = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        const response = await api.get("usuario/");
        setUsuarios(response.data.usuarios);
    };

    const handleOpenModal = (edit = false) => {
        setEditMode(edit);

        if (edit && selectedId !== null) {
            const usuario = usuarios.find(u => u.id === selectedId);

            setNome(usuario.nome);
            setEmail(usuario.email);
        } else {
            setNome("");
            setEmail("");
        }

        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setNome("");
        setEmail("");
    };

    const handleAddOrEdit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
            await api.put(`usuario/${selectedId}`, { nome, email });
            setSnackbar({ open: true, message: "Usuário atualizado com sucesso!", severity: "success" });
            } else {
            await api.post("usuario/", { nome, email });
            setSnackbar({ open: true, message: "Usuário adicionado com sucesso!", severity: "success" });
            }
            carregarUsuarios();
            handleCloseModal();
        } catch {
            setSnackbar({ open: true, message: "Erro ao salvar usuário.", severity: "error" });
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`usuario/${selectedId}`);

            setSnackbar({ open: true, message: "Usuário excluído!", severity: "info" });
            setSelectedId(null);
            carregarUsuarios();
        } catch {
            setSnackbar({ open: true, message: "Erro ao excluir usuário.", severity: "error" });
        }
    };

    const handleSelect = (id) => {
        setSelectedId(id === selectedId ? null : id);
    };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Usuários
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal(false)}>
          Adicionar
        </Button>
        <Button
          variant="contained"
          color="warning"
          disabled={!selectedId}
          onClick={() => handleOpenModal(true)}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={!selectedId}
          onClick={handleDelete}
        >
          Excluir
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id} selected={usuario.id === selectedId}>
                <TableCell>
                  <Checkbox
                    checked={usuario.id === selectedId}
                    onChange={() => handleSelect(usuario.id)}
                  />
                </TableCell>
                <TableCell>{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para adicionar/editar */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editMode ? "Editar Usuário" : "Adicionar Usuário"}</DialogTitle>
        <form onSubmit={handleAddOrEdit}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 300 }}>
            <TextField
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              autoFocus
            />
            <TextField
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              {editMode ? "Salvar" : "Adicionar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Usuarios;