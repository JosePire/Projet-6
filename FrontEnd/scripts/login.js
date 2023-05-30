function login(e) {
    e.preventDefault()
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    // // Vérification des identifiants
    // if (username === "utilisateur" && password === "motdepasse") {
    //     message.textContent = "Connexion réussie !";
    //     message.classList.remove("error");
    // } else {
    //     message.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
    //     message.classList.add("error");
    // }

    fetch('http://localhost:5678/api/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': username.value, 'password': password.value })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })

}

console.log('test')


const formLogin = document.getElementById('form-login')

formLogin.addEventListener('submit', e => login(e))