// const express = require('express');
// // require('dotenv').config();  // Load environment variables from .env file
// const path = require('path');
// const app = express();
// app.use(express.json());  // To parse JSON bodies
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const fs = require('fs');

// const users={};
// app.use(cors());


// app.use(express.static(path.join(__dirname, 'frontend')));


// const habitsFilePath = path.join(__dirname, 'habits.json');

// // Function to read habits from file
// function readHabits() {
//     try {
//         const data = fs.readFileSync(habitsFilePath, 'utf8');
//         return JSON.parse(data);
//     } catch (err) {
//         return []; // Return an empty array if file does not exist or cannot be read
//     }
// }

// // Function to write habits to file
// function writeHabits(habits) {
//     fs.writeFileSync(habitsFilePath, JSON.stringify(habits));
// }









// // Dummy data for habits (since there's no database)
// let habits = [
//   { id: 1, name: 'Exercise', description: 'Workout daily', frequency: 'Daily', completed: [] ,moods: [],},
//   { id: 2, name: 'Reading', description: 'Read books daily', frequency: 'Daily', completed: [],moods:[], },
// ];

// // Route to create a new habit
// app.post('/api/habits', (req, res) => {
//   const { name, description, frequency } = req.body;
  
//     console.log(`Received: Name - ${name}, Message - ${frequency}`);

//   // Generate a new habit ID
//   const newHabit = {
//     id: habits.length + 1,
//     name,
//     description,
//     frequency,
//     completed: [],
//     moods: [],
//   };

//   habits.push(newHabit);
//   writeHabits(habits);
//   res.status(201).json(newHabit);
  

  
  
  
  

// });

// // Route to fetch all habits
// app.get('/api/habits', (req, res) => {
//   const habits = readHabits();
    
//   res.status(200).json(habits);
// });

// // Route to mark a habit as completed (fake implementation with dates)
// app.post('/api/habits/:id/complete', (req, res) => {
//   const habitId = parseInt(req.params.id);
//   const habit = habits.find((habit) => habit.id === habitId);

//   if (!habit) {
//     return res.status(404).json({ message: 'Habit not found' });
//   }

//   const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)
//   if (habit.completed.includes(today)) {
//     return res.status(400).json({ message: `Habit '${habit.name}' has already been completed today` });
//   }
//   habit.completed.push(today);

//   res.status(200).json({ message: `Habit '${habit.name}' marked as completed for ${today}` });
// });

// // Route to fetch a single habit by ID
// app.get('/api/habits/:id', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     res.status(200).json(habit);
//   });

//   // Route to delete a habit
// app.delete('/api/habits/:id', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habitIndex = habits.findIndex((habit) => habit.id === habitId);
  
//     if (habitIndex === -1) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     habits.splice(habitIndex, 1);
//     res.status(200).json({ message: `Habit with ID ${habitId} deleted successfully` });
//   });



//   // Route to update a habit
// app.put('/api/habits/:id', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     const { name, description, frequency } = req.body;
  
//     if (name) habit.name = name;
//     if (description) habit.description = description;
//     if (frequency) habit.frequency = frequency;
  
//     res.status(200).json(habit);
//   });



//   // Route to fetch streaks for a habit
// // Route to fetch streaks for a habit
// app.get('/api/habits/:id/streak', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     const sortedDates = habit.completed.sort((a, b) => new Date(a) - new Date(b));
//     let currentStreak = 0;
//     let maxStreak = 0;
  
//     for (let i = 0; i < sortedDates.length; i++) {
//       const today = new Date(sortedDates[i]);
//       const tomorrow = new Date(today.getTime() + 86400000); // Add one day
//       tomorrow.setHours(0, 0, 0, 0); // Reset time to midnight
//       const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
//       if (i === sortedDates.length - 1) {
//         // If it's the last date, check if it's today
//         const today = new Date().toISOString().split('T')[0];
//         if (sortedDates[i] === today) {
//           currentStreak++;
//         }
//       } else if (sortedDates.includes(tomorrowStr)) {
//         currentStreak++;
//       } else {
//         maxStreak = Math.max(maxStreak, currentStreak);
//         currentStreak = 1; // Reset streak to 1 if it's not consecutive
//       }
//     }
  
//     // Update maxStreak one last time after the loop
//     maxStreak = Math.max(maxStreak, currentStreak);
  
//     res.status(200).json({ currentStreak, maxStreak });
//   });
  
  
    
    
  

//   // Route to fetch additional statistics for a habit
// app.get('/api/habits/:id/stats', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     const totalCompletions = habit.completed.length;
//     const totalDays = Math.floor((new Date() - new Date(habit.id === 1 ? '2023-01-01' : '2023-01-01')) / (1000 * 60 * 60 * 24)); // Assuming habits started from a fixed date
//     const completionRate = (totalCompletions / totalDays) * 100;
  
//     res.status(200).json({ totalCompletions, completionRate });
//   });
  

