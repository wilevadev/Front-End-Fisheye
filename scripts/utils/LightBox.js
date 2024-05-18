class Lightbox {
  static init () {
    const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".JPEG"], a[href$=".JPG"], a[href$=".PNG"], a[href$=".mp4"], a[href$=".MP4"]'));

    const gallery = links.map(link => link.getAttribute('href'));

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute('href'), gallery);
      });
    });
  }

  constructor (url, gallery) {
    this.url = url;
    this.gallery = gallery;

    this.element = this.buildDOM();
    this.loadItem(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener('keyup', this.onKeyUp);
    this.focusFirstElement();
  }

  focusTrap () {
    const focusableElements = this.element.querySelectorAll('button');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    lastFocusableElement.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    });
    firstFocusableElement.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    });
  }

  loadItem (url) {
    const container = this.element.querySelector('.lightbox-container');
    container.innerHTML = '';
    const mediaElement = this.createMediaElement(url);
    container.appendChild(mediaElement);
    if (mediaElement.nodeName === 'VIDEO') {
      mediaElement.play();
    }
  }

  createMediaElement (url) {
    let element;
    const configImg = document.createElement('div');
    configImg.className = 'image-container';
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';

    const mediaLink = document.querySelector(`a[href="${url}"], [src="${url}"]`);
    const accessibleLabel = mediaLink ? mediaLink.getAttribute('aria-label') : '';

    if (url.match(/\.(jpeg|jpg|png)$/i)) {
      element = new Image();
      element.src = url;
      if (accessibleLabel) {
        caption.textContent = accessibleLabel;
      }
    } else if (url.match(/\.mp4$/i)) {
      element = document.createElement('video');
      element.src = url;
      element.setAttribute('controls', 'controls');
      if (accessibleLabel) {
        caption.textContent = accessibleLabel;
      }
    }

    const container = document.createElement('div');
    configImg.appendChild(element);
    configImg.appendChild(caption);
    container.appendChild(configImg);
    return container;
  }

  onKeyUp (e) {
    switch (e.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }

  close () {
    this.element.classList.add('fadeOut');
    setTimeout(() => {
      this.element.remove();
      this.returnFocus();
    }, 500);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  next () {
    let i = this.gallery.findIndex(galleryItem => galleryItem === this.url);
    i = (i + 1) % this.gallery.length;
    this.url = this.gallery[i];
    this.loadItem(this.url);
  }

  prev () {
    let i = this.gallery.findIndex(galleryItem => galleryItem === this.url);
    i = (i - 1 + this.gallery.length) % this.gallery.length;
    this.url = this.gallery[i];
    this.loadItem(this.url);
  }

  buildDOM () {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    dom.setAttribute('role', 'dialog');
    dom.setAttribute('aria-modal', 'true');
    dom.innerHTML = `
        <button class="lightbox-close" aria-label="Fermer la lightbox" tabindex="0">Fermer</button>
        <button class="lightbox-next" aria-label="Image suivante" tabindex="0">Suivant</button>
        <button class="lightbox-prev" aria-label="Image précédente" tabindex="0">Précédent</button>
        <div class="lightbox-container" aria-live="polite"></div>`;
    dom.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    dom.querySelector('.lightbox-next').addEventListener('click', () => this.next());
    dom.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    return dom;
  }

  focusFirstElement () {
    this.element.querySelector('.lightbox-close').focus();
  }

  returnFocus () {
    if (this.initialFocus && typeof this.initialFocus.focus === 'function') {
      this.initialFocus.focus();
    }
  }
}

const allMediaPaths = [];

function initializeLightboxListeners () {
  document.querySelectorAll('.lightbox-open').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const mediaPath = link.getAttribute('href');
      new Lightbox(mediaPath, allMediaPaths);
    });
  });
}

// Explication des termes traduits :
// Class Lightbox : Classe Lightbox
// Static method : Méthode statique
// Initialize : Initialiser
// Event listeners : Écouteurs d'événements
// Links : Liens
// Gallery : Galerie
// Constructor : Constructeur
// Properties : Propriétés
// Display : Afficher
// Focus : Focus
// Focusable elements : Éléments focusables
// First focusable element : Premier élément focusable
// Last focusable element : Dernier élément focusable
// Load item : Charger un élément
// Create media element : Créer un élément média
// Keyboard navigation : Navigation au clavier
// Close : Fermer
// Next : Suivant
// Previous : Précédent
// Build DOM : Construire le DOM
// Focus trap : Piège de focus
// Accessible label : Étiquette accessible
// Cette traduction et explication détaillée devraient vous aider à mieux comprendre chaque partie de votre code JavaScript pour la classe Lightbox.
 


