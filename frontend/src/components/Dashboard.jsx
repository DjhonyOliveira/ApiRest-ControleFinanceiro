import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6384"];

function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    api.get("usuario/").then(res => setUsuarios(res.data.usuarios));
    api.get("transacao/").then(res => setTransacoes(res.data.transacoes));
    api.get("categoria/").then(res => setCategorias(res.data.categorias));
    api.get("meta/").then(res => setMetas(res.data.metas));
  }, []);

  // Métricas
  const totalTransacoes = transacoes.length;
  const valorTotal = transacoes.reduce((acc, t) => acc + Number(t.valor), 0);

  // Valor por categoria para gráfico de pizza
  const valorPorCategoria = categorias.map(cat => ({
    name: cat.nome,
    value: transacoes
      .filter(t => t.categoria === cat.id)
      .reduce((acc, t) => acc + Number(t.valor), 0)
  })).filter(cat => cat.value > 0);

  // Valor por usuário para gráfico de barras
  const valorPorUsuario = usuarios.map(user => ({
    name: user.nome,
    value: transacoes
      .filter(t => t.usuario === user.id)
      .reduce((acc, t) => acc + Number(t.valor), 0)
  })).filter(user => user.value > 0);

  // Progresso das metas
  const progressoMetas = metas.map(meta => {
    const valorAlcancado = transacoes
      .filter(t => t.usuario === meta.usuario)
      .reduce((acc, t) => acc + Number(t.valor), 0);
    return {
      descricao: meta.descricao || meta.nome,
      valor_alvo: Number(meta.valor_alvo),
      valorAlcancado
    };
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard Financeiro
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Usuários</Typography>
            <Typography variant="h4">{usuarios.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Transações</Typography>
            <Typography variant="h4">{totalTransacoes}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Valor Movimentado</Typography>
            <Typography variant="h4">
              {valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Metas</Typography>
            <Typography variant="h4">{metas.length}</Typography>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza - Valor por Categoria */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Distribuição por Categoria</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={valorPorCategoria}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {valorPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gráfico de Barras - Valor por Usuário */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Valor Movimentado por Usuário</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={valorPorUsuario}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1976d2" name="Valor" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Progresso das Metas */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Progresso das Metas</Typography>
            <Box sx={{ mt: 2 }}>
              {progressoMetas.map(meta => (
                <Box key={meta.descricao} sx={{ mb: 2 }}>
                  <Typography>
                    {meta.descricao}: {meta.valorAlcancado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} / {meta.valor_alvo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </Typography>
                  <Box sx={{ background: "#eee", borderRadius: 2, overflow: "hidden", height: 16 }}>
                    <Box
                      sx={{
                        width: `${Math.min(100, (meta.valorAlcancado / meta.valor_alvo) * 100)}%`,
                        background: "#1976d2",
                        height: "100%",
                        transition: "width 0.5s"
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;