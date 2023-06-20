const divGallery = document.getElementById('gallery')
const aLogin = document.getElementById('login')
const divPublish = document.getElementById('publish')
const header = document.getElementById('header')
const divFiltres = document.getElementById('filtres')
const iconButtonsModifier = document.querySelectorAll('.icon-button-modifier')

const API_URL = 'http://localhost:5678/api'

const getWorks = async () => fetch(`${API_URL}/works`, { method: 'get' }).then(res => res.json())

aLogin.addEventListener('click', () => {
  localStorage.removeItem("token");
})

const init = async () => {

  if (localStorage.token) {
    aLogin.innerHTML = 'logout'
    divPublish.style.display = "block"
    header.style.marginTop = '109px'
    divFiltres.style.display = 'none'
    iconButtonsModifier.forEach(btn => btn.style.display = 'block')
  }

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
  })

  // Sélectionnez tous les boutons à l'intérieur de l'élément avec l'ID "filtres"
  const boutonsFiltre = document.querySelectorAll("#filtres button");

  // Parcourez chaque bouton et attachez un gestionnaire d'événement
  boutonsFiltre.forEach(bouton => {

    bouton.addEventListener('click', function () {

      boutonsFiltre.forEach(btn => {
        btn.classList.remove('active');
      });
      bouton.classList.add('active');

      // Récupérez la catégorie associée au bouton
      const categorie = this.getAttribute('data-category');
      console.log(categorie);

      //on vide la div pour remplir avec les projets de la categorie
      divGallery.innerHTML = "";

      projects.forEach(item => {

        if (item.category['name'] == categorie || categorie == "tous") { // Vérifiez si la catégorie correspond à la catégorie sélectionnée

          // Créez les éléments et ajoutez-les à divGallery
          const figure = document.createElement('figure');
          divGallery.appendChild(figure);

          // create img and append to figure
          const img = document.createElement('img');
          img.setAttribute('src', item.imageUrl);
          img.setAttribute('alt', item.title);
          img.setAttribute('crossorigin', 'anonymous');
          figure.appendChild(img);

          // create figCaption text and append to figure
          const figCaption = document.createElement('figCaption');
          figCaption.innerHTML = item.title;
          figure.appendChild(figCaption);
        }
      });
    });
  });


}



init()
