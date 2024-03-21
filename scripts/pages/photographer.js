async function getPhotographer(callPhotographer) {
    // Récupérer l'ID du photographe à partir des paramètres d'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    // Récupérer les données du photographe avec fetch
    const photographer = await fetch(`../data/photographers.json`)
        .then(response => response.json())
        .then(data => {
            // Trouver le photographe avec l'ID correspondant
            let selectedPhotographer;
            for (let i = 0; i < data.photographers.length; i++) {
                if (data.photographers[i].id == photographerId) {
                    selectedPhotographer = data.photographers[i];
                    break;
                }
            }
            // Renvoyer les données du photographe sélectionné
            return selectedPhotographer;
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération du photographe :', error);
            // Renvoyer une erreur
            throw error;
        });

    // Appeler la fonction pour afficher le photographe récupéré
    callPhotographer(photographer);
}

function callPhotographer(photographer){
    const photographHeader = document.querySelector(".photograph-header"); // Utilisation de la classe CSS
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);
}

// Appel de la fonction pour récupérer le photographe et afficher ses données
getPhotographer(callPhotographer);