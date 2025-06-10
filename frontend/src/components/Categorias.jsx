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

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [modalOpen, setModalOpen]   = useState(false);
    const [editMode, setEditMode]     = useState(false);
    const [nome, setNome]             = useState("");
    const [tipo, setTipo]             = useState("");
    const [snackbar, setSnackbar]     = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async () => {
        const response = await api.get("categoria/");
        setCategorias(response.data.categorias);
    };

    const handleOpenModal = (edit = false) => {
        setEditMode(edit);

        if (edit && selectedId !== null) {
            const categoria = categorias.find(c => c.id === selectedId);
            setNome(categoria.nome);
            setTipo(categoria.tipo);
        } else {
            setNome("");
            setTipo("");
        }

        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setNome("");
        setTipo("");
    };

    const handleAddOrEdit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                await api.put(`categoria/${selectedId}`, { nome, tipo });
                setSnackbar({ open: true, message: "Categoria atualizada com sucesso!", severity: "success" });
            } else {
                await api.post("categoria/", { nome, tipo });
                setSnackbar({ open: true, message: "Categoria adicionada com sucesso!", severity: "success" });
            }

            carregarCategorias();
            handleCloseModal();
        } catch {
            setSnackbar({ open: true, message: "Erro ao salvar categoria.", severity: "error" });
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`categoria/${selectedId}`);

            setSnackbar({ open: true, message: "Categoria excluída!", severity: "info" });
            setSelectedId(null);
            carregarCategorias();
        } catch {
            setSnackbar({ open: true, message: "Erro ao excluir categoria.", severity: "error" });
        }
    };

    const handleSelect = (id) => {
        setSelectedId(id === selectedId ? null : id);
    };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Categorias
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
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((categoria) => (
              <TableRow key={categoria.id} selected={categoria.id === selectedId}>
                <TableCell>
                  <Checkbox
                    checked={categoria.id === selectedId}
                    onChange={() => handleSelect(categoria.id)}
                  />
                </TableCell>
                <TableCell>{categoria.nome}</TableCell>
                <TableCell>{categoria.tipo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para adicionar/editar */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editMode ? "Editar Categoria" : "Adicionar Categoria"}</DialogTitle>
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
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
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

export default Categorias;