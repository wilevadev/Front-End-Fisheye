        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        async function getPhotographers() {
            // Récupérer les données avec fetch
            const photographer = await fetch('../data/photographers.json/${protographerid}')
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
        }//Mettre le code JavaScript lié à la page photographer.html//