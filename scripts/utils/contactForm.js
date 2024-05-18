function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'contact_modal_label');

  setTimeout(() => {
    const firstInput = modal.querySelector('input, textarea, button');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

  const openModalButton = document.querySelector('.contact_button');
  if (openModalButton) {
    openModalButton.focus();
  }
}

function contactTemplate(data) {
  const { name } = data;

  function validateFirstName(Name) {
    const nameRegExp = /(^[a-z A-ZÂÀÈÉËÏÎéèëêïî-]{2,30})+$/;
    return nameRegExp.test(Name);
  }

  function validateEmail(email) {
    const emailRegExp = /^[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}$/;
    return emailRegExp.test(email);
  }

  function validateTextLength(text) {
    return text.length >= 5 && text.length <= 100;
  }

  function getContactDOM() {
    const h2 = document.querySelector('h2.name');
    h2.textContent = `Contactez-moi ${name}`;
    h2.setAttribute('tabindex', '0');
    h2.setAttribute('id', 'contact_modal_label');

    const firstNameInput = document.getElementById('first');
    const lastNameInput = document.getElementById('last');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');

    const validateButton = document.querySelector('.contact_button-send');

    validateButton.addEventListener('click', (event) => {
      event.preventDefault();

      const firstName = firstNameInput.value;
      const isFirstNameValid = validateFirstName(firstName);
      if (isFirstNameValid) {
        console.log('Prénom:', firstName);
      } else {
        console.log("Le prénom n'est pas valide.");
      }

      const lastName = lastNameInput.value;
      const isLastNameValid = validateFirstName(lastName);
      if (isLastNameValid) {
        console.log('Nom:', lastName);
      } else {
        console.log("Le nom n'est pas valide.");
      }

      const email = emailInput.value;
      const isEmailValid = validateEmail(email);
      if (isEmailValid) {
        console.log('Email:', email);
      } else {
        console.log("L'email n'est pas valide.");
      }

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

