const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#usernameSignup');
    const passwordEl = document.querySelector('#passwordSignup');
    const emailEl = document.querySelector('#emailSignup');
  
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
        email: emailEl.value
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('dashboard');
    } else {
      alert('Could not sign up');
    }
  };
  
  document.querySelector('#signupForm')
  document.addEventListener('submit', signupFormHandler);