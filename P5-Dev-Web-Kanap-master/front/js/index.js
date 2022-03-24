//Requête vers l'API pour récupérer l'objet contenant tous les produits et leurs caractèristiques

async function getArticles() {
    const catchArticles =  await fetch("http://localhost:3000/api/products/");
    return catchArticles;
};

//Passe l'objet en Json puis boucle sur ce fichier pour préparer à afficher les produits

function fillArticles() {
    getArticles()
    .then(catchArticles => catchArticles.json())
    .then(function (data){
        const articles = data;
        for (let article of articles) {

            //Injection des données des produits dans la page HTML
            
            const productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `../../front/html/product.html?id=${articles.indexOf(article)}`;

            const productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            const productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = article.imageUrl;
            productImg.alt = article.altTxt

            const productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = article.name;

            const productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = article.description;

        }
    })
    
    //Gestion des erreurs en console

    .catch(function(err) {
    console.log('Erreur fetch' + err);
    })

};

fillArticles();