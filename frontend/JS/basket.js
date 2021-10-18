/**Objectif : plusieurs cas de figure pour la page panier que l'on peut détaillé dans l'ordre suivant,
 * 1) Si Aucun article n'est encore ajouté dans le panier alors afficher uniquement l'alert-box "votre panier est vide pour l'instant".
 * 2) Si le panier contient déjà un ou plusieurs articles alors masquer l'alert-box et afficher le tableau contenant les articles choisis.
 * A ce stade,
 *      a) l'utilisateur doit pouvoir modifier encore les quantités de chaque article grâce à des boutons +/- dans la colonne "quantité".
 *      b) il peut vider le panier intégralement au click sur le bouton "vider le panier", une fenêtre modal permet de demander la confirmation.
 * 3) Au click sur le boutton "valider le panier", la modification du tableau n'est plus possible (quantité +/-) mais il peut encore le vider.
 *      a) Apparition du formulaire de commande avec les champs à remplir
 * 4)Au click sur le bouton "payer la commande", vérification du bon remplissage des champs du formulaire(type input, attribut required, regex).
 * Si remplissage conforme alors :
 *      a) Envoie par requête POST des informations du formulaire vers backend.
 *      b) redirection vers la page de confirmation de commande.*/

//cas 1) Si panier vide alors affiche uniquement alertBox
//récupération des éléments dans des variables.
const basketContainer = document.getElementById("basketContainer");
const formContainer = document.getElementById("formContainer");
const alertBox = document.getElementById("alertBox");
if (basket.length == 0) {
  basketContainer.setAttribute("class", "d-none");
  formContainer.setAttribute("class", "d-none");
} else {
  //cas 2 : sinon affiche tableau uniquement dans un premier temps
  alertBox.classList.add("d-none");
  formContainer.classList.add("d-none");
  //récupération des articles dans le localStorage et affichage dans le tableau"
  displayListArticleInTable(basket);
  //Affiche le prix total du panier
  calculTotalPriceBasket(basket);
}

//a) modification de la quantité avec les boutons +/-
//ajout avec le boutons "+"
const allButtonPlus = document.getElementsByClassName("plus");
for (let buttonPlus of allButtonPlus) {
  buttonPlus.addEventListener("click", addArticlePlus);
}
//retrait avec le bouton "-"
const allButtonMinus = document.getElementsByClassName("minus");
for (let buttonMinus of allButtonMinus) {
  buttonMinus.addEventListener("click", substractArticleMinus);
}

// b) Vider le panier
const emptyBasket = document.getElementById("emptyBasket");
emptyBasket.addEventListener("click", clearBasket);

// 3) a) Validation du panier avec le bouton "valider le panier"
const validBasket = document.getElementById("validBasket");
validBasket.addEventListener("click", displayForm);

//4) Vérification des informations saisie dans les champs
const submitFormBtn = document.getElementById("submitFormBtn");
//on récupère les regex et les champs à vérifier
const regexName =
  /^(([a-zA-Zéèêëîïàôö]+[-]{1}[a-zA-Zéèêëîïàôö]+)|([a-zA-Zéèêëîïàôö]+))$/;
const regexAddress = /^([a-zA-Z0-9éèêëîïàôö]+[\s\-]?){1,5}$/;
const regexCity = /^([a-zA-Z0-9éèêëîïàôö]+[\s\-]?){1,5}$/;
const regexEmail = /^([a-z0-9._-]+@[a-z0-9._-]{2,}.[a-z]{2,4})$/;
const checkBox = document.getElementById("checkBox");

const clientFirstName = document.getElementById("firstName");
const clientLastName = document.getElementById("lastName");
const clientAddress = document.getElementById("address");
const clientCity = document.getElementById("city");
const clientEmail = document.getElementById("email");

//activation du bouton "payer la commande"
checkBox.addEventListener("change", () => {
  if (
    clientFirstName.value.length != 0 &&
    clientLastName.value.length != null &&
    !clientAddress.value.length == 0 &&
    !clientCity.value.length == 0 &&
    !clientEmail.value.length == 0 &&
    checkBox.checked
  ) {
    const submitFormBtn = document.getElementById("submitFormBtn");
    submitFormBtn.removeAttribute("disabled");
  }
});

//action au click sur le bouton "payer la commande"
submitFormBtn.addEventListener("click", (event) => {
  // on crée un objet "contact" avec tous les informations de saisie
  let contact = {
    firstName: clientFirstName.value,
    lastName: clientLastName.value,
    address: clientAddress.value,
    city: clientCity.value,
    email: clientEmail.value,
  };

  if (
    regexName.test(contact.firstName) == true &&
    regexName.test(contact.lastName) == true &&
    regexAddress.test(contact.address) == true &&
    regexCity.test(contact.city) == true &&
    regexEmail.test(contact.email) == true &&
    checkBox.checked == true
  ) {
    //on supprime le comportement par défaut
    event.preventDefault();
    // On enregistre la date et l'heure du payement
    saveDate();
    //4) a) Envoie par requête POST des informations du formulaire vers backend.
    let products = [];
    for (let article of basket) {
      products.push(article.id);
    }
    //url de la requête POST
    const url3 = host + "/api/cameras/order";
    //execution de la requête
    fetch(url3, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    }) //récupération de la réponse
      .then((response) => response.json())
      .then((data) => {
        const jsonOrder = data;
        //stockage de la réponse et redirectioon vers la page de confirmation de la commande
        localStorage.setItem("order", JSON.stringify(jsonOrder));
        window.location.href = "./confirmOrder.html";
      })
      .catch((error) => console.log("erreur : " + error));
  } else {
    alert(
      "Veuillez remplir intégralement le formulaire sans ponctuation ni signe spéciaux, merci."
    );
  }
});
