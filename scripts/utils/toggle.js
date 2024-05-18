function createToggle(medias) {
  const container = document.createElement('div');
  container.className = 'container';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'info';
  infoDiv.textContent = 'Trier par';
  container.appendChild(infoDiv);

  const details = document.createElement('details');
  details.className = 'dropDown';
  container.appendChild(details);

  const summary = document.createElement('summary');
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', 'false');
  summary.setAttribute('tabindex', '0');
  const span = document.createElement('span');
  span.className = 'value';
  span.textContent = 'Popularité';
  summary.appendChild(span);
  details.appendChild(summary);

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-chevron-down';
  summary.appendChild(icon);

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options';
  ['Popularité', 'Date', 'Titre'].forEach(option => {
    const div = document.createElement('div');
    div.textContent = option;
    div.setAttribute('role', 'menuitem');
    div.setAttribute('tabindex', '0');
    div.addEventListener('click', () => {
      span.textContent = option;
      details.open = false;
      summary.setAttribute('aria-expanded', 'false');
      sortMedias(option, medias);
    });
    div.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        div.click();
      }
    });
    optionsDiv.appendChild(div);
  });
  details.appendChild(optionsDiv);

  summary.addEventListener('click', () => {
    const expanded = summary.getAttribute('aria-expanded') === 'true';
    summary.setAttribute('aria-expanded', String(!expanded));
  });

  function sortMedias(criteria, medias) {
    const sortedMedias = [...medias];
    switch (criteria) {
      case 'Popularité':
        sortedMedias.sort((a, b) => b.likes - a.likes);
        break;
      case 'Date':
        sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'Titre':
        sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    updateMediaDisplay(sortedMedias);
  }

  function updateMediaDisplay(sortedMedias) {
    const mediaContainer = document.querySelector('.media-container');
    const existingMediaDOMs = Array.from(mediaContainer.children);
    const sortedMediaDOMs = sortedMedias.map(mediaData => {
      const existingDOM = existingMediaDOMs.find(dom => dom.dataset.mediaId == mediaData.id);
      return existingDOM || PhotographerMedia.createMedia(mediaData).getMediaDOM();
    });

    mediaContainer.innerHTML = '';
    sortedMediaDOMs.forEach(dom => mediaContainer.appendChild(dom));
  }

  return { getToggleDOM: () => container };
}


// Explication des termes traduits :
// Function to create a toggle : Fonction pour créer un interrupteur (toggle)
// Allows sorting of medias : Permet le tri des médias
// Create a div container : Créer un div conteneur
// Dropdown menu : Menu déroulant
// Create and configure a div : Créer et configurer un div
// Display the dropdown label : Afficher l'étiquette du menu déroulant
// Append to container : Ajouter au conteneur
// Create a 'details' element : Créer un élément 'details'
// Summary element as button : Élément 'summary' comme bouton
// Set ARIA role for accessibility : Définir le rôle ARIA pour l'accessibilité
// Ensure button can be focused : Assurer que le bouton peut être focalisé
// Add an icon for visual indicator : Ajouter une icône pour l'indicateur visuel
// Create a div for menu options : Créer un div pour les options du menu
// Make each option focusable : Rendre chaque option focusable
// Set the text of 'summary' with chosen option : Met à jour le texte du 'summary' avec l'option choisie
// Close the dropdown menu : Fermer le menu déroulant
// Attach event listener for 'summary' click : Attacher un écouteur d'événement pour le clic sur le 'summary'
// Sort medias based on selected criteria : Trier les médias selon le critère sélectionné
// Copy original array to avoid mutation : Copier le tableau original pour éviter la mutation
// Update display with sorted medias : Mise à jour de l'affichage avec les médias triés
// Clear current content of container : Effacer le contenu actuel du conteneur
// Add sorted medias to container : Ajouter les médias triés dans le conteneur
// Return an object with a method : Renvoie un objet avec une méthode
// Get the DOM of the toggle : Obtenir le DOM du toggle
// Cette traduction et explication détaillée devraient vous aider à mieux comprendre chaque partie de votre code JavaScript pour la fonction createToggle.

