const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'), 10); // Assurez-vous que l'ID est un nombre

// Ajustement de fetchData pour retourner { photographer, medias }
async function fetchData(photographerId) {
    try {
        const response = await fetch(`./data/photographers.json`);
        const data = await response.json();
        const photographer = data.photographers.find(p => p.id === photographerId);
        const medias = data.media.filter(m => m.photographerId === photographerId);
        return { photographer, medias }; // Retourne un objet contenant le photographe et ses médias
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Ajustement de displayPhotographer pour extraire correctement les informations du photographe
async function displayPhotographer() {
    const { photographer } = await fetchData(photographerId); // Destructuration pour obtenir le photographe
    if (photographer) {
        const photographHeader = document.querySelector(".photograph-header");
        const photographerModel = photographerTemplate(photographer); // Assurez-vous que cette fonction existe et fonctionne correctement
        const userCardDOM = photographerModel.getUserCardDOM(); // Cette méthode doit retourner un élément DOM
        photographHeader.appendChild(userCardDOM);
    }
}

async function displayContact() {
    const { photographer } = await fetchData(photographerId);
    if (photographer) {
        const contactModel = contactTemplate(photographer);
        const contactElement = contactModel.getContactDOM();

        // Au lieu d'append l'élément directement, retourne l'élément pour une utilisation ultérieure
        return contactElement;
    }
  
}

// Ajustement de displayMedia pour extraire et afficher correctement les médias
async function displayMedia() {
    const { medias } = await fetchData(photographerId); // Destructuration pour obtenir les médias
    const photographerMedias = document.querySelector(".media-container");
    medias.forEach(mediaData => {
        const media = PhotographerMedia.createMedia(mediaData); // Utilise la Factory pour créer l'objet média
        const mediaDOM = media.getMediaDOM(); // Appelle getMediaDOM pour obtenir l'élément DOM
        photographerMedias.appendChild(mediaDOM);
    });
}




// Assurez-vous que l'initialisation appelle correctement displayPhotographer et displayMedia
async function init() {
    await displayPhotographer(); // Affiche d'abord les informations du photographe
    await displayMedia();
    await displayContact() // Ensuite, affiche les médias du photographe
}

init();








