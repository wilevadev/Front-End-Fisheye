// class LightBoxModel {
//     constructor(medias) {
//         this.medias = medias;
//         this.currentIndex = 0;
//         this.lightBoxElement = this.createLightBoxElement();
//         this.mediaContainer = null; 
//     }

//     createLightBoxElement() {
//         const lightBoxElement = document.createElement('div');
//         lightBoxElement.className = 'lightbox';
//         lightBoxElement.setAttribute('aria-hidden', 'true');
//         lightBoxElement.style.display = 'none';

//         const content = document.createElement('div');
//         content.className = 'lightbox-content';
//         content.setAttribute('tabindex', '0'); 

//         this.mediaContainer = content; 

//         const closeButton = document.createElement('button');
//         closeButton.className = 'lightbox-close';
//         closeButton.setAttribute('aria-label', 'Close');
//         closeButton.textContent = '×';
//         closeButton.onclick = () => this.closeLightbox();

//         content.appendChild(closeButton);
//         lightBoxElement.appendChild(content);

      

//         this.setupKeyboardNavigation();

//         return lightBoxElement;
//     }

//     display() {
//         document.body.appendChild(this.lightBoxElement);
//         this.lightBoxElement.style.display = 'block';
//         this.lightBoxElement.setAttribute('aria-hidden', 'false');
//         this.mediaContainer.focus(); 
//         this.updateMediaContent();
//     }

//     updateMediaContent() {
//         const media = this.medias[this.currentIndex];
//         this.mediaContainer.innerHTML = ''; 

//         let mediaElement;
//         if (media.image) {
//             mediaElement = document.createElement('img');
//             mediaElement.src = `assets/photographers/${media.photographerId}/${media.image}`;
//             mediaElement.alt = media.title;
//         } else if (media.video) {
//             mediaElement = document.createElement('video');
//             mediaElement.src = `assets/photographers/${media.photographerId}/${media.video}`;
//             mediaElement.controls = true;
//             mediaElement.setAttribute('title', media.title);
//         }

//         if (mediaElement) {
//             this.mediaContainer.appendChild(mediaElement);
//         }
//     }

//     closeLightbox() {
//         this.lightBoxElement.style.display = 'none';
//         this.lightBoxElement.setAttribute('aria-hidden', 'true');
//         document.body.removeChild(this.lightBoxElement); 
       
//     }

//     setupKeyboardNavigation() {
//         this.lightBoxElement.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape') {
//                 this.closeLightbox();
//             } else if (e.key === 'ArrowRight') {
//                 this.currentIndex = (this.currentIndex + 1) % this.medias.length;
//                 this.updateMediaContent();
//             } else if (e.key === 'ArrowLeft') {
//                 this.currentIndex = (this.currentIndex - 1 + this.medias.length) % this.medias.length;
//                 this.updateMediaContent();
//             }
//         });
//     }
// }







