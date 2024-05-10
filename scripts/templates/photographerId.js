// Définition de la fonction qui génère un modèle de carte pour un photographe à partir des données fournies.
function photographerTemplate(data) {
  // Destructuration de l'objet data pour extraire les propriétés nécessaires.
  const { name, portrait, city, country, tagline, price } = data;
  // Construction du chemin vers l'image de portrait du photographe.
  const picture = `assets/photographers/photographers_id_photos/${portrait}`;

  // Fonction interne qui crée le DOM pour la carte de photographe.
  function getUserCardDOM() {
    // Création d'un élément 'article' pour la carte.
    const article = document.createElement('article');
    // Création d'un élément 'figure' pour grouper l'image et la légende.
    const figure = document.createElement('figure');
    // Création de l'élément 'img' pour l'image du photographe.
    const img = document.createElement('img');
    // Attribution des attributs à l'image.
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name} - Portrait de ${name}, cliquez pour voir ses photographies`);
    img.setAttribute('tabindex', '0'); // Rend l'image focusable avec le clavier.
    figure.appendChild(img);

    // Création de l'élément 'figcaption' pour les informations du photographe.
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('info');

    // Création et configuration de l'élément 'h2' pour le nom du photographe.
    const h2 = document.createElement('h2');
    h2.textContent = name.replace(/-/g, '\u002D');
    h2.setAttribute('tabindex', '0'); // Permet la navigation au clavier.
    figcaption.appendChild(h2);

    // Création et configuration de l'élément 'h3' pour la localisation.
    const location = document.createElement('h3');
    location.classList.add('location');
    location.textContent = `${city}, ${country}`;
    location.setAttribute('tabindex', '0')
    figcaption.appendChild(location);

    // Création de l'élément 'p' pour la tagline du photographe.
    const taglineElement = document.createElement('p');
    taglineElement.classList.add('tagline');
    taglineElement.textContent = tagline;
    taglineElement.setAttribute('tabindex', '0')    
   
    figcaption.appendChild(taglineElement);

    // Création de l'élément 'p' pour afficher le tarif journalier.
    const priceElement = document.createElement('p');
    priceElement.classList.add('price');
    priceElement.textContent = `${price}€/jour`;
    figcaption.appendChild(priceElement);

    // Ajout de la légende à la figure et de la figure à l'article.
    figure.appendChild(figcaption);
    article.appendChild(figure);

    // Retourne l'élément 'article' créé, contenant toute la structure de la carte.
    return article;
  }

  // Retourne un objet contenant le nom, l'image, et la fonction pour obtenir le DOM de la carte.
  return { name, picture, getUserCardDOM };
}