//   // Route to add a note to a habit
// app.post('/api/habits/:id/notes', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     const { date, content } = req.body;
//     if (!date || !content) {
//       return res.status(400).json({ message: 'Date and content are required' });
//     }
  
//     // Add the note
//     if (!habit.notes) habit.notes = [];
//     habit.notes.push({ date, content });
  
//     res.status(201).json({ message: 'Note added successfully' });
//   });
  


// // Route to fetch notes for a habit
// app.get('/api/habits/:id/notes', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     res.status(200).json(habit.notes || []);
//   });
  


  



// function readUsers() {
//   const filePath = path.join(__dirname, 'users.json');
//   try {
//       const data = fs.readFileSync(filePath, 'utf8');
//       return JSON.parse(data);
//   } catch (err) {
//       return [];
//   }
// }

// // Function to write users to file
// function writeUsers(users) {
//   const filePath = path.join(__dirname, 'users.json');
//   fs.writeFileSync(filePath, JSON.stringify(users));
// }

// // API endpoint for registration
// app.post('/api/auth/register', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//   }

//   const users = readUsers();

//   // Check if user already exists
//   if (users.find(user => user.email === email)) {
//       return res.status(409).json({ message: 'User already exists' });
//   }

//   try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = { id: Date.now(), email, password: hashedPassword };
//       users.push(newUser);
//       writeUsers(users);
//       res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//       res.status(500).json({ message: 'Error registering user', error: err });
//   }
// });

// // API endpoint for login
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//   }

//   const users = readUsers();

//   // Find user by email
//   const user = users.find(user => user.email === email);
//   if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   try {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//           return res.status(401).json({ message: 'Invalid credentials' });
//       }
//       res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//       res.status(500).json({ message: 'Error logging in', error: err });
//   }
// });




// app.post('/api/habits/:id/moods', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     const { date, mood } = req.body;
  
//     if (!date || !mood) {
//       return res.status(400).json({ message: 'Date and mood are required' });
//     }
  
//     // Add the mood log
//     habit.moods.push({ date, mood });
  
//     res.status(201).json({ message: 'Mood logged successfully', moods: habit.moods });
//   });

  

//   app.get('/api/habits/:id/moods', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     res.status(200).json(habit.moods || []);
//   });
  


//   app.put('/api/habits/:id/moods/:index', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const index = parseInt(req.params.index);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     if (!habit.moods[index]) {
//       return res.status(404).json({ message: 'Mood entry not found' });
//     }
  
//     const { date, mood } = req.body;
  
//     if (date) habit.moods[index].date = date;
//     if (mood) habit.moods[index].mood = mood;
  
//     res.status(200).json({ message: 'Mood updated successfully', moods: habit.moods });
//   });

  

//   app.delete('/api/habits/:id/moods/:index', (req, res) => {
//     const habitId = parseInt(req.params.id);
//     const index = parseInt(req.params.index);
//     const habit = habits.find((habit) => habit.id === habitId);
  
//     if (!habit) {
//       return res.status(404).json({ message: 'Habit not found' });
//     }
  
//     if (!habit.moods[index]) {
//       return res.status(404).json({ message: 'Mood entry not found' });
//     }
  
//     // Remove the mood entry
//     habit.moods.splice(index, 1);
  
//     res.status(200).json({ message: 'Mood deleted successfully', moods: habit.moods });
//   });
  



  








// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');

const users = {};
app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')));

const habitsFilePath = path.join(__dirname, 'habits.json');

// Function to read habits from file
function readHabits() {
    try {
        const data = fs.readFileSync(habitsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return []; // Return an empty array if file does not exist or cannot be read
    }
}

// Function to write habits to file
function writeHabits(habits) {
    fs.writeFileSync(habitsFilePath, JSON.stringify(habits, null, 2));
}

// Dummy data for habits (since there's no database)
let habits = readHabits();

// Route to create a new habit
app.post('/api/habits', (req, res) => {
    const { name, description, frequency } = req.body;

    console.log(`Received: Name - ${name}, Message - ${frequency}`);

    // Generate a new habit ID
    const newHabit = {
        id: habits.length + 1,
        name,
        description,
        frequency,
        completed: [],
        moods: [],
    };

    habits.push(newHabit);
    writeHabits(habits);
    res.status(201).json(newHabit);
});

// Route to fetch all habits
app.get('/api/habits', (req, res) => {
    const habits = readHabits();
    res.status(200).json(habits);
});

// Route to mark a habit as completed
app.post('/api/habits/:id/complete', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const habit = habits[habitIndex];

    const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)
    if (habit.completed.includes(today)) {
        return res.status(400).json({ message: `Habit '${habit.name}' has already been completed today` });
    }
    habit.completed.push(today);

    habits[habitIndex] = habit; // Update the habit in the array
    writeHabits(habits); // Persist the changes to the file
    res.status(200).json({ message: `Habit '${habit.name}' marked as completed for ${today}` });
});

