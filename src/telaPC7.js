class TelaPC7 extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaPC7' });
    //atributo que será usado para retornar à cena posteriormente
    this.key = "TelaPC7";
  }

  preload() {
    /*Carregamento de recursos que serão utilizados durante a cena*/
    //carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    this.input.setDefaultCursor("default");

    //Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    //Botão de confirmar o email
    this.load.image("botaoCofirmarSuperficie", "assets/telaPC5/botaoCofirmarSuperficie.svg");

    //Sombra do botão Confirmar
    this.load.image("SombraBotao7", "assets/telaPC5/botaoCofirmarSombra.svg");

    //Carrega a pagina do PC utilizada nessa cena
    this.load.svg("tela7", "assets/telaPC7/tela 7 OK.svg");

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

    // Cria uma instância do objeto Miguelzinho passando a cena atual como parâmetro
    this.miguelzinho = new Miguelzinho(this);
    // Carrega os recursos necessários para o objeto Miguelzinho
    this.miguelzinho.load();

  }
  create() {
    //cria o fundo do pc
    criarFundoPc(this)

    gameState.lerSenha = true;

    if (!gameState.leuSenha) {
      this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
      this.miguelzinho.startDialogo("loginOracle", this.onCompleteDialogo);
    }

    //cria a pagina 7 do PC utilizada
    this.pagina7 = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 2.25, "tela7")

    //ajusta a escala da pagina 7 do PC
    this.pagina7.setScale((gameState.gameHeight / this.pagina7.height) * 1.796);

    // cria barra navegador
    this.navbar = this.add.image(this.pagina7.x * 1, gameState.mediaHeight * 0.4, "navbar");

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    this.navbar.setScale((gameState.gameHeight / this.navbar.height) * 0.059852);

    //Cria a sombra do botão criar conta no lugar adequado
    this.SombraBotao7 = this.add.image((gameState.gameWidth * 0.508) * 1, gameState.mediaHeight * 1.53, "SombraBotao7").setInteractive();
    this.SombraBotao7.setScale((gameState.gameHeight / this.SombraBotao7.height) * 0.07);

    // Adiciona a imagem do botão de Instituição/Educador ao cenário do Notebook
    this.botaoCofirmarSuperficie = this.add.image((gameState.gameWidth * 0.508) * 1, gameState.mediaHeight * 1.5, "botaoCofirmarSuperficie")

    // Ajusta a escala da imagem do botão proporcionalmente ao tamanho da tela e torna interativo
    this.botaoCofirmarSuperficie.setScale((gameState.gameHeight / this.botaoCofirmarSuperficie.height) * 0.07).setInteractive();

    this.campoEmail = new InputTexto("email_conf");
    this.campoSenha = new InputTexto("senha_conf");
    gameState.formulario = new grupoInput(this.campoEmail, this.campoSenha);

    this.campoEmail.criaInput("Insira seu e-mail", 42.5, 53.25)
    this.campoSenha.criaInput("Insira sua senha", 42.5, 63, true)

    this.botaoCofirmarSuperficie.on("pointerdown", () => {
      if (this.campoEmail.getInput() == gameState.email && this.campoSenha.getInput() == gameState.senha) {
        gameState.somClickMouse.play()
        gameState.formulario.destroiGrupo();

        this.scene.transition({ target: 'TelaPC8', duration: 500 });
        this.scene.stop('TelaPC7');

      }
      else {
        gameState.somErroCriarConta.play()
        if (this.campoEmail.getInput() !== gameState.email) {
          this.miguelzinho.ocultarDialogo();
          this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
          this.miguelzinho.startDialogo("erroEmailLogin", this.onCompleteDialogo);
        } else if (this.campoSenha.getInput() !== gameState.senha) {
          this.miguelzinho.ocultarDialogo();
          this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
          this.miguelzinho.startDialogo("erroSenhaLogin", this.onCompleteDialogo);
        }
      }
    });

    //Atribui movimento ao botão Confirmar
    movimentoDosBotoes(this, this.botaoCofirmarSuperficie);

    //Adiciona a mecânica de mudança de seta para mão no mouse
    this.botaoCofirmarSuperficie.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.botaoCofirmarSuperficie.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    //chama as funções de adicionar os botões de voltar casa e configurações na tela
    voltarCasa(this, this.clickDelete);
    botaoConfiguracoes(this, this.clickDelete);
    barraProgresso(this)
  }
  // Função para quando o diálogo terminar
  onCompleteDialogo() {
    //console.log("Fim do diálogo");
  }
  clickDelete() {
    //console.log("click");
    gameState.formulario.destroiGrupo(); // destroi os campos de input da tela
  }
}