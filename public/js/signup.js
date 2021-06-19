/* eslint-disable prettier/prettier */
const signupHandler = async(event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        header: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

};
document.querySelector('#signup-form').addEventListener('submit', signupHandler);