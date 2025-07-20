import express, { Request, Response } from 'express';
import cors from 'cors';
import { EventType } from './types';
import { categorizeEvent } from './utils/categorize';
import { v4 as uuidv4 } from 'uuid';
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Mini Event Scheduler Server is running');
});

const events: EventType[] = [];

app.post('/events', (req: Request, res: Response) => {
  const { title, date, time, notes } = req.body;

  // Input validation
  if (!title || !date || !time) {
    return res.status(400).json({ message: 'Title, date, and time are required' });
  }

  const category = categorizeEvent(title, notes);
  const newEvent: EventType = {
    id: uuidv4(),
    title,
    date,
    time,
    notes,
    archived: false,
    category
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.get('/events', (req: Request, res: Response) => {
  res.json(events); // ei array ta hocche memory-te stored event list
});


app.delete('/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = events.findIndex(ev => ev.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events.splice(index, 1); // remove the event from array
  res.json({ message: 'Event deleted successfully' });
});

app.put('/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, notes, date, time } = req.body;

  const eventToUpdate = events.find(ev => ev.id === id);

  if (!eventToUpdate) {
    return res.status(404).json({ message: 'Event not found' });
  }

  
  if (!title || !date || !time) {
    return res.status(400).json({ message: 'Title, date, and time are required' });
  }

  // Update values
  eventToUpdate.title = title;
  eventToUpdate.notes = notes;
  eventToUpdate.date = date;
  eventToUpdate.time = time;
  eventToUpdate.category = categorizeEvent(title, notes); // recategorize if needed

  res.json(eventToUpdate);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
