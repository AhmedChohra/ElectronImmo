const remote = require('electron').remote;
const formName = document.getElementById("name");
const formCity = document.getElementById("city");
const formSize = document.getElementById("size");
const formPrice = document.getElementById("price");
const formDescription = document.getElementById("description");
const formPicture = document.getElementById("picture");

//selectionne l'élément dans le html
const validation = document.querySelector("#validation");


//recupère la valeur voulu des boutons radio sellorRent
function sellorRent() {
    if (document.getElementById('sell').checked) {
        return 'sell';
    } else {
        return 'rent';
    }
}

//recupère la valeur voulu des boutons radio avalableOrReserved
function avalableOrReserved() {
    if (document.getElementById('avalable').checked) {
        return 'avalable';
    } else {
        return 'reserved';
    }
}

//au clic récupère les valeurs du formulaire et les stock dans le localstorage
validation.addEventListener('click', () => {
    let formSellorRent = document.getElementById(`${sellorRent()}`);
    let formAvalableOrReserved = document.getElementById(`${avalableOrReserved()}`);

    //crée un élément
    let element = {
        name: formName.value,
        sellOrRent: formSellorRent.value,
        city: formCity.value,
        size: formSize.value,
        price: formPrice.value,
        description: formDescription.value,
        avalableOrReserved: formAvalableOrReserved.value,
        picture: formPicture.value
    }

    //crée un tableau
    let elementsArray = [];

    //si il y a des élément dans le localStorage éléments, les récupère et les met dans le tableau
    if (localStorage.getItem('elements') != null) {
        elementsArray = JSON.parse(localStorage.getItem('elements'));
    }

    //injecte le nouvel élément dans le tableau
    elementsArray.push(element);
    //inject le tableau dans le localStorage
    localStorage.setItem('elements', JSON.stringify(elementsArray));
    //envoi un message à `index.js` au moment de la validation
    remote.getCurrentWindow().getParentWindow().send('on-validation');
    //ferme la fenêtre
    window.close();
});