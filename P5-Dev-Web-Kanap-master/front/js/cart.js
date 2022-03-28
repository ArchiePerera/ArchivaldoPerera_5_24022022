// Mise à disposition des éléments à appeler pour la boucle d'affichage

const LOCALSTORAGE = JSON.parse(localStorage.getItem("userProducts"));
const PRODUCTS_URL = "http://localhost:3000/api/products/";

// Identification des balises d'affichages

const displayCard = document.getElementById("cart__items");
const displayQty = document.getElementsByClassName("itemQuantity");

// Initialisation des variables à utiliser - fonction displayTotal

let sumPrice = [];
let totalQuantity = [];
let firstName, lastName, address, city, email;

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

          const productCard = document.createElement("article");
          displayCard.appendChild(productCard);
          productCard.classList = "cart__item";
          productCard.dataset.id = userProductChoiceId;
          productCard.dataset.color = userProductChoiceColor;

          // div Image

          const productCardImgContainer = document.createElement("div");
          productCard.appendChild(productCardImgContainer);
          productCardImgContainer.classList = "cart__item__img";

          // Image

          const productCardImg = document.createElement("img");
          productCardImgContainer.appendChild(productCardImg);
          productCardImg.src = userProductChoiceImg;
          productCardImg.alt = userProductChoiceImgAlt;

          // div Content

          const productCardContent = document.createElement("div");
          productCard.appendChild(productCardContent);
          productCardContent.classList = "cart__item__content";

          // div Content Description

          const productCardContentDescription = document.createElement("div");
          productCardContent.appendChild(productCardContentDescription);
          productCardContentDescription.classList =
            "cart__item__content__description";

          // Titre h2 - Nom du produit

          const productCardContentName = document.createElement("h2");
          productCardContentDescription.appendChild(productCardContentName);
          productCardContentName.innerHTML = userProductChoiceName;

          // Paragraphe - Couleur du produit

          const productCardContentColor = document.createElement("p");
          productCardContentDescription.appendChild(productCardContentColor);
          productCardContentColor.innerHTML = userProductChoiceColor;

          // Paragraphe _ Prix du produit

          const productCardContentPrice = document.createElement("p");
          productCardContentDescription.appendChild(productCardContentPrice);
          productCardContentPrice.innerHTML = userProductChoicePrice + " €";

          // div Content Settings

          const productCardSettings = document.createElement("div");
          productCard.appendChild(productCardSettings);
          productCardSettings.classList = "cart__item__content__settings";

          // div Content Quantity

          const productCardSettingsQuantity = document.createElement("div");
          productCardSettings.appendChild(productCardSettingsQuantity);
          productCardSettingsQuantity.classList =
            "cart__item__content__settings__quantity";

          // Paragraphe "Qté :""

          const productCardSettingsQuantityTitle = document.createElement("p");
          productCardSettingsQuantity.appendChild(
            productCardSettingsQuantityTitle
          );
          productCardSettingsQuantityTitle.textContent = "Qté : ";

          // Input Quantity

          const productCardSettingsQuantityInput =
            document.createElement("input");
          productCardSettingsQuantity.appendChild(
            productCardSettingsQuantityInput
          );
          productCardSettingsQuantityInput.setAttribute("type", "number");
          productCardSettingsQuantityInput.classList = "itemQuantity";
          productCardSettingsQuantityInput.setAttribute("name", "itemQuantity");
          productCardSettingsQuantityInput.setAttribute("min", "1");
          productCardSettingsQuantityInput.setAttribute("max", "100");
          productCardSettingsQuantityInput.setAttribute(
            "value",
            userProductChoiceQuantity
          );

          // div Delete

          const productCardDeleteContainer = document.createElement("div");
          productCardSettings.appendChild(productCardDeleteContainer);
          productCardDeleteContainer.classList =
            "cart__item__content__settings__delete";

          // p delete button

          const productCardDeleteButton = document.createElement("p");
          productCardDeleteContainer.appendChild(productCardDeleteButton);
          productCardDeleteButton.classList = "deleteItem";
          productCardDeleteButton.textContent = "Supprimer";

          // Calcul des totaux

          evalTotal(userProductChoiceQuantity, userProductChoicePrice);
        }
      } else {
        // Message affiché si le LOCALSTORAGE est vide

        const productCardEmpty = document.createElement("p");
        displayCard.appendChild(productCardEmpty);
        productCardEmpty.textContent = "Votre panier est vide";

        const totalPriceSpan = document.getElementById("totalPrice");
        totalPriceSpan.textContent = 0;

        const totalQuantitySpan = document.getElementById("totalQuantity");
        totalQuantitySpan.textContent = 0;
      }
      changeTotal();
      removeItems();
    });
}
displayBasket();

// Stockage du prix de chaque item en fonction de leurs quantités et stockage de la quantité

function evalTotal(Qty, Price) {
  let totalPrice = Qty * Price;
  sumPrice.push(totalPrice);

  totalQuantity.push(Number(Qty));

  displayTotal(sumPrice, totalQuantity);
}

// affichage des totaux

function displayTotal(sumPrice, totalQuantity) {
  sumPrice = sumPrice.reduce((a, b) => a + b);

  totalQuantity = totalQuantity.reduce((a, b) => a + b);

  const totalPriceSpan = document.getElementById("totalPrice");
  totalPriceSpan.textContent = sumPrice;

  const totalQuantitySpan = document.getElementById("totalQuantity");
  totalQuantitySpan.textContent = totalQuantity;
}

