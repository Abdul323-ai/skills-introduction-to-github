// Listen for the form submit
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the user input values
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('description').value;

    // Create a user object with the necessary data
    const user = {
        username,
        phone,
        description,
        startTime: Date.now(),
    };

    // Create a timer element
    createTimer(user);

    // Save the user to local storage
    saveToLocalStorage(user);
});

// Function to create and display the timer
function createTimer(user) {
    const timerContainer = document.getElementById('timersContainer');
    const endTime = user.startTime + 2 * 365 * 24 * 60 * 60 * 1000; // 2 years
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    timerElement.innerHTML = `
        <div>
            <strong>${user.username}</strong> (${user.phone})<br>
            ${user.description}
            <div class="countdown" data-end="${endTime}">Loading...</div>
        </div>
        <button onclick="deleteTimer(this)">Delete</button>
    `;
    timerContainer.appendChild(timerElement);

    updateTimer(timerElement.querySelector('.countdown'));
}

// Function to update the countdown timer
function updateTimer(countdownElement) {
    const endTime = countdownElement.getAttribute('data-end');
    const timer = setInterval(function() {
        const now = Date.now();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            countdownElement.innerText = "Warranty is over.";
            clearInterval(timer);
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

// Function to delete the timer
function deleteTimer(button) {
    button.parentElement.remove();
    // Additional code to remove from local storage can be added here.
    // You can also update the local storage by removing the user object if needed.
}

// Function to save the user data to local storage
function saveToLocalStorage(user) {
    // Get the existing users array from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Add the new user to the array
    users.push(user);
    
    // Save the updated array back to local storage
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to load users from local storage when the page loads
function loadUsersFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        createTimer(user); // Create the timer for each saved user
    });
}

// Call loadUsersFromLocalStorage when the page loads
window.onload = loadUsersFromLocalStorage;
