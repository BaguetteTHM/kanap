// Local storage
// Toutes les fonctions de manipulation du panier

//Update du LS après une opération
function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket));
}

// récupération des produits du panier
function getBasket(){
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return [];
  
    }else{
        return JSON.parse(basket);
    }
}

//Ajouter des produits au panier dans le LS

function addBasket(product){
    let basket = getBasket();
    const duplicate = basket.filter (p => p.id === product.id && p.chosenColor === product.chosenColor);
    
    if(duplicate.length == 0){
      basket.push(product)
    }else{
      const duplicateIndex = basket.indexOf(duplicate[0]);
      basket[duplicateIndex].chosenQuantity = 
      parseInt(basket[duplicateIndex].chosenQuantity) + parseInt(product.chosenQuantity);
    }
    saveBasket(basket);
}

//Supprimer un produit du panier dans le LS

function supprimeProduit(product){
    let basket = getBasket();
    basket = basket.filter (p => p.id != product.id || p.chosenColor != product.color)
    saveBasket(basket);
    location.reload();
}

//Changer la quantité d'un produit du panier dans le LS

function changeQuantité(id,color,qty){
    let basket = getBasket();
    let changedProduct = basket.filter (p => p.id === id && p.chosenColor === color )
    if( changedProduct.length > 0 ){
        let changedProductIndex = basket.indexOf(changedProduct[0]);
        basket[changedProductIndex].chosenQuantity = parseInt(qty);

    }else{
        alert("erreur produits");
    }
    saveBasket(basket);
    location.reload();
}

