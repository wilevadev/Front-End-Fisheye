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
    const { medias } = await fetchData(photographerId);
    const photographerMedias = document.querySelector(".media-container");
    medias.forEach(mediaData => {
        const media = PhotographerMedia.createMedia(mediaData); 
        const mediaDOM = media.getMediaDOM(); 
        photographerMedias.appendChild(mediaDOM);
    });
}

async function init() {
    await displayPhotographer(); 
    await displayMedia();
    await displayContact() 
}

init();









