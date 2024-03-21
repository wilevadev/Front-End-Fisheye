
       
        async function getPhotographers() {
            // Récupérer les données avec fetch
            const photographer = await fetch('../data/photographers.json')
                // Convertir la promesse en objet JSON
                .then(response => response.json())
                .then(data => {
                    // Afficher les données
                    console.log(data);
                    // Renvoyer les données
                    return data;
                })
                // Gérer les erreurs potentielles
                .catch(error => {
                    console.error('Une erreur s\'est produite lors de la récupération des photographes :', error);
                    // Renvoyer une erreur
                    throw error;
                });
        
            // Renvoyer les données récupérées
            return photographer;
        }
        

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
          // Ajouter un événement de clic pour chaque carte de photographe
          userCardDOM.addEventListener('click', () => {
            // Redirection vers la deuxième page avec l'ID du photographe passé en paramètre d'URL
            window.location.href = `photographer.html?id=${photographer.id}`;
        });
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
