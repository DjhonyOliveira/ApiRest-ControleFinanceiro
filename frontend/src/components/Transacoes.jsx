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

function Transacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [date, setDate] = useState("");
  const [categoria, setCategoria] = useState("");
  const [usuario, setUsuario] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    carregarTransacoes();
    carregarUsuarios();
    carregarCategorias();
  }, []);

  const carregarTransacoes = async () => {
    const response = await api.get("transacao/");
    setTransacoes(response.data.transacoes);
  };

  const carregarUsuarios = async () => {
    const response = await api.get("usuario/");
    setUsuarios(response.data.usuarios);
  };

  const carregarCategorias = async () => {
    const response = await api.get("categoria/");
    setCategorias(response.data.categorias);
  };

  const handleOpenModal = (edit = false) => {
    setEditMode(edit);
    if (edit && selectedId !== null) {
      const transacao = transacoes.find(t => t.id === selectedId);
      setValor(transacao.valor);
      setDescricao(transacao.descricao);
      setDate(transacao.date);
      setCategoria(transacao.categoria);
      setUsuario(transacao.usuario);
    } else {
      setValor("");
      setDescricao("");
      setDate("");
      setCategoria("");
      setUsuario("");
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setValor("");
    setDescricao("");
    setDate("");
    setCategoria("");
    setUsuario("");
  };

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`transacao/${selectedId}`, {
          valor: parseFloat(valor),
          descricao,
          date,
          categoria: Number(categoria),
          usuario: Number(usuario),
        });
        setSnackbar({ open: true, message: "Transação atualizada com sucesso!", severity: "success" });
      } else {
        await api.post("transacao/", {
          valor: parseFloat(valor),
          descricao,
          date,
          categoria: Number(categoria),
          usuario: Number(usuario),
        });
        setSnackbar({ open: true, message: "Transação adicionada com sucesso!", severity: "success" });
      }
      carregarTransacoes();
      handleCloseModal();
    } catch {
      setSnackbar({ open: true, message: "Erro ao salvar transação.", severity: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`transacao/${selectedId}`);
      setSnackbar({ open: true, message: "Transação excluída!", severity: "info" });
      setSelectedId(null);
      carregarTransacoes();
    } catch {
      setSnackbar({ open: true, message: "Erro ao excluir transação.", severity: "error" });
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const getNomeUsuario = (id) => {
    const user = usuarios.find(u => u.id === id);
    return user ? user.nome : id;
  };

  const getNomeCategoria = (id) => {
    const cat = categorias.find(c => c.id === id);
    return cat ? cat.nome : id;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Transações
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
              <TableCell>Valor</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Usuário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transacoes.map((transacao) => (
              <TableRow key={transacao.id} selected={transacao.id === selectedId}>
                <TableCell>
                  <Checkbox
                    checked={transacao.id === selectedId}
                    onChange={() => handleSelect(transacao.id)}
                  />
                </TableCell>
                <TableCell>
                  {Number(transacao.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell>{transacao.descricao}</TableCell>
                <TableCell>
                  {new Date(transacao.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>{getNomeCategoria(transacao.categoria)}</TableCell>
                <TableCell>{getNomeUsuario(transacao.usuario)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para adicionar/editar */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editMode ? "Editar Transação" : "Adicionar Transação"}</DialogTitle>
        <form onSubmit={handleAddOrEdit}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 300 }}>
            <TextField
              label="Valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              autoFocus
            />
            <TextField
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <TextField
              label="Data"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth required>
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                value={categoria}
                label="Categoria"
                onChange={e => setCategoria(e.target.value)}
              >
                {categorias.map(c => (
                  <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default Transacoes;