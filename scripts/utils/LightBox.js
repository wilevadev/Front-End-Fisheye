// Déclaration de la classe Lightbox
class Lightbox {
  // Méthode statique pour initialiser la Lightbox
  static init () {
    // Sélection de tous les liens avec des extensions spécifiques (images et vidéos)
    const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".JPEG"], a[href$=".JPG"], a[href$=".PNG"], a[href$=".mp4"], a[href$=".MP4"]'))

    // Création d'une galerie avec les chemins des médias
    const gallery = links.map(link => link.getAttribute('href'))

    // Ajout d'un écouteur d'événements à chaque lien pour ouvrir la Lightbox
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault() // Empêcher le comportement par défaut du lien
        new Lightbox(e.currentTarget.getAttribute('href'), gallery) // Créer une nouvelle instance de Lightbox
      })
    })
  }

  // Constructeur de la classe
  constructor (url, gallery) {
    this.url = url // URL du média à afficher
    this.gallery = gallery // Galerie de médias

    this.element = this.buildDOM() // Construction du DOM de la Lightbox
    this.loadItem(url) // Chargement de l'élément initial
    this.onKeyUp = this.onKeyUp.bind(this) // Liaison de la méthode onKeyUp au contexte actuel
    document.body.appendChild(this.element) // Ajout de la Lightbox au DOM
    document.addEventListener('keyup', this.onKeyUp) // Ajout d'un écouteur d'événements pour les touches du clavier
    this.focusFirstElement() // Mise au point sur le premier élément de la Lightbox
  }

  // Méthode pour gérer le piège de mise au point
  focusTrap () {
    const focusableElements = this.element.querySelectorAll('button')
    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements[focusableElements.length - 1]
    lastFocusableElement.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault() // Empêcher la mise au point en dehors de la Lightbox
        firstFocusableElement.focus() // Remettre la mise au point sur le premier élément
      }
    })
    firstFocusableElement.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault() // Empêcher la mise au point en dehors de la Lightbox
        lastFocusableElement.focus() // Remettre la mise au point sur le dernier élément
      }
    })
  }

  // Méthode pour charger un élément média
  loadItem (url) {
    const container = this.element.querySelector('.lightbox-container')
    container.innerHTML = '' // Vider le contenu précédent
    const mediaElement = this.createMediaElement(url) // Créer l'élément média
    container.appendChild(mediaElement) // Ajouter l'élément média au conteneur
    if (mediaElement.nodeName === 'VIDEO') {
      mediaElement.play() // Jouer la vidéo si l'élément est une vidéo
    }
  }

  // Méthode pour créer un élément média
  createMediaElement (url) {
    let element
    const configImg = document.createElement('div')
    configImg.className = 'image-container'
    const caption = document.createElement('div')
    caption.className = 'lightbox-caption'

    const mediaLink = document.querySelector(`a[href="${url}"], [src="${url}"]`)
    const accessibleLabel = mediaLink ? mediaLink.getAttribute('aria-label') : ''

    // Vérification du type de média et création de l'élément approprié
    if (url.match(/\.(jpeg|jpg|png)$/i)) {
      element = new Image()
      element.src = url
      if (accessibleLabel) {
        caption.textContent = accessibleLabel
      }
    } else if (url.match(/\.mp4$/i)) {
      element = document.createElement('video')
      element.src = url
      element.setAttribute('controls', 'controls')
      if (accessibleLabel) {
        caption.textContent = accessibleLabel
      }
    }

    const container = document.createElement('div')
    configImg.appendChild(element)
    configImg.appendChild(caption)
    container.appendChild(configImg)
    return container
  }

  // Méthode pour gérer les événements clavier
  onKeyUp (e) {
    switch (e.key) {
      case 'Escape':
        this.close() // Fermer la Lightbox si la touche "Échap" est pressée
        break
      case 'ArrowLeft':
        this.prev() // Afficher l'élément précédent si la touche "Flèche gauche" est pressée
        break
      case 'ArrowRight':
        this.next() // Afficher l'élément suivant si la touche "Flèche droite" est pressée
        break
    }
  }

  // Méthode pour fermer la Lightbox
  close () {
    this.element.classList.add('fadeOut') // Ajouter une classe pour l'animation de fermeture
    setTimeout(() => {
      this.element.remove() // Supprimer l'élément du DOM après l'animation
      this.returnFocus() // Rendre la mise au point à l'élément initial
    }, 500) // Délai de 500ms
    document.removeEventListener('keyup', this.onKeyUp) // Supprimer l'écouteur d'événements pour les touches du clavier
  }

  // Méthode pour afficher l'élément suivant de la galerie
  next () {
    let i = this.gallery.findIndex(galleryItem => galleryItem === this.url)
    i = (i + 1) % this.gallery.length
    this.url = this.gallery[i]
    this.loadItem(this.url)
  }

  // Méthode pour afficher l'élément précédent de la galerie
  prev () {
    let i = this.gallery.findIndex(galleryItem => galleryItem === this.url)
    i = (i - 1 + this.gallery.length) % this.gallery.length
    this.url = this.gallery[i]
    this.loadItem(this.url)
  }

  // Méthode pour construire le DOM de la Lightbox
  buildDOM () {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.setAttribute('role', 'dialog')
    dom.setAttribute('aria-modal', 'true')
    dom.innerHTML = `
        <button class="lightbox-close" aria-label="Fermer la lightbox" tabindex="0">Fermer</button>
        <button class="lightbox-next" aria-label="Image suivante" tabindex="0">Suivant</button>
        <button class="lightbox-prev" aria-label="Image précédente" tabindex="0">Précédent</button>
        <div class="lightbox-container" aria-live="polite"></div>`
    dom.querySelector('.lightbox-close').addEventListener('click', () => this.close())
    dom.querySelector('.lightbox-next').addEventListener('click', () => this.next())
    dom.querySelector('.lightbox-prev').addEventListener('click', () => this.prev())
    return dom
  }

  // Méthode pour mettre au point sur le premier élément de la Lightbox
  focusFirstElement () {
    this.element.querySelector('.lightbox-close').focus()
  }

  // Méthode pour rendre la mise au point à l'élément initial
  returnFocus () {
    if (this.initialFocus && typeof this.initialFocus.focus === 'function') {
      this.initialFocus.focus()
    }
  }
}

// Tableau global pour stocker les chemins de tous les médias
const allMediaPaths = []

// Fonction pour initialiser les écouteurs d'événements pour la Lightbox
function initializeLightboxListeners () {
  document.querySelectorAll('.lightbox-open').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault() // Empêcher le comportement par défaut du lien
      const mediaPath = link.getAttribute('href')
      new Lightbox(mediaPath, allMediaPaths) // Créer une nouvelle instance de Lightbox
    })
  })
}
