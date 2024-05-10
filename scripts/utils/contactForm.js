function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  modal.setAttribute('aria-modal', 'true');

  setTimeout(() => {
    const firstInput = modal.querySelector('input, textarea, button');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100); // Attendez 100 ms avant de déplacer le focus
}

// Fonction pour fermer la modale de contact.
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

  // Remet le focus sur le bouton qui a ouvert la modale.
  const openModalButton = document.querySelector('.contact_button');
  if (openModalButton) {
    openModalButton.focus();
  }
}

// Fonction qui retourne un objet DOM pour le formulaire de contact, utilisant les données fournies.
function contactTemplate(data) {
  // Déstructure le nom du photographe depuis l'objet de données.
  const { name } = data;

  // Valide le prénom (ou le nom) avec une expression régulière.
  function validateFirstName(Name) {
    const nameRegExp = /(^[a-z A-ZÂÀÈÉËÏÎéèëêïî-]{2,30})+$/;
    return nameRegExp.test(Name);
  }

  // Valide l'email avec une expression régulière.
  function validateEmail(email) {
    const emailRegExp = /^[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}$/
    return emailRegExp.test(email);
  }

  // Vérifie que la longueur d'un texte est entre 5 et 100 caractères.
  function validateTextLength(text) {
    return text.length >= 5 && text.length <= 100;
  }

  // Crée et configure l'élément DOM pour le formulaire de contact.
  function getContactDOM() {
    // Sélectionne l'élément h2 pour y afficher le nom et invite à contacter le photographe.
    const h2 = document.querySelector('h2.name');
    h2.textContent = `Contactez-moi ${name}`;
    h2.setAttribute('tabindex', '0');

    // Sélectionne les champs du formulaire par leur id.
    const firstNameInput = document.getElementById('first');
    const lastNameInput = document.getElementById('last');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');

    // Sélectionne le bouton de validation.
    const validateButton = document.querySelector('.contact_button-send');

    // Ajoute un gestionnaire d'événements au clic sur le bouton de validation.
    validateButton.addEventListener('click', (event) => {
      event.preventDefault();
      // Validation du prénom.
      const firstName = firstNameInput.value;
      const isFirstNameValid = validateFirstName(firstName);
      if (isFirstNameValid) {
        console.log('Prénom:', firstName);
      } else {
        console.log("Le prénom n'est pas valide.");
      }

      // Validation du nom.
      const lastName = lastNameInput.value;
      const isLastNameValid = validateFirstName(lastName);
      if (isLastNameValid) {
        console.log('Nom:', lastName);
      } else {
        console.log("Le nom n'est pas valide.");
      }

      // Validation de l'email.
      const email = emailInput.value;
      const isEmailValid = validateEmail(email);
      if (isEmailValid) {
        console.log('Email:', email);
      } else {
        console.log("L'email n'est pas valide.");
      }

      // Validation des commentaires.
      const comments = commentsInput.value;
      const isCommentsValid = validateTextLength(comments);
      if (isCommentsValid) {
        console.log('Commentaires:', comments);
      } else {
        console.log("Les commentaires ne sont pas valides.");
      }
    });

    return h2;
  }

  return { getContactDOM };
}
