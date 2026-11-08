const etat = {
  filtre: "tous",
  projets: [
    { id: 1, titre: "Portfolio", archive: false },
    { id: 2, titre: "Blog", archive: true },
    { id: 3, titre: "Quiz", archive: false },
  ],
};
function projetsVisibles(etat) {
  if (etat.filtre === "actifs") {
    return etat.projets.filter((projet) => !projet.archive);
  }
  if (etat.filtre === "archives") {
    return etat.projets.filter((projet) => projet.archive);
  }
  return etat.projets;
}

function render() {
  const liste = document.querySelector("#liste");
  const resume = document.querySelector("#resume");
  const projets = projetsVisibles(etat);

  liste.replaceChildren();

  projets.forEach((projet) => {
    const li = document.createElement("li");
    li.textContent = projet.titre;
    liste.appendChild(li);
  });

  resume.textContent = `${projets.length} projet(s) sur ${etat.projets.length}`;

  document.querySelectorAll("#onglets button").forEach((bouton) => {
    const actif = bouton.dataset.filtre === etat.filtre;
    bouton.classList.toggle("bg-blue-600", actif);
    bouton.classList.toggle("text-white", actif);
    bouton.classList.toggle("bg-gray-200", !actif);
  });
}

document.querySelector("#onglets").addEventListener("click", (event) => {
  const bouton = event.target.closest("button");
  if (!bouton) return;

  etat.filtre = bouton.dataset.filtre;
  render();
});
console.log(projetsVisibles(etat))
render();
