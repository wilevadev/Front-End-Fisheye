// Définition de la classe principale pour les médias des photographes.
class PhotographerMedia {
  // Variable statique pour suivre le total des likes de tous les médias.
  static totalLikes = 0;

  // Constructeur de la classe pour initialiser les propriétés de chaque instance.
  constructor(data) {
    // Initialisation des propriétés à partir des données fournies.
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._name = data.name;
    this._image = data.image;
    this.isLiked = false;  // État initial du "like".
    // Ajout des likes de l'instance au total général des likes.
    PhotographerMedia.totalLikes += this._likes;
  }

  // Méthode pour créer un élément de titre DOM.
  createTitleElement() {
    const titleElement = document.createElement('h3');
    titleElement.textContent = this._title;
    titleElement.classList.add('media-title');
    return titleElement;
  }

  // Méthode pour créer un élément DOM pour les likes, avec interaction.
  createLikesElement() {
    const likesContainer = document.createElement('div');
    const likesCount = document.createElement('span');
    const likeIcon = document.createElement('img');

    likesContainer.classList.add('media-likes');
    likesCount.textContent = this._likes;
    likesCount.classList.add('likes-count');

    // Initialisation de l'icône de like selon l'état isLiked.
    likeIcon.setAttribute('src', this.isLiked ? 'assets/icons/heart.svg' : 'assets/icons/heartWhite.svg');
    likeIcon.setAttribute('alt', 'like');
    likeIcon.setAttribute('role', 'button');
    likeIcon.setAttribute('aria-label', 'like');
    likeIcon.setAttribute('tabindex', 0);
    likeIcon.classList.add('like-icon-svg');
    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(likeIcon);

    // Gestion de l'événement click pour basculer l'état du like.
    likeIcon.addEventListener('click', () => {
      const likeChange = this.isLiked ? -1 : 1;
      this.isLiked = !this.isLiked;
      this._likes += likeChange;
      PhotographerMedia.totalLikes += likeChange;
      likesCount.textContent = this._likes;

      // Mise à jour de l'icône de like après un clic.
      likeIcon.setAttribute('src', this.isLiked ? 'assets/icons/heart.svg' : 'assets/icons/heartWhite.svg');

      // Mise à jour du total des likes affiché dans le DOM, si l'élément existe.
      const totalLikesElement = document.querySelector('.total-likes-span');
      if (totalLikesElement) {
        totalLikesElement.textContent = PhotographerMedia.totalLikes;
      } else {
        console.error("L'élément pour afficher le total des likes n'existe pas.");
      }
    });

    return likesContainer;
  }

  // Méthode abstraite pour obtenir le DOM du média. Doit être implémentée par les sous-classes.
  getMediaDOM() {
    throw new Error('This method is supposed to be implemented by subclasses');
  }

  // Méthode statique pour créer une instance appropriée de média basée sur les données fournies.
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
const allMediaPaths = []

// Définition de la sous-classe pour les images.
class PhotographerImage extends PhotographerMedia {
  constructor(data) {
    super(data);
    this._image = data.image; // Redondance, car déjà initialisé par la classe parente.
  }

  // Getter pour obtenir le chemin complet de l'image.
  get image() {
    return `assets/photographers/${this._photographerId}/${this._image}`;
  }

  // Méthode pour obtenir le DOM de l'image, incluant le lien et les informations.
  getMediaDOM() {
    const mediaArticle = document.createElement('article');
    mediaArticle.dataset.mediaId = this._id;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', this.image);
    linkElement.setAttribute('aria-label', `View detail of ${this._title}`);

    const imageElement = document.createElement('img');
    imageElement.src = this.image;
    imageElement.alt = `An image showing ${this._title}`;

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

// Définition de la sous-classe pour les vidéos.
class PhotographerVideo extends PhotographerMedia {
  constructor(data) {
    super(data);
    this._video = data.video; // Redondance, car déjà initialisé par la classe parente.
  }

  // Getter pour obtenir le chemin complet de la vidéo.
  get video() {
    return `assets/photographers/${this._photographerId}/${this._video}`;
  }

  // Méthode pour obtenir le DOM de la vidéo, incluant le lien et les informations.
  getMediaDOM() {
    const mediaArticle = document.createElement('article');
    mediaArticle.dataset.mediaId = this._id;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', this.video)
    const videoElement = document.createElement('video');
    videoElement.src = this.video;
    videoElement.setAttribute('controls', true);
    videoElement.setAttribute('aria-label', 'vue rapprochée de l\'image');

    // Optionnel : Ajout d'un titre pour une description non-aria supplémentaire.
    videoElement.setAttribute('title', 'Video showing detailed view');

    // Ajout d'une piste de sous-titres pour l'accessibilité.
    const trackElement = document.createElement('track');
    trackElement.setAttribute('kind', 'captions');
    trackElement.setAttribute('src', ''); // Chemin vers votre fichier de sous-titres.
    trackElement.setAttribute('srclang', 'fr');
    trackElement.setAttribute('label', 'francais');
    videoElement.appendChild(trackElement);

    // Ajout d'une piste de description pour l'accessibilité.
    const descriptionTrack = document.createElement('track');
    descriptionTrack.setAttribute('kind', 'descriptions');
    descriptionTrack.setAttribute('src', '');  
    descriptionTrack.setAttribute('srclang', 'fr');
    descriptionTrack.setAttribute('label', 'Description');
    videoElement.appendChild(descriptionTrack);
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

// Initialisation de la lightbox à la fin du chargement de la page.
document.addEventListener('DOMContentLoaded', () => {
  Lightbox.init()
})

