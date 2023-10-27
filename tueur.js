// Création du tueur en série Jason
const jason = {
  nom: "Jason",
  pointsDeVie: 100,
};

// Caractéristiques de personnages
const caracteristiques = [
  { nom: "nerd", probabiliteMort: 0.3, probabiliteDegats: 0.5, probabiliteMortDegats: 0.2 },
  // Ajoutez d'autres caractéristiques ici
];

// Tableau de prénoms de survivants
const prenomsSurvivants = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Helen", "Ivy", "Jack"];

// Fonction pour générer un survivant aléatoire
function genererSurvivant() {
  const nomIndex = Math.floor(Math.random() * prenomsSurvivants.length);
  const nom = prenomsSurvivants.splice(nomIndex, 1)[0]; // Retirer le nom du tableau
  const caracteristique = caracteristiques[Math.floor(Math.random() * caracteristiques.length)];
  return {
    nom,
    caracteristique,
    pointsDeVie: 100,
    mort: false,
  };
}

// Création d'une équipe de survivants
const equipeSurvivants = [];
const survivantsChoisis = []; // Tableau pour suivre les survivants déjà choisis
for (let i = 0; i < 5; i++) {
  let survivant = genererSurvivant();
  while (survivantsChoisis.includes(survivant.nom)) {
    survivant = genererSurvivant();
  }
  survivantsChoisis.push(survivant.nom);
  equipeSurvivants.push(survivant);
}

// Fonction pour simuler une attaque
function attaquer(attaqueur, cible) {
  if (cible.pointsDeVie <= 0 || cible.mort) {
    return; // Ne faites rien si la cible est déjà morte ou a déjà été attaquée
  }

  const action = Math.random();
  if (action < cible.caracteristique.probabiliteMort) {
    console.log(`${attaqueur.nom} a tué ${cible.nom}.`);
    cible.pointsDeVie = 0;
    cible.mort = true;
  } else if (action < cible.caracteristique.probabiliteDegats) {
    console.log(`${cible.nom} a esquivé l'attaque de ${attaqueur.nom} et infligé 10 points de dégâts.`);
    cible.pointsDeVie -= 10;
  } else if (action < cible.caracteristique.probabiliteMortDegats) {
    console.log(`${cible.nom} a infligé 15 points de dégâts à ${attaqueur.nom}, mais est mort en le faisant.`);
    cible.pointsDeVie = 0;
    cible.mort = true;
  }
}

// Boucle de simulation de la traque
while (jason.pointsDeVie > 0 && equipeSurvivants.some(survivant => survivant.pointsDeVie > 0)) {
  equipeSurvivants.forEach(survivant => {
    if (survivant.pointsDeVie > 0) {
      attaquer(jason, survivant);
    }
  });
}

// Trouver les survivants morts
const survivantsMorts = equipeSurvivants.filter(survivant => survivant.mort);
const nomsMorts = survivantsMorts.map(survivant => survivant.nom);

// Vérifier le résultat
if (jason.pointsDeVie <= 0) {
  console.log("Jason est mort. Les survivants ont gagné.");
} else if (nomsMorts.length === equipeSurvivants.length) {
  console.log("Les survivants ont tous péri. Jason l'emporte.");
} else if (nomsMorts.length > 0) {
  console.log("Les survivants ont gagné, mais RIP à " + nomsMorts.join(", "));
} else {
  console.log("Les survivants ont gagné, aucun mort.");
}
