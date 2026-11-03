import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json());

let tasks = [
  { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul Sharma", status: "Pending", priority: "High" },
  { id: 2, taskName: "Implement Authentication", assignedTo: "Pooja Verma", status: "In Progress", priority: "Medium" },
  { id: 3, taskName: "Design UI Wireframes", assignedTo: "Aman Gupta", status: "Completed", priority: "Low" }
];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(200).json(task);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;
  if (!id || !taskName || !assignedTo || !status || !priority) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newTask = { id: parseInt(id, 10), taskName, assignedTo, status, priority };
  tasks.push(newTask);
  res.status(201).json({ message: "Task added successfully", task: newTask });
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.status(200).json({ message: "Task updated successfully", task: tasks[taskIndex] });
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});