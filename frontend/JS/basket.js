/**Objectif : plusieurs cas de figure pour la page panier que l'on peut détaillé dans l'ordre suivant,
 * 1) Si Aucun article n'est encore ajouté dans le panier alors afficher uniquement l'alert-box "votre panier est vide pour l'instant".
 * 2) Si le panier contient déjà un ou plusieurs articles alors masquer l'alert-box et afficher le tableau contenant les articles choisi.
 * A ce stade,
 *      a) l'utilisateur doit pouvoir modifier encore les quantités de chaque article grâce à des boutons +/- dans la colonne "quantité".
 *      b) il peut vider le panier intégralement au click sur le bouton "vider le panier", une fenêtre modal permet de demander la confirmation.
 * 3) Au click sur le boutton "valider le panier", la modification du tableau n'est plus possible (quantité +/-) mais il peut encore le vider.
 *      a) Apparition du formulaire de commande à remplir
 * 4)Au click sur le bouton "payer la commande", vérification du bon remplissage des champs du formulaire(type input, attribut required, regex).
 * Si remplissage conforme alors :
 *      a) Envoit par requête POST des informations du formulaire vers backend.
 *      b) redirection vers la page de confirmation de commande.*/

//cas 1)
if (basket.length == 0) {
  const basketContainer = document.getElementById("basketContainer");
  const formContainer = document.getElementById("formContainer");
  basketContainer.setAttribute("class", "d-none");
  formContainer.setAttribute("class", "d-none");
}
