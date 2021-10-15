/**Objectif: Ce fichier (function.js) fournis l'ensemble des fonctions et classes nécessaire au fichier js spécifique (ex: index.js, product.js,etc.) de chaque page afin d'implémenter leur côté dynamique.
 */

//variable globale
const host = "http://localhost:3000";
const basket = JSON.parse(localStorage.getItem("cameras")) || [];

//fonction "transformPrice" permet de transformer un nombre en format de prix selon région
function transformPrice(numberPrice) {
  let price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(numberPrice / 100);
  return price;
}

//Fonction "addArticleCards" permet d'ajouter les articles à la page d'accueil sous forme de carte.
function addArticleCards(basket) {
  const cardList = document.getElementById("cardList");
  for (let article of basket) {
    let price = transformPrice(article.price);
    cardList.innerHTML += `
        <div class="col-12 col-md-6 col-xl-4 mb-5">
            <div class="card card-light border-secondary shadow text-center">
                <div class="card-header d-flex flex-row">
                        <img class="card-img-top img-fluid rounded-top" src="${article.imageUrl}" alt="${article.name}">
                </div>
                <div class="card-body row">
                    <h5 class="card-title col-6">${article.name}</h5>
                    <h5 class="card-title col-6">${price}</h5>
                    <div class="card-text">
                        <p>${article.description}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <a class="btn btn-secondary stretched-link" href="./frontend/HTML/product.html?id=${article._id}">Acheter cet article</a>
                </div>
            </div>
        </div>
        `;
  }
}

//fonction "addArticleCard" permet de compléter la carte de l'article sur la page produit.
function addArticleCard(article) {
  const productTitle = document.getElementById("productTitle");
  productTitle.innerHTML = `${article.name}`;
  const productImage = document.getElementById("productImage");
  productImage.innerHTML = `<img class="img-fluid img-thumbnail mt-3" src="${article.imageUrl}" alt="${article.name}">`;
  const productName = document.getElementById("productName");
  productName.innerHTML = `${article.name}`;
  const productDescription = document.getElementById("productDescription");
  productDescription.innerHTML = `${article.description}`;
  const productPrice = document.getElementById("productPrice");
  productPrice.innerHTML = `${transformPrice(article.price)}`;
  const lensesChoice = document.getElementById("lensesChoice");
  let lensesTab = article.lenses;
  for (let i = 0; i < lensesTab.length; i++) {
    lensesChoice.innerHTML += `<option value="${lensesTab[i]}">${lensesTab[i]}</option>`;
  }
}

//classe Article
class Article {
  constructor(id, name, description, price, lense, quantity, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.lense = lense;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
  }
}

//fonction "addArticleToBasket" permet de rajouter l'article personnalisé au panier
function addArticleToBasket(article) {
  let isArticleInBasket = false;
  let indexOfArticle;
  for (let product of basket) {
    //On vérifie si il y a deux produits identiques dans le panier
    if (product.id == article.id && product.lense == article.lense) {
      isArticleInBasket = true;
      indexOfArticle = basket.indexOf(product);
    }
  }

  if (isArticleInBasket) {
    //Si oui alors on incrémente juste la quantité et on stocke dans le storage
    basket[indexOfArticle].quantity =
      +basket[indexOfArticle].quantity + +article.quantity;
    localStorage.setItem("cameras", JSON.stringify(basket));
  } else {
    //Sinon on ajoute l'article personnalisé dans le panier et on stocke dans le storage
    basket.push(article);
    localStorage.setItem("cameras", JSON.stringify(basket));
  }
}
