class Pokemon {
    constructor(nom, attaque, defense, hp, luck, vitesse) {
      this.nom = nom;
      this.attaque = attaque;
      this.defense = defense;
      this.hp = hp;
      this.luck = luck;
      this.vitesse = vitesse;
    }
  
    attaquer(cible) {
      if (Math.random() * 100 < this.luck) {
        const degats = this.attaque - cible.defense;
        if (degats > 0) {
          cible.hp -= degats;
          console.log(`${this.nom} attaque ${cible.nom} et inflige ${degats} dégâts.`);
        } else {
          console.log(`${this.nom} attaque ${cible.nom}, mais c'est inefficace.`);
        }
      } else {
        console.log(`${this.nom} rate son attaque contre ${cible.nom}.`);
      }
    }
  
    estVivant() {
      return this.hp > 0;
    }
  }
  
  function ordreAttaque(pokemon1, pokemon2) {
    return pokemon2.vitesse - pokemon1.vitesse;
  }
  
  const salamèche = new Pokemon("Salamèche", 203, 185, 282, 60, 229);
  const bulbizarre = new Pokemon("Bulbizarre", 197, 197, 294, 40, 189);
  
  while (salamèche.estVivant() && bulbizarre.estVivant()) {
    const ordre = [salamèche, bulbizarre].sort(ordreAttaque);
    
    ordre[0].attaquer(ordre[1]);
    

    if (!ordre[1].estVivant()) {
      console.log(`${ordre[1].nom} est K.O. ${ordre[0].nom} remporte le duel.`);
      break;
    }

    ordre[1].attaquer(ordre[0]);
    

    if (!ordre[0].estVivant()) {
      console.log(`${ordre[0].nom} est K.O. ${ordre[1].nom} remporte le duel.`);
      break;
    }
  }
  