// Route to fetch a single habit by ID
app.get('/api/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habit = habits.find((habit) => habit.id === habitId);

    if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json(habit);
});

// Route to delete a habit
app.delete('/api/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    habits.splice(habitIndex, 1);
    writeHabits(habits);
    res.status(200).json({ message: `Habit with ID ${habitId} deleted successfully` });
});

// Route to update a habit
app.put('/api/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const habit = habits[habitIndex];
    const { name, description, frequency } = req.body;

    if (name) habit.name = name;
    if (description) habit.description = description;
    if (frequency) habit.frequency = frequency;

    habits[habitIndex] = habit;
    writeHabits(habits);
    res.status(200).json(habit);
});

// Route to fetch streaks for a habit
app.get('/api/habits/:id/streak', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habit = habits.find((habit) => habit.id === habitId);

    if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const sortedDates = habit.completed.sort((a, b) => new Date(a) - new Date(b));
    let currentStreak = 0;
    let maxStreak = 0;

    for (let i = 0; i < sortedDates.length; i++) {
        const today = new Date(sortedDates[i]);
        const tomorrow = new Date(today.getTime() + 86400000); // Add one day
        tomorrow.setHours(0, 0, 0, 0); // Reset time to midnight
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        if (i === sortedDates.length - 1) {
            // If it's the last date, check if it's today
            const today = new Date().toISOString().split('T')[0];
            if (sortedDates[i] === today) {
                currentStreak++;
            }
        } else if (sortedDates.includes(tomorrowStr)) {
            currentStreak++;
        } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1; // Reset streak to 1 if it's not consecutive
        }
    }

    // Update maxStreak one last time after the loop
    maxStreak = Math.max(maxStreak, currentStreak);

    res.status(200).json({ currentStreak, maxStreak });
});

// Route to fetch additional statistics for a habit
app.get('/api/habits/:id/stats', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habit = habits.find((habit) => habit.id === habitId);

    if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const totalCompletions = habit.completed.length;
    const totalDays = Math.floor((new Date() - new Date(habit.id === 1 ? '2023-01-01' : '2023-01-01')) / (1000 * 60 * 60 * 24)); // Assuming habits started from a fixed date
    const completionRate = (totalCompletions / totalDays) * 100;

    res.status(200).json({ totalCompletions, completionRate });
});

// Route to add a note to a habit
app.post('/api/habits/:id/notes', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const habit = habits[habitIndex];
    const { date, content } = req.body;
    if (!date || !content) {
        return res.status(400).json({ message: 'Date and content are required' });
    }

    // Add the note
    if (!habit.notes) habit.notes = [];
    habit.notes.push({ date, content });

    habits[habitIndex] = habit;
    writeHabits(habits);

    res.status(201).json({ message: 'Note added successfully' });
});

// Route to fetch notes for a habit
app.get('/api/habits/:id/notes', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habit = habits.find((habit) => habit.id === habitId);

    if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json(habit.notes || []);
});

function readUsers() {
    const filePath = path.join(__dirname, 'users.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Function to write users to file
function writeUsers(users) {
    const filePath = path.join(__dirname, 'users.json');
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// API endpoint for registration
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readUsers();

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(409).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), email, password: hashedPassword };
        users.push(newUser);
        writeUsers(users);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});

// API endpoint for login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readUsers();

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});

app.post('/api/habits/:id/moods', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const habit = habits[habitIndex];
    const { date, mood } = req.body;

    if (!date || !mood) {
        return res.status(400).json({ message: 'Date and mood are required' });
    }

    // Add the mood log
    habit.moods.push({ date, mood });

    habits[habitIndex] = habit;
    writeHabits(habits);

    res.status(201).json({ message: 'Mood logged successfully', moods: habit.moods });
});

app.get('/api/habits/:id/moods', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habit = habits.find((habit) => habit.id === habitId);

    if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json(habit.moods || []);
});

app.put('/api/habits/:id/moods/:index', (req, res) => {
    const habitId = parseInt(req.params.id);
    const index = parseInt(req.params.index);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const habit = habits[habitIndex];

    if (!habit.moods[index]) {
        return res.status(404).json({ message: 'Mood entry not found' });
    }

    const { date, mood } = req.body;

    if (date) habit.moods[index].date = date;
    if (mood) habit.moods[index].mood = mood;

    habits[habitIndex] = habit;
    writeHabits(habits);

    res.status(200).json({ message: 'Mood updated successfully', moods: habit.moods });
});

app.delete('/api/habits/:id/moods/:index', (req, res) => {
    const habitId = parseInt(req.params.id);
    const index = parseInt(req.params.index);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    const habit = habits[habitIndex];

    if (!habit.moods[index]) {
        return res.status(404).json({ message: 'Mood entry not found' });
    }

    // Remove the mood entry
    habit.moods.splice(index, 1);

    habits[habitIndex] = habit;
    writeHabits(habits);

    res.status(200).json({ message: 'Mood deleted successfully', moods: habit.moods });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
