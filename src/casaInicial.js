class CasaInicial extends Phaser.Scene {
  constructor() {
    super({ key: "CasaInicial" });
    this.key = "CasaInicial"
  }

  preload() {
    // Cria uma instância da classe Miguelzinho e a carrega
    this.miguelzinho = new Miguelzinho(this);
    this.miguelzinho.load();

    // Cria uma instância da classe Miguelzinho para a cama e a carrega
    this.miguelzinhoCama = new Miguelzinho(this);
    this.miguelzinhoCama.load();

    /*Carregamento de recursos que serão utilizados durante a cena*/
    // carrega Asset da casa
    this.load.svg("casa", "assets/casaInicial/room.svg");

    // carrega os dois estados do post-it
    this.load.svg("papelPeq", "assets/casaInicial/papel_peq.svg");
    this.load.svg("papelGrand", "assets/casaInicial/papel_grande.svg");

    // carrega os demais móveis interagíveis
    this.load.svg("pc", "assets/casaInicial/pc.svg");
    this.load.svg("cama", "assets/casaInicial/Cama.svg");

    // carrega spritesheet da barra de progresso e especifica tamanho
    this.load.spritesheet({
      key: "barraProgresso", // nome do spritesheet
      url: "assets/casaInicial/barraProgressoOK.svg", // localização do arquivo
      frameConfig: {
        // configuração das medidas do sprite
        frameWidth: 145,
        frameHeight: 23,
      },
    });

    this.load.bitmapFont('fontePapel', 'src/fonts/fontePapel_0.png', 'src/fonts/fontePapel.fnt');
  }

  create() {
    // inicia cena com o cursor padrão
    this.input.setDefaultCursor("default");

    // Adiciona e justa as dimensões da casa de acordo com o tamanho da tela
    this.casaBackground = this.add.image(
      gameState.mediaWidth,
      gameState.mediaHeight,
      "casa"
    );
    this.casaBackground.setScale(
      gameState.gameHeight / this.casaBackground.height
    );
    this.cameras.main.setBackgroundColor("#d1d1d1"); // definição da cor de fundo (pode ser alterada mudando o hexadecimal)

    gameState.this = this;

    // adiciona sprite do computador e ajusta as dimensões
    this.pcCasa = this.add.image(
      gameState.mediaWidth * 1.1,
      gameState.mediaHeight,
      "pc"
    );
    this.pcCasa.setScale(
      (gameState.gameHeight / this.casaBackground.height) * 0.7
    );

    this.pcCasa.setInteractive(); // desbloqueia a interatividade do computador

    // mudança do cursor durante interação com o computador
    this.pcCasa.on("pointerover", () => {
      this.input.setDefaultCursor("pointer"); // muda para cursor de clique se o mouse está no computador
    });
    this.pcCasa.on("pointerout", () => {
      this.input.setDefaultCursor("default"); // retorna ao cursor default ao sair do computador
    });

    // ações ao clicar no computador
    this.pcCasa.on("pointerdown", () => {
      if (gameState.fimFalasMiguel) {
        gameState.somClickPC.play()
        this.cameras.main.fadeOut(500, 209, 209, 209, (camera, progress) => {
          // Quando a transição estiver concluída, carrega o novo cenário
          if (progress == 1) {
            //modifica para a ultima tela que apareceu no pc
            //caso seja a primeira interação com o computador modifica para a telaPC1, já definida na variável
            this.scene.transition({
              target: gameState.cenaComputador,
              duration: 500,
            });
            this.scene.stop("CasaInicial");
          }
        });
      }
      //verifica se o post-it já piscou e se o pc já piscou depois dele
      if (gameState.piscou && !gameState.fimPC) {
        //faz com que o pc não pique denovo
        gameState.fimPC = true;
      }

    });

    // adiciona sprite da cama e ajusta as dimensões
    this.cama = this.add.image(
      gameState.mediaWidth * 0.82,
      gameState.mediaHeight * 1.4,
      "cama"
    );
    this.cama.setScale((gameState.mediaHeight / this.cama.height) * 1.2);

    //torna a cama interativa quando dormir for verdadeiro
    if (gameState.dormir) {
      this.cama.setInteractive();
      this.miguelzinhoCama.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
      this.miguelzinhoCama.startDialogo("dormir", this.onCompleteDialogo2);

      //faz a cama "piscar"
      this.tweens.add({
        targets: this.cama,
        scaleX:
          (gameState.gameHeight / this.casaBackground.height) * 0.7 * 0.9,
        scaleY:
          (gameState.gameHeight / this.casaBackground.height) * 0.7 * 0.9,
        duration: 500, // duração em milissegundos
        yoyo: true, // faça a animação voltar ao estado original
        repeat: -1, // -1 para repetir indefinidamente
      });

      // mudança do cursor durante interação com a cama
      this.cama.on("pointerover", () => {
        this.input.setDefaultCursor("pointer"); // muda para cursor de clique se o mouse está no computador
      });
      this.cama.on("pointerout", () => {
        this.input.setDefaultCursor("default"); // retorna ao cursor default ao sair do computador
      });

      // ações ao clicar na cama, faz a transição para a tela de créditos
      this.cama.on("pointerdown", () => {
        if (gameState.dormir) {
          gameState.somClickCama.play()
          gameState.dormir = false;
          this.cameras.main.fadeOut(3000, 0, 0, 0);
          this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            (cam, effect) => {
              this.time.delayedCall(1000, () => {
                this.scene.transition({ target: 'TelaFinal', duration: 500 });
                this.scene.stop('CasaInicial');
              });
            }
          );
        }
      });
    }

    // cria lista com os sprites de papel que serão alternados
    this.trocaPapel = ["papelPeq", "papelGrand"];

    // adiciona papel na tela no sprite 0 e ajusta as dimensões
    this.papel = this.add.image(
      gameState.mediaWidth * 1.13,
      gameState.mediaHeight * 0.83,
      this.trocaPapel[0]
    );

    this.papel.setScale((gameState.mediaHeight / this.papel.height) * 0.05);
    this.papel.setInteractive(); // torna o papel interativo
    this.papel.tamanhoPequeno = true; // variável de controle para verificar o estado atual do papel (pequeno -> true ou grande -> false)

    if (gameState.postIt) {
      // mudanças do cursor durante interação com o papel
      this.papel.on("pointerover", () => {
        this.input.setDefaultCursor("pointer"); // muda para cursor de clique se o mouse está no papel
      });
      this.papel.on("pointerout", () => {
        this.input.setDefaultCursor("default"); // retorna ao cursor default ao sair do papel
      });
    }

    this.papel.on("pointerdown", () => {
      gameState.papelClicado = true;
      if (this.papel.tamanhoPequeno == true) {
        // Se o papel estiver pequeno, troca para o grande, configura as dimensões e centraliza na tela
        this.papel.setTexture(this.trocaPapel[1]); // Troca dos sprites
        this.papel.setScale(gameState.mediaHeight / this.papel.height);
        this.papel.setPosition(gameState.mediaWidth, gameState.mediaHeight);
        this.papel.tamanhoPequeno = false; // Define que agora o papel não está pequeno
      } else if (this.papel.tamanhoPequeno == false) {
        // Se o papel não estiver pequeno, reverte para o papel pequeno e reestabelece as configurações iniciais
        this.papel.setTexture(this.trocaPapel[0]); // Troca dos sprites
        this.papel.setScale((gameState.mediaHeight / this.papel.height) * 0.05);
        this.papel.setPosition(
          gameState.mediaWidth * 1.13,
          gameState.mediaHeight * 0.83
        );
        this.papel.tamanhoPequeno = true; // Define que o papel voltou a ser pequeno

        // Torna o texto da senha invisível ao voltar ao tamanho pequeno
        if (gameState.senhaText) {
          gameState.senhaText.setVisible(false);
        }
      }

      if (gameState.postIt) {
        gameState.leuEmail = true;
      }
      if (gameState.lerSenha) {
        gameState.leuSenha = true;
      }

      // Verifica se o papel está grande e se há uma senha disponível para exibir
      if (this.papel.tamanhoPequeno == false && gameState.senha) {
        // Adiciona o texto da senha ao post-it

        gameState.senhaText = this.add.bitmapText(
          gameState.mediaWidth * 0.80,
          gameState.mediaHeight * 1,
          "fontePapel",
          gameState.senha, 35
          // { fontSize: '20px', fill: '#000000' }
        ).setCharacterTint(0, -1, false, 0x7E4C23)


        // Torna o texto da senha visível novamente caso já exista
        gameState.senhaText.setVisible(true);


      }
    });

    //cria a barra de progresso
    barraProgresso(this);

    if (!gameState.dialogoApresentacao) {
      this.miguelzinho.create(gameState.mediaWidth * 1.25, gameState.mediaHeight * 0.1);
      this.miguelzinho.startDialogo("miguelzinho", this.onCompleteDialogo, !gameState.dialogoApresentacao)
    }
  }
  onCompleteDialogo() {
    gameState.dialogoApresentacao = true;
    mudarProgresso(gameState.this);
    // animação de destaque no computador
    gameState.fimFalasMiguel = true;
    gameState.this.tweens.add({
      targets: gameState.this.pcCasa,
      scaleX:
        (gameState.gameHeight / gameState.this.casaBackground.height) * 0.7 * 1.15,
      scaleY:
        (gameState.gameHeight / gameState.this.casaBackground.height) * 0.7 * 1.15,
      duration: 500, // duração em milissegundos
      yoyo: true, // faça a animação voltar ao estado original
      repeat: -1, // -1 para repetir indefinidamente
    });
  }
  onCompleteDialogo2() {
    //this.miguelzinhoCama.ocultarDialogo();
  }

  update() {

    //verifica se não pode dormir
    if (!gameState.dormir) {
      this.cama.on("pointerover", () => {
        this.input.setDefaultCursor("default"); // retorna ao cursor default ao sair da cama
      });

      //mantem a cama parada
      this.cama.setScale((gameState.mediaHeight / this.cama.height) * 1.2);
    }

    //verifica se o post-it não pode piscar e se o post-it já piscou
    if (!gameState.postIt && gameState.piscou) {
      //   // if(){
      //   //   this.trocouPapel = true;
      //   //   this.papel.setTexture(this.trocaPapel[1]); // troca dos sprites
      //   //   this.papel.setScale(gameState.mediaHeight / this.papel.height);
      //   //   this.papel.setPosition(gameState.mediaWidth, gameState.mediaHeight);
      //   //   this.papel.tamanhoPequeno = false; // define que agora o papel não está pequeno
      //   // }
      //   // else{
      if (this.papel.tamanhoPequeno == true) {
        this.papel.setTexture(this.trocaPapel[1]);
        this.papel.setScale(gameState.mediaHeight / this.papel.height);
        this.papel.setPosition(gameState.mediaWidth, gameState.mediaHeight);

        //se o papel for grande ajusta a escala, posição e textura, para não ficar piscando
      } else if (this.papel.tamanhoPequeno == false) {
        this.papel.setTexture(this.trocaPapel[0]);
        this.papel.setScale((gameState.mediaHeight / this.papel.height) * 0.05);
        this.papel.setPosition(
          gameState.mediaWidth * 1.05,
          gameState.mediaHeight * 0.96
        );
      }
    }

  }
}
