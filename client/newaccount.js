const name = document.getElementById('name');
document.querySelector('#new-account').addEventListener('submit', async event => {
  event.preventDefault();
  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const check = await fetch('/api');
  const checkData = await check.json();
  var okay = true;
  for (item of checkData){
    if (username == `${item.username}`){
      okay = false;
      document.getElementById('error').textContent ="That username is taken!";
    }
    if (email == `${item.email}`){
      okay = false;
      document.getElementById('error').textContent = "There is already an account with that email! Try logging in.";
    }
  }
  if (okay){
    user = username;
    const data = { firstName, lastName, email, username, password };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
    window.location.replace("home.html");
  }

});