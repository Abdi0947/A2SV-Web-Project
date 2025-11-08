import React from 'react';
import './TodoForm.css'; 

const TodoForm: React.FC = () => {
  return (
    <div className="container py-4 fade-in">
      <h1 className="mb-4 slide-in">Add Todo</h1>

      <form id="todoForm" className="row g-3">
        <div className="col-md-8">
          <label htmlFor="task" className="form-label">Task</label>
          <input
            type="text"
            className="form-control input-animate"
            id="task"
            placeholder="Enter a task"
            required
          />
        </div>

        <div className="col-md-1 d-grid">
          <button type="submit" className="btn btn-primary btn-animate">Add</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
