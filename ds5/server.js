const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { task, assignee } = req.body;
    const newTask = { id: Date.now(), task, assignee, status: 'Pending' };
    tasks.push(newTask);
    res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
