/**Objectif : faire apparaître la liste des articles sous forme de carte
 */

//Réalisation de la requête + ajout des cartes d'article
fetch(url)
  .then((data) => data.json())
  .then((jsonListArticle) => {
    addArticleCards(jsonListArticle);
  })
  .catch((error) => {
    console.log("error : " + error);
  });
