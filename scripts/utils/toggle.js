// Fonction pour créer un menu déroulant pour trier les médias
function createToggle (medias) {
  // Création du conteneur principal
  const container = document.createElement('div')
  container.className = 'container'

  // Création de l'élément d'information
  const infoDiv = document.createElement('div')
  infoDiv.className = 'info'
  infoDiv.textContent = 'Trier par'
  container.appendChild(infoDiv)

  // Création de l'élément details pour le menu déroulant
  const details = document.createElement('details')
  details.className = 'dropDown'
  container.appendChild(details)

  // Création de l'élément summary pour le bouton du menu déroulant
  const summary = document.createElement('summary')
  summary.setAttribute('role', 'button')
  summary.setAttribute('aria-expanded', 'false')
  summary.setAttribute('tabindex', '0')
  summary.setAttribute('aria-haspopup', 'listbox')

  // Création de l'élément span pour afficher la valeur sélectionnée
  const span = document.createElement('span')
  span.className = 'value'
  span.textContent = 'Popularité'
  summary.appendChild(span)
  details.appendChild(summary)

  // Création de l'icône de chevron
  const icon = document.createElement('i')
  icon.className = 'fa-solid fa-chevron-down'
  summary.appendChild(icon)

  // Création du conteneur des options
  const optionsDiv = document.createElement('div')
  optionsDiv.className = 'options'
  optionsDiv.setAttribute('role', 'listbox')
  optionsDiv.setAttribute('aria-activedescendant', 'option-popularite')

  // Ajout des options de tri
  const options = ['Popularité', 'Date', 'Titre']
  options.forEach((option) => {
    const div = document.createElement('div')
    div.textContent = option
    div.setAttribute('role', 'option')
    div.setAttribute('tabindex', '0')
    div.setAttribute('id', `option-${option.toLowerCase()}`)
    if (option === 'Popularité') {
      div.setAttribute('aria-selected', 'true')
    }
    div.addEventListener('click', () => {
      // Mettre à jour le texte du span avec l'option sélectionnée
      span.textContent = option
      options.forEach(opt => {
        const elem = document.getElementById(`option-${opt.toLowerCase()}`)
        elem.setAttribute('aria-selected', opt === option ? 'true' : 'false')
      })
      details.open = false
      summary.setAttribute('aria-expanded', 'false')
      sortMedias(option, medias)
    })
    div.addEventListener('keypress', (e) => {
      // Gérer la sélection avec les touches 'Enter' et 'Espace'
      if (e.key === 'Enter' || e.key === ' ') {
        div.click()
      }
    })
    optionsDiv.appendChild(div)
  })
  details.appendChild(optionsDiv)

  // Ajout d'un écouteur d'événements pour gérer l'expansion du menu
  summary.addEventListener('click', () => {
    const expanded = summary.getAttribute('aria-expanded') === 'true'
    summary.setAttribute('aria-expanded', String(!expanded))
  })

  // Fonction pour trier les médias selon le critère sélectionné
  function sortMedias (criteria, medias) {
    const sortedMedias = [...medias]
    switch (criteria) {
      case 'Popularité':
        sortedMedias.sort((a, b) => b.likes - a.likes)
        break
      case 'Date':
        sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'Titre':
        sortedMedias.sort((a, b) => a.title.localeCompare(b.title))
        break
    }
    updateMediaDisplay(sortedMedias)
  }

  // Fonction pour mettre à jour l'affichage des médias
  function updateMediaDisplay (sortedMedias) {
    const mediaContainer = document.querySelector('.media-container')
    const existingMediaDOMs = Array.from(mediaContainer.children)
    const sortedMediaDOMs = sortedMedias.map(mediaData => {
      // Trouver l'élément DOM existant ou créer un nouveau
      const existingDOM = existingMediaDOMs.find(dom => dom.dataset.mediaId == mediaData.id)
      return existingDOM || PhotographerMedia.createMedia(mediaData).getMediaDOM()
    })

    // Vider le conteneur et ajouter les éléments triés
    mediaContainer.innerHTML = ''
    sortedMediaDOMs.forEach(dom => mediaContainer.appendChild(dom))
  }

  // Retourner le conteneur principal
  return { getToggleDOM: () => container }
}
