var gameState = {
  // cria as variaveis para deixar a tela responsível
  gameWidth: window.innerWidth * Math.max(1, window.devicePixelRatio / 2),          // 960 
  gameHeight: window.innerHeight * Math.max(1, window.devicePixelRatio / 2),        // 540 
  mediaWidth: (window.innerWidth * Math.max(1, window.devicePixelRatio / 2)) / 2,   // 480
  mediaHeight: (window.innerHeight * Math.max(1, window.devicePixelRatio / 2)) / 2, // 270

  //cria a variavel para definir o volume inicial da música e modifica-lo posteriormente
  volumeMusica: 1,
  volumeSom: 1,

  //cria variavel que informa se a musica esta tocando, para assim não começar outra
  musicaTocando: false,

  //cria as variáveis que manterão os sliders no mesmo lugar depois de trocar de cena
  sliderMusica: ((window.innerWidth * Math.max(1, window.devicePixelRatio / 2)) / 2) * 1.23,
  sliderSom: ((window.innerWidth * Math.max(1, window.devicePixelRatio / 2)) / 2) * 1.23,

  //informa quais foram as cenas passadas, para retornar a elas
  cenaPassada: "TelaInicial",
  cenaComputador: "TelaPC1",

  //informa que o game não está finalizado
  gameFinalizado: false,


  //informa qual é o sprite do progresso
  spriteProgresso: 0,

  //informa se já pode dormir
  dormir: false,

  //informa se terminou de falar
  fimFalas: false,

  //informa se o post-it pode piscar pela primeira e segunda vez
  postIt: false,
  postIt2: false,

  //informa se o computador já piscou depois do post-it pela primeira e segunda vez
  fimPC: false,
  fimPC2: false,

  //define se já falou ou não o diálogo inicial da casa
  dialogoApresentacao: false,
}

var config = {
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.FIT, // ativa a função para que o jogo se adapte à tela 
    width: gameState.gameWidth, //define a largura do quadro
    height: gameState.gameHeight, //define a altura do quadro
    autoCenter: Phaser.Scale.CENTER_BOTH // ativa a autocentralização do jogo
  },
  scene: [TelaInicial, Configuracoes, MenuFases, CasaInicial, TelaPC1, TelaPC2, TelaPC3, TelaPC4, TelaPC5, TelaPC6, TelaPC7, TelaPC8, TelaFinal],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
    debug: true,
  }
};

var game = new Phaser.Game(config);
