// Mise à disposition des éléments à appeler pour la boucle d'affichage

const LOCALSTORAGE = JSON.parse(localStorage.getItem("userProducts"));
const PRODUCTS_URL = "http://localhost:3000/api/products/";

// Identification des balises d'affichages

const displayCard = document.getElementById("cart__items");
const displayQty = document.getElementsByClassName("itemQuantity");

// Initialisation des variables à utiliser

let price = 0;
let quantity = [];
let totalSum = [];

// Appel de l'API pour rendre disponible la liste des articles

async function getArticles() {
  const catchArticles = await fetch(PRODUCTS_URL);
  return catchArticles;
}

// Fonction d'affichage des produits dans le panier

function displayBasket() {
  getArticles()
    .then((catchArticles) => catchArticles.json())
    .then(function (data) {
      const articles = data;

      // Si LOCALSTORAGE est présent, on effectue une boucle pour afficher les informations des produits

      if (LOCALSTORAGE !== null) {
        for (let product of LOCALSTORAGE) {

          // Recherche des informations complémentaires des produits dans l'API

          find = articles.find((item) => item._id === product.userProductId);

          // Assignation des appels au LOCALSTORAGE et de l'API dans des variablles (trop) explicites

          let userProductChoiceId = find._id;
          let userProductChoiceColor = product.userProductColor;
          let userProductChoiceImg = find.imageUrl;
          let userProductChoiceImgAlt = find.altTxt;
          let userProductChoiceName = find.name;
          // let userProductChoiceDescription = find.description;
          let userProductChoicePrice = find.price;
          let userProductChoiceQuantity = product.userProductQty;

          // Création des éléments HTML pour l'affichage des produits

          // Article

          const productCard = document.createElement('article');
          displayCard.appendChild(productCard);
          productCard.classList ='cart__item';
          productCard.dataset.id = userProductChoiceId;
          productCard.dataset.color = userProductChoiceColor;

          // div Image

          const productCardImgContainer = document.createElement('div');
          productCard.appendChild(productCardImgContainer);
          productCardImgContainer.classList = 'cart__item__img';

          // Image

          const productCardImg = document.createElement('img');
          productCardImgContainer.appendChild(productCardImg);
          productCardImg.src = userProductChoiceImg;
          productCardImg.alt = userProductChoiceImgAlt;

          // div Content

          const productCardContent = document.createElement('div');
          productCard.appendChild(productCardContent);
          productCardContent.classList = 'cart__item__content';

          // div Content Description
          
          const productCardContentDescription = document.createElement('div');
          productCardContent.appendChild(productCardContentDescription);
          productCardContentDescription.classList = 'cart__item__content__description';

          // Titre h2 - Nom du produit

          const productCardContentName = document.createElement('h2');
          productCardContentDescription.appendChild(productCardContentName);
          productCardContentName.innerHTML = userProductChoiceName;

          // Paragraphe - Couleur du produit

          const productCardContentColor = document.createElement('p');
          productCardContentDescription.appendChild(productCardContentColor);
          productCardContentColor.innerHTML = userProductChoiceColor;

          // Paragraphe _ Prix du produit

          const productCardContentPrice = document.createElement('p');
          productCardContentDescription.appendChild(productCardContentPrice);
          productCardContentPrice.innerHTML = userProductChoicePrice;

          // div Content Settings

          const productCardSettings = document.createElement('div');
          productCard.appendChild(productCardSettings);
          productCardSettings.classList = 'cart__item__content__settings';

          // div Content Quantity

          const productCardSettingsQuantity = document.createElement('div');
          productCardSettings.appendChild(productCardSettingsQuantity);
          productCardSettingsQuantity.classList = 'cart__item__content__settings__quantity';

          // Paragraphe "Qté :""

          const productCardSettingsQuantityTitle = document.createElement('p');
          productCardSettingsQuantity.appendChild(productCardSettingsQuantityTitle);
          productCardSettingsQuantityTitle.innerHTML = 'Qté : ';

          // Input Quantity

          const productCardSettingsQuantityInput = document.createElement('input');
          productCardSettingsQuantity.appendChild(productCardSettingsQuantityInput);
          productCardSettingsQuantityInput.setAttribute('type', 'number');
          productCardSettingsQuantityInput.classList = 'itemQuentity';
          productCardSettingsQuantityInput.setAttribute('name', 'itemQuantity');
          productCardSettingsQuantityInput.setAttribute('min', '1');
          productCardSettingsQuantityInput.setAttribute('max', '100');
          productCardSettingsQuantityInput.setAttribute('value', userProductChoiceQuantity);

          // div Delete

          const productCardDeleteContainer = document.createElement('div');
          productCardSettings.appendChild(productCardDeleteContainer);
          productCardDeleteContainer.classList = 'cart__item__content__settings__delete';

          // p delete button

          const productCardDeleteButton = document.createElement('p');
          productCardDeleteContainer.appendChild(productCardDeleteButton);
          productCardDeleteButton.innerHTML = 'Supprimer';








          // displayCard.innerHTML += `
          //   <article class="cart__item" data-id="${find._id}" data-color="${
          //   product.userProductColor
          // }">
          //       <div class="cart__item__img">
          //         <img src="${find.imageUrl}" alt="${find.altTxt}">
          //       </div>
          //       <div class="cart__item__content">
          //         <div class="cart__item__content__description">
          //           <h2>${find.name}</h2>
          //           <p>${find.description}</p>
          //           <p>${product.userProductColor}</p>
          //           <p>${find.price * product.userProductQty} €</p>
          //         </div>
          //         <div class="cart__item__content__settings">
          //           <div class="cart__item__content__settings__quantity">
          //             <p>Qté : </p>
          //             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
          //               product.userProductQty
          //             }">
          //           </div>
          //           <div class="cart__item__content__settings__delete">
          //             <p class="deleteItem">Supprimer</p>
          //           </div>
          //         </div>
          //       </div>
          //     </article>
          //   `;

          // price = find.price * product.userProductQty;
          // totalSum.push(price);

          // quantity.push(Number(product.userProductQty));
        }
        // total = totalSum.reduce(function (a, b) {
        //   return a + b;
        // }
        //);
        // totalPrice = document.getElementById("totalPrice");
        // totalPrice.textContent = total;

        // quantityAll = quantity.reduce(function (a, b) {
        //   return a + b;
        //}
        //);
        // totalQuantity = document.getElementById("totalQuantity");
        // totalQuantity.textContent = quantityAll;
      } else {
        console.log("Absence de produit à afficher. Le LOCALSTORAGE EST VIDE.");
      }
      displayTotals();
      changeTotals();
      removeItems();
    });
}
displayBasket();

function displayTotals() {
  console.log("hors de la boucle");
};

function changeTotals() {
  console.log("de nouveau hors de la boucle");
};

function removeItems() {
  console.log("Et une nouvelle fois hors de la boucle");
};



function userForm() {

};

function sendUserForm() {

};
