const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {

      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/listings');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const isProvider = document.querySelector('#provider-signup').checked;
    console.log(name,email,password,isProvider);
  //don't want provider in the if cause if not checked would be false so not needed and wouldn't
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, isProvider, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
//FIXME: do we want an else with alert box for if one of the three is missing say why can't post?
      if (response.ok) {
        if(isProvider){
          document.location.replace("/providersignup");
        }else{
        document.location.replace('/listings');
        }
      } else {
        alert("email needs to be unique and password 8+ characters");
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);