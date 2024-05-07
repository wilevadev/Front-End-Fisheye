// Fonction pour créer un interrupteur (toggle) qui permet le tri des médias.
function createToggle(medias) {
  // Créer un div conteneur pour le menu déroulant.
  const container = document.createElement('div');
  container.className = 'container';

  // Créer et configurer un div pour afficher l'étiquette du menu déroulant.
  const infoDiv = document.createElement('div');
  infoDiv.className = 'info';
  infoDiv.textContent = 'Trier par';
  container.appendChild(infoDiv);

  // Créer un élément 'details' pour le menu déroulant.
  const details = document.createElement('details');
  details.className = 'dropDown';
  container.appendChild(details);

  // Créer un élément 'summary' qui sert de bouton pour le menu déroulant.
  const summary = document.createElement('summary');
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', 'false');
  summary.setAttribute('tabindex', '0'); // Assure que le bouton peut être focalisé.
  const span = document.createElement('span');
  span.className = 'value';
  span.textContent = 'Popularité';
  summary.appendChild(span);
  details.appendChild(summary);

  // Ajouter une icône pour l'indicateur visuel du menu déroulant.
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-chevron-down';
  summary.appendChild(icon);

  // Créer un div pour les options du menu.
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options';
  ['Popularité', 'Date', 'Titre'].forEach(option => {
    const div = document.createElement('div');
    div.textContent = option;
    div.setAttribute('role', 'menuitem');
    div.setAttribute('tabindex', '0'); // Rend chaque option focusable.
    div.addEventListener('click', () => {
      span.textContent = option; // Met à jour le texte du 'summary' avec l'option choisie.
      details.open = false; // Ferme le menu déroulant.
      summary.setAttribute('aria-expanded', 'false');
      sortMedias(option, medias); // Appel à la fonction de tri.
    });
    div.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        div.click(); // Permet l'activation par clavier.
      }
    });
    optionsDiv.appendChild(div);
  });
  details.appendChild(optionsDiv);

  // Écouteur pour le clic sur le 'summary' pour gérer l'état déroulé du menu.
  summary.addEventListener('click', () => {
    const expanded = summary.getAttribute('aria-expanded') === 'true';
    summary.setAttribute('aria-expanded', String(!expanded));
  });

  // Fonction pour trier les médias selon le critère sélectionné.
  function sortMedias(criteria, medias) {
    const sortedMedias = [...medias]; // Copie du tableau original pour éviter la mutation.
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
    updateMediaDisplay(sortedMedias); // Mise à jour de l'affichage avec les médias triés.
  }

  // Fonction pour mettre à jour l'affichage des médias dans le DOM.
  function updateMediaDisplay(sortedMedias) {
    const mediaContainer = document.querySelector('.media-container');
    const existingMediaDOMs = Array.from(mediaContainer.children);
    const sortedMediaDOMs = sortedMedias.map(mediaData => {
      const existingDOM = existingMediaDOMs.find(dom => dom.dataset.mediaId == mediaData.id); // Recherche de l'élément existant correspondant.
      return existingDOM || PhotographerMedia.createMedia(mediaData).getMediaDOM();
    });

    mediaContainer.innerHTML = ''; // Efface le contenu actuel du conteneur.
    sortedMediaDOMs.forEach(dom => mediaContainer.appendChild(dom)); // Ajoute les médias triés dans le conteneur.
  }

  // Renvoie un objet avec une méthode pour obtenir le DOM du toggle.
  return { getToggleDOM: () => container };
}

