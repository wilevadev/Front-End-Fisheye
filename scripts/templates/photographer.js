function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/photographers_id_photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
    
        // Utilise <figure> pour l'image et <figcaption> pour les infos
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.alt = `${name} - Portrait de ${name}`;
        figure.appendChild(img);
    
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('info');
    
        const h2 = document.createElement('h2');
        h2.textContent = name.replace(/-/g, "\u002D");
        figcaption.appendChild(h2);
    
        const location = document.createElement("p");
        location.classList.add("location");
        location.textContent = `${city}, ${country}`;
        figcaption.appendChild(location);
    
        const taglineElement = document.createElement("p");
        taglineElement.classList.add("tagline");
        taglineElement.textContent = tagline;
        figcaption.appendChild(taglineElement);
    
        const priceElement = document.createElement("p");
        priceElement.classList.add("price");
        priceElement.textContent = `${price}€/jour`;
        figcaption.appendChild(priceElement);
    
        // Ajoute figcaption à figure, puis figure à article
        figure.appendChild(figcaption);
        article.appendChild(figure);
    
        return article;
    }
    

    return { name, picture, getUserCardDOM };
}

