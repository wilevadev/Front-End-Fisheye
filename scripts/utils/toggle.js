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
    summary.setAttribute('role', 'button');
    summary.setAttribute('aria-expanded', 'false');
    summary.setAttribute('tabindex', '0'); // Assurez-vous que le résumé peut être focalisé
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
        div.setAttribute('tabindex', '0'); // Rend chaque option focusable
        div.addEventListener('click', () => {
            span.textContent = option;
            details.open = false;
            summary.setAttribute('aria-expanded', 'false');
            sortMedias(option, medias, updateLikesDisplay);
        });
        div.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                div.click(); // Permet l'activation par clavier
            }
        });
        optionsDiv.appendChild(div);
    });
    details.appendChild(optionsDiv);

    summary.addEventListener('click', () => {
        const expanded = summary.getAttribute('aria-expanded') === 'true';
        summary.setAttribute('aria-expanded', !expanded);
    });

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
        const existingMediaDOMs = Array.from(mediaContainer.children);
        const sortedMediaDOMs = sortedMedias.map(mediaData => {
            const existingDOM = existingMediaDOMs.find(dom => dom.dataset.mediaId == mediaData.id);
            return existingDOM || PhotographerMedia.createMedia(mediaData).getMediaDOM();
        });
    
        mediaContainer.innerHTML = '';  // Clear the container
        sortedMediaDOMs.forEach(dom => mediaContainer.appendChild(dom));  // Append in sorted order
    
        updateLikesDisplay();
    }

    function updateLikesDisplay() {
        const allMedia = document.querySelectorAll('.media-likes .likes-count');
        let newTotalLikes = 0;
        allMedia.forEach(media => {
            newTotalLikes += parseInt(media.textContent, 10);
        });

        PhotographerMedia.totalLikes = newTotalLikes;
        const totalLikesElement = document.querySelector('.total-likes-span');
        if (totalLikesElement) {
            totalLikesElement.textContent = PhotographerMedia.totalLikes;
        }
        Lightbox.init();
    }

    return { getToggleDOM: () => container };
}










  



  