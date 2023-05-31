const loginForm = document.getElementById('login-form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const error = document.getElementById('error')

loginForm.addEventListener('submit', event => {
  event.preventDefault()

  console.log(email.value, password.value)

  fetch('http://localhost:5678/api/users/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)

      if (data.token) {
        // save token localstorage see: https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
        localStorage.token = data.token

        // Redirect to home page
        window.location.href = `${window.location.origin}/index.html`
      } else {
        error.textContent = 'Erreur dans l’identifiant ou le mot de passe'
      }
    })
})
