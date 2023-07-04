const modal = document.getElementById('modal')
const openModal = document.getElementById('open-modal')
const modalBtnClose = document.querySelectorAll('.modal-btn-close')
const modalBtnBack = document.getElementById('modal-btn-back')
const modalGallery = document.getElementById('edit-gallery')
const openModal2 = document.getElementById('open-modal2');
const modal2 = document.getElementById('myModal2');
const form = document.getElementById('form')
const fileUpload = document.getElementById('photo')
const inputPhotoContainer = document.getElementById('inputPhoto')
const preview = document.getElementById('preview')
const inputTitle = document.getElementById('input-title')
const selectCategory = document.getElementById('category')
const fileError = document.getElementById('file-error')
const titleError = document.getElementById('title-error')
const selectError = document.getElementById('select-error')

const deleteWorkById = async id => fetch(`${API_URL}/works/${id}`,
    {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    }
).then(res => res)

const postWork = async data => fetch(`${API_URL}/works/`,
    {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        },
        body: data
    }
).then(res => res.json())

const closeModal = () => {
    createGallery()
    modal.style.display = 'none'
    modal2.style.display = 'none'
}

const hasValidExtension = (extension, validExtensions = ['jpg', 'jpeg', 'png']) => validExtensions.includes(extension.toLowerCase())

document.addEventListener('click', function (event) {
    let modal = document.getElementById('modal');
    let closeButton = document.getElementById('modal-btn-close');
    let modalMain = document.querySelector('.modal-main');

    // Vérifier si l'élément cliqué se trouve en dehors de la modale
    if (event.target === modal) {
        // Fermer la modale
        closeModal()
    } else if (event.target === closeButton || event.target === modalMain) {
        // Éviter la fermeture de la modale si le bouton de fermeture ou la modal-main est cliqué
        event.stopPropagation();
    }
});

openModal.addEventListener('click', () => {
    fileError.style.display = 'none'
    titleError.style.display = 'none'
    selectError.style.display = 'none'
    modal.style.display = 'block'
    createGallery()
})
modalBtnClose.forEach(item => item.addEventListener('click', () => closeModal()))
modalBtnBack.addEventListener('click', () => closeModal())

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

        // imgTrash.setAttribute('class', 'trash')
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

// FENETRE AJOUT PHOTO //


openModal2.addEventListener('click', (event) => {
    event.preventDefault();
    modal2.style.display = 'block';
    modal.style.display = "none";
    preview.style.display = 'none'
    inputPhotoContainer.style.display = 'flex'
});

modal2.addEventListener('click', (event) => {
    if (event.target === modal2) {
        modal2.style.display = 'none';
    }
});

// Ajout d'une image
fileUpload.addEventListener('change', () => {
    const [file] = fileUpload.files
    if (file) {
        preview.src = URL.createObjectURL(file)
    }

    console.log('ajout image')
    preview.style.display = 'block'
    inputPhotoContainer.style.display = 'none'
})

form.addEventListener('submit', e => {
    e.preventDefault()
    //TODO controler puis envoyer les données à l'api pour créer le projet en bdd
    console.log(inputTitle.value, selectCategory.value)



    const formData = new FormData()
    const [file] = fileUpload.files

    if (file) {
        const fileNameSplitted = file.name.split('.')
        const extension = fileNameSplitted[fileNameSplitted.length - 1].toLowerCase()
        const isValidExtension = file.size <= 4000000 && hasValidExtension(extension)
        if (!isValidExtension) {
            fileError.style.display = 'block'
            return
        } else {
            file.style.display = 'none'
        }
    }


    formData.append('image', file)
    formData.append('title', inputTitle.value)
    formData.append('category', parseInt(selectCategory.value))
    postWork(formData).then(() => closeModal())
})