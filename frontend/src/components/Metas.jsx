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
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

function Metas() {
  const [metas, setMetas] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nome, setNome] = useState("");
  const [valor_alvo, setValorAlvo] = useState("");
  const [data_limite, setDataLimite] = useState("");
  const [usuario, setUsuario] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    carregarMetas();
    carregarUsuarios();
  }, []);

  const carregarMetas = async () => {
    const response = await api.get("meta/");
    setMetas(response.data.metas);
  };

  const carregarUsuarios = async () => {
    const response = await api.get("usuario/");
    setUsuarios(response.data.usuarios);
  };

  const handleOpenModal = (edit = false) => {
    setEditMode(edit);
    if (edit && selectedId !== null) {
      const meta = metas.find(m => m.id === selectedId);
      setNome(meta.nome || meta.descricao || "");
      setValorAlvo(meta.valor_alvo);
      setDataLimite(meta.data_limite);
      setUsuario(meta.usuario);
    } else {
      setNome("");
      setValorAlvo("");
      setDataLimite("");
      setUsuario("");
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNome("");
    setValorAlvo("");
    setDataLimite("");
    setUsuario("");
  };

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`meta/${selectedId}`, {
          descricao: nome,
          valor_alvo,
          data_limite,
          usuario,
        });
        setSnackbar({ open: true, message: "Meta atualizada com sucesso!", severity: "success" });
      } else {
        await api.post("meta/", {
          descricao: nome,
          valor_alvo,
          data_limite,
          usuario,
        });
        setSnackbar({ open: true, message: "Meta adicionada com sucesso!", severity: "success" });
      }
      carregarMetas();
      handleCloseModal();
    } catch {
      setSnackbar({ open: true, message: "Erro ao salvar meta.", severity: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`meta/${selectedId}`);
      setSnackbar({ open: true, message: "Meta excluída!", severity: "info" });
      setSelectedId(null);
      carregarMetas();
    } catch {
      setSnackbar({ open: true, message: "Erro ao excluir meta.", severity: "error" });
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const getNomeUsuario = (id) => {
    const user = usuarios.find(u => u.id === id);
    return user ? user.nome : id;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Metas
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
              <TableCell>Descrição</TableCell>
              <TableCell>Valor Alvo</TableCell>
              <TableCell>Data Limite</TableCell>
              <TableCell>Usuário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metas.map((meta) => (
              <TableRow key={meta.id} selected={meta.id === selectedId}>
                <TableCell>
                  <Checkbox
                    checked={meta.id === selectedId}
                    onChange={() => handleSelect(meta.id)}
                  />
                </TableCell>
                <TableCell>{meta.nome || meta.descricao}</TableCell>
                <TableCell>
                  {Number(meta.valor_alvo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell>
                  {new Date(meta.data_limite).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>{getNomeUsuario(meta.usuario)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para adicionar/editar */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editMode ? "Editar Meta" : "Adicionar Meta"}</DialogTitle>
        <form onSubmit={handleAddOrEdit}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 300 }}>
            <TextField
              label="Descrição"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              autoFocus
            />
            <TextField
              label="Valor Alvo"
              type="number"
              value={valor_alvo}
              onChange={(e) => setValorAlvo(e.target.value)}
              required
            />
            <TextField
              label="Data Limite"
              type="date"
              value={data_limite}
              onChange={(e) => setDataLimite(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth required>
              <InputLabel id="usuario-label">Usuário</InputLabel>
              <Select
                labelId="usuario-label"
                value={usuario}
                label="Usuário"
                onChange={e => setUsuario(e.target.value)}
              >
                {usuarios.map(u => (
                  <MenuItem key={u.id} value={u.id}>{u.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default Metas;