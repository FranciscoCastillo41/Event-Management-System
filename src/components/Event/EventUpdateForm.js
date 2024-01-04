// EventUpdateForm.js
import React, { useState } from 'react';
import { Typography, Box, TextField, TextareaAutosize, Button } from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

function EventUpdateForm({ eventData, handleUpdateEvent, handleCloseUpdateForm }) {
  const [updatedEvent, setUpdatedEvent] = useState({
    title: eventData.title,
    description: eventData.description,
    location: eventData.location,
    startDate: new Date(eventData.startDate).toISOString().slice(0, -8),
    endDate: new Date(eventData.endDate).toISOString().slice(0, -8),
    organizer: eventData.organizer,
    attendees: eventData.attendees.join(','),
  });

  const handleInputChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateEvent({ ...updatedEvent, id: eventData.id });
    handleCloseUpdateForm();
  };

  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px', // Adjust the width as needed
      margin: 'auto',
      padding: '20px',
    }}
  >
    <Typography variant="h4" style={{ marginBottom: '20px',marginTop: '30px', textAlign: 'center' }}>
      Update Events
    </Typography>

    <TextField
      label="Title"
      type="text"
      name="title"
      value={updatedEvent.title}
      onChange={handleInputChange}
      sx={{ marginBottom: '10px' }}
    />

    <TextareaAutosize
      minRows={3}
      placeholder="Description"
      name="description"
      value={updatedEvent.description}
      onChange={handleInputChange}
      sx={{ marginBottom: '10px' }}
    />

    <TextField
      label="Location"
      type="text"
      name="location"
      value={updatedEvent.location}
      onChange={handleInputChange}
      sx={{ marginBottom: '10px',marginTop: '10px' }}
    />

    <TextField
      label="Start Date"
      type="datetime-local"
      name="startDate"
      value={updatedEvent.startDate}
      onChange={handleInputChange}
      sx={{ marginBottom: '10px' }}
    />

    <TextField
      label="End Date"
      type="datetime-local"
      name="endDate"
      value={updatedEvent.endDate}
      onChange={handleInputChange}
      sx={{ marginBottom: '10px' }}
    />

    <TextField
      label="Organizer"
      type="text"
      name="organizer"
      value={updatedEvent.organizer}
      onChange={handleInputChange}
      sx={{ marginBottom: '10px' }}
    />

    <TextField
      label="Attendees (comma-separated)"
      type="text"
      name="attendees"
      value={updatedEvent.attendees}
      onChange={handleInputChange}
      sx={{ marginBottom: '10px' }}
    />

    <Button type="submit" variant="contained" sx={{ marginBottom: '10px' }}>
      Update
    </Button>

    <Button type="button" onClick={handleCloseUpdateForm} variant="outlined">
      Cancel
    </Button>
  </Box>

  );
}

export default EventUpdateForm;
