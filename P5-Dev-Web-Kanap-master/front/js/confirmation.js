//Récupération du numéro de commande dans l'URL

let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// Affichage du numéro de commande
const userOrderId = document.querySelector('#orderId');
userOrderId.textContent = productId;

// Effacement des données stockées dans le localStorage
localStorage.removeItem('userProducts');

// –	Notifier lorsque le produit est ajouté au panier. - FAIT
// –	Les validations ne sont pas effectué avant la soumission du formulaire.
// –	Améliorer le code pour ne pas recupérer toute la liste des articles dans le panier.
// –	Utiliser la requête  appropriée pour recupérer les details d'un produit spécifique.
// –	Améliorer les validations des champs (duplication de codes).