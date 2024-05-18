class PhotographerMedia {
  static totalLikes = 0;

  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._name = data.name;
    this._image = data.image;
    this._video = data.video;
    this.isLiked = false;
    PhotographerMedia.totalLikes += this._likes;
  }

  createTitleElement() {
    const titleElement = document.createElement('h3');
    titleElement.textContent = this._title;
    titleElement.classList.add('media-title');
    return titleElement;
  }

  createLikesElement() {
    const likesContainer = document.createElement('button');
    const likesCount = document.createElement('span');
    const likeIcon = document.createElement('img');

    likesContainer.classList.add('media-likes');
    likesCount.textContent = this._likes;
    likesCount.classList.add('likes-count');

    likeIcon.setAttribute('src', this.isLiked ? 'assets/icons/heart.svg' : 'assets/icons/heartWhite.svg');
    likeIcon.setAttribute('alt', 'un coeur pour aimer la photo');
    likeIcon.setAttribute('role', 'img');
    likeIcon.setAttribute('aria-label', `cliquez sur le coeur si vous aimez ${this._title}`);
    likeIcon.setAttribute('tabindex', 0);
    likeIcon.classList.add('like-icon-svg');

    likesContainer.setAttribute('role', 'button');
    likesContainer.setAttribute('aria-label', this.isLiked ? 'Unlike' : `l'oeuvre de a reçu ${this._likes} likes`);
    likesContainer.setAttribute('tabindex', 0);

    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(likeIcon);

    likesContainer.addEventListener('click', () => {
      const likeChange = this.isLiked ? -1 : 1;
      this.isLiked = !this.isLiked;
      this._likes += likeChange;
      PhotographerMedia.totalLikes += likeChange;
      likesCount.textContent = this._likes;

      likeIcon.setAttribute('src', this.isLiked ? 'assets/icons/heart.svg' : 'assets/icons/heartWhite.svg');
      likesContainer.setAttribute('aria-label', this.isLiked ? `vous aimez l'œuvre ${this._title}` : `vous n'aimez pas l'œuvre ${this._title}`);

      const totalLikesElement = document.querySelector('.total-likes-span');
      if (totalLikesElement) {
        totalLikesElement.textContent = PhotographerMedia.totalLikes;
      } else {
        console.error("L'élément pour afficher le total des likes n'existe pas.");
      }
    });

    return likesContainer;
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
      throw new Error('Media type unknown');
    }
  }
}

class PhotographerImage extends PhotographerMedia {
  get image() {
    return `assets/photographers/${this._photographerId}/${this._image}`;
  }

  getMediaDOM() {
    const mediaArticle = document.createElement('article');
    mediaArticle.dataset.mediaId = this._id;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', this.image);
    linkElement.setAttribute('aria-label', this._title);

    const imageElement = document.createElement('img');
    imageElement.src = this.image;
    imageElement.alt = `l'image montre ${this._title}`;

    linkElement.appendChild(imageElement);
    mediaArticle.appendChild(linkElement);

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('media-info');
    infoContainer.appendChild(this.createTitleElement());
    infoContainer.appendChild(this.createLikesElement());

    mediaArticle.appendChild(infoContainer);
    linkElement.classList.add('lightbox-open');

    return mediaArticle;
  }
}

class PhotographerVideo extends PhotographerMedia {
  get video() {
    return `assets/photographers/${this._photographerId}/${this._video}`;
  }

  getMediaDOM() {
    const mediaArticle = document.createElement('article');
    mediaArticle.dataset.mediaId = this._id;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', this.video);
    linkElement.setAttribute('aria-label', this._title);
    linkElement.classList.add('lightbox-open');

    const videoElement = document.createElement('video');
    videoElement.src = this.video;
    videoElement.setAttribute('controls', true);
    videoElement.setAttribute('aria-label', `la vidéo montre : ${this._title}`);

    const trackElement = document.createElement('track');
    trackElement.setAttribute('kind', 'captions');
    trackElement.setAttribute('src', '');
    trackElement.setAttribute('srclang', 'fr');
    trackElement.setAttribute('label', 'Français - Sous-titres en préparation');
    videoElement.appendChild(trackElement);

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

document.addEventListener('DOMContentLoaded', () => {
  Lightbox.init();
});


