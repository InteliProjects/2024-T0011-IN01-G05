class TelaPC8 extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaPC8' });
    //atributo que será usado para retornar à cena posteriormente
    this.key = "TelaPC8";
  }

  preload() {
    /*Carregamento de recursos que serão utilizados durante a cena*/
    //carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    this.input.setDefaultCursor("default");

    //Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    //Botão de confirmar a instituição
    this.load.image("botaoCofirmarSuperficie", "assets/telaPC8/botaoPesquisarSuperficie.svg");

    //Sombra do botão Confirmar
    this.load.image("botaoPesquisarSombra", "assets/telaPC8/botaoPesquisarSombra.svg");

    //Carrega a pagina do PC utilizada nessa cena
    this.load.svg("tela8", "assets/telaPC8/tela8.svg");

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
  }
  create() {
    //cria o fundo do pc
    criarFundoPc(this)

    //cria a pagina 8 do PC utilizada
    this.pagina8 = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 1.04, "tela8")

    //ajusta a escala da pagina 8 do PC
    this.pagina8.setScale((gameState.gameHeight / this.pagina8.height) * 0.586);

    // cria barra navegador
    this.navbar = this.add.image(this.pagina8.x * 1, gameState.mediaHeight * 0.4, "navbar");

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    this.navbar.setScale((gameState.gameHeight / this.navbar.height) * 0.0599);

    //Cria a sombra do botão criar conta no lugar adequado
    this.botaoPesquisarSombra = this.add.image((gameState.gameWidth * 0.675) * 1, gameState.mediaHeight * 1.33, "botaoPesquisarSombra").setInteractive();
    this.botaoPesquisarSombra.setScale((gameState.gameHeight / this.botaoPesquisarSombra.height) * 0.07);

    // Adiciona a imagem do botão de Instituição/Educador ao cenário do Notebook
    this.botaoCofirmarSuperficie = this.add.image((gameState.gameWidth * 0.675) * 1, gameState.mediaHeight * 1.3, "botaoCofirmarSuperficie")

    // Ajusta a escala da imagem do botão proporcionalmente ao tamanho da tela e torna interativo
    this.botaoCofirmarSuperficie.setScale((gameState.gameHeight / this.botaoCofirmarSuperficie.height) * 0.07).setInteractive();

    //troca de cena quando o botão é pressionado
    this.botaoCofirmarSuperficie.on("pointerdown", () => {
      gameState.somClickMouse.play()
      mudarProgresso(this)
      this.cameras.main.fadeOut(500, 209, 209, 209, (camera, progress) => {
        // Quando a transição estiver concluída, carrega o novo cenário
        if (progress == 1) {
          this.scene.transition({ target: 'CasaInicial', duration: 500 });
          this.scene.stop('TelaPC8');
        }
        //informa que pode dormir
        gameState.dormir = true;
      });
    });

    //Adiciona a mecânica de mudança de seta para mão no mouse
    this.botaoCofirmarSuperficie.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.botaoCofirmarSuperficie.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });
    //Atribui movimento ao botão Confirmar
    movimentoDosBotoes(this, this.botaoCofirmarSuperficie);

    //chama as funções de adicionar os botões de voltar casa e configurações na tela
    voltarCasa(this);
    botaoConfiguracoes(this);
    barraProgresso(this);
  }
}