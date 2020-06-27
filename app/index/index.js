const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');

const remote = require('electron').remote;
const addBtn = document.querySelector("#add-item");

//definit l'unité du prix
function priceUnit(element) {
    if (element.sellOrRent === "location") {
        return "€/mois"
    } else {
        return "€"
    }
}

//désactive le bouton quand réservé
function disableBtn(element) {
    if (element.avalableOrReserved === "Réservé") {
        return `disabled`
    }
}

//affiche le tableau dans le html
function showElements(container, list) {
    //vide le html du container
    container.innerHTML = '';
    //affiche chaque élément du tableau
    if (list != null && list.length > 0) {
        for (let element of list) {
            let html = `<tr>
            <td>${element.name}</td>
            <td>${element.sellOrRent}</td>
            <td>${element.city}</td>
            <td>${element.size} m²</td>
            <td>${element.price} ${priceUnit(element)}</td>
            <td>${element.description}</td>
            <td><img src="${element.picture}"></td>
            <td><a href="#" role="button" class="btn btn-dark reservation ${disableBtn(element)}">${element.avalableOrReserved}</a></td>
            </tr>`;
            container.innerHTML += html;
        }
    }
    //lance le eventListener sur les boutons de réservation
    reservation();
}

//recupère le contenu du local storage et l'injecte dans le html
function localStorageInHtml() {
    const htmlContainer = document.querySelector("#elements");
    elementsArray = JSON.parse(localStorage.getItem('elements'));
    showElements(htmlContainer, elementsArray);
}

//permet d'afficher les éléments à l'ouverture de la page
localStorageInHtml()


//récupère l'information qu'un nouvel élément à été ajouter, effectue une alerte à l'ajout, vide le cache du html et appel la fonction getElements
ipcRenderer.on('on-validation', () => {
    alert("Vous avez ajouter un bien.");
    localStorageInHtml()
});

//permet la réservation
function reservation() {
    //selectionne tout boutons et les met dans un tableau
    reservationBtns = document.querySelectorAll(".reservation");
    //parcourt le tableau de boutons
    for (let i = 0; i < reservationBtns.length; ++i) {
        //event au clic sur un des boutons
        reservationBtns[i].addEventListener('click', () => {
            //demande de confirmation
            let result = confirm("Êtes vous sûrs de vouloir réserver ce bien immobilier ?")
            if (result == true) {
                //modifie l'element voulu
                elementsArray = JSON.parse(localStorage.getItem('elements'));
                element = elementsArray[i];
                element.avalableOrReserved = "Réservé";
                //upload dans le localStorage
                localStorage.setItem('elements', JSON.stringify(elementsArray));
                //affiche les elements sur la page
                localStorageInHtml()
            }
        });
    }
}

//crée une nouvelle fenêtre d'ajout d'élément
addBtn.addEventListener('click', () => {
    console.log("clic")
    let winAddElement = new BrowserWindow({
        width: 800,
        height: 600,
        parent: remote.getCurrentWindow(),
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    winAddElement.loadFile("app/add-element/add-element.html")
});



