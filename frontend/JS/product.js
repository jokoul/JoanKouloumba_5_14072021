/**Objectif : afficher la carte du produit avec les informations dynamiques et personnalisés par l'utilisateur.
 * Au click sur le bouton "ajouter au panier", on récupère l'article personnalisé et on l'envoie dans le panier.
 * une fenêtre modal permet de confirmer l'ajout et propose un lien vers la page panier et un autre vers la page d'accueil.
 */

//Récupération de l'id du produit dans l'url envoyé depuis la page d'accueil (href du bouton "acheter cet article")
const indexUrl = window.location.search;
const searchParams = new URLSearchParams(indexUrl);
const articleId = searchParams.get("id");

//définition de l'url pour la requête produit
const url2 = host + `/api/cameras/${articleId}`;

//réalisation de la requête + ajout des informations dynamiques à la carte du produit.
fetch(url2)
  .then((response) => response.json())
  .then((data) => {
    const jsonArticle = data;
    addArticleCard(jsonArticle);

    //Envoie de l'article personnalisé vers le panier
    const btnAddBasket = document.getElementById("btnAddBasket");
    btnAddBasket.addEventListener("click", (e) => {
      //On supprime le comportement par défaut du bouton
      e.preventDefault();

      //création d'une instance de la classe article représentant l'article personnalisé
      const lensesChoice = document.getElementById("lensesChoice");
      const quantityChoice = document.getElementById("quantityChoice");

      const articleObject = new Article(
        jsonArticle._id,
        jsonArticle.name,
        jsonArticle.description,
        jsonArticle.price,
        lensesChoice.value,
        quantityChoice.value,
        jsonArticle.imageUrl
      );
      // Ajout de l'article personnalisé au panier
      addArticleToBasket(articleObject);
    });
  })
  .catch((error) => {
    console.log("erreur :" + error);
  });
