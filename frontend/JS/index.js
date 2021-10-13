/**Objectif : faire apparaître la liste des articles sous forme de carte. Au click sur le bouton "acheter cet article" dans chaque carte,
 * on est redirigé vers la page produit spécifique à la carte choisi.
 */

//Définition de l'url pour la requête retournant un tableau de tous les articles
const url = host + "/api/cameras";

//Réalisation de la requête + ajout des cartes d'article
fetch(url)
  .then((data) => data.json())
  .then((jsonListArticle) => {
    addArticleCards(jsonListArticle);
  })
  .catch((error) => {
    console.log("error : " + error);
  });
