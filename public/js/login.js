const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#user-name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (userName && password) {

      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#user-name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (userName && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);