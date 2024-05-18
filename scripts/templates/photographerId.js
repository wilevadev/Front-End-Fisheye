function photographerTemplate(data, disableLinks = false) {
  const { name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/photographers_id_photos/${portrait}`;
  const photographerLink = `photographer.html?id=${data.id}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('role', 'region');
    article.setAttribute('aria-labelledby', `name-${data.id}`);

    const figure = document.createElement('figure');
    figure.setAttribute('role', 'group');
    figure.setAttribute('aria-labelledby', `name-${data.id} location-${data.id} tagline-${data.id} price-${data.id}`);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name} - Portrait de ${name}`);
    figure.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('info');

    const h2 = document.createElement('h2');
    h2.textContent = name.replace(/-/g, '\u002D');
    h2.id = `name-${data.id}`;
    figcaption.appendChild(h2);

    const location = document.createElement('h3');
    location.classList.add('location');
    location.textContent = `${city}, ${country}`;
    location.id = `location-${data.id}`;
    figcaption.appendChild(location);

    const taglineElement = document.createElement('p');
    taglineElement.classList.add('tagline');
    taglineElement.textContent = tagline;
    taglineElement.id = `tagline-${data.id}`;
    figcaption.appendChild(taglineElement);

    const priceElement = document.createElement('p');
    priceElement.classList.add('price');
    priceElement.textContent = `${price}€/jour`;
    priceElement.id = `price-${data.id}`;
    figcaption.appendChild(priceElement);

    figure.appendChild(figcaption);
    article.appendChild(figure);

    if (disableLinks) {
      article.setAttribute('role', 'button');
      article.setAttribute('tabindex', '0');
      article.addEventListener('click', () => {
        window.location.href = photographerLink;
      });
      article.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = photographerLink;
        }
      });
    } else {
      const link = document.createElement('a');
      link.setAttribute('href', photographerLink);
      link.setAttribute('aria-label', `Aller à la page de ${name}`);
      link.appendChild(img);
      figure.insertBefore(link, figcaption);

      const nameLink = document.createElement('a');
      nameLink.setAttribute('href', photographerLink);
      nameLink.textContent = name.replace(/-/g, '\u002D');
      nameLink.setAttribute('aria-label', `Aller à la page de ${name}`);
      h2.innerHTML = '';
      h2.appendChild(nameLink);
    }

    return article;
  }

  return { name, picture, getUserCardDOM };
}



