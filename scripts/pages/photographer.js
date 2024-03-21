async function getPhotographer() {
    // Récupérer l'ID du photographe à partir des paramètres d'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    // Récupérer les données du photographe avec fetch
    const photographer = await fetch(`../data/photographers.json`)
        .then(response => response.json())
        .then(data => {
            // Trouver le photographe avec l'ID correspondant
            const selectedPhotographer = data.photographers.find(p => p.id == photographerId);
            // Afficher les données du photographe sélectionné
            console.log(selectedPhotographer);
            // Renvoyer les données
            return selectedPhotographer;
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération du photographe :', error);
            // Renvoyer une erreur
            throw error;
        });

    // Renvoyer les données du photographe récupérées
    return photographer;
}

// Appel de la fonction pour récupérer le photographe
getPhotographer()