function changeTotal() {
  const inputQuantity = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < inputQuantity.length; i++) {
    let self = inputQuantity[i];
    let target = self.closest("article");

    self.addEventListener("change", function () {
      let changingProductid = target.dataset.id;
      let changingProductColor = target.dataset.color;
      let newQty = self.value;
      for (product of LOCALSTORAGE) {
        if (
          changingProductid === product.userProductId &&
          changingProductColor === product.userProductColor
        ) {
          product.userProductQty = newQty;
          if (newQty != 0) {
            localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE));
          } else {
            LOCALSTORAGE.splice(i, 1);
            localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE));
          }
        }
      }
      window.location.reload();
    });
  }
}

function removeItems() {
  const deleteProduct = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < deleteProduct.length; j++) {
    let self = deleteProduct[j];
    let target = self.closest("article");

    deleteProduct[j].addEventListener("click", () => {
      let deleteProductid = target.dataset.id;
      let deleteProductColor = target.dataset.color;

      for (product of LOCALSTORAGE) {
        if (
          deleteProductid === product.userProductId &&
          deleteProductColor === product.userProductColor
        ) {
          LOCALSTORAGE.splice(j, 1);
          localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE));
          if (LOCALSTORAGE.length === 0) {
            localStorage.removeItem("userProducts");
            window.location.reload();
          } else {
            window.location.reload();
          }
        }
      }
    });
  }
}

function getUserForm() {

  let inputs = document.querySelectorAll("input");
 
  // const inputs = document.querySelectorAll(
  //   'input[type = "text"]',
  //   'input[type = "email"]'
  // );


  const errorDisplay = (tag, message, valid) => {
    const displayErrorMessage = document.querySelector("#" + tag + "ErrorMsg");
    if (!valid) {
      displayErrorMessage.textContent = message;
    } else {
      displayErrorMessage.textContent = "";
    }
  };

  const firstNameChecker = (value) => {

    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "firstName",
        "Le prénom doit contenir entre 2 et 20 caractères"
      );

    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "firstName",
        "Le prénom ne doit pas contenir de caractères spéciaux"
      );

    } else {
      errorDisplay("firstName", "", true);
    }
  };

  const lastNameChecker = (value) => {

    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "lastName",
        "Le nom de famille doit contenir entre 2 et 20 caractères"
      );

    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "lastName",
        "Le nom de famille ne doit pas contenir de caractères spéciaux"
      );

    } else {
      errorDisplay("lastName", "", true);
    }
  };

  const addressChecker = (value) => {

    if (value.length > 0 && (value.length < 2 || value.length > 50)) {
      errorDisplay(
        "address",
        "L'adresse doit contenir entre 2 et 20 caractères"
      );

    } else if (!value.match(/^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/)) {
      errorDisplay(
        "address",
        "L'adresse doit comprendre un numéro, la voie, le nom de la voie ainsi que le code postal et la ville"
      );

    } else {
      errorDisplay("address", "", true);
    }
  };

  const cityChecker = (value) => {

    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "city",
        "Le nom de la ville doit contenir entre 2 et 20 caractères"
      );

    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "city",
        "Le nom de la ville ne doit pas contenir de caractères spéciaux"
      );

    } else {
      errorDisplay("city", "", true);
    }
  };

  const emailChecker = (value) => {

    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      errorDisplay("email", "Le mail n'est pas valide");
    } else {
      errorDisplay("email", "", true);
    }
  };

  inputs.forEach((input) => {

    input.addEventListener("input", (e) => {

      switch (e.target.id) {
        case "firstName":
          firstNameChecker(e.target.value);

          break;
        case "lastName":
          lastNameChecker(e.target.value);

          break;
        case "address":
          addressChecker(e.target.value);
          
          break;
        case "city":
          cityChecker(e.target.value);
          
          break;
        case "email":
          emailChecker(e.target.value);
        default:
          null;
      }
    });
  });
};
getUserForm();

function postForm(){
  const orderBtn = document.getElementById("order");

  //Ecouter le panier
  orderBtn.addEventListener("click", (event)=>{
    event.preventDefault();
  
      let firstName = document.getElementById('firstName');
      let lastName = document.getElementById('lastName');
      let address = document.getElementById('address');
      let city = document.getElementById('city');
      let email = document.getElementById('email');

      let orderProducts = [];
      for (let i = 0; i<LOCALSTORAGE.length;i++) {
          orderProducts.push(LOCALSTORAGE[i].userProductId);
      }

      console.log(orderProducts)

      const orderUserProduct = {
          contact : {
              firstName: firstName.value,
              lastName: lastName.value,
              address: address.value,
              city: city.value,
              email: email.value,
          },
          products: orderProducts,
      } 
      
      console.log(orderUserProduct)

      const options = {
        method: 'POST',
        body: JSON.stringify(orderUserProduct),
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };
    
      fetch("http://localhost:3000/api/products/order", options)
          .then(res => res.json())
          .then(data => {
//          localStorage.setItem('orderId', data.orderId);
          document.location.href = 'confirmation.html?id=' + data.orderId;
        });
     
      })
}
postForm();

