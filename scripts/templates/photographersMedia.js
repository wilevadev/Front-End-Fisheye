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
       const mediaArticle = document.createElement('article');
     const imageElement = document.createElement('img');
        imageElement.src = this.image;
        imageElement.alt = this._title;
        mediaArticle.appendChild(imageElement);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('media-info');
        infoContainer.appendChild(this.createTitleElement());
        infoContainer.appendChild(this.createLikesElement());
        mediaArticle.appendChild(infoContainer);
        return mediaArticle; 
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
       
        const mediaArticle = document.createElement('article');
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', this.video); // 
        linkElement.setAttribute('aria-label', this._title);
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











