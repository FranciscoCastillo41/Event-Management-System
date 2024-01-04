import React, { useState } from 'react';
import EventUpdateForm from './EventUpdateForm';
import { Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function EventList({ events, handleDeleteEvent, handleUpdateEvent }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleUpdateButtonClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseUpdateForm = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '30px', textAlign: 'center' }}>
        Events
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography><strong>Description:</strong> {event.description}</Typography>
                <Typography><strong>Location:</strong> {event.location}</Typography>
                <Typography><strong>Start Date:</strong> {event.startDate}</Typography>
                <Typography><strong>End Date:</strong> {event.endDate}</Typography>
                <Typography><strong>Organizer:</strong> {event.organizer}</Typography>
                <Typography><strong>Attendees:</strong> {event.attendees}</Typography>
              </CardContent>

              <CardActions style={{ marginTop: 'auto' }}>
                <Button
                  variant="contained"
                  onClick={() => handleUpdateButtonClick(event)}
                  style={{ marginRight: '10px' }}
                >
                  Update
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedEvent && (
        <EventUpdateForm
          eventData={selectedEvent}
          handleUpdateEvent={handleUpdateEvent}
          handleCloseUpdateForm={handleCloseUpdateForm}
        />
      )}
    </div>
  );
}

export default EventList;




/*import React, { useState } from 'react';
import EventUpdateForm from './EventUpdateForm';
import { Typography, Grid, Card, CardContent, CardActions, Box } from '@mui/material';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoList from '../Todo/TodoList';

function EventList({ events, handleDeleteEvent, handleUpdateEvent }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleUpdateButtonClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseUpdateForm = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
    <Typography variant="h4" style={{ marginBottom: '20px',marginTop: '30px', textAlign: 'center' }}>
      Events
    </Typography>

    <Grid container spacing={2} justifyContent="center">
      {events.map((event) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography><strong>Description:</strong> {event.description}</Typography>
              <Typography><strong>Location:</strong> {event.location}</Typography>
              <Typography><strong>Start Date:</strong> {event.startDate}</Typography>
              <Typography><strong>End Date:</strong> {event.endDate}</Typography>
              <Typography><strong>Organizer:</strong> {event.organizer}</Typography>
              <Typography><strong>Attendees:</strong> {event.attendees}</Typography>
            </CardContent>
            
            <CardActions style={{ alignSelf: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={() => handleUpdateButtonClick(event)}
                style={{ marginRight: '10px' }}
              >
                Update
              </Button>
    
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>

    {selectedEvent && (
      <EventUpdateForm
        eventData={selectedEvent}
        handleUpdateEvent={handleUpdateEvent}
        handleCloseUpdateForm={handleCloseUpdateForm}
      />
    )}
  </div>
  );
}

export default EventList;



 EventList.js
import React, { useState } from 'react';
import EventUpdateForm from './EventUpdateForm'; // Import the update form

function EventList({ events, handleDeleteEvent, handleUpdateEvent }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleUpdateButtonClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseUpdateForm = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <h2>Events:</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {event.startDate} to {event.endDate}
            <button onClick={() => handleUpdateButtonClick(event)}>Update</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>

      
      {selectedEvent && (
        <EventUpdateForm
          eventData={selectedEvent}
          handleUpdateEvent={handleUpdateEvent}
          handleCloseUpdateForm={handleCloseUpdateForm}
        />
      )}
    </div>
  );
}

export default EventList;
*/