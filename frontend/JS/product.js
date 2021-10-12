/**Objectif : afficher la carte du produit avec les informations dynamiques et personnalisés */

//Récupération de l'id du produit dans l'url envoyé depuis la page d'accueil (href du bouton "acheter cet article")
const searchParams = new URLSearchParams(location.search);
const articleId = searchParams.get("id");

//définition de l'url pour la requête produit
const url2 = host + `/api/cameras/${articleId}`;

//réalisation de la requête + ajout des informations dynamiques à la carte du produit.
fetch(url2)
  .then((response) => response.json())
  .then((data) => {
    const jsonArticle = data;
    addArticleCard(jsonArticle);
  })
  .catch((error) => {
    console.log("erreur :" + error);
  });

//Envoie de l'article personnalisé vers le panier
const btnAddBasket = document.getElementById("btnAddBasket");
btnAddBasket.addEventListener("click", (e) => {
  e.preventDefault();
  //création d'une instance de la classe article représentant l'article personnalisé
  const lensesChoice = document.getElementById("lensesChoice");
  const quantityChoice = document.getElementById("quantityChoice");
  let articleObject = new Article(
    article._id,
    article.name,
    article.description,
    article.price,
    lensesChoice.value,
    quantityChoice.value,
    article.imageUrl
  );
  //On vérifie si l'article personnalisé est oui ou non déjà dans le panier
  //Si oui, alors on récupère l'index dans le tableau "panier".
  let isAlreadyPresent = false;
  let indexOfArticle;
  for (let article of basket) {
    if (articleObject.options == article.options) {
      isAlreadyPresent = true;
      indexOfArticle = basket.indexOf(article);
    }
  }
  //Puis, on incrémente juste la quantité qui n'existait pas à l'origine sur le backend.
  if (isAlreadyPresent == true) {
    basket[indexOfArticle].quantity += articleObject.quantity;
    //enfin, on sauvegarde dans le web storage le tableau "panier" avec la quantité modifié
    localStorage.getItem("cameras", JSON.stringify(basket));
  } else {
    //Si non, on ajoute l'article personnalisé au tableau "panier".
    basket.push(articleObject);
    //puis on sauvegarde le nouveau tableau "panier" dans le web storage
    localStorage.getItem("cameras", JSON.stringify(basket));
  }
});
