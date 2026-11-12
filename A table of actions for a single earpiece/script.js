let taches = [
  { id: 1, titre: 'Lire la doc', faite: false },
  { id: 2, titre: 'Écrire les tests', faite: false },
  { id: 3, titre: 'Déployer', faite: true }
];

const liste = document.querySelector('#taches');

const actions = {
  basculer: (taches, id) =>
    taches.map(tache =>
      tache.id === id ? { ...tache, faite: !tache.faite } : tache
    ),

  dupliquer: (taches, id) => {
    const index = taches.findIndex(tache => tache.id === id);
    if (index === -1) return taches;

    const nouvelleId = Math.max(0, ...taches.map(tache => tache.id)) + 1;
    const copie = { ...taches[index], id: nouvelleId };
    return [...taches.slice(0, index + 1), copie, ...taches.slice(index + 1)];
  },

  monter: (taches, id) => {
    const index = taches.findIndex(tache => tache.id === id);
    if (index <= 0) return taches;

    const nouveauTableau = [...taches];
    [nouveauTableau[index - 1], nouveauTableau[index]] =
      [nouveauTableau[index], nouveauTableau[index - 1]];
    return nouveauTableau;
  },

  supprimer: (taches, id) => taches.filter(tache => tache.id !== id)
};

function creerBouton(label, action, id) {
  const bouton = document.createElement('button');
  bouton.type = 'button'; 
  bouton.textContent = label;
  bouton.dataset.action = action;
  bouton.dataset.id = id;
  bouton.className = 'rounded border px-2 py-1 text-sm';
  return bouton;
}

function afficherTaches() {
  liste.replaceChildren(); 

  taches.forEach(tache => {
    const ligne = document.createElement('li');
    ligne.className = 'flex items-center gap-2';

    const titre = document.createElement('span');
    titre.textContent = tache.titre;
    if (tache.faite) titre.className = 'line-through text-gray-400';

    
    const boutons = document.createElement('div');
    boutons.className = 'flex gap-2';
    boutons.append(
      creerBouton('Basculer', 'basculer', tache.id),
      creerBouton('Dupliquer', 'dupliquer', tache.id),
      creerBouton('Monter', 'monter', tache.id),
      creerBouton('Supprimer', 'supprimer', tache.id)
    );

    ligne.append(titre, boutons);
    liste.append(ligne);
  });
}


liste.addEventListener('click', event => {
  const bouton = event.target.closest('button[data-action]');
  if (!bouton || !liste.contains(bouton)) return;

  const nomAction = bouton.dataset.action;
  const id = Number(bouton.dataset.id);
  const executer = actions[nomAction];

  if (typeof executer !== 'function') {
    console.warn(`Unknown action: ${nomAction}`);
    return;
  }

  taches = executer(taches, id);
  afficherTaches();
});

afficherTaches();
