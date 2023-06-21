const modal = document.getElementById('modal')
const openModal = document.getElementById('open-modal')
const modalBtnClose = document.getElementById('modal-btn-close')
const modalBtnBack = document.getElementById('modal-btn-back')
const modalGallery = document.getElementById('edit-gallery')

const deleteWorkById = async id => fetch(`${API_URL}/works/${id}`,
    {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    }
).then(res => res)

document.addEventListener('click', function (event) {
    let modal = document.getElementById('modal');
    let closeButton = document.getElementById('modal-btn-close');
    let modalMain = document.querySelector('.modal-main');

    // Vérifier si l'élément cliqué se trouve en dehors de la modale
    if (event.target === modal) {
        // Fermer la modale
        modal.style.display = 'none';
    } else if (event.target === closeButton || event.target === modalMain) {
        // Éviter la fermeture de la modale si le bouton de fermeture ou la modal-main est cliqué
        event.stopPropagation();
    }
});

openModal.addEventListener('click', () => {
    modal.style.display = 'block'
    createGallery()
})
modalBtnClose.addEventListener('click', () => modal.style.display = 'none')
modalBtnBack.addEventListener('click', () => modal.style.display = 'none')

const createGallery = async () => {
    // Supprimer tous les éléments enfants de modal gallery
    while (modalGallery.firstChild) {
        modalGallery.removeChild(modalGallery.firstChild)
    }

    const projects = await getWorks()

    // loop on each project
    projects.forEach(item => {
        // create figure and append to divGallery
        const figure = document.createElement('figure')
        modalGallery.appendChild(figure)

        // create img and append to figure
        const img = document.createElement('img')
        img.setAttribute('src', item.imageUrl)
        img.setAttribute('alt', item.title)
        img.setAttribute('crossorigin', 'anonymous')
        figure.appendChild(img)

        // TODO ajouter l'icone de la poubelle 
        // et créer l'événement pour supprimer l'image de la gallerie
        const trashContainer = document.createElement('div')
        trashContainer.setAttribute('class', 'trash')
        const imgTrash = document.createElement('img')
        imgTrash.src = '../assets/icons/Poubelle.png'

        imgTrash.setAttribute('class', 'trash')
        trashContainer.appendChild(imgTrash)
        figure.appendChild(trashContainer)
        trashContainer.addEventListener('click', () => {
            deleteWorkById(item.id)
                .then(() => createGallery())
        })

        // create figCaption text and append to figure
        const figCaption = document.createElement('figCaption')
        figCaption.innerHTML = "éditer"
        figure.appendChild(figCaption)
    })
}

