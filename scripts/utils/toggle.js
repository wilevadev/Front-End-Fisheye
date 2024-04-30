function createToggle(medias, updateLikesDisplay) {
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
        div.addEventListener('click', () => {
            span.textContent = option;
            details.open = false;
            sortMedias(option, medias, updateLikesDisplay);
        });
        optionsDiv.appendChild(div);
    });
    details.appendChild(optionsDiv);

    function sortMedias(criteria, medias, updateLikesDisplay) {
        let sortedMedias = [...medias];
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
        updateMediaDisplay(sortedMedias, updateLikesDisplay);
    }
    
    function updateMediaDisplay(sortedMedias, updateLikesDisplay) {
        const mediaContainer = document.querySelector(".media-container");
        mediaContainer.innerHTML = '';  // Assurez-vous que les anciens enfants sont retirés.
        sortedMedias.forEach(mediaData => {
            const media = PhotographerMedia.createMedia(mediaData);
            const mediaDOM = media.getMediaDOM();
            mediaContainer.appendChild(mediaDOM);
        });
    
        // Assurez-vous que les likes sont recalculés après la mise à jour de l'affichage
        updateLikesDisplay();
    }
    
    function updateLikesDisplay() {
        const allMedia = document.querySelectorAll('.media-likes .likes-count');
        PhotographerMedia.totalLikes = 0; // Réinitialisez d'abord les likes totaux
        allMedia.forEach(media => {
            PhotographerMedia.totalLikes += parseInt(media.textContent, 10);
        });
        const totalLikesElement = document.querySelector('.total-likes-span');
        if (totalLikesElement) {
            totalLikesElement.textContent = PhotographerMedia.totalLikes;
        }
        Lightbox.init();
    }
    

    return { getToggleDOM: () => container };
}









  



  