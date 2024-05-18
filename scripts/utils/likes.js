function createLikes (photographer, medias) {
  const filteredMedias = medias.filter(media => media.photographerId === photographer.id);
  const totalLikes = filteredMedias.reduce((acc, media) => acc + media.likes, 0);

  const totalLikesContainer = document.createElement('div');
  totalLikesContainer.classList.add('total-likes-container');
  totalLikesContainer.setAttribute('role', 'complementary');
  totalLikesContainer.setAttribute('aria-label', 'le nombre total des like du photographe et son tarif par jour');

  const totalLikeInfo = document.createElement('div');
  totalLikeInfo.classList.add('like-info');
  totalLikeInfo.setAttribute('role', 'contentinfo');
  totalLikesContainer.appendChild(totalLikeInfo);

  const totalLikesSpan = document.createElement('button');
  totalLikesSpan.classList.add('total-likes-span');
  totalLikesSpan.textContent = totalLikes;
  totalLikeInfo.appendChild(totalLikesSpan);

  const heartIcon = document.createElement('img');
  heartIcon.src = 'assets/icons/heartBlack.svg';
  heartIcon.alt = 'le total des like';
  heartIcon.classList.add('like-icon-svg');
  totalLikeInfo.appendChild(heartIcon);

  const priceSpan = document.createElement('button');
  priceSpan.classList.add('likes-price');
  priceSpan.textContent = `${photographer.price}€/jour`;
  totalLikesContainer.appendChild(priceSpan);

  return {
    totalLikes,
    totalLikesDOM: totalLikesContainer
  };
}

// Explication des termes traduits :
// Filter medias : Filtrer les médias
// Include only those : Inclure seulement ceux
// Match the given photographer ID : Correspondent à l'ID du photographe donné
// Calculate the total sum of likes : Calculer la somme totale des likes
// Filtered medias : Médias filtrés
// Create the DOM : Créer le DOM
// Display the total likes : Afficher le total des likes
// Add a class to the container : Ajouter une classe pour le conteneur
// Set ARIA role for accessibility : Définir le rôle ARIA pour l'accessibilité
// Add ARIA label : Ajouter une étiquette ARIA
// Add a class to the like info : Ajouter une classe pour l'information des likes
// Set ARIA role for content : Définir le rôle ARIA pour le contenu
// Append element to container : Ajouter l'élément au conteneur
// Set the text content with total likes : Définir le texte avec le total des likes
// Add a class to the like span : Ajouter une classe pour le span des likes
// Set the image source for heart icon : Définir la source de l'image de l'icône cœur
// Set alt text for image : Définir le texte alternatif pour l'image
// Add a class to the icon : Ajouter une classe pour l'icône
// Set the text content with photographer's price : Définir le texte avec le prix du photographe
// Return total likes : Retourner le total des likes
// Return DOM of likes container : Retourner le DOM du conteneur des likes
// Cette traduction et explication détaillée devraient vous aider à mieux comprendre chaque partie de votre code JavaScript pour la fonction createLikes.

