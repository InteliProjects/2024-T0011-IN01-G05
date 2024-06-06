class TelaPC4 extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaPC4' });

    //atributo que será usado para retornar à cena posteriormente
    this.key = "TelaPC4";
  }

  preload() {
    /*Carregamento de recursos que serão utilizados durante a cena*/
    //carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    this.input.setDefaultCursor("default");

    //Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    //Carrega o botão de criar conta
    this.load.image("botaoCriarContaSuperficie", "assets/telaPC2/botaoCriarContaSuperficie.svg");

    //Sombra do botão Criar conta
    this.load.image("SombraBotao1", "assets/telaPC2/botaoCriarContaSombra.svg");

    //Carrega a pagina do PC utilizada nessa cena
    this.load.svg("tela4", "assets/telaPC4/Tela4.svg");

    // carrega a barra de navagador
    this.load.svg("navbar", "assets/pc/navegador.svg")

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

    // Cria uma instância do objeto Miguelzinho para tratar do diálogo de senha e carrega seus recursos
    this.miguelzinhoSenha = new Miguelzinho(this);
    this.miguelzinhoSenha.load();
  }
  create() {
    //informa que o postIt pode piscar
    gameState.postIt = true;

    if (!gameState.leuEmail) {
      this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
      if (gameState.papelClicado == true) {
        this.miguelzinho.startDialogo("olhouPostIt", this.onCompletoPostIt);
      } else {
        this.miguelzinho.startDialogo("naoOlhouPostIt", this.onCompletoPostIt);
      }
    }
    //cria o fundo do pc
    criarFundoPc(this)

    //cria a pagina 4 do PC utilizada
    this.pagina4 = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 2.25, "tela4")

    //ajusta a escala da pagina 2 do PC
    this.pagina4.setScale((gameState.gameHeight / this.pagina4.height) * 1.796);

    // cria barra navegador
    this.navbar = this.add.image(this.pagina4.x * 1, gameState.mediaHeight * 0.4, "navbar");

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    this.navbar.setScale((gameState.gameHeight / this.navbar.height) * 0.059852);

    // cria objetos da classe inputTexto e o grupo de campos
    this.campoEmail = new InputTexto("email")
    this.campoSenha = new InputTexto("senha")
    this.campoNome = new InputTexto("nome")
    gameState.grupoInputs = new grupoInput(this.campoEmail, this.campoSenha, this.campoNome)// grupo de campos

    //cria os campos de texto na tela 
    this.campoEmail.criaInput("Insira seu email", 46, 47.75)
    this.campoSenha.criaInput("Crie sua senha", 37, 55, true)
    this.campoNome.criaInput("Insira seu nome", 37, 62)

    //Cria a sombra do botão criar conta no lugar adequado
    this.SombraBotao1 = this.add.image(gameState.mediaWidth, gameState.mediaHeight * 1.46, "SombraBotao1").setInteractive();
    this.SombraBotao1.setScale((gameState.gameHeight / this.SombraBotao1.height) * 0.065);

    //Cria a superfície do botão criar conta no lugar
    this.botaoCriarContaSuperficie = this.add.image(gameState.mediaWidth, gameState.mediaHeight * 1.43, "botaoCriarContaSuperficie").setInteractive();
    this.botaoCriarContaSuperficie.setScale((gameState.gameHeight / this.botaoCriarContaSuperficie.height) * 0.065);

    //modifica o cursor quando o mouse está em cima do botão
    this.botaoCriarContaSuperficie.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.botaoCriarContaSuperficie.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    //ativa a movimentação do botão de criar conta
    movimentoDosBotoes(this, this.botaoCriarContaSuperficie);

    // lógica de clique do botão
    this.botaoCriarContaSuperficie.on("pointerdown", () => {
      // chama a função de verificação e só progride se for aprovado
      if (this.verificaInput()) {

        gameState.somClickMouse.play()
        gameState.grupoInputs.destroiGrupo() // destroi os campos de input da tela


        this.guardaInputs()// chama o método guardaInputs
        //troca para a tela seguinte e desativa a tela atual
        this.scene.transition({ target: 'TelaPC5', duration: 500 });
        this.scene.stop('TelaPC4');


      } else {
        gameState.somErroCriarConta.play()
        if (this.emailErrado && gameState.liberaFalaDialogoPostIt) {
          this.miguelzinhoSenha.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
          this.emailErrado = false;
          this.miguelzinhoSenha.startDialogo("email", this.onCompleto)
        } else if (gameState.liberaFalaDialogoSenha && gameState.liberaFalaDialogoPostIt) {
          this.miguelzinhoSenha.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
          gameState.liberaFalaDialogoSenha = false;
          this.miguelzinhoSenha.startDialogo("senha", this.onCompleto)
        }
      }
    });

    gameState.liberaFalaDialogoSenha = true;

    //chama as funções de adicionar os botões de voltar casa e configurações na tela
    voltarCasa(this, this.clickDelete);
    botaoConfiguracoes(this, this.clickDelete);
    barraProgresso(this)
  }
  // Função para quando o diálogo terminar da senha
  onCompleto() {
    gameState.liberaFalaDialogoSenha = true;
  }
  // Função para quando o diálogo terminar do postIt
  onCompletoPostIt() {
    gameState.liberaFalaDialogoPostIt = true;
  }
  // Função para deletar os campos de input
  clickDelete() {
    gameState.grupoInputs.destroiGrupo() // destroi os campos de input da tela
  }
  // médodo para armazenar os inputs recebidos
  guardaInputs() {
    // recebe os valores de todos os inputs
    var valores = gameState.grupoInputs.getGrupo()

    // armazena cada valor em sua respectiva variável global
    // usa-se globais para podermos usar esses valores em qualquer tela
    gameState.email = valores[0]
    gameState.senha = valores[1]
    gameState.nome = valores[2]
  }

  // verifica se os inputs recebidos são válidos
  verificaInput() {
    // pega o valor de input no campo senha
    var senha = this.campoSenha.getInput();

    // bateria de verificações para aprovar os inputs
    //verificação da senha
    if (this.campoEmail.getInput() != 'professor34@edu.com') { // devolve erro se o email estiver errado 
      this.emailErrado = true;
      return false;// devolve erro se não houver nome
    } else if (senha.length < 8) { // devolve erro se o senha for curta
      return false;
    } else if (!senha.match(senha.m)) {// devolve erro se o [A-Z] não tiver caractere maiúsculo
      return false;
    } else if (!senha.match(senha.m)) {// devolve erro se o [a-z] não tiver caractere minúsculo
      return false;
    } else if (!senha.match(senha.m)) { // devolve erro se o [0-9] não tiver num    
      return false;
      //Verifica se os demais campos estão preenchido
    } else if (this.campoNome.getInput() == '') {// devolve erro se não houver nome
      return false;
    } else {
      return true;// repassa a aprovação
    }
  }
}