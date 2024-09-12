class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: ["savana"], tamanho: 10, animais: ["macaco", "macaco", "macaco"]},
        { numero: 2, bioma: ["floresta"], tamanho: 5, animais: [] },
        { numero: 3, bioma: ["savana", "rio"], tamanho: 7, animais: ["gazela"] },
        { numero: 4, bioma: ["rio"], tamanho: 8, animais: [] },
        { numero: 5, bioma: ["savana"], tamanho: 9, animais: ["leao"] },
      ];
  
      this.animais = {
        leao: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        leopardo: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        crocodilo: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        macaco: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        gazela: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        hipopotamo: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      animal = animal.toLowerCase()
      const animalInfo = this.animais[animal];
      const resultados = [];
  
      if (!animalInfo) {
        return { erro: "Animal inválido" };
      }
  
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      for (let recinto of this.recintos) {
        const mesmoBioma = animalInfo.biomas.some((bioma => recinto.bioma.includes(bioma)))
        if (!mesmoBioma) {
          continue;
        }
  
        const espacoNecessario = quantidade * animalInfo.tamanho;
        const espacoOcupado = recinto.animais.map((animal) => this.animais[animal]?.tamanho).reduce((total, tamanho) => total + tamanho, 0);
        const espacoAtual = recinto.tamanho - espacoOcupado;
        const especieUnica = recinto.animais.every(a => a === animal.toLowerCase());
        const espacoExtra = !especieUnica? 1 : 0;
        const espacoLivre = espacoAtual - espacoNecessario - espacoExtra;
  
        if (espacoNecessario >= espacoAtual) {
          continue;
        }
  
        const haCarnivoros = recinto.animais.some(animal => animal && this.animais[animal].carnivoro);
  
        if (animalInfo.carnivoro === true) {
          if (recinto.animais.length > 0 && !especieUnica) {
            continue;
          }
        }   
  
        if (animalInfo.carnivoro === false && haCarnivoros) {
          continue;
        }
  
        if (animal === "hipopotamo" && recinto.animais.length > 0) {
          if (recinto.numero === 3) {
            continue;
          }
        }
  
        if (animal === "MACACO") {
          if (quantidade <= 2 && recinto.animais.length === 0) {
            continue;
          }
        }
  
        resultados.push({
          numero: recinto.numero,
          espacoLivre: espacoLivre,
          espacoTotal: recinto.tamanho
        });
      }
  
      resultados.sort((a, b) => a.numero - b.numero);
  
      if (resultados.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return {
        erro: null,
        recintosViaveis: resultados.map((recinto) =>`Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`),
      };
    }
  }
  export { RecintosZoo as RecintosZoo };