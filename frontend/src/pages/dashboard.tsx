import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneIcon from "@mui/icons-material/DoneOutline";
import { useSnack } from '../components/SnackProvider';

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  markTaskAsDone,
} from "../api/v1/task";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const { showSnack } = useSnack();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  
  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error al obtener tareas", err);
      showSnack("Error al obtener tareas", "error");
    }
  };

  const handleEditClick = (task: any) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks();
      showSnack("Tarea eliminada", "info");
    } catch (error) {
      console.error(error);
      showSnack("Error al eliminar tarea", "error");
    }
  };

  const handleSaveClick = async (id: string) => {
    if (!editTitle.trim()) {
      showSnack("El título no puede estar vacío", "error");
      return;
    }
    if (editTitle.length < 3) {
      showSnack("El título es demasiado corto (mínimo 3 caracteres)", "warning");
      return;
    }
    if (editTitle.length > 100) {
      showSnack("El título no puede superar los 100 caracteres", "warning");
      return;
    }
    try {
      await updateTask(id, { title: editTitle });
      setEditingId(null);
      setEditTitle("");
      fetchTasks();
      showSnack("Tarea actualizada con éxito", "success");
    } catch (err) {
      console.error("Error al actualizar tarea", err);
      showSnack("Error al actualizar tarea", "error");
    }
  };

  const handleMarkDone = async (id: string, currentState: boolean) => {
    try {
      await markTaskAsDone(id, !currentState);
      fetchTasks();
      const mensaje = !currentState
        ? "Tarea marcada como completada ✅"
        : "Tarea marcada como pendiente 🔁";
      showSnack(mensaje, "info");
    } catch (error) {
      console.error("Error al cambiar estado de tarea:", error);
      showSnack("Error al actualizar el estado de la tarea", "error");
    }
  };

  const handleAddClick = async () => {
    if (adding) {
      const trimmedTitle = newTaskTitle.trim();

      if (trimmedTitle.length < 3) {
        showSnack("El título debe tener al menos 3 caracteres", "warning");
        return;
      }

      if (trimmedTitle.length > 100) {
        showSnack("El título no puede superar los 100 caracteres", "warning");
        return;
      }

      try {
        await createTask({ title: trimmedTitle });
        setNewTaskTitle("");
        setAdding(false);
        fetchTasks();
        showSnack("Tarea creada con éxito", "success");
      } catch (error) {
        console.error("Error al crear tarea:", error);
        showSnack("Error al crear tarea", "error");
      }
    } else {
      setAdding(true);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={1}
      >
        {adding && (
          <TextField
            size="small"
            label="Nueva tarea"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddClick();
              }
            }}
            sx={{ minWidth: isMobile ? "100%" : 300 }}
          />
        )}
        <Button variant="outlined" onClick={handleAddClick}>
          {adding ? "Guardar" : "Agregar tarea"}
        </Button>
      </Box>

      {isMobile ? (
        // LISTADO MOVIL
        <Box display="flex" flexDirection="column" gap={2}>
          {tasks.map((task: any) => (
            <Paper
              key={task._id}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {editingId === task._id ? (
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  size="small"
                  fullWidth
                />
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{
                    wordBreak: "break-word",
                  }}
                >
                  {task.title}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary">
                {task.completed ? "✅ Realizada" : "⏳ Pendiente"}
              </Typography>

              <Box display="flex" gap={1} justifyContent="flex-end">
                {!task.done && (
                  <IconButton
                    onClick={() => handleMarkDone(task._id, task.completed)}
                    disabled={editingId === task._id}
                    size="small"
                  >
                    <DoneIcon />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => handleDelete(task._id)}
                  disabled={editingId === task._id}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleEditClick(task)}
                  disabled={task.completed}
                  size="small"
                >
                  {editingId === task._id ? (
                    <SaveIcon onClick={() => handleSaveClick(task._id)} />
                  ) : (
                    <EditIcon />
                  )}
                </IconButton>
              </Box>
            </Paper>
          ))}
          {tasks.length === 0 && (
            <Typography textAlign="center" color="text.secondary" mt={2}>
              No hay tareas registradas.
            </Typography>
          )}
        </Box>
      ) : (
        // TABLA DESKTOP
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell>Título</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task: any) => (
                <TableRow
                  key={task._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {editingId === task._id ? (
                      <TextField
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        size="small"
                      />
                    ) : (
                      task.title
                    )}
                  </TableCell>
                  <TableCell>
                    {task.completed ? "✅ Realizada" : "⏳ Pendiente"}
                  </TableCell>
                  <TableCell align="right">
                    {!task.done && (
                      <IconButton
                        onClick={() => handleMarkDone(task._id, task.completed)}
                        disabled={editingId === task._id}
                      >
                        <DoneIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => handleDelete(task._id)}
                      disabled={editingId === task._id}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditClick(task)}
                      disabled={task.completed}
                    >
                      {editingId === task._id ? (
                        <SaveIcon onClick={() => handleSaveClick(task._id)} />
                      ) : (
                        <EditIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay tareas registradas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}      
    </Box>
  );
}
