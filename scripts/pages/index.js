// Définit une fonction asynchrone pour récupérer les données des photographes depuis un fichier JSON.
async function getPhotographers() {
  // Effectue une requête pour récupérer le fichier JSON contenant les données des photographes depuis le chemin spécifié.
  const response = await fetch('./data/photographers.json');
  // Transforme la réponse JSON en un objet JavaScript.
  const data = await response.json();
  // Retourne la liste des photographes extraite des données.
  return data.photographers;
}

// Définit une fonction asynchrone pour afficher les données des photographes sur la page web.
async function displayData(photographers) {
  // Sélectionne l'élément HTML qui contiendra les cartes de données des photographes.
  const photographersSection = document.querySelector('.photographer_section');
  // Itère sur chaque objet photographe pour créer et ajouter leurs cartes de données.
  photographers.forEach((photographer) => {
    // Appelle photographerTemplate pour créer un nouvel élément de carte de photographe.
    const photographerModel = photographerTemplate(photographer);
    // Récupère l'élément DOM pour la carte du photographe.
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajoute la carte du photographe à la section correspondante dans le DOM.
    photographersSection.appendChild(userCardDOM);
    // Ajoute des écouteurs d'événements de clic et de clavier aux éléments 'img' et 'h2' à l'intérieur de la carte.
    ['img', 'h2'].forEach(selector => {
      // Sélectionne l'élément spécifique à l'intérieur de la carte.
      const element = userCardDOM.querySelector(selector);
      // Ajoute un écouteur d'événements de clic qui redirige vers une page détaillée pour le photographe.
      element.addEventListener('click', () => {
        window.location.href = `photographer.html?id=${photographer.id}`;
      });
      // Ajoute un écouteur d'événements de clavier pour permettre la navigation via le clavier (touche Entrée ou Espace).
      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = `photographer.html?id=${photographer.id}`;
        }
      });
    });
  });
}

// Définit la fonction initiale pour récupérer et afficher les photographes au chargement de la page.
async function init() {
  // Récupère la liste des photographes en appelant getPhotographers.
  const photographers = await getPhotographers();
  // Affiche les photographes sur la page en appelant displayData.
  await displayData(photographers);
}

// Appelle la fonction init lorsque le script est chargé pour démarrer le processus.
init();
