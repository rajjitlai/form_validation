const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Add real-time validation
[username, email, password, password2].forEach(input => {
    input.addEventListener('input', () => {
        validateField(input);
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const isFormValid = checkInputs();
    
    if (isFormValid) {
        // Success state can be handled here (e.g., show a toast or redirect)
        alert('Account Created Successfully!');
    }
});

function checkInputs() {
    let isValid = true;
    if (!validateField(username)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(password)) isValid = false;
    if (!validateField(password2)) isValid = false;
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    const id = input.id;

    if (value === '') {
        setErrorFor(input, `${capitalize(id)} cannot be blank`);
        return false;
    }

    if (id === 'email' && !isEmail(value)) {
        setErrorFor(input, 'Not a valid email address');
        return false;
    }

    if (id === 'password' && value.length < 8) {
        setErrorFor(input, 'Password must be at least 8 characters');
        return false;
    }

    if (id === 'password2') {
        if (value !== password.value.trim()) {
            setErrorFor(input, 'Passwords do not match');
            return false;
        }
    }

    setSuccessFor(input);
    return true;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('2', ' confirmation');
}
