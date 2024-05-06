// Définition de la fonction `photographerTemplate` qui prend en paramètre un objet `data` contenant les informations d'un photographe.
function photographerTemplate(data) {
  // Déstructuration de l'objet `data` pour extraire directement les propriétés nécessaires.
  const { name, portrait, city, country, tagline, price } = data;
  // Construction du chemin vers l'image de portrait du photographe.
  const picture = `assets/photographers/photographers_id_photos/${portrait}`;

  // Fonction interne `getUserCardDOM` pour créer le DOM de la carte du photographe.
  function getUserCardDOM() {
    // Création d'un élément 'article', qui servira de conteneur principal pour la carte.
    const article = document.createElement('article');
    // Création d'un élément 'figure', utilisé pour grouper des médias avec leur légende.
    const figure = document.createElement('figure');
    // Création d'un élément 'img' pour l'image du photographe.
    const img = document.createElement('img');
    // Définition des attributs de l'élément 'img' pour la source, l'alternative textuelle, et la tabulation.
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name} - Portrait de ${name}, cliquez pour voir ses photographies`);
    img.setAttribute('tabindex', '0'); // Rendre l'image focusable avec le clavier.
    // Ajout de l'image à l'élément 'figure'.
    figure.appendChild(img);

    // Création d'un élément 'figcaption' pour contenir les informations du photographe.
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('info');

    // Création et configuration d'un élément 'h2' pour le nom du photographe.
    const h2 = document.createElement('h2');
    h2.textContent = name.replace(/-/g, '\u002D');
    h2.setAttribute('tabindex', '0'); // Rendre le titre h2 focusable.
    figcaption.appendChild(h2);

    // Création et ajout d'un élément 'h3' pour la localisation du photographe.
    const location = document.createElement('h3');
    location.classList.add('location');
    location.textContent = `${city}, ${country}`;
    figcaption.appendChild(location);

    // Création et ajout d'un paragraphe pour la devise ou slogan du photographe.
    const taglineElement = document.createElement('p');
    taglineElement.classList.add('tagline');
    taglineElement.textContent = tagline;
    figcaption.appendChild(taglineElement);

    // Création et ajout d'un paragraphe pour le prix journalier du photographe.
    const priceElement = document.createElement('p');
    priceElement.classList.add('price');
    priceElement.textContent = `${price}€/jour`;
    figcaption.appendChild(priceElement);

    // Ajout de la légende à la figure.
    figure.appendChild(figcaption);
    // Ajout de la figure à l'article.
    article.appendChild(figure);

    // La fonction retourne l'élément 'article' créé, contenant toute la structure de la carte du photographe.
    return article;
  }

  // Retour de l'objet contenant le nom, l'image, et la fonction pour obtenir le DOM de la carte du photographe.
  return { name, picture, getUserCardDOM };
}

