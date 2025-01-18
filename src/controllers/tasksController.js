const db = require("../db");

// Obtener todas las tareas

const getTasks = (req, res) => {
	db.query("SELECT * FROM tasks", (err, tasks) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(tasks);
	});
};

// Obtener una tarea

const getTask = (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ error: "Falta el id" });
	}

	db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, task) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		if (task.length === 0) {
			return res.status(404).json({ error: "No se encontró la tarea" });
		}

		res.status(200).json(task[0]);
	});
};

//Crear una tarea

const createTask = (req, res) => {
	const { title, description } = req.body;

	if (!title || !description) {
		return res.status(400).json({ error: "Faltan campos por llenar" });
	}
	db.query(
		"INSERT INTO tasks (title, description) VALUES (?, ?)",
		[title, description, false],
		(err, task) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json({
				message: "Tarea creada correctamente",
				completed: false,
				title,
				description,
			});
		}
	);
};

// Eliminar una tarea

const deleteTask = (req, res) => {
	const { id } = req.params;
	console.log(id);

	db.query("DELETE FROM tasks WHERE id = ?", [id], (err, task) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ message: "Tarea eliminada correctamente" });
	});
};

// Actualizar una tarea

const updateTask = (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	if (!id) {
		return res.status(400).json({ error: "Falta el id" });
	}

	if (!title || !description) {
		return res.status(400).json({ error: "Faltan campos por llenar" });
	}

	db.query(
		"UPDATE tasks SET title = ?, description = ? WHERE id = ?",
		[title, description, id],
		(err, task) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			if (task.affectedRows === 0) {
				return res.status(404).json({ error: "No se encontró la tarea" });
			}

			res.json({ message: "Tarea actualizada correctamente" });
		}
	);
};

// Actualizar el estado de una tarea
const updateTaskStatus = (req, res) => {
	const { id } = req.params;
	const { completed } = req.body;

	if (!id) {
		return res.status(400).json({ error: "Falta el id" });
	}

	if (typeof completed !== "boolean") {
		return res
			.status(400)
			.json({ error: "El campo completed debe ser un booleano" });
	}

	db.query(
		"UPDATE tasks SET completed = ? WHERE id = ?",
		[completed, id],
		(err, task) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			if (task.affectedRows === 0) {
				return res.status(404).json({ error: "No se encontro la tarea" });
			}

			res.json({ message: "Estado de la tarea actualizado correctamente" });
		}
	);
};

// Exportar los métodos

module.exports = {
	getTasks,
	getTask,
	createTask,
	deleteTask,
	updateTask,
	updateTaskStatus
};
