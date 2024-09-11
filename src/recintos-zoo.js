class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: "savana", tamanho: 10, animais: ["macaco", "macaco", "macaco"],},
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      { numero: 3, bioma: "savana e rio", tamanho: 7, animais: ["gazela"] },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      { numero: 5, bioma: "savana", tamanho: 9, animais: ["leão"] },
    ];

    this.animais = {
      leao: { tamanho: 3, bioma: "savana", carnivoro: true },
      leopardo: { tamanho: 2, bioma: "savana", carnivoro: true },
      crocodilo: { tamanho: 3, bioma: "rio", carnivoro: true },
      macaco: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      gazela: { tamanho: 2, bioma: "savana", carnivoro: false },
      hipopotamo: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaRecintos(animal, quantidade) {
    const animalInfo = this.animais[animal.toLowerCase()];
    const resultados = [];

    if (!animalInfo) {
      return { erro: "Animal inválido" };
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    for (let recinto of this.recintos) {
      
      if (!recinto.bioma.includes(animalInfo.bioma)) {
        continue;
      }

      const espaçoNecessario = quantidade * animalInfo.tamanho;
      const espaçoOcupado = recinto.animais.map((a) => this.animais[a].tamanho).reduce((total, tamanho) => total + tamanho, 0);
      const espaçoAtual = recinto.tamanho - espaçoOcupado;
      const especieUnica = recinto.animais.every(a => this.animais[a].nome === animalInfo.nome);

      if (espaçoNecessario >= espaçoAtual) {
        continue;
      }

      const haCarnivoros = recinto.animais.some(a => this.animais[a].carnivoro);

      if (animalInfo.carnivoro === true) {
        if (recinto.animais.length > 0 && !especieUnica) {
            continue;
        }
       }   
      if (animalInfo.carnivoro === false && haCarnivoros) {
        continue;
      }

      if (animal === "hipopotamo" && recinto.animais.length > 0) {
        if (recinto.bioma !== "savana e rio") {
          continue;
        }
      }

      if (animal === "macaco") {
        if (quantidade < 2 && recinto.animais.length === 0) {
          continue;
        }
      }

      if (recinto.animais.some((a) => !this.animais[a].bioma.includes(animalInfo.bioma) && animalInfo.bioma !== "hipopotamo")) {
        continue;
    }

      resultados.push({
        numero: recinto.numero,
        espaçoLivre: espaçoAtual - espaçoNecessario,
        espaçoTotal: recinto.tamanho
      });
    }

    resultados.sort((a, b) => a.numero - b.numero);

    if (resultados.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return {
      erro: null,
      recintosViaveis: resultados.map((recinto) =>`Recinto ${recinto.numero} (espaço livre: ${recinto.espaçoLivre} total: ${recinto.espaçoTotal})`),
    };
  }
}
export { RecintosZoo as RecintosZoo };
