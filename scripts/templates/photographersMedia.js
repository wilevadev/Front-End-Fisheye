class PhotographerMedia {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        this._name = data.name;
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    createTitleElement() {
        const titleElement = document.createElement('h3');
        titleElement.textContent = this._title;
        titleElement.classList.add('media-title');
        return titleElement;
    }

    get likes() {
        return this._likes;
    }
    createLikesElement() {
        const likesContainer = document.createElement('div');
        likesContainer.classList.add('media-likes');

        const likesCount = document.createElement('span');
        likesCount.textContent = this._likes;
        likesCount.classList.add('likes-count');

        const likeIcon = document.createElement('i');
        likeIcon.classList.add('fa-solid', 'fa-heart');
        likeIcon.setAttribute('aria-hidden', 'true'); 
        

        likesContainer.appendChild(likesCount);
        likesContainer.appendChild(likeIcon);

        return likesContainer;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }

    getMediaDOM() {
        throw new Error('This method is supposed to be implemented by subclasses');
    }

    static createMedia(data) {
        if (data.image) {
            return new PhotographerImage(data);
        } else if (data.video) {
            return new PhotographerVideo(data);
        } else {
            throw new Error("Media type unknown");
        }
    }
}

class PhotographerImage extends PhotographerMedia {
    constructor(data) {
        super(data);
        this._image = data.image;
    }

    get image() {
        return `assets/photographers/${this._photographerId}/${this._image}`;
    }

    getMediaDOM() {
        // Crée l'élément <article> comme conteneur principal pour une meilleure sémantique
        const mediaArticle = document.createElement('article');
    
        // Crée un élément <a> pour rendre l'image cliquable
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', this.image); // Ou une autre URL pertinente
        linkElement.setAttribute('aria-label', this._title); // Pour l'accessibilité
    
        // Crée l'élément image
        const imageElement = document.createElement('img');
        imageElement.src = this.image;
        imageElement.alt = this._title;
    
        // Ajoute l'image au lien, puis le lien à l'article
        linkElement.appendChild(imageElement);
        mediaArticle.appendChild(linkElement);
    
        // Crée le conteneur pour le titre et les likes
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('media-info');
    
        // Supposons que createTitleElement() et createLikesElement() sont méthodes qui fonctionnent
        infoContainer.appendChild(this.createTitleElement());
        infoContainer.appendChild(this.createLikesElement());
    
        // Ajoute le conteneur d'infos à l'article
        mediaArticle.appendChild(infoContainer);
    
        return mediaArticle; // Retourne l'élément <article> complet
    }
    
    
}

class PhotographerVideo extends PhotographerMedia {
    constructor(data) {
        super(data);
        this._video = data.video;
    }

    get video() {
        return `assets/photographers/${this._photographerId}/${this._video}`;
    }

    getMediaDOM() {
        // Crée l'élément <article> comme conteneur principal pour une meilleure sémantique
        const mediaArticle = document.createElement('article');
    
        // Crée un élément <a> pour rendre la vidéo cliquable (si nécessaire)
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', this.video); // Assure-toi que this.video pointe vers l'URL correcte
        linkElement.setAttribute('aria-label', this._title); // Pour l'accessibilité
    
        // Crée l'élément vidéo
        const videoElement = document.createElement('video');
        videoElement.src = this.video;
        videoElement.controls = true; 
        videoElement.setAttribute('title', this._title);
    
      
        linkElement.appendChild(videoElement);
        mediaArticle.appendChild(linkElement);
    
        
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('media-info');
    
       
        infoContainer.appendChild(this.createTitleElement());
        infoContainer.appendChild(this.createLikesElement());
    
       
        mediaArticle.appendChild(infoContainer);
    
        return mediaArticle; 
    }
}











