function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/photographers_id_photos/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.alt = `${name} - Portrait de ${name}`
        article.appendChild(img);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(h2);

        const location = document.createElement("p");
        location.classList.add("location");
        location.innerText = `${data.city}, ${data.country}`;
        article.appendChild(location);

        const tagline = document.createElement("p");
        tagline.classList.add("tagline");
        tagline.innerText = data.tagline;
        article.appendChild(tagline);

        const price = document.createElement("p");
        price.classList.add("price");
        price.innerText = ` ${data.price}€/jour`;
        article.appendChild(price);

        return article;
    }
    return { name, picture, getUserCardDOM };
}