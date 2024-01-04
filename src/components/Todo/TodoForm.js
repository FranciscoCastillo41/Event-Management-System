import React from 'react';
import { Box, TextField, TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';

function TodoForm({ todoData, handleTodoInputChange }) {
  return (
    <>
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px', // Adjust the width as needed
        margin: 'auto',
        marginTop: '0px',
        padding: '20px',
      }}
    >
      <Typography textAlign="center" variant="h5">Add a todo</Typography>
      
      <TextField
        label="Todo Name"
        type="text"
        name="name"
        value={todoData.name}
        onChange={handleTodoInputChange}
        sx={{ marginBottom: '10px', width: '100%' }}
      />

      <TextareaAutosize
        minRows={3}
        placeholder="Todo Description"
        name="description"
        value={todoData.description}
        onChange={handleTodoInputChange}
        sx={{ marginBottom: '10px', width: '100%' }}
      />
    </Box>
    </>
    
  );
}

export default TodoForm;

