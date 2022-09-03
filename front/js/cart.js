//Affichage du panier

//Récupère le container des articles à afficher et le panier du LS
let cart__items = document.getElementById("cart__items");

// Valeur par default dela quantité total et du prix total
let cartTotalItems = 0;
let cartTotalPrice = 0;


// Fetch les info d'un produit en fonction de son id
async function recuperationSpecs(id){
    try {
      let specProduit = await fetch(("http://localhost:3000/api/products/" + id))
      return specProduit.json() ;
    } 
    catch (error) { 
      alert("Le serveur ne répond pas");
      
    }
  
  
}

//Récupère les span totalQuantity et totalPrice
let totalQuantity = document.querySelector('#totalQuantity');
let totalPrice = document.querySelector('#totalPrice');


//Modifie l'affichage du nombre total d'articles et du prix total dans le DOM
async function changeTotalDOM(localStorage){
    cartTotalItems = 0;
    cartTotalPrice = 0;
    for(let i=0;i<localStorage.length;i=i+1){
        const specProduit = await recuperationSpecs(localStorage[i].id);

        cartTotalItems += parseInt(localStorage[i].chosenQuantity);
        cartTotalPrice += specProduit.price * parseInt(localStorage[i].chosenQuantity);

    }
    totalQuantity.innerHTML = cartTotalItems;
    totalPrice.innerHTML = cartTotalPrice;

}


// listener sur les boutons de suppression et de changement de quantité,call des fonctions du LS au click
async function deleteElements(){

    let deleteBtns = document.getElementsByClassName("deleteItem");

    Object.values(deleteBtns).forEach(deleteBtn => {
                                        
        deleteBtn.addEventListener('click', e => {
                                            
            let article = deleteBtn.closest("article");
            let deleteBtnId = article.getAttribute("data-id");
            let deleteBtncolor = article.getAttribute("data-color");
            let supProduit = {
                id: deleteBtnId,
                color : deleteBtncolor
            }
            article.remove();
            deleteBasketProduct(supProduit);
            changeTotalDOM(getBasket());

                                            
            

        })
    })
}


async function changeQuantity(){
    
    let changequantityBtns = document.getElementsByClassName("itemQuantity");

    Object.values(changequantityBtns).forEach(changeQuantityBtn => {
        changeQuantityBtn.addEventListener('change',e =>{
            
            let article = changeQuantityBtn.closest("article");
            let changeQuantityBtnID = article.getAttribute("data-id");
            let changeQuantityBtnColor = article.getAttribute("data-color");
            let newQuantity = changeQuantityBtn.value;

            changeBasketQty(changeQuantityBtnID,changeQuantityBtnColor,newQuantity);
            changeTotalDOM(getBasket());

        })
        
        

    }

    )


}



//Pour chaque produit, await fecth de l'id puis affiche ses infos et modifie les valeurs cartTotalPrice/Items
async function affichagePanier() {
        
    let basket = getBasket();

    for(let i=0;i<basket.length;i=i+1){
        
        const specProduit = await recuperationSpecs(basket[i].id);
        
        const article = document.createElement("article");
        article.setAttribute("class","cart__item");
        article.setAttribute("data-id",basket[i].id);
        article.setAttribute("data-color",basket[i].chosenColor);
        cart__items.appendChild(article);

        const div__item__img = document.createElement("div");
        div__item__img.setAttribute("class","cart__item__img");
        article.appendChild(div__item__img);

        const img = document.createElement("img");
        img.setAttribute("src",specProduit.imageUrl);
        div__item__img.appendChild(img);

        const div__item__content = document.createElement("div");
        div__item__content.setAttribute("class","cart__item__content");
        article.appendChild(div__item__content);

        const div__item__content__description = document.createElement ("div");
        div__item__content__description.setAttribute("class","cart__item__content__description");
        div__item__content.appendChild(div__item__content__description);

        const h2 = document.createElement("h2");
        h2.append(specProduit.name);
        div__item__content__description.appendChild(h2);

        const p_color = document.createElement("p");
        p_color.append(basket[i].chosenColor);
        div__item__content__description.appendChild(p_color);

        const p_price = document.createElement("p");
        p_price.append(specProduit.price + "€");
        div__item__content__description.appendChild(p_price);

        const div__item__content__settings = document.createElement ("div");
        div__item__content__settings.setAttribute("class","cart__item__content__settings");
        div__item__content.appendChild(div__item__content__settings);

        const div__item__content__settings__quantity = document.createElement("div");
        div__item__content__settings__quantity.setAttribute("class","cart__item__content__settings__quantity");
        div__item__content__settings.appendChild(div__item__content__settings__quantity);

        const p_qty = document.createElement("p");
        p_qty.append("Qté:");
        div__item__content__settings__quantity.appendChild(p_qty);

        const input__itemQty = document.createElement("input");
        input__itemQty.setAttribute("type","number");
        input__itemQty.setAttribute("class","itemQuantity");
        input__itemQty.setAttribute("name","itemQuantity");
        input__itemQty.setAttribute("min","1");
        input__itemQty.setAttribute("max","100");
        input__itemQty.setAttribute("value",basket[i].chosenQuantity);
        div__item__content__settings__quantity.appendChild(input__itemQty);

        const div__item__content__settings__delete = document.createElement("div");
        div__item__content__settings__delete.setAttribute("class","cart__item__content__settings__delete");
        div__item__content__settings.appendChild(div__item__content__settings__delete);

        const p__deleteItem = document.createElement("p");
        p__deleteItem.setAttribute("class","deleteItem");
        p__deleteItem.append("Supprimer");
        div__item__content__settings__delete.appendChild(p__deleteItem);

        cartTotalItems += parseInt(basket[i].chosenQuantity);
        cartTotalPrice += specProduit.price * parseInt(basket[i].chosenQuantity);

    }
    //call des fonctions des listener
    deleteElements();
    changeQuantity();

    //affichage quantité/prix total 
    totalQuantity.innerHTML = cartTotalItems;
    totalPrice.innerHTML = cartTotalPrice;

}
affichagePanier()

