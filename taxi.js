class Personnage {
  constructor(nom, santeMentale) {
    this.nom = nom;
    this.santeMentale = santeMentale;
  }

  perdreSanteMentale() {
    this.santeMentale -= 1;
  }
}

const musiques = ["Musique1", "Musique2", "Musique3", "Anissa", "Musique5"];

class Trajet {
  constructor(feuxRouges) {
    this.feuxRouges = feuxRouges;
    this.changements = 0;
  }

  jouerMusique() {
    return musiques[Math.floor(Math.random() * musiques.length)];
  }

  effectuerTrajet(personnage) {
    for (let i = 1; i <= this.feuxRouges; i++) {
      const musique = this.jouerMusique();
      console.log(`Feu rouge ${i}: Musique - ${musique}, feux restants - ${this.feuxRouges - i}`);
      
      if (musique === "Anissa") {
        personnage.perdreSanteMentale();
        console.log(`La santé mentale de ${personnage.nom} tombe à ${personnage.santeMentale}.`);

        
        if (personnage.santeMentale === 0) {
          console.log("Explosion !");
          return;
        }
        
        this.changements++;
      }
    }
    
    console.log(`${personnage.nom} est bien arrivé après ${this.changements} changements de taxi.`);
  }
}

const john = new Personnage("John", 10);
const trajet = new Trajet(30);
trajet.effectuerTrajet(john);
