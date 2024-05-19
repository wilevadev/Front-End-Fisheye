// fonction asynchrone pour récupérer les données des photographes depuis un fichier JSON.
async function getPhotographers () {
  // requête pour récupérer le fichier JSON contenant les données des photographes.
  const response = await fetch('./data/photographers.json')
  // Transforme la réponse JSON en un objet JavaScript.
  const data = await response.json()
  // Renvoie la liste des photographes
  return data.photographers
}

// Définit une fonction asynchrone pour afficher les données des photographes.
async function displayData (photographers) {
  // Sélectionne l'élément HTML qui contiendra les photographes.
  const photographersSection = document.querySelector('.photographer_section')
  // Itère sur chaque objet photographe pour créer et ajouter les photographes.
  photographers.forEach((photographer) => {
    // Appelle photographerTemplate pour créer un nouvel élément de carte de photographe.
    const photographerModel = photographerTemplate(photographer)
    // Récupère l'élément DOM pour la carte du photographe.
    const userCardDOM = photographerModel.getUserCardDOM()
    // Ajoute la carte du photographe à la section correspondante dans le DOM.
    photographersSection.appendChild(userCardDOM);
    // Ajoute des écouteurs d'événements de clic et de clavier aux éléments 'img' et 'h2' à l'intérieur de la carte.
    ['img', 'h2'].forEach(selector => {
      // Sélectionne l'élément spécifique à l'intérieur de la carte.
      const element = userCardDOM.querySelector(selector)
      // Ajoute un écouteur d'événements de clic qui redirige vers une page détaillée pour le photographe.
      element.addEventListener('click', () => {
        window.location.href = `photographer.html?id=${photographer.id}`
      })
      // Ajoute un écouteur d'événements de clavier pour permettre la navigation via le clavier (touche Entrée ou Espace).
      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = `photographer.html?id=${photographer.id}`
        }
      })
    })
  })
}

// Définit la fonction initiale pour récupérer et afficher les photographes au chargement de la page.
async function init () {
  // Récupère la liste des photographes en appelant getPhotographers.
  const photographers = await getPhotographers()
  // Affiche les photographes sur la page en appelant displayData.
  await displayData(photographers)
}

// Appelle la fonction init lorsque le script est chargé pour démarrer le processus.
init()

// Voici la traduction terme par terme de votre code JavaScript commenté pour la fonction getPhotographers :

// javascript
// Copy code
// // Fonction asynchrone pour récupérer les données des photographes depuis un fichier JSON.
// async function getPhotographers() {
//   // Requête pour récupérer le fichier JSON contenant les données des photographes.
//   const response = await fetch('./data/photographers.json');
//   // Transforme la réponse JSON en un objet JavaScript.
//   const data = await response.json();
//   // Renvoie la liste des photographes.
//   return data.photographers;
// }
// Explication des termes traduits :
// Asynchronous function : Fonction asynchrone

// Une fonction qui permet d'exécuter des opérations asynchrones en utilisant async et await.
// Fetch photographers' data : Récupérer les données des photographes

// Obtenir les informations sur les photographes.
// Request to fetch JSON file : Requête pour récupérer le fichier JSON

// Envoyer une demande pour obtenir le fichier JSON.
// Containing photographers' data : Contenant les données des photographes

// Le fichier JSON inclut les informations sur les photographes.
// Convert JSON response to JavaScript object : Transformer la réponse JSON en un objet JavaScript

// Prendre la réponse au format JSON et la convertir en objet utilisable en JavaScript.
// Return list of photographers : Renvoie la liste des photographes

// La fonction retourne le tableau des photographes extrait des données JSON.
// Pourquoi la fonction est asynchrone (async) ?
// Asynchrone :

// Une fonction asynchrone permet d'exécuter du code asynchrone de manière séquentielle en utilisant les mots-clés async et await. Cela signifie que vous pouvez attendre la fin de certaines opérations (comme les appels réseau) sans bloquer le fil d'exécution principal du programme.
// async et await :

// async : Utilisé devant une fonction pour indiquer qu'elle contient du code asynchrone.
// await : Utilisé pour attendre que la promesse se résolve. Il peut seulement être utilisé à l'intérieur des fonctions marquées comme async.
// Exemple dans le code :

// await fetch('./data/photographers.json') : Attend la réponse de la requête réseau pour récupérer le fichier JSON. Si la fonction n'était pas asynchrone, le code suivant cette ligne s'exécuterait immédiatement, même si la réponse du serveur n'était pas encore arrivée.
// await response.json() : Attend la conversion de la réponse du fetch en un objet JavaScript.
// Comment cela fonctionne dans votre code :
// Appel de la fonction getPhotographers :

// Lorsqu'elle est appelée, la fonction utilise fetch pour envoyer une requête réseau afin d'obtenir le fichier photographers.json.
// Attente de la réponse :

// L'opération fetch est asynchrone et retourne une promesse. L'utilisation de await attend que la promesse soit résolue et renvoie la réponse.
// Conversion de la réponse :

// Après avoir reçu la réponse, await response.json() attend que la conversion de la réponse en objet JavaScript soit terminée.
// Retourne les photographes :

// Enfin, la fonction retourne la liste des photographes extraite des données JSON.
// En résumé, l'utilisation des fonctions asynchrones et de await permet de gérer plus facilement les opérations asynchrones comme les appels réseau, en rendant le code plus lisible et en évitant les callbacks complexes ou les chaînes de promesses.
