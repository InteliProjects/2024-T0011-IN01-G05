//cria a variável pontuação
var pontuacao = 0;
class TelaPC3 extends Phaser.Scene {
  constructor() {
    super({ key: "TelaPC3" }); // Chama o construtor da classe pai
    this.key = "TelaPC3"; // Define a chave da cena
  }

  preload() {
    /* Carregamento de recursos que serão utilizados durante a cena */
    // Carrega a tela de fundo
    this.load.image("bg", "assets/pc/bg.svg");
    this.input.setDefaultCursor("default"); // Define o cursor padrão

    // Carrega a tela do notebook
    this.load.image("notebook", "assets/pc/notebookPrototipo1.png");

    // Carrega a imagem do chão
    this.load.image("chao", "assets/telaPC3/chao.png");

    // Carrega a página do PC utilizada nessa cena
    this.load.svg("tela3", "assets/telaPC3/tela3Branca.svg");
    this.load.svg("telaFinal", "assets/telaPC3/tela 3.svg");
    this.load.svg("helpTecla", "assets/telaPC3/botaoSeta.svg");

    // Carrega a barra de navegador
    this.load.svg("navbar", "assets/pc/navegador.svg");

    // Carrega os botões de voltar casa e de configurações
    this.load.image("botaoVoltarCasa", "assets/telaPC8/botaoVoltarCasa.svg");
    this.load.image("btnConfig", "assets/telaInicial/botoes/configurações.png");

    this.load.svg("energia", "assets/telaPC3/bateria.svg");

    // Carrega o sprite do botão criar conta
    this.load.spritesheet("btCriarConta", "assets/telaPC3/spriteBotao.svg", {
      frameWidth: 145.5,
      frameHeight: 51,
    });

    // carrega spritesheet da barra de progresso e especifica tamanho
    this.load.spritesheet({
      key: "barraProgresso", // nome do spritesheet
      url: "assets/casaInicial/barraProgressoOK.svg", // localização do arquivo
      frameConfig: {
        // configuração das medidas do sprite
        frameWidth: 214,
        frameHeight: 42.83,
      },
    });

    // Cria uma instância do objeto Miguelzinho passando a cena atual como parâmetro
    this.miguelzinho = new Miguelzinho(this);
    // Carrega os recursos necessários para o objeto Miguelzinho
    this.miguelzinho.load();

    // Cria uma instância do objeto Miguelzinho passando a cena atual como parâmetro
    this.miguelzinhoEnergia = new Miguelzinho(this);
    // Carrega os recursos necessários para o objeto Miguelzinho
    this.miguelzinhoEnergia.load();
  }

