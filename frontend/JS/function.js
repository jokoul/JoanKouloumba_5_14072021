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

//création de la classe Article
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

//fonction "displayListArticleInTable" permet de récupérer les articles dans le localStorage et les affiche dans le tableau
function displayListArticleInTable(articleTab) {
  //récupération du "tbody" côté html.
  const tableList = document.getElementById("tableList");
  for (let article of articleTab) {
    //récupération de l'index des articles dans le tableau
    const indexOfArticle = basket.indexOf(article);
    //création des lignes et des cellules du tableau
    const rowArticle = document.createElement("tr");
    rowArticle.classList.add("text-center");
    //colonne "image"
    const cellArticleImg = document.createElement("td");
    cellArticleImg.classList.add("w-25");
    const img = document.createElement("img");
    img.classList.add("img-fluid", "rounded");
    img.src = article.imageUrl;
    cellArticleImg.appendChild(img);
    rowArticle.appendChild(cellArticleImg);
    tableList.appendChild(rowArticle);
    //colonne "name"
    const cellArticleName = document.createElement("td");
    cellArticleName.classList.add("align-middle", "font-weight-bold");
    cellArticleName.innerHTML = `<p>${article.name}</p>`;
    rowArticle.appendChild(cellArticleName);
    //colonne "lentille"
    const cellArticleLense = document.createElement("td");
    cellArticleLense.classList.add("align-middle", "font-weight-bold");
    cellArticleLense.innerHTML = `<p>${article.lense}</p>`;
    rowArticle.appendChild(cellArticleLense);
    //colonne "quantité"
    const cellArticleQuantity = document.createElement("td");
    cellArticleQuantity.classList.add("align-middle", "font-weight-bold");
    cellArticleQuantity.innerHTML += `
    <p class="mx-3">
    <button type="button" class="btn btn-info minus" data-index="${indexOfArticle}"><i class="fas fa-minus" data-index="${indexOfArticle}"></i></button>
    <span class="mx-md-3">${article.quantity}<span>
    <button type="button" class="btn btn-info ml-3 plus" data-index="${indexOfArticle}"><i class="fas fa-plus" data-index="${indexOfArticle}"></i></button>
    <p>`;
    rowArticle.appendChild(cellArticleQuantity);
    //colonne "prix unitaire"
    const cellUnitaryPrice = document.createElement("td");
    cellUnitaryPrice.classList.add("align-middle", "font-weight-bold");
    cellUnitaryPrice.innerHTML = `<p>${transformPrice(article.price)}</p>`;
    rowArticle.appendChild(cellUnitaryPrice);
    //colonne "prix total article"
    const cellArticleTotalPrice = document.createElement("td");
    cellArticleTotalPrice.classList.add("align-middle", "font-weight-bold");
    cellArticleTotalPrice.innerHTML = `<p>${transformPrice(
      article.quantity * article.price
    )}</p>`;
    rowArticle.appendChild(cellArticleTotalPrice);
  }
}

//fonction "calculTotalPriceBasket" permet de claculer le prix total du panier
function calculTotalPriceBasket(articleTab) {
  const totalPriceBasket = document.getElementById("totalPriceBasket");
  let totalPriceCount = 0;
  for (let article of articleTab) {
    totalPriceCount += article.quantity * article.price;
  }
  totalPriceCount = transformPrice(totalPriceCount);
  totalPriceBasket.innerHTML = totalPriceCount;
}

//fonction "addArticlePlus" permet d'incrémenter la quantité de l'article avec le bouton "+"
function addArticlePlus(event) {
  const indexArticle = event.target.getAttribute("data-index");
  basket[indexArticle].quantity++;
  //mise à jour du localStorage et rafraîchissement de la page
  localStorage.setItem("cameras", JSON.stringify(basket));
  window.location.reload();
}

//fonction "substractArticleMinus" permet de décrémenter la quantité de l'article avec le bouton "-"
function substractArticleMinus(event) {
  const indexArticle = event.target.getAttribute("data-index");
  //Si article dans le localStorage
  if (basket[indexArticle].quantity > 1) {
    basket[indexArticle].quantity--;
  } else {
    //Sinon
    basket.splice(indexArticle, 1);
  }
  //mise à jour du localStorage et rafraîchissement de la page
  localStorage.setItem("cameras", JSON.stringify(basket));
  location.reload();
}

//fonction "clearBasket" permet de vider l'intégralité du panier en supprimant tous les articles dans le localstorage
function clearBasket() {
  localStorage.clear();
  location.reload();
}

//fonction "displayForm" permet d'afficher le formulaire
function displayForm() {
  const formContainer = document.getElementById("formContainer");
  formContainer.classList.remove("d-none");
  //désactivation des boutons +/-
  const allButtonPlus = document.getElementsByClassName("plus");
  for (let buttonPlus of allButtonPlus) {
    buttonPlus.setAttribute("disabled", "true");
  }
  const allButtonMinus = document.getElementsByClassName("minus");
  for (let buttonMinus of allButtonMinus) {
    buttonMinus.setAttribute("disabled", "true");
  }
  const submitFormBtn = document.getElementById("submitFormBtn");
  submitFormBtn.setAttribute("disabled", "true");
}

//function 'saveDate' permet d'enregistrer la date et l'heure de la commande
function saveDate() {
  //on crée un objet Date
  const currentDate = new Date();
  let currentDateDay = currentDate.getDate();
  let currentDateMonth = currentDate.getMonth() + 1;
  let currentDateHour = currentDate.getHours();
  let currentDateMinutes = currentDate.getMinutes();
  let currentDateSecondes = currentDate.getSeconds();

  // Si 1 digit alors on ramène à 2-digit
  if (currentDateDay < 10) {
    currentDateDay = "0" + currentDateDay;
  }
  if (currentDateMonth < 10) {
    currentDateMonth = "0" + currentDateMonth;
  }
  if (currentDateHour < 10) {
    currentDateHour = "0" + currentDateHour;
  }
  if (currentDateMinutes < 10) {
    currentDateMinutes = "0" + currentDateMinutes;
  }
  if (currentDateSecondes < 10) {
    currentDateSecondes = "0" + currentDateSecondes;
  }

  //on formate la date et l'heure
  const formatDate =
    currentDateDay + "-" + currentDateMonth + "-" + currentDate.getFullYear();
  const formatHour =
    currentDateHour + ":" + currentDateMinutes + ":" + currentDateSecondes;
  // on crée l'objet formatDateTotal
  let formatDateTotal = { formatDate, formatHour };
  //On initialise un tableau pour stocker l'objet formatDateTotal
  const formatDateTab = JSON.parse(localStorage.getItem("date")) || [];
  formatDateTab.push(formatDateTotal);
  localStorage.setItem("date", JSON.stringify(formatDateTab));
}
