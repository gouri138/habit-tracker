// MAIN USER JS

document.getElementById('habitForm').addEventListener('submit', createHabit);

// Function to fetch and display habits
function fetchAndDisplayHabits() {
    fetch('http://localhost:5000/api/habits')
    .then(response => response.json())
    .then(data => {
        const habitsContainer = document.getElementById('habitsContainer');
        habitsContainer.innerHTML = ''; // Clear previous habits

        data.forEach(habit => {
            Promise.all([fetchStreaks(habit.id), fetchStats(habit.id), fetchNotes(habit.id), fetchMoods(habit.id)])
                .then(([streaks, stats, notes, moods]) => {
                    const habitHTML = `
                        <div class="habit">
                            <h3>${habit.name}</h3>
                            <p>Description: ${habit.description}</p>
                            <p>Frequency: ${habit.frequency}</p>
                            <p class="completed-dates">Completed on: ${habit.completed.join(', ')}</p>
                            <p class="streaks">Current Streak: ${streaks.currentStreak} days, Max Streak: ${streaks.maxStreak} days</p>
                            <p class="stats">Total Completions: ${stats.totalCompletions}, Completion Rate: ${stats.completionRate.toFixed(2)}%</p>
                            <div class="notes">
                                <h4>Notes:</h4>
                                ${notes.map(note => `<p>${note.date}: ${note.content}</p>`).join('')}
                                <form class="add-note-form" data-habit-id="${habit.id}">
                                    <label for="note-date">Date:</label>
                                    <input type="date" id="note-date" required>
                                    <label for="note-content">Content:</label>
                                    <textarea id="note-content" required></textarea>
                                    <button type="submit">Add Note</button>
                                </form>
                            </div>
                            <div class="moods">
                                <h4>Moods:</h4>
                                ${moods.map((mood, index) => `<p>${mood.date}: ${mood.mood}</p>
                                    <button class="update-mood-button" data-habit-id="${habit.id}" data-index="${index}">Update</button>
                                    <button class="delete-mood-button" data-habit-id="${habit.id}" data-index="${index}">Delete</button>`).join('')}
                                <form class="add-mood-form" data-habit-id="${habit.id}">
                                    <label for="mood-date">Date:</label>
                                    <input type="date" id="mood-date" required>
                                    <label for="mood">Mood:</label>
                                    <select id="mood" required>
                                        <option value="">Select Mood</option>
                                        <option value="Happy">Happy</option>
                                        <option value="Sad">Sad</option>
                                        <option value="Neutral">Neutral</option>
                                    </select>
                                    <button type="submit">Add Mood</button>
                                </form>
                            </div>
                            <button class="complete-button" data-habit-id="${habit.id}">Mark as Completed</button>
                            <button class="delete-button" data-habit-id="${habit.id}">Delete</button>
                        </div>
                    `;
                    habitsContainer.insertAdjacentHTML('beforeend', habitHTML);
                }).then(() => {
                    // Add event listeners to complete buttons
                    const completeButtons = document.querySelectorAll('.complete-button');
                    completeButtons.forEach(button => {
                        button.addEventListener('click', markHabitAsCompleted);
                    });

                    // Add event listeners to delete buttons
                    const deleteButtons = document.querySelectorAll('.delete-button');
                    deleteButtons.forEach(button => {
                        button.addEventListener('click', deleteHabit);
                    });

                    // Add event listeners to add note forms
                    const addNoteForms = document.querySelectorAll('.add-note-form');
                    addNoteForms.forEach(form => {
                        form.addEventListener('submit', addNote);
                    });

                    // Add event listeners to add mood forms
                    const addMoodForms = document.querySelectorAll('.add-mood-form');
                    addMoodForms.forEach(form => {
                        form.addEventListener('submit', addMood);
                    });

                    // Add event listeners to update mood buttons
                    const updateMoodButtons = document.querySelectorAll('.update-mood-button');
                    updateMoodButtons.forEach(button => {
                        button.addEventListener('click', updateMood);
                    });

                    // Add event listeners to delete mood buttons
                    const deleteMoodButtons = document.querySelectorAll('.delete-mood-button');
                    deleteMoodButtons.forEach(button => {
                        button.addEventListener('click', deleteMood);
                    });
                });
        });
    })
    .catch(error => {
        console.error('Error fetching habits:', error);
    });
}

