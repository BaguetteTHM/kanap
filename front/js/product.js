//Recupere id dans l'URL

let str = window.location;
let url = new URL(str);
let id = url.searchParams.get("id");

//Fetch le produit/objet spécifique à cet id

async function recuperationProduit(){
    try {
      const produit = await fetch("http://localhost:3000/api/products/" + id)
      return produit.json();
    } 
    catch (error) { 
      alert("Le serveur ne répond pas");
      
    }
  
  
}

//Affiche les valeurs associées à ce produit/objet

async function affichageProduit(){
    const produit = await recuperationProduit();
    console.log(produit);

    const title = document.querySelector("#title");
    title.append(produit.name);

    const price = document.querySelector("#price");
    price.append(produit.price)

    const description = document.querySelector("#description")
    description.append(produit.description)


    const img = document.createElement("img");
    img.setAttribute("src",produit.imageUrl);
    img.setAttribute("alt",produit.altTxt);
    const itemImg = document.querySelector(".item__img");
    itemImg.appendChild(img);

    const colors = document.getElementById("colors")

    for(let i=0;i<produit.colors.length;i=i+1){
        const option = document.createElement("option");
        option.setAttribute("value",produit.colors[i]);
        option.text = produit.colors[i];
        colors.appendChild(option);
   
    }
    


}

affichageProduit ()

//onclick sur bouton "commander"
const btn = document.querySelector("#addToCart")


btn.addEventListener('click',e => {
  console.log(e.target)
  
  //récupére les valeurs : couleur(str),quantité(numb)
  const color = document.querySelector("#colors");
  const chosenColor = color.value;
  console.log(chosenColor);

  const quantity = document.querySelector("#quantity");
  const chosenQuantity = quantity.value;
  console.log(chosenQuantity);

  // teste que couleur =//= "" et tester que quantité =//= 0 et NULL 
  // crée l'objet ou affiche un message d'erreur

  if (chosenColor !== "" && chosenQuantity > 0 && chosenQuantity <= 100 && chosenQuantity !== null){
    const cartProducts = {
      id: id,
      chosenColor: chosenColor,
      chosenQuantity: chosenQuantity,
    };
    console.log(cartProducts);
    addBasket(cartProducts);
  }
  else{
    alert("Veuillez choisir une couleur et une quantité valide (entre 1 et 100)")
    
  }
    
    
})





