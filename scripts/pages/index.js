
async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data.photographers;
}


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {

        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);


        ["img", "h2"].forEach(selector => {
            userCardDOM.querySelector(selector).addEventListener('click', () => {
                window.location.href = `photographer.html?id=${photographer.id}`;
            });
        });
    });
}


async function init() {
    const photographers = await getPhotographers();
    await displayData(photographers);
}


init();



