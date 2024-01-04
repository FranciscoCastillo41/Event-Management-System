
/*
import React from 'react';
import './Form.css';

const EventForm = ({ eventData, handleEventInputChange }) => (
  <form>
    <h4>Create an Event</h4>

    <label>
      Title:
      <input type="text" name="title" value={eventData.title} onChange={handleEventInputChange} />
    </label>

    <br />

    <label>
      Description:
      <textarea
        rows="3"
        placeholder="Description"
        name="description"
        value={eventData.description}
        onChange={handleEventInputChange}
      ></textarea>
    </label>

    <br />

    <label>
      Location:
      <input type="text" name="location" value={eventData.location} onChange={handleEventInputChange} />
    </label>

    <br />

    <label>
      Start Date:
      <input
        type="datetime-local"
        name="startDate"
        value={eventData.startDate}
        onChange={handleEventInputChange}
      />
    </label>

    <br />

    <label>
      End Date:
      <input type="datetime-local" name="endDate" value={eventData.endDate} onChange={handleEventInputChange} />
    </label>

    <br />

    <label>
      Organizer:
      <input type="text" name="organizer" value={eventData.organizer} onChange={handleEventInputChange} />
    </label>

    <br />

    <label>
      Attendees (comma-separated):
      <input type="text" name="attendees" value={eventData.attendees} onChange={handleEventInputChange} />
    </label>
  </form>
);

export default EventForm;
*/




import React from 'react';
import { Box, TextField, TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const EventForm = ({ eventData, handleEventInputChange}) => (
  
  <Box
  component="form"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px', // Adjust the width as needed
    margin: 'auto',
    padding: '20px',
  }}
  >
    <Typography textAlign="center" variant="h4">Create an Event</Typography>
    <TextField
      label="Title"
      type="text"
      name="title"
      value={eventData.title}
      onChange={handleEventInputChange}
      sx={{ marginBottom: '10px' }}
    />
    <TextareaAutosize
      minRows={3}
      placeholder="Description"
      name="description"
      value={eventData.description}
      onChange={handleEventInputChange}
      sx={{ marginBottom: '10px' }}
    />
    <TextField
      label="Location"
      type="text"
      name="location"
      value={eventData.location}
      onChange={handleEventInputChange}
      sx={{ marginBottom: '20px', marginTop: '10px' }}
    />
    <FormControl sx={{ marginBottom: '10px' }}>
      <InputLabel tyle={{ marginBottom: '10px' }} shrink>Start Date</InputLabel>
      <TextField
        type="datetime-local"
        name="startDate"
        value={eventData.startDate}
        onChange={handleEventInputChange}
      />
    </FormControl>
    <FormControl sx={{ marginBottom: '10px' }}>
      <InputLabel tyle={{ marginBottom: '10px' }} shrink>End Date</InputLabel>
      <TextField
        type="datetime-local"
        name="endDate"
        value={eventData.endDate}
        onChange={handleEventInputChange}
      />
    </FormControl>
    <TextField
      label="Organizer"
      type="text"
      name="organizer"
      value={eventData.organizer}
      onChange={handleEventInputChange}
      sx={{ marginBottom: '10px' }}
    />
    <TextField
      label="Attendees (comma-separated)"
      type="text"
      name="attendees"
      value={eventData.attendees}
      onChange={handleEventInputChange}
      sx={{ marginBottom: '0px' }}
    />
    
  </Box>
  
);

export default EventForm;
