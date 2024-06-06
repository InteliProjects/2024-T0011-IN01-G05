class TelaPC2 extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaPC2' });

    //atributo que será usado para voltar a essa tela.
    this.key = "TelaPC2";
  }
  preload() {
    /*Carregamento de recursos que serão utilizados durante a cena*/
    //carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    //Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    //torna o input do mouse o padrão
    this.input.setDefaultCursor("default");

    //Carrega a pagina do PC utilizada nessa cena
    this.load.svg("tela2", "assets/telaPC2/telaPC2.svg");

    //Carrega a barra de navagador
    this.load.svg("navbar", "assets/pc/navegador.svg")

    //Carrega os assets dos botões voltar casa e configurações
    this.load.image("botaoVoltarCasa", "assets/telaPC8/botaoVoltarCasa.svg");
    this.load.image("btnConfig", "assets/telaInicial/botoes/configurações.png");

    //Carrega o botão de criar conta
    this.load.image("botaoCriarContaSuperficie", "assets/telaPC2/botaoCriarContaSuperficie.svg");

    //Sombra do botão Criar conta
    this.load.image("SombraBotao", "assets/telaPC2/botaoCriarContaSombra.svg");

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
  //função chamada ao final do diálogo
  onCompleteDialogo() {
    //console.log("Fim do diálogo");
  }
  create() {
    //cria o fundo do pc
    criarFundoPc(this)

    //cria a pagina 2 do PC utilizada
    this.pagina2 = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 1.6, "tela2")

    //ajusta a escala da pagina 2 do PC
    this.pagina2.setScale((gameState.gameHeight / this.pagina2.height) * 1.15);
    this.pagina2.setInteractive();

    // cria barra navegador
    this.navbar = this.add.image(this.pagina2.x * 1, gameState.mediaHeight * 0.4, "navbar");

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    this.navbar.setScale((gameState.gameHeight / this.navbar.height) * 0.06);

    //Cria a sombra do botão criar conta no lugar adequado
    this.SombraBotao = this.add.image(gameState.mediaWidth * 0.655, gameState.mediaHeight * 1.15, "SombraBotao").setInteractive();
    this.SombraBotao.setScale((gameState.gameHeight / this.SombraBotao.height) * 0.065);

    //Cria a superfície do botão criar conta no lugar
    this.botaoCriarContaSuperficie = this.add.image(gameState.mediaWidth * 0.655, gameState.mediaHeight * 1.12, "botaoCriarContaSuperficie").setInteractive();
    this.botaoCriarContaSuperficie.setScale((gameState.gameHeight / this.botaoCriarContaSuperficie.height) * 0.065);

    //modifica o cursor quando o mouse está em cima do botão
    this.botaoCriarContaSuperficie.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.botaoCriarContaSuperficie.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    // Define a transição de cena ao clicar no botão
    this.botaoCriarContaSuperficie.on("pointerdown", () => {
      gameState.somClickMouse.play()

      this.scene.transition({ target: 'TelaPC3', duration: 500 });
      this.scene.stop('TelaPC2');

    });
    //chama as funções voltar casa e botao configurações que adiciona os respectivos botões na tela
    voltarCasa(this)
    botaoConfiguracoes(this);
    barraProgresso(this);

    //cria o movimento do botão criar conta superficie
    movimentoDosBotoes(this, this.botaoCriarContaSuperficie)
  }
}
