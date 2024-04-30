class PhotographerMedia {
  static totalLikes = 0
  constructor (data) {
    this._id = data.id
    this._photographerId = data.photographerId
    this._title = data.title
    this._likes = data.likes
    this._date = data.date
    this._price = data.price
    this._name = data.name
    this.isLiked = false
    PhotographerMedia.totalLikes += this._likes
  }

  createTitleElement () {
    const titleElement = document.createElement('h3')
    titleElement.textContent = this._title
    titleElement.classList.add('media-title')
    return titleElement
  }

  createLikesElement () {
    const likesContainer = document.createElement('div')
    const likesCount = document.createElement('span')
    const likeIcon = document.createElement('img')

    likesContainer.classList.add('media-likes')
    likesCount.textContent = this._likes
    likesCount.classList.add('likes-count')
    likeIcon.setAttribute('src', 'assets/icons/heart.svg')
    likeIcon.setAttribute('alt', 'like')
    likeIcon.setAttribute('role', 'button');
    likeIcon.setAttribute('aria-label', 'toggle like');
    likeIcon.setAttribute('tabindex', 0);
    likeIcon.classList.add('like-icon-svg')
    likesContainer.appendChild(likesCount)
    likesContainer.appendChild(likeIcon)

    likeIcon.addEventListener('click', () => {
      const likeChange = this.isLiked ? -1 : 1
      this.isLiked = !this.isLiked
      this._likes += likeChange
      PhotographerMedia.totalLikes += likeChange
      likesCount.textContent = this._likes

      const totalLikesElement = document.querySelector('.total-likes-span')
      if (totalLikesElement) {
        totalLikesElement.textContent = PhotographerMedia.totalLikes
      } else {
        console.error("L'élément pour afficher le total des likes n'existe pas.")
      }
    })

    return likesContainer
  }

  getMediaDOM () {
    throw new Error('This method is supposed to be implemented by subclasses')
  }

  static createMedia (data) {
    if (data.image) {
      return new PhotographerImage(data)
    } else if (data.video) {
      return new PhotographerVideo(data)
    } else {
      throw new Error('Media type unknown')
    }
  }
}

const allMediaPaths = []

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
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', this.image);
      linkElement.setAttribute('aria-label', this._title);
      
      const imageElement = document.createElement('img');
      imageElement.src = this.image;
      imageElement.alt = this._title;
      
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
      linkElement.setAttribute('href', this.video);
      linkElement.setAttribute('aria-label', this._title);
      
      const videoElement = document.createElement('video');
      videoElement.src = this.video;
      videoElement.setAttribute('controls', true);
      videoElement.title = this._title;
      
      linkElement.appendChild(videoElement);
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
document.addEventListener('DOMContentLoaded', () => {
  Lightbox.init();
});
