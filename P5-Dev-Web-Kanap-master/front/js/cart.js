const LOCALSTORAGE = JSON.parse(localStorage.getItem("userProducts"));
const PRODUCTS_URL = "http://localhost:3000/api/products/";

const displayCard = document.getElementById("cart__items");
const displayQty = document.getElementsByClassName("itemQuantity");

let price = 0;
let quantity = [];
let totalSum = [];

async function getArticles() {
  const catchArticles = await fetch(PRODUCTS_URL);
  return catchArticles;
}

function displayBasket() {
  getArticles()
    .then((catchArticles) => catchArticles.json())
    .then(function (data) {
      const articles = data;

      if (LOCALSTORAGE !== null) {
        for (let product of LOCALSTORAGE) {
          find = articles.find((item) => item._id === product.userProductId);

          displayCard.innerHTML += `
            <article class="cart__item" data-id="${find._id}" data-color="${
            product.userProductColor
          }">
                <div class="cart__item__img">
                  <img src="${find.imageUrl}" alt="${find.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${find.name}</h2>
                    <p>${find.description}</p>
                    <p>${product.userProductColor}</p>
                    <p>${find.price * product.userProductQty} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                        product.userProductQty
                      }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
            `;

          price = find.price * product.userProductQty;
          totalSum.push(price);

          quantity.push(Number(product.userProductQty));
        }
        total = totalSum.reduce(function (a, b) {
          return a + b;
        });
        totalPrice = document.getElementById("totalPrice");
        totalPrice.textContent = total;

        quantityAll = quantity.reduce(function (a, b) {
          return a + b;
        });
        totalQuantity = document.getElementById("totalQuantity");
        totalQuantity.textContent = quantityAll;
      } else {
        console.log("test");
      }
    });
}
displayBasket();
