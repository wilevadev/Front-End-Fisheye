// Extraire les paramètres de l'URL pour obtenir l'ID du photographe
const urlParams = new URLSearchParams(window.location.search)
const photographerId = parseInt(urlParams.get('id'), 10)

// Fonction asynchrone pour récupérer les données du photographe et de ses médias.
async function fetchData (photographerId) {
  try {
    // Récupération des données JSON depuis le serveur.
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
// Explication des termes traduits :
// Extract URL parameters : Extraction des paramètres d'URL

// Prendre les paramètres de l'URL de la fenêtre actuelle.
// Get photographer ID : Obtenir l'ID du photographe

// Extraire l'ID du photographe des paramètres de l'URL et le convertir en entier.
// Asynchronous function : Fonction asynchrone

// Une fonction qui permet d'exécuter des opérations asynchrones.
// Fetch photographer and media data : Récupérer les données du photographe et de ses médias

// Obtenir les informations sur le photographe et ses médias associés.
// Retrieve JSON data from server : Récupération des données JSON depuis le serveur

// Envoyer une requête pour obtenir le fichier JSON contenant les données.
// Convert JSON response to JavaScript object : Transformer la réponse JSON en un objet JavaScript

// Prendre la réponse au format JSON et la convertir en objet utilisable en JavaScript.
// Find photographer by ID : Recherche du photographe par ID

// Chercher le photographe correspondant à l'ID donné dans les données JSON.
// Filter media belonging to the found photographer : Filtrage des médias qui appartiennent au photographe trouvé

// Sélectionner les médias qui ont le même ID de photographe.
// Return photographer and media data : Renvoie les données du photographe et des médias

// Retourner un objet contenant le photographe et les médias associés.
// Error handling in case of data retrieval problem : Gestion des erreurs en cas de problème de récupération des données

// Afficher un message d'erreur dans la console si la récupération des données échoue.
// Pourquoi la fonction est asynchrone (async) ?
// Asynchrone :

// Une fonction asynchrone permet d'exécuter du code asynchrone de manière séquentielle en utilisant async et await. Cela signifie que vous pouvez attendre la fin de certaines opérations (comme les appels réseau) sans bloquer le fil d'exécution principal du programme.
// async et await :

// async : Utilisé devant une fonction pour indiquer qu'elle contient du code asynchrone.
// await : Utilisé pour attendre que la promesse se résolve. Il peut seulement être utilisé à l'intérieur des fonctions marquées comme async.
// Comment cela fonctionne dans votre code :
// Extraction de l'ID du photographe :

// Le script extrait les paramètres de l'URL de la page actuelle pour obtenir l'ID du photographe. URLSearchParams permet de gérer les paramètres d'URL facilement.
// Appel de la fonction fetchData :

// Lorsqu'elle est appelée, la fonction utilise fetch pour envoyer une requête réseau afin d'obtenir le fichier photographers.json.
// Attente de la réponse :

// L'opération fetch est asynchrone et retourne une promesse. L'utilisation de await attend que la promesse soit résolue et renvoie la réponse.
// Conversion de la réponse :

// Après avoir reçu la réponse, await response.json() attend que la conversion de la réponse en objet JavaScript soit terminée.
// Recherche et filtrage :

// La fonction recherche ensuite le photographe dans les données JSON en utilisant son ID et filtre les médias associés à ce photographe.
// Retourne les données :

// Enfin, la fonction retourne un objet contenant le photographe et les médias associés.
// Gestion des erreurs :

// Si une erreur survient pendant le processus, un message d'erreur est affiché dans la console.
// En résumé, l'utilisation des fonctions asynchrones et de await permet de gérer plus facilement les opérations asynchrones comme les appels réseau, en rendant le code plus lisible et en évitant les callbacks complexes ou les chaînes de promesses.
