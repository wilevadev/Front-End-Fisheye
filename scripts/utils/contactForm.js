// Fonction pour afficher la modal de contact
function displayModal () {
  // Sélection de l'élément modal par son ID
  const modal = document.getElementById('contact_modal')
  // Affichage de la modal en modifiant le style
  modal.style.display = 'block'
  // Définition des attributs ARIA pour l'accessibilité
  modal.setAttribute('aria-modal', 'true')
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-labelledby', 'contact_modal_label')

  // Mise au point sur le premier élément interactif de la modal après un léger délai
  setTimeout(() => {
    // Sélection du premier input, textarea ou bouton dans la modal
    const firstInput = modal.querySelector('input, textarea, button')
    if (firstInput) {
      firstInput.focus() // Mise au point sur cet élément
    }
  }, 100) // Délai de 100ms
}

// Fonction pour fermer la modal de contact
function closeModal () {
  // Sélection de l'élément modal par son ID
  const modal = document.getElementById('contact_modal')
  // Masquage de la modal en modifiant le style
  modal.style.display = 'none'

  // Sélection du bouton qui a ouvert la modal
  const openModalButton = document.querySelector('.contact_button')
  if (openModalButton) {
    openModalButton.focus() // Mise au point sur ce bouton
  }
}

// Fonction pour créer le template de contact
function contactTemplate (data) {
  // Extraction de la propriété name de l'objet data
  const { name } = data

  // Fonction pour valider le prénom avec une expression régulière
  function validateFirstName (Name) {
    const nameRegExp = /(^[a-z A-ZÂÀÈÉËÏÎéèëêïî-]{2,30})+$/
    return nameRegExp.test(Name) // Renvoie true si le prénom est valide
  }

  // Fonction pour valider l'email avec une expression régulière
  function validateEmail (email) {
    const emailRegExp = /^[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}$/
    return emailRegExp.test(email) // Renvoie true si l'email est valide
  }

  // Fonction pour valider la longueur du texte
  function validateTextLength (text) {
    return text.length >= 5 && text.length <= 100 // Renvoie true si le texte est de longueur valide
  }

  // Fonction pour obtenir l'élément DOM du contact
  function getContactDOM () {
    // Sélection de l'élément h2 pour le nom
    const h2 = document.querySelector('h2.name')
    // Modification du texte de h2 pour inclure le nom du photographe
    h2.textContent = `Contactez-moi ${name}`
    // Ajout des attributs pour l'accessibilité
    h2.setAttribute('tabindex', '0')
    h2.setAttribute('id', 'contact_modal_label')

    // Sélection des champs du formulaire par leur ID
    const firstNameInput = document.getElementById('first')
    const lastNameInput = document.getElementById('last')
    const emailInput = document.getElementById('email')
    const commentsInput = document.getElementById('comments')

    // Sélection du bouton d'envoi du formulaire
    const validateButton = document.querySelector('.contact_button-send')

    // Ajout d'un écouteur d'événements pour la validation du formulaire lors du clic
    validateButton.addEventListener('click', (event) => {
      event.preventDefault() // Empêche l'envoi par défaut du formulaire

      // Validation du prénom
      const firstName = firstNameInput.value
      const isFirstNameValid = validateFirstName(firstName)
      if (isFirstNameValid) {
        console.log('Prénom:', firstName)
      } else {
        console.log("Le prénom n'est pas valide.")
      }

      // Validation du nom
      const lastName = lastNameInput.value
      const isLastNameValid = validateFirstName(lastName)
      if (isLastNameValid) {
        console.log('Nom:', lastName)
      } else {
        console.log("Le nom n'est pas valide.")
      }

      // Validation de l'email
      const email = emailInput.value
      const isEmailValid = validateEmail(email)
      if (isEmailValid) {
        console.log('Email:', email)
      } else {
        console.log("L'email n'est pas valide.")
      }

      // Validation des commentaires
      const comments = commentsInput.value
      const isCommentsValid = validateTextLength(comments)
      if (isCommentsValid) {
        console.log('Commentaires:', comments)
      } else {
        console.log('Les commentaires ne sont pas valides.')
      }
    })

    return h2 // Retourne l'élément h2 modifié
  }

  return { getContactDOM } // Retourne la fonction getContactDOM
}
