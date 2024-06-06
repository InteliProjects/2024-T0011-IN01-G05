class TelaInicial extends Phaser.Scene {
  constructor() {
    super({ key: 'TelaInicial' });
    this.key = "TelaInicial";
  }
  preload() {
    // Carrega as imagens do background (FundoCinza, Fundo Quadriculado, Casa)
    this.load.image("fundoCinza", "assets/telaInicial/fundo_cinza.png");
    this.load.image("fundoQuadriculado", "assets/telaInicial/fundo_quadriculado.png");
    this.load.image("Casa", "assets/casaInicial/room.svg");

    // carrega os demais móveis interagíveis
    this.load.svg("pc", "assets/casaInicial/pc.svg");
    this.load.svg("cama", "assets/casaInicial/Cama.svg");

    // Carrega a logo (Engage)
    this.load.image("logoEngage", "assets/telaInicial/logo.png");

    // Texto Botoes (texto: 'Jogar', 'Opções')
    this.load.image("txtBtnJogar", "assets/telaInicial/jogar.png");
    this.load.image("txtBtnOpcoes", "assets/telaInicial/opções.png");

    // Assets botões centrais (Jogar, Opções)
    this.load.image("backgroundBotao", "assets/telaInicial/botoes/botao.png");
    this.load.image("sombraBotao", "assets/telaInicial/botoes/botao-sombra.png");

    // Assets botões laterais (Config, Musica, Som, Opções)
    this.load.image("btnConfig", "assets/telaInicial/botoes/configurações.png");
    this.load.image("btnMusica", "assets/telaInicial/botoes/musica.png");
    this.load.image("btnSom", "assets/telaInicial/botoes/som.png");

    // Assets configurações
    this.load.image("configuracoes", "assets/telaInicial/configuracoes.svg");
    this.load.audio("musica", "assets/sounds/musicaTelaInicial1.mp3");
    this.load.audio("somClickMouse", "assets/sounds/clickMouse.mp3");
    this.load.audio("somPegarPapel", "assets/sounds/pegarPapel.mp3");
    this.load.audio("somClickCama", "assets/sounds/clickCama.mp3");
    this.load.audio("somClickPC", "assets/sounds/clickPC.mp3");
    this.load.audio("somVirandoCarta", "assets/sounds/virandoCarta.mp3");
    this.load.audio("somPontoMemoria", "assets/sounds/pontoMemoria.mp3");
    this.load.audio("somErroMemoria", "assets/sounds/erroMemoria.mp3");
    this.load.audio("somPegarEnergia", "assets/sounds/pegarEnergia.mp3");
    this.load.audio("somQuedaBotao", "assets/sounds/quedaBotao.mp3");
    this.load.audio("somQuedaEnergia", "assets/sounds/quedaEnergia.mp3");
    this.load.audio("somErroCriarConta", "assets/sounds/erroCriarConta.mp3");
    this.load.audio("somNotificacao", "assets/sounds/notificacao.mp3");
  }

  create() {

    gameState.somClickMouse = this.sound.add("somClickMouse", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somPegarPapel = this.sound.add("somPegarPapel", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somClickCama = this.sound.add("somClickCama", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somClickPC = this.sound.add("somClickPC", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somVirarCarta = this.sound.add("somVirandoCarta", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somErroMemoria = this.sound.add("somErroMemoria", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somPontoMemoria = this.sound.add("somPontoMemoria", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somPegarEnergia = this.sound.add("somPegarEnergia", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somQuedaBotao = this.sound.add("somQuedaBotao", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somQuedaEnergia = this.sound.add("somQuedaEnergia", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somErroCriarConta = this.sound.add("somErroCriarConta", {volume:gameState.volumeSom.toFixed(2)});
    gameState.somNotificacao = this.sound.add("somNotificacao", {volume:gameState.volumeSom.toFixed(2)});

    this.cameras.main.fadeIn(3000, 0, 0, 0);


    //define o ponteiro do cursor como o de seta
    this.input.setDefaultCursor("default");

    //verifica se música não está tocando ainda
    if (!gameState.musicaTocando) {

      //adiciona a musica
      gameState.musica = this.sound.add("musica", { volume: gameState.volumeMusica.toFixed(2) });

      gameState.musica = this.sound.add("musica", { volume: gameState.volumeMusica.toFixed(2) });

      //da play na musica e a mantém em loop
      gameState.musica.play({
        loop: true
      });

      //define que a musica está tocando
      gameState.musicaTocando = true;
    }

    // * Cria o cenário de fundo em camadas *
    // Ordem das camadas: fundoQuadriculado -> casa -> fundoCinza (62% de opacidade)
    this.add.image(gameState.mediaWidth, gameState.mediaHeight, "fundoQuadriculado").setScale(gameState.gameWidth*0.00065);
    // Adiciona e justa as dimensões da casa de acordo com o tamanho da tela
    let casaBackground = this.add.image(gameState.mediaWidth, gameState.mediaHeight, "Casa");
    casaBackground.setScale((gameState.gameHeight / casaBackground.height));

    // adiciona sprite do computador e ajusta as dimensões
    this.pcCasa = this.add.image(gameState.mediaWidth * 1.1, gameState.mediaHeight, "pc");
    this.pcCasa.setScale((gameState.gameHeight / casaBackground.height) * 0.7);

    // adiciona sprite da cama e ajusta as dimensões
    this.cama = this.add.image(gameState.mediaWidth * 0.82, gameState.mediaHeight * 1.4, "cama");
    this.cama.setScale((gameState.mediaHeight / this.cama.height) * 1.2);

    // Define a opacidade do fundo para 62%
    this.add.image(gameState.mediaWidth, gameState.mediaHeight, "fundoCinza").setAlpha(0.62).setScale(gameState.gameWidth*0.0007);

    // Adiciona a logo na tela (Engage)
    this.add.image(gameState.mediaWidth *0.974, gameState.mediaHeight *0.602, "logoEngage").setScale(gameState.gameHeight * 0.0011);

    // Adiciona sombra nos botoes de Jogar e Opções
    this.add.image(gameState.mediaWidth, gameState.mediaHeight *1.1, "sombraBotao").setScale(gameState.gameHeight * 0.00085);
    this.add.image(gameState.mediaWidth, gameState.mediaHeight *1.44, "sombraBotao").setScale(gameState.gameHeight * 0.00085);

    // Cria os botoes (Jogar, Opções) na tela
    var btnJogar = this.add.image(gameState.mediaWidth, gameState.mediaHeight *1.057, "backgroundBotao").setScale(gameState.gameHeight * 0.00085);
    var btnOpcoes = this.add.image(gameState.mediaWidth, gameState.mediaHeight *1.4, "backgroundBotao").setScale(gameState.gameHeight * 0.00085);

    // Cria os botoes (Config, Musica, Som) na tela
    var btnConfig = this.add.image(gameState.gameWidth *0.971, gameState.gameHeight*0.064, "btnConfig").setScale(gameState.gameHeight *0.0008);

    // Cria os textos ("Jogar", "Opções") na tela
    var txtBtnJogar = this.add.image(gameState.mediaWidth, btnJogar.y, "txtBtnJogar").setScale(gameState.gameHeight * 0.00085);
    var txtBtnOpcoes = this.add.image(gameState.mediaWidth, btnOpcoes.y, "txtBtnOpcoes").setScale(gameState.gameHeight * 0.00085);

    // Define os botões interativo
    btnJogar.setInteractive();
    btnOpcoes.setInteractive();
    btnConfig.setInteractive();

    // Define uma variável para que possa modificar a duração do movimento dos dois botões ao mesmo tempo
    var duracaoMovBtn = 500;

    // Função que realiza o movimento do botao (btnJogar) e do texto (txtBtnJogar)
    this.tweens.add({
      targets: [btnJogar, txtBtnJogar],
      duration: duracaoMovBtn,
      y: btnJogar.y + gameState.gameHeight * 0.0155,     // Posição até onde o btnJogar e o txtBtnJogar vai ir
      repeat: -1, // Define a animação como infinita
      yoyo: true  // Define que sera um movimento continuo
    });

    // Função que realiza o movimento do botao (btnOpcoes) e do texto (txtBtnOpcoes)
    this.tweens.add({
      targets: [btnOpcoes, txtBtnOpcoes],
      duration: duracaoMovBtn,
      y: btnOpcoes.y + gameState.gameHeight * 0.0155,     // Posição até onde o btnOpcoes e o txtBtnOpcoes vai ir
      repeat: -1, // Define a animação como infinita
      yoyo: true  // Define que sera um movimento continuo
    });

    // * Modifica - Botoes Centrais *
    // Define que ao colocar o mouse em cima do botão o cursor será trocado para a "mãozinha" / pointer
    // Botoes: Jogar, Opções
    btnJogar.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    btnOpcoes.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });

    // Define que ao tirar o mouse em cima do botão o tipo do cursor voltara ao seu padrão
    // Botoes afetados: Jogar, Opções
    btnJogar.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });
    btnOpcoes.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    // * Modifica - Botoes Laterais *
    // Define que ao colocar o mouse em cima do botão o cursor será trocado para a "mãozinha" / pointer
    // e aumenta o botao selecionado
    // Botão afetado: Config
    btnConfig.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
      btnConfig.setScale(gameState.gameHeight *0.00096);
    });

    // * Reset - Botoes Laterais *
    // Define que ao colocar o mouse em cima do botão o tipo do cursor voltara ao seu padrão
    // e voltara o tamanho do botão ao normal
    // Botão afetado: Config
    btnConfig.on("pointerout", () => {
      this.input.setDefaultCursor("default");
      btnConfig.setScale(gameState.gameHeight *0.0008);
    });

    // * Ação de clique nos botões *
    // Define o que cada botão tem que executar quando pressionado
    // Botões afetados: Jogar, Opcoes, Config

    // * Botões Centrais *
    // Direciona o Jogador para o primeiro cenário
    btnJogar.on("pointerdown", () => {
      //toca o som de click do mouse
      gameState.somClickMouse.play()
      //cria o fadeOut deixando a transição mais suave
      this.cameras.main.fadeOut(500, 209, 209, 209, (camera, progress) => {

        // Quando a transição estiver concluída, carrega o novo cenário
        if (progress == 1) {
          //modifica a cena
          this.scene.transition({ target: 'CasaInicial', duration: 1000 });
          this.scene.stop('TelaInicial');
        }
      });
    });

    btnOpcoes.on("pointerdown", () => {
      //toca o som de click do mouse
      gameState.somClickMouse.play()

      this.cameras.main.fadeOut(500, 209, 209, 209, (camera, progress) => {

        // Quando a transição estiver concluída, carrega o novo cenário
        if (progress == 1) {
          //modifica a cena
          this.scene.stop('TelaInicial');
          this.scene.start('MenuFases');
        }
      });
    });

    // troca a cena, indo para a de configurações
    btnConfig.on("pointerdown", () => {
      //toca o som de click do mouse
      gameState.somClickMouse.play()
      
      this.scene.stop('TelaInicial');
      this.scene.start('Configuracoes');
    });

  }

  update(){
  }
}
