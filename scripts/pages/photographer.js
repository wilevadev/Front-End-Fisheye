// Extraction de l'identifiant du photographe depuis les paramètres de l'URL.
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'), 10);

// Fonction asynchrone pour récupérer les données d'un photographe et ses médias correspondants.
async function fetchData(photographerId) {
  try {
    // Requête pour obtenir les données depuis le fichier JSON local.
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    // Trouve le photographe correspondant à l'ID fourni.
    const photographer = data.photographers.find(p => p.id === photographerId);
    // Filtre les médias qui sont associés à l'ID du photographe.
    const medias = data.media.filter(m => m.photographerId === photographerId);
    return { photographer, medias };
  } catch (error) {
    // Gestion des erreurs en cas de problème lors de la récupération des données.
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Fonction pour afficher les informations d'un photographe dans l'entête.
async function displayPhotographer() {
  const { photographer } = await fetchData(photographerId);
  if (photographer) {
    const photographHeader = document.querySelector('.photograph-header');
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);
  }
}

// Fonction pour afficher les coordonnées de contact d'un photographe.
async function displayContact() {
  const { photographer } = await fetchData(photographerId);
  if (photographer) {
    const contactModel = contactTemplate(photographer);
    const contactElement = contactModel.getContactDOM();
    return contactElement;
  }
}

// Fonction pour afficher les médias d'un photographe.
async function displayMedia() {
  const { medias } = await fetchData(photographerId);
  const photographerMedias = document.querySelector('.media-container');
  medias.forEach(mediaData => {
    const media = PhotographerMedia.createMedia(mediaData);
    const mediaDOM = media.getMediaDOM();
    photographerMedias.appendChild(mediaDOM);
  });
  initializeLightboxListeners();
}

// Fonction pour initialiser les écouteurs d'événements pour une lightbox.
function initializeLightboxListeners() {
  document.querySelectorAll('.lightbox-open').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const mediaPath = link.getAttribute('href');
      new Lightbox(mediaPath);
    });
  });
}

// Fonction pour afficher le nombre total de "likes" pour un photographe.
async function displayLikes() {
  const { photographer, medias } = await fetchData(photographerId);
  if (photographer && medias) {
    const totalLikesContainer = document.querySelector('.total-likes-global');
    if (totalLikesContainer) {
      const likeModel = createLikes(photographer, medias);
      totalLikesContainer.appendChild(likeModel.totalLikesDOM);
    } else {
      console.error("Erreur : Le conteneur '.total-likes-container' n'a pas été trouvé dans le DOM.");
    }
  } else {
    console.error('Erreur : Les données du photographe ou des médias sont manquantes.');
  }
}

// Fonction pour afficher les options de triage des médias.
async function displayToggle() {
  const { medias } = await fetchData(photographerId);
  if (medias) {
    const toggleDiv = document.querySelector('.toggle');
    const toggleModel = createToggle(medias);
    toggleDiv.appendChild(toggleModel.getToggleDOM());
  }
}

// Fonction initiale pour démarrer l'application.
async function init() {
  try {
    await displayPhotographer();
    await displayMedia();
    await displayContact();
    await displayLikes();
    await displayToggle();
  } catch (error) {
    console.error('Error initializing the page:', error);
  }
}

// Appel de la fonction init pour démarrer l'application.
init();

