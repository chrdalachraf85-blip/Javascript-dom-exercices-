const depenses = [
  { libelle: 'Marché', categorie: 'Courses', montant: 320 },
  { libelle: 'Bus', categorie: 'Transport', montant: 60 },
  { libelle: 'Cinéma', categorie: 'Loisirs', montant: 90 },
  { libelle: 'Épicerie', categorie: 'Courses', montant: 140 },
  { libelle: 'Taxi', categorie: 'Transport', montant: 85 }
];
const depenses_groupees = depenses.reduce((acc, depense) => {
  acc[depense.categorie] = (acc[depense.categorie] || 0) + depense.montant;
  return acc; 
}, {});
const array = Object.entries(depenses_groupees)
console.log(array);
array.sort((a,b) => b[1] - a[1])
const total = array.reduce((total,element) => total + element[1] ,0)
console.log(total);
console.log(array);





const graph = document.querySelector("#graphique")
const maximum = array[0][1]
const lignes = array.map(([categorie, montant]) => {
  const percentage = (montant / maximum) * 100;
  console.log(percentage);
  console.log(montant)

  const div1 = document.createElement("div")
  div1.className = "flex flex-col gap-2"
  const spanname = document.createElement("span")
  spanname.textContent = categorie
  const divbar = document.createElement("dib")
  divbar.className = "h-4 bg-blue-500 rounded"
  divbar.style.width = percentage
  const spanamnt = document.createElement("span")
  spanamnt.textContent = montant

  div1.append(spanname,spanamnt,divbar)
  graph.appendChild(div1)

});


const ttotal = document.querySelector("#total") 
ttotal.textContent = total