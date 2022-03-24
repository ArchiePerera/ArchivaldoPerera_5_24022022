const LOCALSTORAGE = JSON.parse(localStorage.getItem("userProducts"));

const PRODUCTS_URL = "http://localhost:3000/api/products/";

const displayCard = document.getElementById("cart__items");

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
      console.log(data);
      // console.log(LOCALSTORAGE)

      if (LOCALSTORAGE !== null) {
        for (let product of LOCALSTORAGE) {
          displayCard.innerHTML += `
            <article class="cart__item" data-id="${
              product.userProductId
            }" data-color="${product.userProductColor}">
                <div class="cart__item__img">
                  <img src="${data[product.userProductId].imageUrl}" alt="${
            data[product.userProductId].altTxt
          }">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data[product.userProductId].name}</h2>
                    <p>${data[product.userProductId].description}</p>
                    <p>${product.userProductColor}</p>
                    <p>${
                      data[product.userProductId].price * product.userProductQty
                    } €</p>
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

          price = data[product.userProductId].price * product.userProductQty;
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