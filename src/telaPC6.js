class TelaPC6 extends Phaser.Scene {
  constructor() {
    super({ key: "TelaPC6" });
    //atributo que será usado para retornar à cena posteriormente
    this.key = "TelaPC6";
  }

  preload() {
    /*Carregamento de recursos que serão utilizados durante a cena*/
    //carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    this.input.setDefaultCursor("default");

    //Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    //Superfície do botão de confirmar o email
    this.load.svg("botaoLogarNaContaSuperficie", "assets/telaPC6/botaoLogarNaContaSuperficie.svg");

    //Sombra do botão Confirmar
    this.load.svg("botaoLogarNaContaSombra", "assets/telaPC6/botaoLogarNaContaSombra.svg");

    //Carrega a pagina do PC utilizada nessa cena
    this.load.svg("tela6", "assets/telaPC6/pagina6.svg");

    // carrega a barra de navagador
    this.load.svg("navbar", "assets/pc/navegador.svg");

    //carrega os botões de voltar casa e de configurações
    this.load.image("botaoVoltarCasa", "assets/telaPC8/botaoVoltarCasa.svg");
    this.load.image("btnConfig", "assets/telaInicial/botoes/configurações.png");

    // carrega spritesheet da barra de progresso e especifica tamanho
    this.load.spritesheet({
      key: 'barraProgresso', // nome do spritesheet
      url: 'assets/casaInicial/barraProgressoOK.svg', // localização do arquivo
      frameConfig: { // configuração das medidas do sprite
        frameWidth: 214,
        frameHeight: 42.83
      }
    });

    this.load.svg("scroll", "assets/telaPC1/scroll.svg");

  }
  create() {


    //cria a pagina 6 do PC utilizada
    this.paginaBranca6 = this.add.image(gameState.mediaWidth, gameState.mediaHeight * 2.31, "tela6")

    //ajusta a escala da pagina 6 do PC
    this.paginaBranca6.setScale(
      (gameState.gameHeight / this.paginaBranca6.height) * 1.85
    );

    //cria a sombra do botão utilizado
    this.botaoLogarNaContaSombra = this.add.image(
      gameState.mediaWidth * 0.658,
      gameState.mediaHeight * 3.15,
      "botaoLogarNaContaSombra"
    );

    //cria a setScale da sombra do botão utilizado
    this.botaoLogarNaContaSombra.setScale(
      (gameState.gameHeight / this.botaoLogarNaContaSombra.height) * 0.06
    );

    //cria a sombra do botão utilizado
    this.botaoLogarNaContaSuperficie = this.add.image(
      gameState.mediaWidth * 0.658,
      gameState.mediaHeight * 3.13,
      "botaoLogarNaContaSuperficie"
    );

    //cria a setScale da sombra do botão utilizado
    this.botaoLogarNaContaSuperficie.setScale(
      (gameState.gameHeight / this.botaoLogarNaContaSuperficie.height) * 0.06
    );

    this.botaoLogarNaContaSuperficie.setInteractive();

    //modifica o cursor quando o mouse está em cima do botão
    this.botaoLogarNaContaSuperficie.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.botaoLogarNaContaSuperficie.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });
    //Cria a tela de fundo
    this.bg = this.add.image(gameState.mediaWidth, gameState.mediaHeight, "bg");

    // Ajusta a escala do background proporcionalmente ao tamanho da tela
    this.bg.setScale(
      (gameState.gameWidth / this.bg.width) * 1.3,
      (gameState.gameHeight / this.bg.height) * 1.25
    );

    //Cria a tela do notebook
    this.notebookBg = this.add
      .image(
        gameState.mediaWidth * 1.012,
        gameState.mediaHeight * 1.1,
        "notebook"
      )
      .setScale(0.62);

    // Ajusta a escala do notebook proporcionalmente ao tamanho da tela
    this.notebookBg.setScale(
      (gameState.gameHeight / this.notebookBg.height) * 0.91
    );

    this.botaoLogarNaContaSuperficie.on("pointerdown", () => {
      gameState.somClickMouse.play()

      this.scene.transition({ target: 'TelaPC7', duration: 500 });
      this.scene.stop('TelaPC6');

    });

    //informa que a tela não chegou ao fim
    this.fimTela = false;

    this.input.on('wheel', (pointer, currentlyOver, dx, dy, dz, event) => {
      if (!this.fimTela) {
        if (dy < 0 && this.paginaBranca6.y < gameState.mediaHeight * 2.3) {
          // Verifica se foi scrollado para baixo
          this.paginaBranca6.y += 40; // Faz a página descer
          this.botaoLogarNaContaSombra.y += 40; // Faz o botao descer
          this.botaoLogarNaContaSuperficie.y += 40;

        } else if (dy > 0 && this.paginaBranca6.y > gameState.mediaHeight * 0) {
          // Verifica se foi scrollado para cima
          this.paginaBranca6.y -= 40; // Faz a página subir
          this.botaoLogarNaContaSombra.y -= 40; // Faz o botao subir
          this.botaoLogarNaContaSuperficie.y -= 40;
        } else {
          if (this.paginaBranca6.y < gameState.mediaHeight * 0) {
            //informa que a tela chegou ao fim
            this.fimTela = true;
            //movimenta o botão de logar na conta
            movimentoDosBotoes(this, this.botaoLogarNaContaSuperficie)
          }
        }
      }
    });

    // cria barra navegador
    this.navbar = this.add.image(this.paginaBranca6.x * 1.00248, gameState.mediaHeight * 0.4, "navbar");

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    this.navbar.setScale((gameState.gameHeight / this.navbar.height) * 0.0599);

    //chama as funções de adicionar os botões de voltar casa e configurações na tela
    voltarCasa(this);
    botaoConfiguracoes(this);

    //chama as funções de adicionar a barra de progresso
    barraProgresso(this);

    //adiciona a imagem da explicação do scroll
    this.scroll = this.add.image(gameState.mediaWidth * 1.75, gameState.mediaHeight * 1.5, "scroll")
    this.scroll.setScale((gameState.gameHeight / this.scroll.height) * 0.4)
  }
}
