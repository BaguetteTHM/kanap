//Affichage du numéro de commande


//on récupère l'id de la commande dans l'url de la page de confirmation
const id = (new URL(location)).searchParams.get("id");
const orderId = document.getElementById("orderId");

//on l'affiche
orderId.append(id);