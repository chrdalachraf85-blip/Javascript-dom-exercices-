const teams = [
  { nom: 'Atlas', ville: 'Fès', score: 42 },
  { nom: 'Zénith', ville: 'Agadir', score: 57 },
  { nom: 'Écho', ville: 'Tanger', score: 42 },
  { nom: 'Delta', ville: 'Oujda', score: 13 }
];

let sortState = { key: 'nom', direction: 1 };
const corps = document.querySelector('#corps');
const entetes = document.querySelector('#entetes');

function sortTeams(teamList, key, direction) {
  return [...teamList].sort((teamA, teamB) => {
    let comparison;
    if (typeof teamA[key] === 'number') {
      comparison = teamA[key] - teamB[key];
    } else {
      comparison = teamA[key].localeCompare(teamB[key], 'fr', {
        sensitivity: 'accent'
      });
    }
    if (key === 'score' && comparison === 0) {
      return teamA.nom.localeCompare(teamB.nom, 'fr', {
        sensitivity: 'accent'
      });
    }

    return comparison * direction;
  });
}
function displayTeams() {
  const sortedTeams = sortTeams(teams, sortState.key, sortState.direction);
  const rows = sortedTeams.map(team => {
    const row = document.createElement('tr');
    row.classList.add('border-t');

    [team.nom, team.ville, team.score].forEach(value => {
      const cell = document.createElement('td');
      cell.classList.add('p-2');
      cell.textContent = value;
      row.append(cell);
    });
    return row;
  });
  corps.replaceChildren(...rows);
  displayArrow();
}
function displayArrow() {
  entetes.querySelectorAll('th').forEach(header => {
    const label = header.textContent.replace(/[ ▲▼]$/u, '');
    const arrow = header.dataset.cle === sortState.key
      ? (sortState.direction === 1 ? ' ▲' : ' ▼')
      : '';

    header.textContent = label + arrow;
  });
}

entetes.addEventListener('click', event => {
  const clickedHeader = event.target.closest('th[data-cle]');
  if (!clickedHeader) return;
  const clickedKey = clickedHeader.dataset.cle;

  if (sortState.key === clickedKey) {
    sortState.direction *= -1;
  } else {
    sortState = { key: clickedKey, direction: 1 };
  }

  displayTeams();
});
displayTeams();
