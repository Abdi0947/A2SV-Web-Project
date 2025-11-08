import React, { useState, useEffect, useRef } from 'react';
import type { TodoItem } from './TodoForm';
import './TodoItems.css';

interface TodoItemsProps {
  todos: TodoItem[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onUpdate: (id: number, updatedTask: string) => void;
}

const TodoItems: React.FC<TodoItemsProps> = ({ todos, onDelete, onToggleComplete, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleEdit = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditValue(todo.task);
  };

  const handleSave = (id: number) => {
    if (editValue.trim()) {
      onUpdate(id, editValue);
      setEditingId(null);
      setEditValue('');
    }
    // If empty, don't save and keep in edit mode (user can press Escape to cancel)
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave(id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };
  return (
    <div className="todo-items-container">
      <div className="todo-items-header">
        <h2 className="todo-items-title">
          <span className="todo-count">{todos.length}</span>
          {todos.length === 1 ? ' Task' : ' Tasks'}
        </h2>
      </div>
      
      <div className="todo-list">
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''} ${editingId === todo.id ? 'editing' : ''}`}
          >
            <div className="todo-item-content">
              <button
                className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => onToggleComplete(todo.id)}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                disabled={editingId === todo.id}
              >
                {todo.completed && <span className="checkmark">✓</span>}
              </button>
              
              {editingId === todo.id ? (
                <div className="edit-container">
                  <input
                    ref={editInputRef}
                    type="text"
                    className="todo-edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                    aria-label="Edit task"
                  />
                  <div className="edit-actions">
                    <button
                      type="button"
                      className="edit-save-btn"
                      onClick={() => handleSave(todo.id)}
                      aria-label="Save changes"
                    >
                      <span className="save-icon">✓</span>
                    </button>
                    <button
                      type="button"
                      className="edit-cancel-btn"
                      onClick={handleCancel}
                      aria-label="Cancel editing"
                    >
                      <span className="cancel-icon">✕</span>
                    </button>
                  </div>
                </div>
              ) : (
                <span 
                  className={`todo-text ${todo.completed ? 'completed-text' : ''}`}
                  onDoubleClick={() => !todo.completed && handleEdit(todo)}
                >
                  {todo.task}
                </span>
              )}
            </div>
            
            <div className="todo-actions">
              {editingId !== todo.id && (
                <>
                  <button
                    className="todo-edit-btn"
                    onClick={() => handleEdit(todo)}
                    aria-label="Edit task"
                    disabled={todo.completed}
                  >
                    <span className="edit-icon">✏️</span>
                  </button>
                  <button
                    className="todo-delete-btn"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete task"
                  >
                    <span className="delete-icon">🗑️</span>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoItems;
