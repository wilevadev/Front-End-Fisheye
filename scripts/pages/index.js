// Définition de la fonction asynchrone getPhotographers qui charge les données des photographes depuis un fichier JSON local.
async function getPhotographers() {
  // Utilisation de fetch pour charger le fichier JSON. Le chemin './data/photographers.json' pointe vers le fichier local.
  const response = await fetch('./data/photographers.json');
  // Conversion de la réponse en format JSON.
  const data = await response.json();
  // Retourne la liste des photographes extraite du JSON.
  return data.photographers;
}

// Définition de la fonction asynchrone displayData qui prend en paramètre un tableau de photographes pour afficher leurs données.
async function displayData(photographers) {
  // Sélection de l'élément du DOM où les cartes des photographes seront ajoutées.
  const photographersSection = document.querySelector('.photographer_section');
  // Boucle sur chaque photographe pour créer et ajouter sa carte dans la section.
  photographers.forEach((photographer) => {
    // Création de la carte du photographe à partir d'un modèle (supposé défini ailleurs).
    const photographerModel = photographerTemplate(photographer);
    // Obtention du DOM de la carte utilisateur à partir du modèle.
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajout de la carte du photographe dans la section du DOM.
    photographersSection.appendChild(userCardDOM);

    // Ajout d'écouteurs d'événements pour rendre les éléments cliquables et accessibles via le clavier.
    ['img', 'h2'].forEach(selector => {
      const element = userCardDOM.querySelector(selector);
      // Écouteur pour rediriger vers une page de détail du photographe lorsque l'image ou le nom est cliqué.
      element.addEventListener('click', () => {
        window.location.href = `photographer.html?id=${photographer.id}`;
      });
      // Écouteur pour permettre l'accès via le clavier (touche 'Enter' ou espace).
      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = `photographer.html?id=${photographer.id}`;
        }
      });
    });
  });
}

// Fonction asynchrone init qui initialise l'application.
async function init() {
  // Récupération des données des photographes.
  const photographers = await getPhotographers();
  // Affichage des données des photographes.
  await displayData(photographers);
}

// Appel de la fonction init pour démarrer l'application.
init();