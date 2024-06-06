class MenuFases extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuFases' });
    this.key = "MenuFases"
  }
  preload() {
    // Carrega as imagens
    this.load.image("templateTelaFases", "assets/menuFases/templateTelaFase.svg");
    this.load.image("botaoPrimeiraFase", "assets/menuFases/btnPrimeiroFase.svg");
    this.load.svg("botaoSair", "assets/telaInicial/botaoX.svg");
  }
  create() {

    //faz uma transição na tela
    this.cameras.main.fadeIn(2000, 0, 0, 0);

    //modifica o ponteiro do mouse  para o de seta
    this.input.setDefaultCursor("default");

    //cria o cenário de fundo
    this.templateTelaFases = this.add.image(gameState.mediaWidth, gameState.mediaHeight, "templateTelaFases");
      this.templateTelaFases.setScale((gameState.gameHeight/this.templateTelaFases.height)*1.235);
    this.templateTelaFases.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });

    //adiciona as imagens de configurações
    this.botaoSair = this.add.image(gameState.mediaWidth * 1.9 , gameState.mediaHeight * 0.2, "botaoSair");
      this.botaoSair.setScale((gameState.gameHeight/this.botaoSair.height)*0.1);
    this.botaoPrimeiraFase = this.add.image(gameState.mediaWidth * 0.36, gameState.mediaHeight * 1.3, "botaoPrimeiraFase").setAlpha(1);
      this.botaoPrimeiraFase.setScale((gameState.gameHeight/this.botaoPrimeiraFase.height)*0.306);

    //faz a transição para que as imagens de configurações apareçam 
    this.tweens.add({
      targets: [this.botaoSair],
      alpha: 1,
      duration: 2000,
      repeat: 0
    });

      //torna os botões interativos
    this.botaoSair.setInteractive();
    this.botaoPrimeiraFase.setInteractive();

    //Modifica o ponteiro para clique quando o mouse está em cima do botaoSair e do botaoPrimeiraFase
    this.botaoSair.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoSair.setScale((gameState.gameHeight/this.botaoSair.height)*0.12);
    });

    this.botaoPrimeiraFase.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      this.botaoPrimeiraFase.setScale((gameState.gameHeight/this.botaoPrimeiraFase.height)*0.336)

    });

    //Modifica o ponteiro para o de seta quando o mouse está em cima do sliderMusica, do sliderSom e do botaoSair
    this.botaoSair.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoSair.setScale((gameState.gameHeight/this.botaoSair.height)*0.1);
    });

    this.botaoPrimeiraFase.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      this.botaoPrimeiraFase.setScale((gameState.gameHeight/this.botaoPrimeiraFase.height)*0.306)
    });


    //troca a cena quando o botão de sair é clicado
    this.botaoSair.on("pointerdown", () => {
      gameState.somClickMouse.play()

      this.cameras.main.fadeOut(1000, 209, 209, 209, (camera, progress) => {

        // Quando a transição estiver concluída, carrega o novo cenário
        if (progress == 1) {
          
          //troca para a cena passada, assim gerando uma linearidade no jogo
          this.scene.transition({ target: gameState.cenaPassada, duration: 1000 });
          this.scene.stop('menuFases');
        }
      });
    });

    //troca a cena quando o botão de primeira fase é clicado
    this.botaoPrimeiraFase.on("pointerdown", () => {
      gameState.somClickMouse.play()

      this.cameras.main.fadeOut(1000, 209, 209, 209, (camera, progress) => {

        // Quando a transição estiver concluída, carrega o novo cenário
        if (progress == 1) {
          
          //troca para a cena passada, assim gerando uma linearidade no jogo
          this.scene.transition({ target: "CasaInicial", duration: 2000 });
          this.scene.stop('menuFases'); 
        }
      });
    });
  }
}
