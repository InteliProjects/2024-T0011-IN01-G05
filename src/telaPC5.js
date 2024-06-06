class TelaPC5 extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaPC5' });
    //atributo que será usado para retornar à cena posteriormente
    this.key = "TelaPC5";
  }

  preload() {
    /*Carregamento de recursos que serão utilizados durante a cena*/
    //carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    this.input.setDefaultCursor("default");

    //Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    //Notificação Email Oracle
    this.load.image("emailOracle", "assets/telaPC5/emailOracle.svg");

    //Superfície do botão de confirmar o email
    this.load.image("botaoCofirmarSuperficie", "assets/telaPC5/botaoCofirmarSuperficie.svg");

    //Sombra do botão Confirmar
    this.load.image("SombraBotao5", "assets/telaPC5/botaoCofirmarSombra.svg");

    //Carrega a pagina do PC utilizada nessa cena
    this.load.svg("tela5", "assets/telaPC5/tela5.svg");

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

    // Cria uma instância do objeto Miguelzinho e carrega seus recursos
    this.miguelzinho = new Miguelzinho(this);
    this.miguelzinho.load();

    // Cria uma instância do objeto Miguelzinho para a inscrição e carrega seus recursos
    this.miguelzinhoInsc = new Miguelzinho(this);
    this.miguelzinhoInsc.load();

  }
  onCompleteDialogo = () => {
    setTimeout(() => {
      if (!this.tocouNotificacao) {
        gameState.somNotificacao.play()
        this.tocouNotificacao = true;
      }
      //Cria a notificação do email
      this.emailOracle = this.add.image(gameState.mediaWidth * 1.70, gameState.mediaHeight * 1.65, "emailOracle")

      //ajusta a escala do email 
      this.emailOracle.setScale((gameState.gameHeight / this.pagina5.height) * 1);

      //Cria a sombra do botão criar conta no lugar adequado
      this.SombraBotao5 = this.add.image((gameState.gameWidth * -0.72) * -1, gameState.mediaHeight * 1.91, "SombraBotao5").setInteractive();
      this.SombraBotao5.setScale((gameState.gameHeight / this.SombraBotao5.height) * 0.07);

      // Adiciona a imagem do botão de Instituição/Educador ao cenário do Notebook
      this.botaoCofirmarSuperficie = this.add.image((gameState.gameWidth * -0.72) * -1, gameState.mediaHeight * 1.88, "botaoCofirmarSuperficie")

      // Ajusta a escala da imagem do botão proporcionalmente ao tamanho da tela e torna interativo
      this.botaoCofirmarSuperficie.setScale((gameState.gameHeight / this.botaoCofirmarSuperficie.height) * 0.07).setInteractive();

      //faz com que modique a cena quando o botão é pressionado
      this.botaoCofirmarSuperficie.on("pointerdown", () => {
        gameState.somClickMouse.play()
        mudarProgresso(this)

        this.scene.transition({ target: 'TelaPC6', duration: 500 });
        this.scene.stop('TelaPC5');

      });

      //faz com que o botão se movimente
      movimentoDosBotoes(this, this.botaoCofirmarSuperficie);

      this.miguelzinhoInsc.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
      this.miguelzinhoInsc.startDialogo("inscricaoOracle", this.onCompleteDialogo2);

      //modifica os cursor quando o mouse está em cima ou fora do botão
      this.botaoCofirmarSuperficie.on("pointerover", () => {
        this.input.setDefaultCursor("pointer");
      });
      this.botaoCofirmarSuperficie.on("pointerout", () => {
        this.input.setDefaultCursor("default");
      });

    }, 3000); // tempo em milissegundos
  }
  create() {

    this.tocouNotificacao = false;

    //cria o fundo do pc
    criarFundoPc(this)

    //cria a pagina 5 do PC utilizada
    this.pagina5 = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 2.25, "tela5")

    //ajusta a escala da pagina 5 do PC
    this.pagina5.setScale((gameState.gameHeight / this.pagina5.height) * 1.796);

    // cria barra navegador
    this.navbar = this.add.image(this.pagina5.x * 1, gameState.mediaHeight * 0.4, "navbar");

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    this.navbar.setScale((gameState.gameHeight / this.navbar.height) * 0.059852);

    this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
    this.miguelzinho.startDialogo("obrigado", this.onCompleteDialogo);

    //chama as funções de adicionar os botões de voltar casa, configurações na tela e barra de progresso
    //voltarCasa(this);
    //botaoConfiguracoes(this);
    barraProgresso(this)
  }
  
  onCompleteDialogo2() {
    //console.log("fim da fala inscriçãoOracle")
  }
}