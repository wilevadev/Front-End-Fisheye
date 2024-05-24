// Fonction principale pour créer un template de photographe
function photographerTemplate(data, disableLinks = false) {
  // Extraction des propriétés de l'objet data
  const { name, portrait, city, country, tagline, price } = data;
  // Construction du chemin de l'image du portrait
  const picture = `assets/photographers/photographers_id_photos/${portrait}`;
  // Création du lien vers la page du photographe
  const photographerLink = `photographer.html?id=${data.id}`;

  // Fonction interne pour créer et retourner l'élément DOM de la carte utilisateur
  function getUserCardDOM() {
    // Création de l'élément article
    const article = document.createElement('article');
    // Définition du rôle de l'article pour l'accessibilité
    article.setAttribute('role', 'region');
    // Association de l'article à un identifiant d'étiquette pour l'accessibilité
    article.setAttribute('aria-labelledby', `name-${data.id}`);

    // Création de l'élément figure pour contenir l'image et la légende
    const figure = document.createElement('figure');
    // Définition du rôle du groupe d'éléments pour l'accessibilité
    figure.setAttribute('role', 'group');
    // Association du groupe à des identifiants d'étiquettes pour l'accessibilité
    figure.setAttribute('aria-labelledby', `name-${data.id}`);

    // Création de l'élément img pour afficher le portrait du photographe
    const img = document.createElement('img');
    // Définition de l'attribut src de l'image
    img.setAttribute('src', picture);
    // Définition de l'attribut alt pour l'accessibilité
    img.setAttribute('alt', `${name} - Portrait de ${name}`);
    // Ajout de l'image au figure
    figure.appendChild(img);

    // Création de l'élément figcaption pour la légende
    const figcaption = document.createElement('figcaption');
    // Ajout d'une classe CSS à figcaption
    figcaption.classList.add('info');

    // Création de l'élément h2 pour le nom du photographe
    const h2 = document.createElement('h2');
    // Ajout du texte du nom, remplacement des tirets par des tirets UTF-8
    h2.textContent = name.replace(/-/g, '\u002D');
    // Définition de l'identifiant de h2 pour l'accessibilité
    h2.id = `name-${data.id}`;
    // Ajout de h2 à la légende
    figcaption.appendChild(h2);

    // Création de l'élément h3 pour la localisation du photographe
    const location = document.createElement('h3');
    // Ajout d'une classe CSS à l'élément de localisation
    location.classList.add('location');
    // Définition du contenu texte pour la localisation
    location.textContent = `${city}, ${country}`;
    // Définition de l'identifiant de localisation pour l'accessibilité
    location.id = `location-${data.id}`;
    // Ajout de la localisation à la légende
    figcaption.appendChild(location);

    // Création de l'élément p pour le slogan du photographe
    const taglineElement = document.createElement('p');
    // Ajout d'une classe CSS à l'élément de slogan
    taglineElement.classList.add('tagline');
    // Définition du contenu texte pour le slogan
    taglineElement.textContent = tagline;
    // Définition de l'identifiant de slogan pour l'accessibilité
    taglineElement.id = `tagline-${data.id}`;
    // Ajout du slogan à la légende
    figcaption.appendChild(taglineElement);

    // Création de l'élément p pour le prix du photographe
    const priceElement = document.createElement('p');
    // Ajout d'une classe CSS à l'élément de prix
    priceElement.classList.add('price');
    // Définition du contenu texte pour le prix
    priceElement.textContent = `${price}€/jour`;
    // Définition de l'identifiant de prix pour l'accessibilité
    priceElement.id = `price-${data.id}`;
    // Ajout du prix à la légende
    figcaption.appendChild(priceElement);

    // Ajout de la légende au figure
    figure.appendChild(figcaption);
    // Ajout du figure à l'article
    article.appendChild(figure);

    // Vérification si les liens sont désactivés
    if (disableLinks) {
      // Rendre chaque élément focalisable et ajouter des gestionnaires d'événements
      article.setAttribute('role', 'button');
      article.setAttribute('tabindex', '0');

      // Rendre le h2 focalisable
      h2.setAttribute('tabindex', '0');
      h2.addEventListener('click', () => {
        window.location.href = photographerLink;
      });
      h2.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = photographerLink;
        }
      });

      // Rendre l'image focalisable
      img.setAttribute('tabindex', '0');
      img.addEventListener('click', () => {
        window.location.href = photographerLink;
      });
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = photographerLink;
        }
      });

      // Rendre la localisation focalisable
      location.setAttribute('tabindex', '0');
      location.addEventListener('click', () => {
        window.location.href = photographerLink;
      });
      location.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = photographerLink;
        }
      });

      // Rendre le slogan focalisable
      taglineElement.setAttribute('tabindex', '0');
      taglineElement.addEventListener('click', () => {
        window.location.href = photographerLink;
      });
      taglineElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = photographerLink;
        }
      });

      // Rendre le prix focalisable
      priceElement.setAttribute('tabindex', '0');
      priceElement.addEventListener('click', () => {
        window.location.href = photographerLink;
      });
      priceElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = photographerLink;
        }
      });
    } else {
      // Création d'un élément a pour le lien vers le photographe
      const link = document.createElement('a');
      link.setAttribute('href', photographerLink);
      link.appendChild(img);
      figure.insertBefore(link, figcaption);

      // Création d'un élément a pour le lien du nom
      const nameLink = document.createElement('a');
      nameLink.setAttribute('href', photographerLink);
      nameLink.textContent = name.replace(/-/g, '\u002D');
      h2.innerHTML = '';
      h2.appendChild(nameLink);
    }

    // Retourner l'article complet
    return article;
  }

  // Retourner les propriétés et la fonction de création de la carte utilisateur
  return { name, picture, getUserCardDOM };
}




