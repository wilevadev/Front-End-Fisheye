function createLikes(photographer, medias) {
    // Filtrer les médias pour inclure seulement ceux qui correspondent à l'ID du photographe donné
    let filteredMedias = medias.filter(media => media.photographerId === photographerId);

    // Calculer la somme totale des likes pour les médias filtrés
    let totalLikes = filteredMedias.reduce((acc, media) => acc + media.likes, 0);

    // Créer le DOM pour afficher le total des likes
    const totalLikesContainer = document.createElement('div');
    totalLikesContainer.classList.add('total-likes-container');

    const totalLikeInfo = document.createElement('div');
    totalLikeInfo.classList.add('like-info');
    totalLikesContainer.appendChild(totalLikeInfo);

    const totalLikesSpan = document.createElement('span');
    totalLikesSpan.classList.add('total-likes-span');
    totalLikesSpan.textContent = totalLikes;
    totalLikeInfo.appendChild(totalLikesSpan);

    const heartIcon = document.createElement('img');
    heartIcon.src = 'assets/icons/heartBlack.svg';
    heartIcon.alt = 'likes';
    heartIcon.classList.add('like-icon-svg');
    totalLikeInfo.appendChild(heartIcon);

    const priceSpan = document.createElement('span');
    priceSpan.classList.add('likes-price');
    priceSpan.textContent = `${photographer.price}€/jour`;
    totalLikesContainer.appendChild(priceSpan);

    return {
        totalLikes: totalLikes,
        totalLikesDOM: totalLikesContainer
    };
}









