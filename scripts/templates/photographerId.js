// Fonction principale pour créer un template de photographe
function photographerTemplate (data, disableLinks = false) {
  // Extraction des propriétés de l'objet data
  const { name, portrait, city, country, tagline, price } = data
  // Construction du chemin de l'image du portrait
  const picture = `assets/photographers/photographers_id_photos/${portrait}`
  // Création du lien vers la page du photographe
  const photographerLink = `photographer.html?id=${data.id}`

  // Fonction interne pour créer et retourner l'élément DOM de la carte utilisateur
  function getUserCardDOM () {
    // Création de l'élément article
    const article = document.createElement('article')
    // Définition du rôle de l'article pour l'accessibilité
    article.setAttribute('role', 'region')
    // Association de l'article à un identifiant d'étiquette
    article.setAttribute('aria-labelledby', `name-${data.id}`)

    // Création de l'élément figure pour contenir l'image et la légende
    const figure = document.createElement('figure')
    // Définition du rôle du groupe d'éléments pour l'accessibilité
    figure.setAttribute('role', 'group')
    // Association du groupe à des identifiants d'étiquettes
    figure.setAttribute('aria-labelledby', `name-${data.id} location-${data.id} tagline-${data.id} price-${data.id}`)

    // Création de l'élément img pour afficher le portrait du photographe
    const img = document.createElement('img')
    // Définition de l'attribut src de l'image
    img.setAttribute('src', picture)
    // Définition de l'attribut alt pour l'accessibilité
    img.setAttribute('alt', `${name} - Portrait de ${name}`)
    // Ajout de l'image au figure
    figure.appendChild(img)

    // Création de l'élément figcaption pour la légende
    const figcaption = document.createElement('figcaption')
    // Ajout d'une classe CSS à figcaption
    figcaption.classList.add('info')

    // Création de l'élément h2 pour le nom du photographe
    const h2 = document.createElement('h2')
    // Ajout du texte du nom, remplacement des tirets par des tirets UTF-8
    h2.textContent = name.replace(/-/g, '\u002D')
    // Définition de l'identifiant de h2
    h2.id = `name-${data.id}`
    // Ajout de h2 à la légende
    figcaption.appendChild(h2)

    // Création de l'élément h3 pour la localisation du photographe
    const location = document.createElement('h3')
    // Ajout d'une classe CSS à l'élément de localisation
    location.classList.add('location')
    // Définition du contenu texte pour la localisation
    location.textContent = `${city}, ${country}`
    // Définition de l'identifiant de localisation
    location.id = `location-${data.id}`
    // Ajout de la localisation à la légende
    figcaption.appendChild(location)

    // Création de l'élément p pour le slogan du photographe
    const taglineElement = document.createElement('p')
    // Ajout d'une classe CSS à l'élément de slogan
    taglineElement.classList.add('tagline')
    // Définition du contenu texte pour le slogan
    taglineElement.textContent = tagline
    // Définition de l'identifiant de slogan
    taglineElement.id = `tagline-${data.id}`
    // Ajout du slogan à la légende
    figcaption.appendChild(taglineElement)

    // Création de l'élément p pour le prix du photographe
    const priceElement = document.createElement('p')
    // Ajout d'une classe CSS à l'élément de prix
    priceElement.classList.add('price')
    // Définition du contenu texte pour le prix
    priceElement.textContent = `${price}€/jour`
    // Définition de l'identifiant de prix
    priceElement.id = `price-${data.id}`
    // Ajout du prix à la légende
    figcaption.appendChild(priceElement)

    // Ajout de la légende au figure
    figure.appendChild(figcaption)
    // Ajout du figure à l'article
    article.appendChild(figure)

    // Vérification si les liens sont désactivés
    if (disableLinks) {
      // Définition du rôle de l'article comme bouton pour l'accessibilité
      article.setAttribute('role', 'button')
      // Rendre l'article focalisable via le clavier
      article.setAttribute('tabindex', '0')
      // Ajout d'un écouteur d'événement pour rediriger sur un clic
      article.addEventListener('click', () => {
        window.location.href = photographerLink
      })
      // Ajout d'un écouteur d'événement pour rediriger sur une pression de touche
      article.addEventListener('keydown', (event) => {
        // Rediriger si la touche 'Entrée' ou 'Espace' est pressée
        if (event.key === 'Enter' || event.key === ' ') {
          window.location.href = photographerLink
        }
      })
    } else {
      // Création d'un élément a pour le lien vers le photographe
      const link = document.createElement('a')
      // Définition de l'attribut href pour le lien
      link.setAttribute('href', photographerLink)
      // Définition de l'attribut aria-label pour l'accessibilité
      link.setAttribute('aria-label', `Aller à la page de ${name}`)
      // Ajout de l'image au lien
      link.appendChild(img)
      // Insérer le lien avant la légende dans figure
      figure.insertBefore(link, figcaption)

      // Création d'un élément a pour le lien du nom
      const nameLink = document.createElement('a')
      // Définition de l'attribut href pour le lien du nom
      nameLink.setAttribute('href', photographerLink)
      // Définition du contenu texte pour le lien du nom
      nameLink.textContent = name.replace(/-/g, '\u002D')
      // Définition de l'attribut aria-label pour l'accessibilité
      nameLink.setAttribute('aria-label', `Aller à la page de ${name}`)
      // Vider le contenu de h2 et y ajouter le lien du nom
      h2.innerHTML = ''
      h2.appendChild(nameLink)
    }

    // Retourner l'article complet
    return article
  }

  // Retourner les propriétés et la fonction de création de la carte utilisateur
  return { name, picture, getUserCardDOM }
}
