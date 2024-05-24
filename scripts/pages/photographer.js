// Extraire les paramètres de l'URL pour obtenir l'ID du photographe
const urlParams = new URLSearchParams(window.location.search)
const photographerId = parseInt(urlParams.get('id'), 10)

// Fonction asynchrone pour récupérer les données du photographe et de ses médias.
async function fetchData (photographerId) {
  try {
    // Récupération des données JSON .
    const response = await fetch('./data/photographers.json')
    const data = await response.json()
    // Recherche du photographe par ID.
    const photographer = data.photographers.find(p => p.id === photographerId)
    // Filtrage des médias qui appartiennent au photographe trouvé.
    const medias = data.media.filter(m => m.photographerId === photographerId)
    return { photographer, medias }
  } catch (error) {
    // Gestion des erreurs en cas de problème de récupération des données.
    console.error('Erreur lors de la récupération des données:', error)
  }
}
// Affichage des informations du photographe sur la page.
async function displayPhotographer () {
  const { photographer } = await fetchData(photographerId)
  if (photographer) {
    const photographHeader = document.querySelector('.photograph-header')
    const photographerModel = photographerTemplate(photographer, true)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographHeader.appendChild(userCardDOM)
  }
}
// Affichage des informations de contact du photographe.
async function displayContact () {
  const { photographer } = await fetchData(photographerId)
  if (photographer) {
    const contactModel = contactTemplate(photographer)
    const contactElement = contactModel.getContactDOM()
    return contactElement
  }
}
// Affichage des médias du photographe (photos et vidéos).
async function displayMedia () {
  const { medias } = await fetchData(photographerId) // Ajout de 'photographer' ici
  const photographerMedias = document.querySelector('.media-container')
  medias.forEach(mediaData => {
    const media = PhotographerMedia.createMedia(mediaData)
    const mediaDOM = media.getMediaDOM()
    photographerMedias.appendChild(mediaDOM)

    allMediaPaths.push(media.image || media.video)
  })
  initializeLightboxListeners()
}

// Affichage du nombre total de "likes" pour les médias du photographe.
async function displayLikes () {
  const { photographer, medias } = await fetchData(photographerId)
  if (photographer && medias) {
    const totalLikesContainer = document.querySelector('.total-likes-global')
    if (totalLikesContainer) {
      const likeModel = createLikes(photographer, medias)
      totalLikesContainer.appendChild(likeModel.totalLikesDOM)
    } else {
      console.error("Erreur : Le conteneur '.total-likes-container' n'a pas été trouvé dans le DOM.")
    }
  } else {
    console.error('Erreur : Les données du photographe ou des médias sont manquantes.')
  }
}
// Affichage de l'interrupteur pour filtrer les médias selon certains critères.
async function displayToggle () {
  const { medias } = await fetchData(photographerId)
  if (medias) {
    const toggleDiv = document.querySelector('.toggle')
    const toggleModel = createToggle(medias)
    toggleDiv.appendChild(toggleModel.getToggleDOM())
  }
}
// Fonction initiale qui orchestre les appels des fonctions d'affichage lors du chargement de la page.
async function init () {
  try {
    await displayPhotographer(photographerId)
    await displayMedia(photographerId)
    await displayContact(photographerId)
    await displayLikes(photographerId)
    await displayToggle(photographerId)
  } catch (error) {
    console.error('Error initializing the page:', error)
  }
}
// Lancement de la fonction init lors du chargement du script.
init()

