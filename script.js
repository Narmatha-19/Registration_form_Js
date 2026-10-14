document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let isValid = true; 

    // Elements
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');

    // Error Elements
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Reset UI state
    resetErrors([usernameError, emailError, passwordError, confirmPasswordError], [username, email, password, confirmPassword]);
    successMessage.classList.remove('show');

    // 1. Username Validation
    if (username.value.trim() === '') {
        showError(username, usernameError, 'Username is required.');
        isValid = false;
    } else if (username.value.trim().length < 3) {
        showError(username, usernameError, 'Username must be at least 3 characters.');
        isValid = false;
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, emailError, 'Email is required.');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, emailError, 'Please enter a valid email address.');
        isValid = false;
    }

    // 3. Password Strength Validation
    const hasUppercase = /[A-Z]/.test(password.value);
    const hasLowercase = /[a-z]/.test(password.value);
    const hasNumber = /[0-9]/.test(password.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

    if (password.value === '') {
        showError(password, passwordError, 'Password is required.');
        isValid = false;
    } else if (password.value.length < 8) {
        showError(password, passwordError, 'Password must be at least 8 characters long.');
        isValid = false;
    } else if (!hasUppercase) {
        showError(password, passwordError, 'Password must include at least one uppercase letter.');
        isValid = false;
    } else if (!hasLowercase) {
        showError(password, passwordError, 'Password must include at least one lowercase letter.');
        isValid = false;
    } else if (!hasNumber) {
        showError(password, passwordError, 'Password must include at least one number.');
        isValid = false;
    } else if (!hasSpecialChar) {
        showError(password, passwordError, 'Password must include at least one special character (!@#$%^&* etc.).');
        isValid = false;
    }

    // 4. Confirm Password Validation
    if (confirmPassword.value === '') {
        showError(confirmPassword, confirmPasswordError, 'Please confirm your password.');
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
        isValid = false;
    }

    // 5. Check Output Result
    if (isValid) {
        successMessage.classList.add('show');
        this.reset(); // Optional: clears the form inputs upon success
    }
});

function showError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.visibility = 'visible';
    inputElement.classList.add('error-border');
}

function resetErrors(errorElements, inputElements) {
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.visibility = 'hidden';
    });
    inputElements.forEach(el => {
        el.classList.remove('error-border');
    });
}
