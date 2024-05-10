function createLikes (photographer, medias) {
  // Filtrer les médias pour inclure seulement ceux qui correspondent à l'ID du photographe donné
  const filteredMedias = medias.filter(media => media.photographerId === photographer.id); // Correction here: use photographer.id

  // Calculer la somme totale des likes pour les médias filtrés
  const totalLikes = filteredMedias.reduce((acc, media) => acc + media.likes, 0);

  // Créer le DOM pour afficher le total des likes
  const totalLikesContainer = document.createElement('div');
  totalLikesContainer.classList.add('total-likes-container');
  totalLikesContainer.setAttribute('role', 'complementary');
  totalLikesContainer.setAttribute('aria-label', 'Résumé des likes et tarif');

  const totalLikeInfo = document.createElement('div');
  totalLikeInfo.classList.add('like-info');
  totalLikeInfo.setAttribute('role', 'contentinfo');
  totalLikesContainer.appendChild(totalLikeInfo);

  const totalLikesSpan = document.createElement('span');
  totalLikesSpan.classList.add('total-likes-span');
  totalLikesSpan.textContent = totalLikes;
  totalLikeInfo.appendChild(totalLikesSpan);

  const heartIcon = document.createElement('img');
  heartIcon.src = 'assets/icons/heartBlack.svg';
  heartIcon.alt = 'le total des like ';
  heartIcon.classList.add('like-icon-svg');
  totalLikeInfo.appendChild(heartIcon);

  const priceSpan = document.createElement('span');
  priceSpan.classList.add('likes-price');
  priceSpan.textContent = `${photographer.price}€/jour`;
  totalLikesContainer.appendChild(priceSpan);

  return {
    totalLikes,
    totalLikesDOM: totalLikesContainer
  };
}

