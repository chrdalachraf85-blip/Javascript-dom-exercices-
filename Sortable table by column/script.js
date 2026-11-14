const equipes = [
  { nom: 'Atlas', ville: 'Fès', score: 42 },
  { nom: 'Zénith', ville: 'Agadir', score: 57 },
  { nom: 'Écho', ville: 'Tanger', score: 42 },
  { nom: 'Delta', ville: 'Oujda', score: 13 }
];
let tri = { cle: 'nom', sens: 1 };
const corps = document.querySelector('#corps');
const entetes = document.querySelector('#entetes');

function display(data){
   const tr = document.createElement("tr")
   const tdname = document.createElement("td")
   const tdcity = document.createElement("td")
   const tdscore = document.createElement("td")
   tdname.textContent= data.nom
   tdcity.textContent = data.ville
   tdscore.textContent = data.score
   tr.append(tdname,tdcity,tdscore)
   corps.appendChild(tr)
}
equipes.forEach((a) => display(a))

function trier(donnees, cle, sens) {
  return [...donnees].sort((a, b) => {
    let comparaison;

    if (typeof a[cle] === 'number') {
      comparaison = a[cle] - b[cle];
    } else {
      comparaison = a[cle].localeCompare(b[cle], 'fr', {
        sensitivity: 'accent'
      });
    }

    // Keep equal scores in ascending name order, whichever way scores are sorted.
    if (cle === 'score' && comparaison === 0) {
      return a.nom.localeCompare(b.nom, 'fr', {
        sensitivity: 'accent'
      });
    }

    return comparaison * sens;
  });
}
function afficher() {
  const equipesTriees = trier(equipes, tri.cle, tri.sens);

  corps.innerHTML = equipesTriees.map(equipe => `
    <tr class="border-t">
      <td class="p-2">${equipe.nom}</td>
      <td class="p-2">${equipe.ville}</td>
      <td class="p-2">${equipe.score}</td>
    </tr>
  `).join('');

  afficherFleche();
}







function afficherFleche() {
  entetes.querySelectorAll('th').forEach(th => {
    const label = th.textContent.replace(/[ ▲▼]$/u, '');
    const estActif = th.dataset.cle === tri.cle;

    const fleche = estActif
      ? (tri.sens === 1 ? ' ▲' : ' ▼')
      : '';

    th.textContent = label + fleche;
  });
}



entetes.addEventListener('click', evenement => {
  const th = evenement.target.closest('th[data-cle]');
  if (!th) return;

  const cleCliquee = th.dataset.cle;

  if (tri.cle === cleCliquee) {
    tri.sens *= -1;
  } else {
    tri = { cle: cleCliquee, sens: 1 };
  }

  afficher();
});

afficher();