  create() {

    // Adiciona a imagem da página inicial ao cenário do Notebook
    this.paginaBranca = this.add.image(
      gameState.mediaWidth,
      gameState.mediaHeight * 1.95,
      "tela3"
    );

    // Adiciona a imagem da página final ao cenário do Notebook
    this.paginaFinal = this.add.image(
      gameState.mediaWidth,
      gameState.mediaHeight * 1.95,
      "telaFinal"
    );

    // Ajusta a escala da imagem da página inicial e final proporcionalmente ao tamanho da tela
    this.paginaBranca.setScale(
      (gameState.gameHeight / this.paginaBranca.height) * 1.85
    );
    this.paginaFinal.setScale(
      (gameState.gameHeight / this.paginaBranca.height) * 1.85
    );
    this.paginaFinal.setVisible(false); // Oculta a página final por padrão

    // Botão criar conta
    this.btCriarConta = this.physics.add
      .sprite(
        gameState.mediaWidth * 0.655,
        gameState.mediaHeight * 0.86,
        "btCriarConta"
      )
      .setInteractive();

    //modifica sua escala
    this.btCriarConta.setScale(
      (gameState.gameHeight / this.btCriarConta.height) * 0.065
    );

    //faz a colisão do botão criar conta com as bordas da tela
    this.btCriarConta.setCollideWorldBounds(true);
    this.btCriarConta.setFrame(5);

    //cria a energia
    this.energia = this.physics.add
      .sprite(gameState.mediaWidth, 0, "energia")

    this.energia.setScale((gameState.gameHeight / this.energia.height) * 0.0355);

    //relaciona a energia com a variavel energia
    var energia = this.energia;
    //cria o fundo do pc
    criarFundoPc(this);

    // Adiciona a imagem da barra de navegação ao cenário do Notebook
    this.navbar = this.add.image(
      this.paginaBranca.x * 1.00248,
      gameState.mediaHeight * 0.4,
      "navbar"
    );

    // Ajusta a escala da barra de navegação proporcionalmente ao tamanho da tela
    this.navbar.setScale((gameState.gameHeight / this.navbar.height) * 0.0599);

    //relaciona o navbar com uma variavel
    var navbar = this.navbar;
    // Cria um objeto de teclas de seta para uso no controle do cursor
    this.cursor = this.input.keyboard.createCursorKeys();

    //adiciona a imagem de instrução das teclas
    this.helpTecla = this.add.image(
      gameState.mediaWidth * 1.76,
      gameState.gameHeight * 0.75,
      "helpTecla"
    )
    this.helpTecla.setScale((gameState.gameHeight / this.helpTecla.height) * 0.2285);
    this.helpTecla.setVisible(false);

    //define que ainda não chegou ao fim da tela
    this.fimTela = false;

    //faz o scroll da tela
    this.input.on("wheel", (pointer, currentlyOver, dx, dy, dz, event) => {
      if (tweensFinalizado && !this.gameFinalizado && !this.fimTela) {
        if (dy < 0 && this.paginaBranca.y < gameState.mediaHeight * 1.9) {
          // Verifica se foi scrollado para baixo
          this.paginaBranca.y += 40; // Faz a página descer
          this.paginaFinal.y += 40; // Faz a página descer
          this.chaoInvisivel.y += 10;
          this.btCriarConta.y += 10;
        } else if (
          dy > 0 &&
          this.paginaBranca.y > gameState.mediaHeight * 0.1
        ) {
          // Verifica se foi scrollado para cima
          this.paginaBranca.y -= 40; // Faz a página subir
          this.paginaFinal.y -= 40; // Faz a página subir
          this.chaoInvisivel.y -= 10;
          this.btCriarConta.y -= 10;
        } else {
          //verifica se a tela foi toda scrollada
          if (this.paginaBranca.y < gameState.mediaHeight * 0.1) {
            //informa que a tela chegou ao fim
            this.fimTela = true;
          }
          if (this.paginaBranca.y < gameState.mediaHeight * 0.2) {
            //informa que a tela chegou ao fim
            energia.setGravityY(200); // Aplica a gravidade à energia

            this.miguelzinho.ocultarDialogo();
            //fala com o miguelzinho pegue a energia
            this.miguelzinhoEnergia.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
            this.miguelzinhoEnergia.startDialogo("pegueEnergia", this.onCompleteDialogo);

            //deixa a imagem de instrução das teclas visiveis
            this.helpTecla.setVisible(true);
          }
        }
      }
    });

    //informa que o tweens não foi finalizado
    var tweensFinalizado = false;

    // Adiciona animação de escala ao botão (Botão ficar pulsando)
    // Crie uma animação de tremor usando Tween
    this.tweens.add({
      targets: this.btCriarConta,
      x: "+=5", // move a imagem para a direita
      y: "+=5", // move a imagem para baixo
      ease: "Power1",
      duration: 200,
      onComplete: () => {
        gameState.somQuedaBotao.play()
        this.btCriarConta.setGravityY(300); // Aplica a gravidade ao botão
        this.miguelzinho.startDialogo("botaoCaiu", this.onCompleteDialogo);
        setTimeout(() => {
          //informa que o tweens foi finalizado
          tweensFinalizado = true;
          //troca o frame do botão de criar conta
          this.btCriarConta.setFrame(0);

        }, 3000);
      },
      yoyo: true, // adicione um efeito de ida e volta (tremer)
      repeat: 3, // repita indefinidamente
    });

    // Adicione uma imagem invisível como chão
    this.chaoInvisivel = this.physics.add.image(
      gameState.mediaWidth,
      gameState.mediaHeight * 1.75,
      "chao"
    );
    this.chaoInvisivel.setVisible(false); // Torna a imagem invisível

    // Defina o tamanho do chão invisível
    this.chaoInvisivel.displayWidth = gameState.gameWidth; // Largura igual à largura do jogo
    this.chaoInvisivel.setOrigin(0.5, 0); // Define a origem para o meio superior

    // Adicione física ao chão invisível para que os objetos possam colidir com ele
    this.physics.add.existing(this.chaoInvisivel);
    this.chaoInvisivel.body.allowGravity = false; // Não aplique gravidade ao chão
    this.chaoInvisivel.body.immovable = true; // Torne o chão imóvel

    // Colisão entre o botão e o chão invisível
    this.physics.add.collider(this.btCriarConta, this.chaoInvisivel);

    // this.energia.setCollideWorldBounds(true); // Não usado

    // Configuração da colisão entre o chão invisível e a energia (moeda)
    this.physics.add.collider(
      this.chaoInvisivel,
      energia,
      function (chaoInvisivel, energia) {
        energia.setVisible(false);
        if (pontuacao <= 11) {
          energia.setVelocity(0, 0);
          // "Gera" uma nova energia (apenas reposiciona a antiga)
          let posicao = Phaser.Math.RND.between(navbar.x * 0.6, navbar.x * 1.4);
          energia.setPosition(posicao, 10); // reposiciona a energia fora da tela
          gameState.somQuedaEnergia.play()
          energia.setVisible(true);
        }
      }
    );

    this.gameFinalizado = false;

    var self = this;

    // Configuração da colisão entre o botão e a energia (moeda)
    this.physics.add.collider(this.btCriarConta, energia, function () {
      energia.setVisible(false);
      
      if (!self.gameFinalizado) {
        gameState.somPegarEnergia.play();
        // "Gera" uma nova energia (apenas reposiciona a antiga)
        let posicao = Phaser.Math.RND.between(navbar.x * 0.6, navbar.x * 1.4);
        gameState.somQuedaEnergia.play()
        energia.setPosition(posicao, 10); // reposiciona a energia fora da tela
        energia.setVelocity(0, 0);

        //adiciona um na pontuação
        pontuacao = pontuacao + 1;

        //deixa a energia visivel
        energia.setVisible(true);

        // Switch case para atualizar o frame do botão criar conta com base na pontuação
        switch (pontuacao) {
          case 1:
            self.btCriarConta.setFrame(1); // Define o frame do botão para 1
            break;
          case 5:
            self.btCriarConta.setFrame(2); // Define o frame do botão para 2
            break;
          case 7:
            self.btCriarConta.setFrame(3); // Define o frame do botão para 3
            break;
          case 10:
            self.btCriarConta.setFrame(4); // Define o frame do botão para 4
            break;
          case 12:
            // Define o frame do botão para 5 e executa ações adicionais
            self.btCriarConta.setFrame(5);
            self.helpTecla.setVisible(false); // Oculta a imagem de ajuda com tecla
            self.paginaBranca.setVisible(false); // Oculta a página branca
            self.paginaFinal.setVisible(true); // Exibe a página final
            self.energia.setVisible(false); // Oculta a energia
            self.gameFinalizado = true; // Define o jogo como finalizado

            // Define a posição do botão criar conta 
            self.btCriarConta.setPosition(
              calcularPosicaoX(0.62, 0.67) / 2,
              self.btCriarConta.y
            ); // Reposiciona o botão criar conta



            break;
        }
      }
    });

    // Configurações de física para o chão invisível e a energia
    this.physics.add.existing(this.chaoInvisivel);
    this.chaoInvisivel.body.allowGravity = false;
    this.chaoInvisivel.body.immovable = true;

    // Define o cursor padrão e altera para ponteiro quando o mouse está sobre o botão
    this.btCriarConta.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    this.btCriarConta.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    // Define a transição de cena ao clicar no botão
    this.btCriarConta.on("pointerdown", () => {
      if (this.gameFinalizado) {
        gameState.somClickMouse.play()
        mudarProgresso(this);
        this.botaoImovel = true; // Define o jogo como finalizado

        this.scene.stop("TelaPC3");
        this.scene.transition({ target: "TelaPC4", duration: 500 });

      }
    });
    //cria a barra de progresso
    barraProgresso(this);

    // Cria o objeto Miguelzinho na posição especificada
    this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);

  }
  // Função chamada quando o dialogo é finalizado
  onCompleteDialogo() {
    //console.log('onCompleteDialogo');
  }
  update() {
    // Verifica se o jogo não está finalizado para controlar o movimento do botão
    if (!this.gameFinalizado) {
      // Verifica se a seta esquerda está pressionada e o botão está dentro dos limites do navbar
      if (
        this.cursor.left.isDown &&
        this.btCriarConta.x > this.navbar.x * 0.6
      ) {
        this.btCriarConta.setVelocityX(-300); // Move o botão para a esquerda
      } else if (
        this.cursor.right.isDown &&
        this.btCriarConta.x < this.navbar.x * 1.4
      ) {
        // Verifica se a seta direita está pressionada e o botão está dentro dos limites do navbar
        this.btCriarConta.setVelocityX(300); // Move o botão para a direita
      } else {
        this.btCriarConta.setVelocityX(0); // Para o movimento se nenhuma tecla estiver pressionada
        //this.btCriarConta.setPosition(gameState.mediaWidth * 0.655, gameState.mediaHeight * 0.86);
      }
    } else {

      if (!this.botaoImovel) {
        this.btCriarConta.setVelocityX(0); // Para o movimento se nenhuma tecla estiver pressionada
      }
      //this.btCriarConta.setPosition(gameState.mediaWidth * 0.655, gameState.mediaHeight * 0.86);
    }
  }
}