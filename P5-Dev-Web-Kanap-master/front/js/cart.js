let LOCALSTORAGE = JSON.parse(localStorage.getItem("userProducts"));

let PRODUCTS_URL = "http://localhost:3000/api/products/";

async function getArticles() {
    const catchArticles =  await fetch("http://localhost:3000/api/products/");
    return catchArticles;
};

function displayBasket() {
    getArticles()
    .then(catchArticles => catchArticles.json())
    .then(function (data){
        const articles = data;
        // console.log(data)
        // console.log(LOCALSTORAGE)
        
        for (let product of LOCALSTORAGE) {
            console.log(product);
            console.log(product.userProductId);
            console.log(data[product.userProductId].name);

        }
    })
};

displayBasket()
