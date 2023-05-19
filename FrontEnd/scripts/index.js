console.log('salut')

const API_URL = 'http://localhost:5678/api'
let projects

fetch(`${API_URL}/works`, {

  method: 'get'
}).then(res => {
  projects = res.json()
  console.log(projects)
})
