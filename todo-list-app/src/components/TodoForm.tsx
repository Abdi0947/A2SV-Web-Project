import React, { useState } from 'react';
import './TodoForm.css'; 
import TodoItems from './TodoItems';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

const TodoForm: React.FC = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      const newTodo: TodoItem = {
        id: nextId,
        task: task.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNextId(nextId + 1);
      setTask('');
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleUpdate = (id: number, updatedTask: string) => {
    if (updatedTask.trim()) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, task: updatedTask.trim() } : todo
      ));
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-card fade-in">
        <div className="form-header">
          <h1 className="form-title slide-in">
            <span className="title-icon">✓</span>
            Add New Task
          </h1>
          <p className="form-subtitle">Create and manage your tasks efficiently</p>
        </div>

        <form id="todoForm" onSubmit={handleSubmit} className="todo-form">
          <div className="input-group-wrapper">
            <div className="input-wrapper">
              <label htmlFor="task" className="form-label">
                Task Name
              </label>
              <div className="input-container">
                <input
                  type="text"
                  className="form-control input-animate"
                  id="task"
                  placeholder="What needs to be done?"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                />
                <span className="input-icon">📝</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-animate"
              disabled={!task.trim()}
            >
              <span className="btn-icon">+</span>
              <span className="btn-text">Add Task</span>
            </button>
          </div>
        </form>

        {todos.length > 0 && (
          <TodoItems 
            todos={todos}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default TodoForm;
