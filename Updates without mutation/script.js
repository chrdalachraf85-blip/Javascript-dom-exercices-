'use strict';
let panier = Object.freeze([
  Object.freeze({ id: 1, nom: 'Clavier', prix: 250, qte: 1 }),
  Object.freeze({ id: 2, nom: 'Souris', prix: 90, qte: 2 })
]);

function incrementer(panier, id){
  return panier.map((item) =>
    item.id === id ? { ...item, qte: item.qte + 1 } : item
  )
}

function decrementer(panier, id){
  const maped  = panier.map((item) => item.id == id ? {...item , qte: item.qte - 1} : item)
  const final = maped.filter(item => item.qte > 0)
  return final
}
const produit = {id:2, nom: 'ecran', prix : 1400, qte:1}
function ajouter(panier, produit){
  const existe = panier.some(item => item.id === produit.id)
  return existe ? panier.map(item => item.id === produit.id ? { ...item, qte: item.qte + 1 } : item) : [...panier, { ...produit }]
  // const filter = panier.map((item) => item.id === produit.id ?  {...item , qte: item.qte + 1}  : item) 
    
}


console.log(ajouter(panier, produit))
// panier =ajouter(panier, produit)
const list = document.querySelector("#panier")
const totalprice = document.querySelector("#total")
function render(){
  list.textContent = ""
  panier.forEach(item => {
    const li = document.createElement("li")
    const btnpls = document.createElement("button")
    const btnmns = document.createElement("button")

     li.textContent =`${item.nom} — ${item.prix}$ × ${item.qte} `;

    btnpls.textContent = '+';
    btnpls.dataset.action = 'plus';
    btnpls.dataset.id = item.id;
  
    btnmns.textContent = '-';
    btnmns.dataset.action = 'minus';
    btnmns.dataset.id = item.id;

    li.append(btnmns," ",btnpls)
    list.appendChild(li)  
  });
  const total = panier.reduce((somme, current) => somme + current.prix * current.qte , 0)
  totalprice.textContent = `${total}$`

  
}
list.addEventListener("click" , event => {
  const button = event.target.closest("button")
  if(!button)return;
  const id = Number(button.dataset.id)
  panier = button.dataset.action === "plus" ? incrementer(panier , id) : decrementer(panier , id)
  render()
})
  render()