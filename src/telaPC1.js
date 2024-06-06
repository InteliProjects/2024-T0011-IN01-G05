var jogodaMemoria = false
class TelaPC1 extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaPC1' });

    //esse atributo será usado para voltar a essa cena posteriormente
    this.key = "TelaPC1";

  }

  // Função de pré-carregamento de recursos
  preload() {
    // Carrega os elementos do cenário do Notebook, como o background, página web, botão 1 e tela 2

    //carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    //Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    this.load.svg("paginaInicial", "assets/telaPC1/tela1.svg");
    this.load.svg("scroll", "assets/telaPC1/scroll.svg");
    this.load.svg("navbar", "assets/pc/navegador.svg");
    this.load.image("botaoInstituicaoEducador", "assets/telaPC1/botao1.png");

    //deixa o input como padrão
    this.input.setDefaultCursor("default");

    //carrega os elementos dos botões de voltar para casa e de configurações
    this.load.image("botaoVoltarCasa", "assets/telaPC8/botaoVoltarCasa.svg");
    this.load.image("btnConfig", "assets/telaInicial/botoes/configurações.png");

    //Carrega os elementos do jogo da memória, como as cartas e o texto de vitória
    gameState.carta1A = new Carta(gameState.mediaWidth * 0.63, gameState.mediaHeight * 0.87, '1A', 'assets/telaPC1/cartaLivro.svg', this);
    gameState.carta4A = new Carta(gameState.mediaWidth * 0.86, gameState.mediaHeight * 0.87, '4A', 'assets/telaPC1/cartaSuporte.svg', this);
    gameState.carta2B = new Carta(gameState.mediaWidth * 1.10, gameState.mediaHeight * 0.87, '2B', 'assets/telaPC1/cartaNuvem.svg', this);
    gameState.carta3A = new Carta(gameState.mediaWidth * 1.33, gameState.mediaHeight * 0.87, '3A', 'assets/telaPC1/cartaPessoas.svg', this);
    gameState.carta2A = new Carta(gameState.mediaWidth * 0.63, gameState.mediaHeight * 1.30, '2A', 'assets/telaPC1/cartaNuvem.svg', this);
    gameState.carta4B = new Carta(gameState.mediaWidth * 1.33, gameState.mediaHeight * 1.30, '4B', 'assets/telaPC1/cartaSuporte.svg', this);
    gameState.carta1B = new Carta(gameState.mediaWidth * 1.10, gameState.mediaHeight * 1.30, '1B', 'assets/telaPC1/cartaLivro.svg', this);
    gameState.carta3B = new Carta(gameState.mediaWidth * 0.86, gameState.mediaHeight * 1.30, '3B', 'assets/telaPC1/cartaPessoas.svg', this);
    this.load.image('texto', 'assets/telaPC1/textoVitoria.svg')

    //Atribui para as cartas configurações descritas no método loadAssets que se encontra no arquivo 'puzzledaMemoria.js'
    gameState.carta1A.loadAssets();
    gameState.carta1B.loadAssets();
    gameState.carta2A.loadAssets();
    gameState.carta2B.loadAssets();
    gameState.carta3A.loadAssets();
    gameState.carta3B.loadAssets();
    gameState.carta4A.loadAssets();
    gameState.carta4B.loadAssets();

    gameState.carta1 = "";
    gameState.carta2 = "";

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

    // Cria uma instância do objeto completoMemoria e carrega seus recursos
    this.completoMemoria = new Miguelzinho(this);
    this.completoMemoria.load();
  };

  // Função para criar os elementos na tela
  create() {

    // Adiciona a imagem da página inicial ao cenário do Notebook
    gameState.paginaInicial = this.add.image(gameState.mediaWidth, gameState.mediaHeight * 1.6, "paginaInicial")

    // Ajusta a escala da imagem da página inicial proporcionalmente ao tamanho da tela
    gameState.paginaInicial.setScale((gameState.gameHeight / gameState.paginaInicial.height) * 1.155);

    // Adiciona a imagem do botão de Instituição/Educador ao cenário do Notebook
    gameState.botaoInstituicaoEducador = this.add.image(calcularPosicaoX(0.69, 0.74) / 2, gameState.mediaHeight * 2.205, "botaoInstituicaoEducador")

    // Ajusta a escala da imagem do botão proporcionalmente ao tamanho da tela e torna interativo
    gameState.botaoInstituicaoEducador.setScale((gameState.gameHeight / gameState.botaoInstituicaoEducador.height) * 0.18).setInteractive();

    //Adiciona o texto de vitória na tela para quando terminar o jogo da memória e configura sua posição e escala
    gameState.textFinalizado = this.add.image(gameState.mediaWidth * 0.97, gameState.mediaHeight * 1.02, 'texto')
    gameState.textFinalizado.setScale((gameState.gameHeight / gameState.textFinalizado.height) * 0.615);

    //O define primeiramente como falso pois só aparecerá posteriormente
    gameState.textFinalizado.setVisible(false);


    //cria o fundo do pc
    criarFundoPc(this)

    //adiciona a imagem da explicação do scroll
    this.scroll = this.add.image(gameState.mediaWidth * 1.75, gameState.mediaHeight * 1.5, "scroll")
    this.scroll.setScale((gameState.gameHeight / this.scroll.height) * 0.4)
    this.scroll.setVisible(false)

    // Adiciona a imagem da barra de navegação ao cenário do Notebook
    gameState.navbar = this.add.image(gameState.paginaInicial.x * 1.0015, gameState.mediaHeight * 0.4, "navbar");

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    gameState.navbar.setScale((gameState.gameHeight / gameState.navbar.height) * 0.0599);

    // Cria um objeto de teclas de seta para uso no controle do cursor
    gameState.cursor = this.input.keyboard.createCursorKeys();

    // Define a transição de cena ao clicar no botão
    gameState.botaoInstituicaoEducador.on("pointerdown", () => {
      gameState.somClickMouse.play()
      mudarProgresso(this)

      //muda a cena para a de TelaPC2
      this.scene.transition({ target: 'TelaPC2', duration: 500 });
      this.scene.stop('TelaPC1');

    });

    if (!gameState.gameFinalizado) {
      // Cria aa cartas na tela 1 do pc
      gameState.carta1A.createAssets();
      gameState.carta1B.createAssets();
      gameState.carta2A.createAssets();
      gameState.carta2B.createAssets();
      gameState.carta3A.createAssets();
      gameState.carta3B.createAssets();
      gameState.carta4A.createAssets();
      gameState.carta4B.createAssets();

      // Cria o personagem Miguelzinho na posição especificada
      this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);

      // Inicia o diálogo "encontraMemoria" do personagem Miguelzinho e define a função onCompleteDialogo como callback
      this.miguelzinho.startDialogo("encontraMemoria", this.onCompleteDialogo);
    } else {
      gameState.textFinalizado.setVisible(true);
      this.completoMemoria.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
      this.completoMemoria.startDialogo("completoMemoria", this.onCompleteDialogo);
      this.scroll.setVisible(true)
    }

    // Adiciona a funcionalidade de rolar a página usando a roda do mouse
    this.input.on('wheel', function (pointer, currentlyOver, dx, dy, dz, event) {
      if (jogodaMemoria) {
        if (dy < 0 && gameState.paginaInicial.y < gameState.mediaHeight * 1.6) {
          // Verifica se foi scrollado para baixo
          gameState.paginaInicial.y += 40; // Faz a pagina descer
          gameState.botaoInstituicaoEducador.y += 40; // Faz o botao descer
          gameState.textFinalizado.y += 40; // Faz o botao descer
        } else if (dy > 0 && gameState.paginaInicial.y > gameState.mediaHeight * 0.5) {
          // Verifica se foi scrollado para cima
          gameState.paginaInicial.y -= 40; // Faz a pagina subir
          gameState.botaoInstituicaoEducador.y -= 40; // Faz a pagina subir
          gameState.textFinalizado.y -= 40; // Faz o botao descer
        }
      }
    });

    // Adiciona animação de escala ao botão (Botao ficar pulsando)
    this.tweens.add({
      targets: gameState.botaoInstituicaoEducador,
      scaleX: (gameState.gameHeight / gameState.botaoInstituicaoEducador.height) * 0.18 * 1.15,
      scaleY: (gameState.gameHeight / gameState.botaoInstituicaoEducador.height) * 0.18 * 1.15,
      duration: 500, // Duração em milissegundos
      yoyo: true, // Faz a animação voltar ao estado original
      repeat: -1 // -1 para repetir indefinidamente
    });

    // Define o cursor padrão e altera para ponteiro quando o mouse está sobre o botão
    gameState.botaoInstituicaoEducador.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    gameState.botaoInstituicaoEducador.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    
    //cria os botões de voltar casa e configurações e a barra de progresso
    voltarCasa(this);
    botaoConfiguracoes(this);
    barraProgresso(this);


    // // Cria o personagem Miguelzinho na posição especificada
    // this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);

    // // Inicia o diálogo "encontraMemoria" do personagem Miguelzinho e define a função onCompleteDialogo como callback
    // this.miguelzinho.startDialogo("encontraMemoria", this.onCompleteDialogo);
  };
  onCompleteDialogo() {
    gameState.dialogCompleto = true;
  }
  // Função de atualização da cena
  update() {

    //verifica se o jogo não foi finalizado
    if (!gameState.gameFinalizado) {
      //executa o método jogo completo
      this.jogoCompleto();
    }
    //Cria uma condição para comparação de cartas
    if (gameState.carta1 != "" && gameState.carta2 != "") {
      if (
        //Se duas cartas estiverem viradas, compara ambas com o método criado
        this.compararCarta()
      ) {
        gameState.somPontoMemoria.play()
        gameState.carta1 = "";
        gameState.carta2 = "";
      }
      else {
        gameState.somErroMemoria.play()
        //Reseta os valores de todas as cartas
        gameState.carta1A.resetarCartas();
        gameState.carta1B.resetarCartas();
        gameState.carta2A.resetarCartas();
        gameState.carta2B.resetarCartas();
        gameState.carta3A.resetarCartas();
        gameState.carta3B.resetarCartas();
        gameState.carta4A.resetarCartas();
        gameState.carta4B.resetarCartas();

        gameState.carta1 = "";
        gameState.carta2 = "";
      }
    }
  }

  //Método para definir ações futuras após o jogador vencer o jogo da memória 
  jogoCompleto() {

    //Cria uma condição para quando todas as cartas estiverem viradas (bloqueadas)
    if (gameState.carta1A.bloqueada == true && gameState.carta1B.bloqueada == true &&
      gameState.carta2A.bloqueada == true && gameState.carta2B.bloqueada == true &&
      gameState.carta3A.bloqueada == true && gameState.carta3B.bloqueada == true &&
      gameState.carta4A.bloqueada == true && gameState.carta4B.bloqueada == true) {

      //Retorna a variável como verdadeira para ser utilizada em outra parte
      jogodaMemoria = true;

      this.completoMemoria.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
      this.completoMemoria.startDialogo("completoMemoria", this.onCompleteDialogo);

      //Define o texto de vitória como visível 
      gameState.textFinalizado.setVisible(true);

      //torna a explicação do scroll visivel
      this.scroll.setVisible(true)

      //Destrói cartas
      gameState.carta1A.cartaSprite.destroy();
      gameState.carta1B.cartaSprite.destroy();
      gameState.carta2A.cartaSprite.destroy();
      gameState.carta2B.cartaSprite.destroy();
      gameState.carta3A.cartaSprite.destroy();
      gameState.carta3B.cartaSprite.destroy();
      gameState.carta4A.cartaSprite.destroy();
      gameState.carta4B.cartaSprite.destroy();

      //define o game como finalizado
      gameState.gameFinalizado = true;

    };
  }


  // Método para comparação de cartas idênticas ou não
  compararCarta() {

    //Condição para comparação de cartas não idênticas
    if ((gameState.carta1 != gameState.carta2)) {
      //Condição para quando o segundo caractere for igual entre as duas cartas e assumir valor 1
      if ((gameState.carta1.substring(0, 1) == gameState.carta2.substring(0, 1)) && gameState.carta2.substring(0, 1) == "1") {
        //Declara as cartas de caracteres 1A e 1B bloqueadas
        gameState.carta1A.bloqueada = true;
        gameState.carta1B.bloqueada = true;
        numCartasViradas = 0
        //Retorna valor verdadeiro 
        return true;

        //Condição para quando o segundo caractere for igual entre as duas cartas e assumir valor 2
      } else if ((gameState.carta1.substring(0, 1) == gameState.carta2.substring(0, 1)) && gameState.carta2.substring(0, 1) == "2") {
        //Declara as cartas de caracteres 2A e 2B bloqueadas
        gameState.carta2A.bloqueada = true;
        gameState.carta2B.bloqueada = true;
        numCartasViradas = 0
        //Retorna valor verdadeiro
        return true;

        //Condição para quando o segundo caractere for igual entre as duas cartas e assumir valor 3
      } else if ((gameState.carta1.substring(0, 1) == gameState.carta2.substring(0, 1)) && gameState.carta2.substring(0, 1) == "3") {
        //Declara as cartas de caracteres 3A e 3B bloqueadas
        gameState.carta3A.bloqueada = true;
        gameState.carta3B.bloqueada = true;
        numCartasViradas = 0
        //Retorna valor verdadeiro
        return true;

        //Condição para quando o segundo caractere for igual entre as duas cartas e assumir valor 4
      } else if ((gameState.carta1.substring(0, 1) == gameState.carta2.substring(0, 1)) && gameState.carta2.substring(0, 1) == "4") {
        //Declara as cartas de caracteres 4A e 4B bloqueadas
        gameState.carta4A.bloqueada = true;
        gameState.carta4B.bloqueada = true;
        numCartasViradas = 0
        //Reseta o número de cartas após cada comparação
        return true;
        //Retorna valor verdadeiro

        //Condição para quando nenhuma das anteriores for correta (segundo caractere não for igual)
      } else {
        //Retorna valor falso
        return false;
      }
    }
  }
}