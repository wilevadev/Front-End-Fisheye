function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
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
        const firstNameInput = document.getElementById("first");
        const lastNamInput =document.getElementById("last")
        const emailInput = document.getElementById("email")
        const commentsinput = document.getElementById("comments")
        const validateButton = document.querySelector(".contact_button-send");
        
        validateButton.addEventListener("click", (event) => {
            event.preventDefault();
            let firstName = firstNameInput.value;
            let isFirstNameValid = validateFirstName(firstName);
            if (isFirstNameValid) {
                console.log("Prénom:", firstName);
            } else {
                console.log("Le prénom n'est pas valide.");
            }
            let lastName = lastNamInput.value;
            let isFastNameValid = validateFirstName(lastName);
            if(isFastNameValid) {
                console.log("nom:", lastName);
            }else {
                console.log("Le nom n'est pas valide.");
            }
            let email = emailInput.value;
            let isEmailValidate = validateEmail(email);
            if(isEmailValidate) {
                console.log("email:", email);
            }else {
                console.log("L'email n'est pas valide.");
            }
            let comments =commentsinput.value;
            let isCommentsValidate =validateTextLength(comments)
            if (isCommentsValidate) {
                console.log("comments:", comments );
            } else {
                console.log("comments n'est pas valide"); 
            }

        });

        return h2;
    }

    return { getContactDOM };
}





