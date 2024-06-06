class Configuracoes extends Phaser.Scene {
  constructor() {
    super({ key: 'Configuracoes' });
    this.key = "Configuracoes"
  }
  preload() {
    // Carrega as imagens do background (FundoCinza, Fundo Quadriculado, Casa)
    this.load.image("fundoCinza", "assets/telaInicial/fundo_cinza.png");
    this.load.image("fundoQuadriculado", "assets/telaInicial/fundo_quadriculado.png");

    // Carrega os assets de configurações
    this.load.svg("configuracoes", "assets/telaInicial/configuracoes.svg");
    this.load.svg("botaoSair", "assets/telaInicial/botaoX.svg");
    this.load.svg("slider", "assets/telaInicial/bola.svg");
    this.load.audio("musica", "assets/sounds/Aria.ogg");

  }
  create() {

    //modifica o ponteiro do mouse  para o de seta
    this.input.setDefaultCursor("default");

    //cria o cenário de fundo
    this.add.image(gameState.mediaWidth, gameState.mediaHeight, "fundoQuadriculado").setScale(gameState.gameWidth*0.00065);
    this.add.image(gameState.mediaWidth, gameState.mediaHeight, "fundoCinza").setAlpha(0.62).setScale(gameState.gameWidth*0.0007);

    //adiciona as imagens de configurações
    this.botaoSair = this.add.image(gameState.mediaWidth * 1.5 , gameState.mediaHeight * 0.2, "botaoSair")
    this.config = this.add.image(gameState.mediaWidth, gameState.mediaHeight, "configuracoes");
    this.sliderMusica = this.add.image(gameState.sliderMusica, gameState.mediaHeight * 0.88, "slider");
    this.sliderSom = this.add.image(gameState.sliderSom, gameState.mediaHeight * 1.34, "slider");

    //modiciona as escalas das imagens
    this.config.setScale((gameState.gameWidth / this.config.width) * 0.39)
    this.botaoSair.setScale((gameState.gameHeight/this.botaoSair.height)*0.1);
    this.sliderMusica.setScale((gameState.gameHeight/this.sliderMusica.height)*0.065)
    this.sliderSom.setScale((gameState.gameHeight/this.sliderSom.height)*0.065)

    //deixa as imagens de configurações tranparentes
    this.sliderSom.alpha = 0;
    this.botaoSair.alpha = 0;
    this.config.alpha = 0;
    this.sliderMusica.alpha = 0;

    //faz a transição para que as imagens de configurações apareçam 
    this.tweens.add({
      targets: [this.config, this.botaoSair, this.sliderMusica, this.sliderSom],
      alpha: 1,
      duration: 2000,
      repeat: 0
    });

    //torna o botão e os sliders interativos
    this.botaoSair.setInteractive();

    //faz com que seja possível arrastar os sliders
    this.sliderMusica.setInteractive({ draggable: true });
    this.sliderSom.setInteractive({ draggable: true });

    //informa o que faz quando ocorre o drag/arrasto
    this.input.on('drag', (pointer, gameObject, dragX) => {

      //define até onde o drag/arrasto pode ir
      dragX = Phaser.Math.Clamp(dragX, gameState.mediaWidth * 0.87, gameState.mediaWidth * 1.23);
      gameObject.x = dragX;

    });

    //Modifica o ponteiro para clique quando o mouse está em cima do sliderMusica, do sliderSom e do botaoSair
    this.sliderMusica.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.sliderSom.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.botaoSair.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoSair.setScale((gameState.gameHeight/this.botaoSair.height)*0.12);
    });

    //Modifica o ponteiro para o de seta quando o mouse está em cima do sliderMusica, do sliderSom e do botaoSair
    this.sliderMusica.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });
    this.sliderSom.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });
    this.botaoSair.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoSair.setScale((gameState.gameHeight/this.botaoSair.height)*0.1);
    });

    //troca a cena quando o botão de sair é clicado
    this.botaoSair.on("pointerdown", () => {
      gameState.somClickMouse.play()
      this.cameras.main.fadeOut(1000, 209, 209, 209, (camera, progress) => {

        // Quando a transição estiver concluída, carrega o novo cenário
        if (progress == 1) {

          //troca para a cena passada, assim gerando uma linearidade no jogo
          this.scene.transition({ target: gameState.cenaPassada, duration: 2000 });
          this.scene.stop('Configuracoes');
        }
      });
    });
  }

  update() {
    //atualiza a variavel sliderMusica de acordo com a posição do slider.
    gameState.sliderMusica = this.sliderMusica.x;

    //atualiza a variavel sliderSom de acordo com a posição do slider.
    gameState.sliderSom = this.sliderSom.x; //não tem som ainda

    //atualiza o a variavel de volume da musica e do volume do som, de acordo com a razão entre a diferença de posição do slider com o primeiro ponto e o espaço total.
    gameState.volumeMusica = (this.sliderMusica.x - gameState.mediaWidth * 0.87) / (gameState.mediaWidth * 1.23 - gameState.mediaWidth * 0.87);
    gameState.volumeSom = (this.sliderSom.x - gameState.mediaWidth * 0.87) / (gameState.mediaWidth * 1.23 - gameState.mediaWidth * 0.87);

    //atualiza o volume da musica e do som
    gameState.musica.volume = gameState.volumeMusica.toFixed(2);

    gameState.somClickMouse.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somPegarPapel.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somClickCama.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somClickPC.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somVirarCarta.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somErroMemoria.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somPontoMemoria.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somPegarEnergia.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somQuedaBotao.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somQuedaEnergia.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somErroCriarConta.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
    gameState.somNotificacao.volume = gameState.volumeSom.toFixed(2); //não tem som ainda
  }
}