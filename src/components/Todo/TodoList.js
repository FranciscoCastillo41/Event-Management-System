
import React from 'react';
import { Grid, Typography, Button, Paper, List, ListItem, ListItemText } from '@mui/material';

function TodoList({ todos, events, handleAddTodo }) {
  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px', textAlign: 'center'}}>
      <Typography variant="h4" gutterBottom>
        Todos
      </Typography>

      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              primary={
                <>
                  <strong>{todo.name}</strong> - {todo.description}
                </>
              }
              secondary={
                events.find((event) => event.id === todo.eventTodosId) && (
                  <span>
                    (Event: {events.find((event) => event.id === todo.eventTodosId).title})
                  </span>
                )
              }
            />
          </ListItem>
        ))}
      </List>

      
    </Paper>
  );
}

export default TodoList;









/*
import React from 'react';
import './Todo.css'

function TodoList({ todos, events, handleAddTodo }) {
  return (
    <div>
      <h2>Todos:</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.name}</strong> - {todo.description}
            
            {events.find((event) => event.id === todo.eventTodosId) && (
              <span>
                {' '}
                (Event: {events.find((event) => event.id === todo.eventTodosId).title})
              </span>
            )}
          </li>
        ))}
      </ul>
      
      <div>
        <button onClick={() => handleAddTodo({ name: 'New Todo', description: 'Todo description' })}>
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default TodoList;

*/


















/* TodoList.js
import React from 'react';

function TodoList({ todos, events }) {
  if (!todos) {
    // If todos is undefined, return a placeholder or loading message
    return <p>Loading todos...</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <strong>{todo.name}</strong> - {todo.description}
          
          {events.find((event) => event.id === todo.eventTodosId) && (
            <span>
              {' '}
              (Event: {events.find((event) => event.id === todo.eventTodosId).title})
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
*/
