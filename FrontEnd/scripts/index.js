const divGallery = document.getElementById('gallery')

const API_URL = 'http://localhost:5678/api'

const getWorks = async () => fetch(`${API_URL}/works`, { method: 'get' }).then(res => res.json())

const init = async () => {
  const projects = await getWorks()
  console.log(projects)

  // loop on each project
  projects.forEach(item => {
    // create figure and append to divGallery
    const figure = document.createElement('figure')
    divGallery.appendChild(figure)
    // create img and append to figure
    const img = document.createElement('img')
    img.setAttribute('src', item.imageUrl)
    img.setAttribute('alt', item.title)
    img.setAttribute('crossorigin', 'anonymous')
    figure.appendChild(img)
    // create figCaption text and append to figure
    const figCaption = document.createElement('figCaption')
    figCaption.innerHTML = item.title
    figure.appendChild(figCaption)
  });
}

init()