// vérif form + POST

//on recupere les input du formulaire 

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector('#address');
let city = document.querySelector("#city");
let email = document.querySelector("#email");

// et leurs messages d'erreur respectifs 

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");


// fonctions de validation de regex
// return testFirstName (Boolean) et affiche un message d'erreur en fonction de sa valeur

function validationfirstName(vfirstName){
    let infoRegex = new RegExp('^[a-zA-Z-_./]{0,100}$', 'g');
    let testFirstName = infoRegex.test(vfirstName.value);
    
    
    if(testFirstName === false){
        firstNameErrorMsg.innerHTML = "Veuillez vérifiez vos informations svp";
    }else if (testFirstName === true){
        firstNameErrorMsg.innerHTML = "" ;
    }
    return testFirstName;
}


function validationLastName(vlastName){
    let infoRegex = new RegExp('^[a-zA-Z-_./]{0,100}$', 'g');
    let testLastName = infoRegex.test(vlastName.value);

    if(testLastName === false){
        lastNameErrorMsg.innerHTML = "Veuillez vérifiez vos informations svp";
    
    }else if (testLastName === true){
        lastNameErrorMsg.innerHTML = "" ;
    }
    return testLastName;
}


function validationCity(vCity){
    let infoRegex = new RegExp('^[a-zA-Z-_./]{0,100}$', 'g');
    let testCity = infoRegex.test(vCity.value);

    if(testCity === false){
        cityErrorMsg.innerHTML = "Veuillez vérifiez vos informations svp";
    
    }else if (testCity === true){
        cityErrorMsg.innerHTML = "" ;
    }
    return testCity;
}

function validationAdresse(vAddress){
    let adresseRegex = new RegExp('[a-zA-Z0-9-_./]{0,100}', 'g');
    let testAdresse = adresseRegex.test(vAddress.value);
    
    if(testAdresse === false){
        addressErrorMsg.innerHTML = "Veuillez vérifier votre adresse svp";
    
    }else if (testAdresse === true){
        addressErrorMsg.innerHTML = "" ;
    }
    return testAdresse;
}

function validationEmail(vEmail){
    let emailRegex = new RegExp('^[a-zA-Z0-9.-_]{1,50}[@]{1}[a-zA-Z0-9.-_]{1,50}[.]{1}[a-z]{2,10}$', 'g');
    let testEmail = emailRegex.test(vEmail.value);

    if(testEmail === false){
        emailErrorMsg.innerHTML = "Veuillez vérifier la validité de votre adresse mail svp";
    
    }else if (testEmail === true){
        emailErrorMsg.innerHTML = "";
    }
    return testEmail;
}

//On déclare les variables des tests pour la vérification finale des données avec une valeur false par default

let testValidationFirstName = false;
let testValidationLastName = false;
let testValidationAdress = false;
let testValidationCity = false;
let testValidationEmail = false;
let testPanier = false;

//On appelle les fonctions de vérification des regex au change de leur input respectif et on reattribue une valeur aux variable de test (Boolean)

firstName.addEventListener("change",e=>{
    
    testValidationFirstName = validationfirstName(firstName);
})


lastName.addEventListener("change",e =>{
    
    testValidationLastName = validationLastName(lastName);
})

address.addEventListener("change",e =>{
    
    testValidationAdress = validationAdresse(address);
    
})

city.addEventListener("change",e =>{
    
    testValidationCity = validationCity(city);
    
})

email.addEventListener("change",e =>{
    
    testValidationEmail = validationEmail(email);
})


// Crée l'objet à envoyer à l'API et reattribue une valeur à testPanier

function makePostdata() {
    
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    let finalCart = getBasket();
    let productIDs = [];



    if(finalCart.length > 0){
        testPanier = true;
        for (i = 0; i < finalCart.length; i++) {
            productIDs.push(finalCart[i].id);
            let postData = {contact:contact,products:productIDs};
            console.log(postData);
            return postData;
        
            
        }   
    } else {
        testPanier = false;

    }
    
}

//envoi de l'objet contact et du tableau products par fetch si les données sont valides (si tout les test ont une valeur true)
//redirection sur la page de confirmation ("./confirmation.html?id=" + data.orderId) et clear du LS

const orderBtn = document.getElementById("order");
const postUrl = "http://localhost:3000/api/products/order";
orderBtn.addEventListener("click", e => {
    
    
    e.preventDefault(); 
    let jsonData = makePostdata();

    console.log(testValidationFirstName,testValidationLastName,testValidationAdress,testValidationCity,testValidationEmail)
    
    if(firstName.value === "" || lastName.value === "" || address.value === "" || email.value === "" || city.value === ""){
        alert("Veuillez remplir le formulaire svp");
    }else if (testValidationFirstName == false || testValidationLastName == false || testValidationAdress == false ||testValidationCity == false || testValidationEmail == false ){
        alert("Veuillez vérifier les champs de formulaire svp");

    }else if(testPanier == false){
        alert("Votre panier est vide");
    }
    else{
    
    fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(jsonData)
    })
        .then(res => { return res.json()}
        )
        
        .then(data => { 
            
        localStorage.clear();
        let confirmationUrl = "./confirmation.html?id=" + data.orderId;
        window.location.href = confirmationUrl;
        
            
    })}
});