// Function to fetch streaks for a habit
function fetchStreaks(habitId) {
    return fetch(`http://localhost:5000/api/habits/${habitId}/streak`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching streaks:', error);
            return { currentStreak: 0, maxStreak: 0 }; // Default values if error occurs
        });
}

// Function to fetch stats for a habit
function fetchStats(habitId) {
    return fetch(`http://localhost:5000/api/habits/${habitId}/stats`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching stats:', error);
            return { totalCompletions: 0, completionRate: 0 }; // Default values if error occurs
        });
}

// Function to fetch notes for a habit
function fetchNotes(habitId) {
    return fetch(`http://localhost:5000/api/habits/${habitId}/notes`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching notes:', error);
            return []; // Default value if error occurs
        });
}

// Function to fetch moods for a habit
function fetchMoods(habitId) {
    return fetch(`http://localhost:5000/api/habits/${habitId}/moods`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching moods:', error);
            return []; // Default value if error occurs
        });
}

// Call fetchAndDisplayHabits initially
fetchAndDisplayHabits();

function createHabit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const frequency = document.getElementById('frequency').value;

    fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, frequency })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = 'Habit created successfully!';
        console.log('Habit created:', data);
        // Reset the form
        document.getElementById('habitForm').reset();
        // Fetch and display habits again to include the new habit
        fetchAndDisplayHabits();
    })
    .catch(error => {
        console.error('Error creating habit:', error);
        document.getElementById('message').innerText = 'An error occurred. Check console for details.';
    });
}

function markHabitAsCompleted(e) {
    const habitId = parseInt(e.target.dataset.habitId);

    fetch(`http://localhost:5000/api/habits/${habitId}/complete`, {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache'}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Fetch and display habits again to update completed dates
        fetchAndDisplayHabits();
    })
    .catch(error => {
        console.error('Error marking habit as completed:', error);
    });
}

function deleteHabit(e) {
    const habitId = parseInt(e.target.dataset.habitId);

    fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Fetch and display habits again to remove the deleted habit
        fetchAndDisplayHabits();
    })
    .catch(error => {
        console.error('Error deleting habit:', error);
    });
}

function addNote(e) {
    e.preventDefault();
    const habitId = parseInt(e.target.dataset.habitId);
    const date = document.querySelector(`[data-habit-id="${habitId}"] #note-date`).value;
    const content = document.querySelector(`[data-habit-id="${habitId}"] #note-content`).value;

    fetch(`http://localhost:5000/api/habits/${habitId}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, content })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Fetch and display habits again to update notes
        fetchAndDisplayHabits();
    })
    .catch(error => {
        console.error('Error adding note:', error);
    });
}

function addMood(e) {
    e.preventDefault();
    const habitId = parseInt(e.target.dataset.habitId);
    const date = document.querySelector(`[data-habit-id="${habitId}"] #mood-date`).value;
    const mood = document.querySelector(`[data-habit-id="${habitId}"] #mood`).value;

    fetch(`http://localhost:5000/api/habits/${habitId}/moods`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, mood })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Fetch and display habits again to update moods
        fetchAndDisplayHabits();
    })
    .catch(error => {
        console.error('Error adding mood:', error);
    });
}

function updateMood(e) {
    const habitId = parseInt(e.target.dataset.habitId);
    const index = parseInt(e.target.dataset.index);
    const date = prompt('Enter new date (YYYY-MM-DD):');
    const mood = prompt('Enter new mood:');

    fetch(`http://localhost:5000/api/habits/${habitId}/moods/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, mood })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Fetch and display habits again to update moods
        fetchAndDisplayHabits();
    })
    .catch(error => {
        console.error('Error updating mood:', error);
    });
}

function deleteMood(e) {
    const habitId = parseInt(e.target.dataset.habitId);
    const index = parseInt(e.target.dataset.index);

    fetch(`http://localhost:5000/api/habits/${habitId}/moods/${index}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Fetch and display habits again to remove the deleted mood
        fetchAndDisplayHabits();
    })
    .catch(error => {
        console.error('Error deleting mood:', error);
    });
}
