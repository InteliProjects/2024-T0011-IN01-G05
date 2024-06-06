class Miguelzinho {
  constructor(cena) {
    this.cena = cena; // Referência para a cena
    this.tempoEspera = 15; // Tempo de espera entre cada letra do diálogo
  }

  load(falaJson) {
    // Carrega a spritesheet do balão de fala
    this.cena.load.spritesheet('balaoFala', 'assets/casaInicial/Balões de diálogo.svg', {
      frameWidth: 561,
      frameHeight: 159
    });

    // Carrega o arquivo JSON com as falas
    this.cena.load.json("falas", falaJson = "src/dialogo/fase 1/dialogoCasa.json");

    // Carrega a imagem do botão próximo
    this.cena.load.svg("botaoProximo", "assets/casaInicial/botaoMudarFalas.svg");
  }

  create(x, y) {
    // Cria o sprite do balão de diálogo
    this.cena.balaoDialogo = this.cena.add.sprite(x, y, 'balaoFala');
    this.cena.balaoDialogo.setScale((gameState.mediaHeight / this.cena.balaoDialogo.height) * 0.4);
    this.cena.balaoDialogo.setOrigin(0);
    this.cena.balaoDialogo.setFrame(1);
    this.cena.balaoDialogo.setDepth(11);

    // Cria o botão próximo
    this.cena.botaoProximo = this.cena.add.image(this.cena.balaoDialogo.x + (505 * ((gameState.mediaHeight / this.cena.balaoDialogo.height) * 0.34)), this.cena.balaoDialogo.y + (159 * ((gameState.mediaHeight / this.cena.balaoDialogo.height) * 0.5)), 'botaoProximo');
    this.cena.botaoProximo.setScale((gameState.mediaHeight / this.cena.botaoProximo.height) * 0.1);
    this.cena.botaoProximo.setOrigin(0, 1);
    this.cena.botaoProximo.setInteractive();
    this.cena.botaoProximo.setDepth(13);

    // Configura o cursor do mouse quando passa por cima do botão próximo
    this.cena.botaoProximo.on("pointerover", () => {
      this.cena.input.setDefaultCursor("pointer");
    });

    // Configura o cursor do mouse quando sai de cima do botão próximo
    this.cena.botaoProximo.on("pointerout", () => {
      this.cena.input.setDefaultCursor("default");
    });

    // Configura o evento de clique no botão próximo
    this.cena.botaoProximo.identificaFalando = false;
    this.cena.botaoProximo.on("pointerdown", () => {
      gameState.somClickMouse.play()
      this.trocaDialogo(this.cena.botaoProximo.identificaFala, gameState.fala, gameState.onCompleto);
    });

    // Carrega as falas do arquivo JSON
    this.cena.falas = this.cena.cache.json.get("falas");

    // Cria o texto de diálogo dentro do balão de diálogo
    this.cena.dialogoAtual = this.cena.add.text(
      this.cena.balaoDialogo.x * 1.01, // Posição horizontal do texto
      this.cena.balaoDialogo.y * 1.85, // Posição vertical do texto
      "", // Texto inicial vazio
      { font: "bold " + Math.round(gameState.gameHeight * 0.025) + "px calibre", fill: "#000000" }).setOrigin(0);

    this.cena.dialogoAtual.setDepth(13);

    // Define em qual fala está
    this.cena.botaoProximo.identificaFala = 0;
    // Variável de controle para evitar que o narrador seja interrompido
    this.cena.botaoProximo.identificaFalando = false;
    // Chama o método de troca de diálogo, ativando a primeira fala.

    // Esconde o balão de diálogo e o botão próximo
    this.cena.balaoDialogo.setVisible(false);
    this.cena.botaoProximo.setVisible(false);
  }

  // Método para iniciar o diálogo
  startDialogo(fala, onCompleto, liberado = true) {
    if (liberado) {
      // Define as variáveis de estado do diálogo
      gameState.fimFalas = false;
      gameState.fala = fala;
      gameState.onCompleto = onCompleto;
      this.cena.botaoProximo.identificaFalando = false;
      // Mostra o balão de diálogo e o botão próximo
      this.cena.balaoDialogo.setVisible(true);
      this.cena.botaoProximo.setVisible(true);
      // Chama o método de troca de diálogo para iniciar a primeira fala
      this.trocaDialogo(this.cena.botaoProximo.identificaFala, fala, gameState.onCompleto);
    }
  }

  // Método para trocar o diálogo
  trocaDialogo(falaAtual, fala, onCompleto) {
    // Verifica se ainda há falas para exibir e se não há interrupções
    if (falaAtual < Object.keys(this.cena.falas[fala]).length && !this.cena.botaoProximo.identificaFalando && !gameState.fimFalas) {
      this.cena.botaoProximo.identificaFalando = true;
      this.cena.dialogoAtual.text = "";

      let i = 0;

      // Adiciona um evento para exibir as letras do diálogo uma por uma
      this.cena.time.addEvent({
        callback: () => {
          this.cena.dialogoAtual.text += this.cena.falas[fala][falaAtual]['' + falaAtual].substring(i, i + 1);
          i++;
          // Verifica se todas as letras do diálogo foram exibidas
          if (i === this.cena.falas[fala][falaAtual]['' + falaAtual].length) {
            // Atualiza o índice da fala atual e libera o botão próximo
            this.cena.botaoProximo.identificaFala++;
            this.cena.botaoProximo.identificaFalando = false;
          }
        },
        repeat: this.cena.falas[fala][falaAtual]['' + falaAtual].length,
        delay: this.tempoEspera
      });
    } else if (falaAtual === Object.keys(this.cena.falas[fala]).length || gameState.fimFalas) {
      // Finaliza o diálogo
      this.cena.dialogoAtual.text = "";
      gameState.fimFalas = true;
      this.cena.balaoDialogo.setVisible(false);
      this.cena.botaoProximo.setVisible(false);
      this.cena.input.setDefaultCursor("default");
      this.ocultarDialogo();
      onCompleto();
    }
  }

  ocultarDialogo() {
    // destroi tudo
    this.cena.dialogoAtual.destroy();
    this.cena.balaoDialogo.destroy();
    this.cena.botaoProximo.destroy();
    //reseta todas variaveis
    gameState.fimFalas = false;
    gameState.fala = "";
  }
}
