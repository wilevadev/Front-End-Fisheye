// Déclaration de la classe PhotographerMedia
class PhotographerMedia {
  // Propriété statique pour stocker le total des likes
  static totalLikes = 0

  // Constructeur de la classe pour initialiser les propriétés
  constructor (data) {
    this._id = data.id
    this._photographerId = data.photographerId
    this._title = data.title
    this._likes = data.likes
    this._date = data.date
    this._price = data.price
    this._name = data.name
    this._image = data.image
    this._video = data.video
    // Propriété pour indiquer si l'élément est aimé
    this.isLiked = false
    // Ajouter les likes de cet élément au total des likes
    PhotographerMedia.totalLikes += this._likes
  }

  // Méthode pour créer l'élément de titre
  createTitleElement () {
    const titleElement = document.createElement('h3')
    titleElement.textContent = this._title
    titleElement.classList.add('media-title')
    return titleElement
  }

  createLikesElement () {
    const likesContainer = document.createElement('button')
    const likesCount = document.createElement('span')
    const likeIcon = document.createElement('img')

    // Ajout de classes CSS
    likesContainer.classList.add('media-likes')
    likesCount.textContent = this._likes
    likesCount.classList.add('likes-count')

    // Définir les attributs de l'icône
    likeIcon.setAttribute('src', this.isLiked ? 'assets/icons/heart.svg' : 'assets/icons/heartWhite.svg')
    likeIcon.setAttribute('alt', 'un coeur pour aimer la photo')
    likeIcon.setAttribute('role', 'img')
    likeIcon.setAttribute('aria-label', `cliquez sur le coeur si vous aimez ${this._title}`)
    likeIcon.setAttribute('tabindex', 0)
    likeIcon.classList.add('like-icon-svg')

    // Définir les attributs du conteneur de likes
    likesContainer.setAttribute('role', 'button')
    likesContainer.setAttribute('aria-label', this.isLiked ? 'Unlike' : `l'oeuvre de a reçu ${this._likes} likes`)
    likesContainer.setAttribute('tabindex', 0)

    // Ajout des éléments enfants
    likesContainer.appendChild(likesCount)
    likesContainer.appendChild(likeIcon)

    // Ajouter un écouteur d'événements pour gérer les clics
    likesContainer.addEventListener('click', () => {
      const likeChange = this.isLiked ? -1 : 1
      this.isLiked = !this.isLiked
      this._likes += likeChange
      PhotographerMedia.totalLikes += likeChange
      likesCount.textContent = this._likes

      // Mettre à jour l'icône et l'attribut aria-label
      likeIcon.setAttribute('src', this.isLiked ? 'assets/icons/heart.svg' : 'assets/icons/heartWhite.svg')
      likesContainer.setAttribute('aria-label', this.isLiked ? `vous aimez l'œuvre ${this._title}` : `vous n'aimez pas l'œuvre ${this._title}`)

      // Mettre à jour le total des likes affiché
      const totalLikesText = document.querySelector('.total-likes-text')
      if (totalLikesText) {
        totalLikesText.textContent = PhotographerMedia.totalLikes
      } else {
        console.error("L'élément pour afficher le total des likes n'existe pas.")
      }
    })

    return likesContainer
  }

  // Méthode pour obtenir l'élément DOM du média (doit être implémentée par les sous-classes)
  getMediaDOM () {
    throw new Error('This method is supposed to be implemented by subclasses')
  }

  // Méthode statique pour créer un média basé sur le type (image ou vidéo)
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

// Déclaration de la sous-classe PhotographerImage qui hérite de PhotographerMedia
class PhotographerImage extends PhotographerMedia {
  // Getter pour obtenir le chemin de l'image
  get image () {
    return `assets/photographers/${this._photographerId}/${this._image}`
  }

  // Méthode pour obtenir l'élément DOM du média image
  getMediaDOM () {
    const mediaArticle = document.createElement('article')
    mediaArticle.dataset.mediaId = this._id

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', this.image)
    linkElement.setAttribute('aria-label', this._title)

    const imageElement = document.createElement('img')
    imageElement.src = this.image
    imageElement.alt = `l'image montre ${this._title}`

    // Ajouter l'image dans le lien et le lien dans l'article
    linkElement.appendChild(imageElement)
    mediaArticle.appendChild(linkElement)

    // Création et ajout des éléments d'information
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('media-info')
    infoContainer.appendChild(this.createTitleElement())
    infoContainer.appendChild(this.createLikesElement())

    mediaArticle.appendChild(infoContainer)
    linkElement.classList.add('lightbox-open')

    return mediaArticle
  }
}

// Déclaration de la sous-classe PhotographerVideo qui hérite de PhotographerMedia
class PhotographerVideo extends PhotographerMedia {
  // Getter pour obtenir le chemin de la vidéo
  get video () {
    return `assets/photographers/${this._photographerId}/${this._video}`
  }

  // Méthode pour obtenir l'élément DOM du média vidéo
  getMediaDOM () {
    const mediaArticle = document.createElement('article')
    mediaArticle.dataset.mediaId = this._id

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', this.video)
    linkElement.setAttribute('aria-label', this._title)
    linkElement.classList.add('lightbox-open')

    const videoElement = document.createElement('video')
    videoElement.src = this.video
    videoElement.setAttribute('controls', true)
    videoElement.setAttribute('aria-label', `la vidéo montre : ${this._title}`)

    // Création et ajout de l'élément track pour les sous-titres
    const trackElement = document.createElement('track')
    trackElement.setAttribute('kind', 'captions')
    trackElement.setAttribute('src', '')
    trackElement.setAttribute('srclang', 'fr')
    trackElement.setAttribute('label', 'Français - Sous-titres en préparation')
    videoElement.appendChild(trackElement)

    // Ajouter la vidéo dans le lien et le lien dans l'article
    linkElement.appendChild(videoElement)
    mediaArticle.appendChild(linkElement)

    // Création et ajout des éléments d'information
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('media-info')
    infoContainer.appendChild(this.createTitleElement())
    infoContainer.appendChild(this.createLikesElement())

    mediaArticle.appendChild(infoContainer)

    return mediaArticle
  }
}

// Ajout d'un écouteur d'événements pour initialiser la Lightbox au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  Lightbox.init()
})
