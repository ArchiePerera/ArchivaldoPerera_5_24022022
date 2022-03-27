//Récupération du paramètre d'identification du produit choisi dans l'adresse du navigateur

let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

console.log(productId)

//Requête vers l'API pour récupérer l'objet contenant tous les produits et leurs caractèristiques. la fonction attend la requête avant de poursuivre.

async function getArticles() {
  const catchArticles = await fetch("http://localhost:3000/api/products/");
  return catchArticles;
}

//Appel de la fonction de la requête asynchrone et, une fois éxécutée, interprétation des données promises en Json.

function getArticle(productId) {
  getArticles()
    .then((catchArticles) => catchArticles.json())
    .then(function (data) {
      const articles = data;

      //Boucle sur le fichier Json résultant du fetch pour identifier les caractèristiques du produit en question

      console.log(articles)

      for (const article in articles) {
        //À l'identification du produit, on injecte ses caractèristiques dans la page HTML

        console.log(articles[article]._id)

        if (articles[article]._id === productId) {
          const productImg = document.createElement("img");
          document.querySelector(".item__img").appendChild(productImg);
          productImg.src = articles[article].imageUrl;
          productImg.alt = articles[article].altTxt;

          const productTitle = document.getElementById("title");
          productTitle.innerHTML = articles[article].name;

          const productPrice = document.getElementById("price");
          productPrice.innerHTML = articles[article].price;

          const productDescription = document.getElementById("description");
          productDescription.innerHTML = articles[article].description;

          //Boucle pour les couleurs disponibles du produit

          for (color of articles[article].colors) {
            const productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = color;
            productColors.innerHTML = color;
          }

        } 
      }

      addToCart(articles);
    })

    .catch(function (err) {
      console.log("Erreur fetch" + err);
    });
}
getArticle(productId);

function addToCart(articles) {
  //Définition des champs à renseigner

  const addBtn = document.getElementById("addToCart");
  const quantity = document.getElementById("quantity");
  const color = document.getElementById("colors");

  // Au clic, l'évènement s'effectue si les champs sont renseignés

  addBtn.addEventListener("click", () => {
    if (color.value !== "" && quantity.value != 0 && quantity.value <= 100) {
      //Si les champs sont renseignés : stockage des données dans des variables

      let userProductId = productId;
      let userProductColor = color.value;
      let userProductQty = quantity.value;

      // Création d'un objet produit

      let userProductArray = {
        userProductId: userProductId,
        userProductColor: userProductColor,
        userProductQty: userProductQty,
      };

      // Mise à disposition du localStorage si existant

      let productLocalStorage = JSON.parse(
        localStorage.getItem("userProducts")
      );

      // Comportement si il n'y a pas de localStorage (il n'a ni valeur ni type défini : donc null)

      if (productLocalStorage == null) {
        productLocalStorage = [];
        productLocalStorage.push(userProductArray);
        localStorage.setItem(
          "userProducts",
          JSON.stringify(productLocalStorage)
        );
      } else {
        // Comportement si il existe des données dans le localStorage

        // Condition si le produit comporte le même Id et la même couleur. Méthode find dans le localStorage et comparaison avec les valeurs de l'objet userProductArray

        let mappingProducts = productLocalStorage.find(
          (el) =>
            el.userProductId === userProductId &&
            el.userProductColor === userProductColor
        );

        // Si la condition est vraie on additionne la quantité de l'objet du localStorage qui répond à la condition avec celle de la page en cours et on renvoie le tout au localStorage

        if (mappingProducts) {
          // On incrémente la quantité

          newQty =
            parseInt(mappingProducts.userProductQty) + parseInt(userProductQty);
          mappingProducts.userProductQty = newQty;

          // On l'enregistre dans le localStorage

          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
        } else {
          // Dans tous les autres cas, on enregistre un nouvel objet dans le localStorage

          productLocalStorage.push(userProductArray);
          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
        }
      }

      //Fin des conditions pour le localStorage
    } else {
      alert(
        "Veuillez renseigner la couleur et la quantité (max: 100) du produit sélectionné"
      );
    }
  });
}
