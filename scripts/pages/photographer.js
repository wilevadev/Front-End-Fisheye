const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'), 10);

async function fetchData(photographerId) {
    try {
        const response = await fetch(`./data/photographers.json`);
        const data = await response.json();
        const photographer = data.photographers.find(p => p.id === photographerId);
        const medias = data.media.filter(m => m.photographerId === photographerId);
        return { photographer, medias };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

async function displayPhotographer() {
    const { photographer } = await fetchData(photographerId);
    if (photographer) {
        const photographHeader = document.querySelector(".photograph-header");
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographHeader.appendChild(userCardDOM);
    }
}

async function displayContact() {
    const { photographer } = await fetchData(photographerId);
    if (photographer) {
        const contactModel = contactTemplate(photographer);
        const contactElement = contactModel.getContactDOM();
        return contactElement;
    }
}
async function displayMedia() {
    const { medias } = await fetchData(photographerId); // Ajout de 'photographer' ici
    const photographerMedias = document.querySelector(".media-container");
    medias.forEach(mediaData => {
        const media = PhotographerMedia.createMedia(mediaData);
        const mediaDOM = media.getMediaDOM();
        photographerMedias.appendChild(mediaDOM);

        allMediaPaths.push(media.image || media.video); 
    });

    initializeLightboxListeners();
}

function initializeLightboxListeners() {
    document.querySelectorAll('.lightbox-open').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const mediaPath = link.getAttribute('href');
            new Lightbox(mediaPath, allMediaPaths);
        });
    });
}


async function displayLikes() {
    const { photographer, medias } = await fetchData(photographerId);
    if (photographer && medias) {
        const totalLikesContainer = document.querySelector(".total-likes-global");
        if (totalLikesContainer) {
            const likeModel = createLikes(photographer, medias);
            totalLikesContainer.appendChild(likeModel.totalLikesDOM);
        } else {
            console.error("Erreur : Le conteneur '.total-likes-container' n'a pas été trouvé dans le DOM.");
        }
    } else {
        console.error("Erreur : Les données du photographe ou des médias sont manquantes.");
    }
}





async function displayToggle() {
    const { medias } = await fetchData(photographerId);
    if (medias) {
        const toggleDiv = document.querySelector('.toggle');
        const toggleModel = createToggle(medias);
        toggleDiv.appendChild(toggleModel.getToggleDOM());
    }
}



async function init() {
    try {
        // Utilisez la variable 'photographerId' déjà déclarée en haut de votre code.
        await displayPhotographer(photographerId); // ajout des arguments manquants
        await displayMedia(photographerId);
        await displayContact(photographerId);
        await displayLikes(photographerId);
        await displayToggle(photographerId);
    } catch (error) {
        console.error('Error initializing the page:', error);
    }
}

init();
