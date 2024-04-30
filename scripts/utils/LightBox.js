class Lightbox {
  // Initialiser la lightbox en attachant des écouteurs d'événements aux liens appropriés.
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
    this.focusFirstElement(); // Focus sur le premier élément interactif dès l'ouverture de la lightbox.
  }
  focusTrap() {
    const focusableElements = this.element.querySelectorAll('button'); // Sélectionner tous les boutons focusables.
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Ajouter un écouteur d'événements pour s'assurer que le focus reste à l'intérieur de la lightbox.
    lastFocusableElement.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        firstFocusableElement.focus(); // Envoyer le focus au premier élément si l'utilisateur tente de sortir de la lightbox.
      }
    });

    firstFocusableElement.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        lastFocusableElement.focus(); // Envoyer le focus au dernier élément si l'utilisateur tente de revenir en arrière au premier élément.
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
    if (url.match(/\.(jpeg|jpg|png)$/i)) {
      element = new Image();
      element.src = url;
    } else if (url.match(/\.mp4$/i)) {
      element = document.createElement('video');
      element.src = url;
      element.setAttribute('controls', 'controls');
    }
    return element;
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
      this.returnFocus(); // Rendre le focus à l'élément qui l'avait avant l'ouverture de la lightbox.
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

  focusFirstElement() {
    // Mettre le focus sur le premier bouton de fermeture lors de l'ouverture de la lightbox.
    this.element.querySelector('.lightbox-close').focus();
  }

  returnFocus() {
    if (this.initialFocus && typeof this.initialFocus.focus === 'function') {
      this.initialFocus.focus();
    }
   
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Lightbox.init()
});


