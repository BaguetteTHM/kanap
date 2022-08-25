//on déclare section 
let section = document.getElementById("items");

// recuperationProduits fetch l'ensemble des produits en json
async function recuperationProduits(){
  try {
    const listeProduit = await fetch("http://localhost:3000/api/products")
    return listeProduit.json();
  } 
  catch (error) { 
    alert("Le serveur ne répond pas");
    
  }


}
//await recuperationProduits et affiche les différentes valeurs des objets 
async function affichageProduits(){
  const listeProduit = await recuperationProduits();
  for(let i=0;i<listeProduit.length;i=i+1){

    const link = document.createElement("a");
    link.setAttribute("href","./product.html?id="+listeProduit[i]._id)
    section.appendChild(link);

    const article = document.createElement("article");
    link.appendChild(article);

    const img = document.createElement("img");
    img.setAttribute("src",listeProduit[i].imageUrl);
    img.setAttribute("alt",listeProduit[i].altTxt);
    article.appendChild(img);

    const productName = document.createElement("h3");
    productName.setAttribute("class","productName");
    productName.append(listeProduit[i].name);
    article.appendChild(productName);

    const productDescription = document.createElement("p");
    productDescription.setAttribute("class","productDescription");
    productDescription.append(listeProduit[i].description);
    article.appendChild(productDescription);


  }
}

//call affichageProduits
affichageProduits ()



