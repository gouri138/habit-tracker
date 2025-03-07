document.getElementById('registerForm').addEventListener('submit', registerUser);
document.getElementById('loginForm').addEventListener('submit', loginUser);

function registerUser(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('registerMessage').innerText = data.message;
    })
    .catch(error => {
        console.error('Error registering user:', error);
        document.getElementById('registerMessage').innerText = 'An error occurred. Check console for details.';
    });
}

function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('loginMessage').innerText = data.message;
        if (data.message === 'Login successful') {
            window.location.href = 'dashboard.html'; }// Change this to your desired page}
    })
    .catch(error => {
        console.error('Error logging in user:', error);
        document.getElementById('loginMessage').innerText = 'An error occurred. Check console for details.';
    });
}

function openTab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).className += " active";
    document.getElementById(tabName === 'register' ? 'login' : 'register').className = tabcontent[0].className.replace(" active", "");
    document.querySelector(`[onclick="openTab('${tabName}')"]`).className += " active";
}
