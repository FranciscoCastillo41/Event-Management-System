import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Divider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/api';
import { 
  createEvent, 
  updateEvent, 
  deleteEvent,
  createTodo,
  updateTodo,
  deleteTodo } from './graphql/mutations';
import { listEvents, listTodos } from './graphql/queries';

import TodoList from './components/Todo/TodoList';
import EventForm from './components/Event/EventForm';
import EventList from './components/Event/EventList';
import TodoForm from './components/Todo/TodoForm';
import config from './amplifyconfiguration.json';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { ClassNames } from '@emotion/react';

import './App.css';

Amplify.configure(config);

const client = generateClient();

function App({ signOut, user }) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    organizer: '',
    attendees: [],
  });

  const [todoData, setTodoData] = useState({
    name: '',
    description: '',
  });

  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    let isMounted = true;
  
    fetchData(isMounted);
  
    return () => {
      isMounted = false;
    };
  }, []);
  
  async function fetchData(isMounted) {
    try {
      // Fetch events
      const eventsResult = await client.graphql({
        query: listEvents,
        authMode: 'userPool',
      });
  
      // Check if the component is still mounted before updating state
      if (isMounted) {
        const fetchedEvents = eventsResult.data.listEvents.items;
        setEvents(fetchedEvents);
      }
  
      // Fetch todos
      const todosResult = await client.graphql({
        query: listTodos,
        authMode: 'userPool',
      });
  
      // Check if the component is still mounted before updating state
      if (isMounted) {
        const fetchedTodos = todosResult.data.listTodos.items;
        setTodos(fetchedTodos);
      }
    } catch (error) {
      console.error('GraphQL operation error:', error);
      if (error.errors) {
        error.errors.forEach((err, index) => {
          console.error(`Error ${index + 1}:`, err.message);
          console.error('Stack trace:', err.extensions.exception.stacktrace);
        });
      }
    }
  }
  
  async function handleEventSubmit(event) {
    try {
      // Format the startDate as AWSDateTime
      event.startDate = new Date(event.startDate).toISOString();
      event.endDate = new Date(event.endDate).toISOString();
  
      // Create a new Event
      const newEventResult = await client.graphql({
        query: createEvent,
        variables: {
          input: event,
        },
        authMode: 'userPool',
      });
  
      const newEvent = newEventResult.data.createEvent;
      console.log('Created Event:', newEvent);
  
      // Update the events state
      setEvents([...events, newEvent]);
  
      return newEvent; // Return the created event
    } catch (error) {
      console.error('Error creating event:', error);
  
      // Log detailed error information
      if (error.errors) {
        error.errors.forEach((err, index) => {
          console.error(`Error ${index + 1}:`, err.message);
          console.error('Stack trace:', err.extensions.exception.stacktrace);
        });
      }
    }
  }

  async function handleTodoSubmit(todo, eventId) {
    try {
      // Create a new Todo associated with the specified Event
      const newTodoResult = await client.graphql({
        query: createTodo,
        variables: {
          input: {
            name: todo.name,
            description: todo.description,
            eventTodosId: eventId,
          },
        },
        authMode: 'userPool',
      });
  
      const newTodo = newTodoResult.data.createTodo;
      console.log('Created Todo:', newTodo);
  
      // Update the todos state using the callback function form of setTodos
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Error creating todo:', error);
  
      // Log detailed error information
      if (error.errors) {
        error.errors.forEach((err, index) => {
          console.error(`Error ${index + 1}:`, err.message);
          console.error('Stack trace:', err.extensions.exception.stacktrace);
        });
      }
    }
  }

  async function handleDeleteEvent(eventId) {
    try {
      // Delete the event
      await client.graphql({
        query: deleteEvent,
        variables: {
          input: {
            id: eventId,
          },
        },
        authMode: 'userPool',
      });
  
      // Filter out the deleted event
      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);
  
      // Delete associated todos
      for (const todo of todos) {
        if (todo.eventTodosId === eventId) {
          await client.graphql({
            query: deleteTodo,
            variables: {
              input: {
                id: todo.id,
              },
            },
            authMode: 'userPool',
          });
        }
      }
  
      // Filter out the deleted todos
      const updatedTodos = todos.filter((todo) => todo.eventTodosId !== eventId);
      setTodos(updatedTodos);
  
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }
  
  async function handleUpdateEvent(updatedEvent) {
    try {
      // Format the startDate and endDate as AWSDateTime
      updatedEvent.startDate = new Date(updatedEvent.startDate).toISOString();
      updatedEvent.endDate = new Date(updatedEvent.endDate).toISOString();
  
      // Update the event
      const updatedEventResult = await client.graphql({
        query: updateEvent,
        variables: {
          input: updatedEvent,
        },
        authMode: 'userPool',
      });
  
      const updatedEventData = updatedEventResult.data.updateEvent;
      console.log('Updated Event:', updatedEventData);
  
      // Update the events state
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event.id === updatedEventData.id ? updatedEventData : event
        );
        return updatedEvents;
      });
    } catch (error) {
      console.error('Error updating event:', error);
  
      // Log detailed error information
      if (error.errors) {
        error.errors.forEach((err, index) => {
          console.error(`Error ${index + 1}:`, err.message);
          console.error('Stack trace:', err.extensions.exception.stacktrace);
        });
      }
    }
  }
  
  const handleEventInputChange = (e) => {
    if (e.target.name === 'attendees') {
      // Split the comma-separated string into an array
      const attendeesArray = e.target.value.split(',');
      setEventData({ ...eventData, [e.target.name]: attendeesArray });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const handleTodoInputChange = (e) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  // UPDATE CODE HERE ****************************************************** //
  const handleAddTodo = (newTodo) => {
    // If eventData.todos is undefined, initialize it as an empty array
    const updatedTodos = eventData.todos ? [...eventData.todos, newTodo] : [newTodo];
  
    // Update the eventData state
    setEventData({
      ...eventData,
      todos: updatedTodos,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Submit event data
    const createdEvent = await handleEventSubmit(eventData);
  
    // Submit todo data (if any)
    if (createdEvent && createdEvent.id) {
      const eventId = createdEvent.id; // Save the event ID
  
      // Use the provided event ID for each todo
      handleTodoSubmit(todoData, eventId);
    }
  
    // Reset form data
    setEventData({
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      organizer: '',
      attendees: [],
    });
    setTodoData({
      name: '',
      description: '',
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      {!isMobileView && (
        <Drawer variant="permanent">
          <List>
            
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Todos" />
            </ListItem>
            {/* Add more sidebar items as needed */}
          </List>
        </Drawer>
      
      )}

      <div style={{ marginLeft: isMobileView ? 0 : '138px', flex: '1', padding: '0px', paddingTop: '0px', display: 'flex', flexDirection: 'column', marginTop: '0px' }}>

        <AppBar position="static" color="primary" style={{ top: 0, zIndex: 1400 }}>
          <Toolbar>
            <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>
              Welcome to the Event Manager!
            </Typography>
            <Button variant="contained" color="secondary" onClick={signOut}>
              Sign out
            </Button>
          </Toolbar>
        </AppBar>

        <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginBottom: '10px' }}>
          <EventForm
            eventData={eventData}
            handleEventInputChange={handleEventInputChange}
          />
          
          <TodoForm
            todoData={todoData}
            handleTodoInputChange={handleTodoInputChange}
          />

          <Button variant="contained" type="submit" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
        
        <EventList
          events={events}
          handleDeleteEvent={handleDeleteEvent}
          handleUpdateEvent={handleUpdateEvent}
        />
        
        <TodoList
          todos={todos}
          events={events}
          handleAddTodo={handleAddTodo}
        />
      </div>
    </div>
  
  );
}

export default withAuthenticator(App);




































