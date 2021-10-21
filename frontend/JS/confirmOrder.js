/**Objectif :
 * 1) Afficher le reçu de payement qui stipule les informations liées à la commande (orderId, prix total) et remercie le client pour la commande, .
 * 2) Afficher à nouveau le contenu du panier
 * 3) Implémenter un bouton pour permettre l'impression du reçu */
const orderTab = JSON.parse(localStorage.getItem("order")) || [];
const dateTab = JSON.parse(localStorage.getItem("date")) || [];

//1)Insertion des informations liées à la commande
const contactFirstName = document.getElementById("contactFirstName");
contactFirstName.innerHTML = `${orderTab.contact.firstName}`;
const dateOrder = document.getElementById("dateOrder");
dateOrder.innerHTML = `${dateTab[0].formatDate}`;
const hourOrder = document.getElementById("hourOrder");
hourOrder.innerHTML = `${dateTab[0].formatHour}`;
const idOrder = document.getElementById("idOrder");
idOrder.innerHTML = `${orderTab.orderId}`;
const EmailOrder = document.getElementById("EmailOrder");
EmailOrder.innerHTML = `${orderTab.contact.email}`;
const contactLastName = document.getElementById("contactLastName");
contactLastName.innerHTML = `${orderTab.contact.lastName}`;
const confirmAddress = document.getElementById("confirmAddress");
confirmAddress.innerHTML = `${orderTab.contact.address}`;
const confirmCity = document.getElementById("confirmCity");
confirmCity.innerHTML = `${orderTab.contact.city}`;

//2) Afficher un récapitulatif du panier
const tableListConfirm = document.getElementById("tableListConfirm");
for (let article of basket) {
  tableListConfirm.innerHTML += `
    <tr class="text-center font-weight-bold ">
    <td class="w-25"><img class="img-fluid img-thumbnail" src="${
      article.imageUrl
    }" alt="${article.name}"></td>
    <td class="align-middle"><p>${article.name}</p></td>
    <td class="align-middle"><p>${article.lense}</p></td>
    <td class="align-middle"><p>${article.quantity}</p></td>
    <td class="align-middle"><p>${transformPrice(article.price)}</p></td>
    <td class="align-middle"><p>${transformPrice(
      article.quantity * article.price
    )}</p></td>
    </tr>
    `;
}
const totalPriceBasketConfirm = document.getElementById(
  "totalPriceBasketConfirm"
);
totalPriceBasketConfirm.innerHTML = `${calculTotalPriceBasket(basket)}`;

//3) Impression du reçu
const printReceiptBtn = document.getElementById("printReceiptBtn");
printReceiptBtn.addEventListener("click", printReceipt);
