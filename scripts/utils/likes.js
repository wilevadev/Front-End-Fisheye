// Fonction pour créer les éléments de likes pour un photographe
function createLikes(photographer, medias) {
  // Filtrer les médias pour ne garder que ceux du photographe
  const filteredMedias = medias.filter(media => media.photographerId === photographer.id)
  // Calculer le total des likes en utilisant reduce
  const totalLikes = filteredMedias.reduce((acc, media) => acc + media.likes, 0)

  // Créer un conteneur pour afficher le total des likes
  const totalLikesContainer = document.createElement('div')
  totalLikesContainer.classList.add('total-likes-container')
  totalLikesContainer.setAttribute('role', 'complementary')
  totalLikesContainer.setAttribute('aria-label', `Le nombre total des likes du photographe${photographer.name} `)

  // Créer un conteneur pour les informations sur les likes
  const totalLikeInfo = document.createElement('div')
  totalLikeInfo.classList.add('like-info')
  totalLikeInfo.setAttribute('role', 'contentinfo')
  totalLikesContainer.appendChild(totalLikeInfo)

  // Créer un bouton pour afficher le total des likes
  const totalLikesButton = document.createElement('button')
  totalLikesButton.classList.add('total-likes-button')
  totalLikesButton.setAttribute('aria-label', `Total des likes: ${totalLikes}`)

  // Créer un élément span pour afficher le total des likes
  const totalLikesText = document.createElement('span')
  totalLikesText.classList.add('total-likes-text')
  totalLikesText.textContent = totalLikes
  totalLikesButton.appendChild(totalLikesText)

  // Ajouter l'icône du cœur
  const likeIcon = document.createElement('img')
  likeIcon.src = 'assets/icons/heartBlack.svg'
  likeIcon.alt = 'Icône de cœur représentant les likes'
  likeIcon.classList.add('like-icon-svg')
  totalLikesButton.appendChild(likeIcon)

  totalLikeInfo.appendChild(totalLikesButton)

  // Créer un bouton pour afficher le prix par jour du photographe
  const priceButton = document.createElement('button')
  priceButton.classList.add('likes-price')
  priceButton.setAttribute('aria-label', `Tarif par jour de ${photographer.name} est de ${photographer.price} euros`)
  priceButton.textContent = `${photographer.price}€/jour`
  totalLikesContainer.appendChild(priceButton)

  // Retourner un objet contenant le total des likes et l'élément DOM du total des likes
  return {
    totalLikes,
    totalLikesDOM: totalLikesContainer
  }
}


