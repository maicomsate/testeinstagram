let seguidores = parseInt(prompt("Qual a quantidade de seguidores?"));
let visualizacao = parseInt(prompt("Qual a quantidade de visualização você teve?"));

let precisa = seguidores * 0.05;

if (visualizacao >= precisa * 2) {
    console.log('Parabéns, excelente');
} else if (visualizacao < precisa) {
    console.log('Muito baixo, você não teve um bom desempenho');
} else {
    console.log('Está bom, mas pode melhorar');
}