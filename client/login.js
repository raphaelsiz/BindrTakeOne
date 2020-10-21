document.querySelector('#login-form').addEventListener('submit', async event => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const response = await fetch('/api');
    const data = await response.json();
    for (item of data){
      if (username.toLowerCase() == `${item.username}` || username.toLowerCase() == `${item.email}`){
        if (pass == `${item.password}`){
          loggedIn = true;
          user = username.toLowerCase();
          window.location.replace("home.html");
        }
        else {
          document.getElementById('error').textContent = "Sorry, wrong password!";
        }
      }
      else {
        document.getElementById('error').textContent = "There is no account with that username or email. Try creating a new account.";
      }
    };
});