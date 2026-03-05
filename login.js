// Form switching functions
function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('forgotForm').classList.remove('active');
    clearMessages();
}

function showSignup() {
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('forgotForm').classList.remove('active');
    clearMessages();
}

function showForgot() {
    document.getElementById('forgotForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.remove('active');
    clearMessages();
}

function clearMessages() {
    document.getElementById('loginMessage').textContent = '';
    document.getElementById('signupMessage').textContent = '';
    document.getElementById('forgotMessage').textContent = '';
}

// Login Form Handler
document.getElementById('loginFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageElement = document.getElementById('loginMessage');
    
    try {
        const response = await fetch('authenticate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            messageElement.className = 'success-message';
            messageElement.textContent = 'Login successful! Redirecting...';
            
            // Store user data in localStorage for frontend consistency
            localStorage.setItem('marvelAuth', 'true');
            localStorage.setItem('marvelUser', result.username);
            
            // Redirect after delay
            setTimeout(() => {
                const redirectUrl = localStorage.getItem('redirectAfterLogin');
                if (redirectUrl) {
                    localStorage.removeItem('redirectAfterLogin');
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        } else {
            messageElement.className = 'error-message';
            messageElement.textContent = result.message;
        }
    } catch (error) {
        messageElement.className = 'error-message';
        messageElement.textContent = 'Connection error. Please try again.';
        console.error('Login error:', error);
    }
});

// Signup Form Handler
document.getElementById('signupFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const fullName = document.getElementById('signupFullName').value;
    const password = document.getElementById('signupPassword').value;
    const heroClass = document.getElementById('signupHeroClass').value;
    const messageElement = document.getElementById('signupMessage');
    
    try {
        const response = await fetch('register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                full_name: fullName,
                password: password,
                hero_class: heroClass
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            messageElement.className = 'success-message';
            messageElement.textContent = 'Registration successful! Redirecting to login...';
            
            // Clear form
            document.getElementById('signupFormElement').reset();
            
            // Redirect to login after delay
            setTimeout(() => {
                showLogin();
            }, 1500);
        } else {
            messageElement.className = 'error-message';
            messageElement.textContent = result.message;
        }
    } catch (error) {
        messageElement.className = 'error-message';
        messageElement.textContent = 'Connection error. Please try again.';
        console.error('Signup error:', error);
    }
});

// Forgot Password Form Handler
document.getElementById('forgotFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    const newPassword = document.getElementById('forgotNewPassword').value;
    const confirmPassword = document.getElementById('forgotConfirmPassword').value;
    const messageElement = document.getElementById('forgotMessage');
    
    try {
        const response = await fetch('reset_password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                new_password: newPassword,
                confirm_password: confirmPassword
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            messageElement.className = 'success-message';
            messageElement.textContent = result.message;
            
            // Clear form
            document.getElementById('forgotFormElement').reset();
            
            // Redirect to login after delay
            setTimeout(() => {
                showLogin();
            }, 2000);
        } else {
            messageElement.className = 'error-message';
            messageElement.textContent = result.message;
        }
    } catch (error) {
        messageElement.className = 'error-message';
        messageElement.textContent = 'Connection error. Please try again.';
        console.error('Password reset error:', error);
    }
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('marvelAuth') === 'true') {
        // User is already logged in, redirect to main page
        window.location.href = 'index.html';
    }
});

// Add floating label functionality
document.querySelectorAll('.input-box input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = 'red';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('label').style.color = '#888';
        }
    });
});