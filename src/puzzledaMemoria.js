let numCartasViradas = 0
class Carta {
    constructor(x, y, valorCarta, assetsDentro, phaser) {
        this.x = x; // cordenada horizontal da carta
        this.y = y; // cordenada vertical da carta
        this.valorCarta = valorCarta; // valor atrelado a carta criada 
        this.assetsDentro = assetsDentro; // asset específico da carta
        this.phaser = phaser; // objeto a ser usado
        this.idCarta = 'carta_' + valorCarta; // identificador da carta
        this.virada = false; // define se a carta está virada 
        this.bloqueada = false; // define se a carta está bloqueada
        this.cartaSprite;  // atributo que recebe o sprite da carta

    }
    /* Método responável por carregar os assets*/
    loadAssets() {
        this.phaser.load.spritesheet(this.idCarta, this.assetsDentro, {
            // especificação do tamanho do frame
            frameWidth: 113.5,
            frameHeight: 172

        });
    }

    /*Método de criação de assets */
    createAssets() {
        // Criação e configuração do asset da carta
        this.cartaSprite = this.phaser.add.sprite(this.x, this.y, this.idCarta).setInteractive();
        this.cartaSprite.setScale((gameState.gameHeight/this.cartaSprite.height)*0.18);

        // ações ao clicar na carta
        this.cartaSprite.on('pointerdown', () => {

            // caso a carta não esteja bloqueada
            if (!this.bloqueada && gameState.dialogCompleto) {
                
                //da play na musica e a mantém em loop
                gameState.somVirarCarta.play();
    
                // caso não tenha uma carta 1 registrada, registra como carta 1
                // se não, registra como carta 2
                if (gameState.carta1 == "") {
                    gameState.carta1 = this.valorCarta;
                } else {
                    gameState.carta2 = this.valorCarta;
                }
                // caso carta 1 e 2 sejam diferentes, chama virar carta
                // se não, registra como carta 1 e esvazia a carta 2
                if (gameState.carta1 != gameState.carta2) {
                    this.virarCarta();
                } else {
                    gameState.carta1 = this.valorCarta;
                    gameState.carta2 = "";
                }
            }

        });

        //modifica o ponteiro do mouse
        this.cartaSprite.on("pointerover", () => {
            this.phaser.input.setDefaultCursor("pointer");
        });
        this.cartaSprite.on("pointerout", () => {
            this.phaser.input.setDefaultCursor("default");
        });

    }

    //método de virar cartas
    virarCarta() {
        if (numCartasViradas === 2)
            return;

        if (!this.bloqueada) { // Verifica se a carta não está bloqueada
            this.virada = !this.virada;
            // Define qual frame exibir de acordo com o estado da carta
            if (this.virada) {
                numCartasViradas++;
                // Frame para a carta virada
                this.cartaSprite.setFrame(1);
            } else {
                numCartasViradas--;
                // Frame para a carta desvirada
                this.cartaSprite.setFrame(0);
            }
        }
    }

    // método de reversão das cartas
    resetarCartas() {
        // caso desbloaqueada e virada
        if (!this.bloqueada && this.virada) {
            // após 1000ms desvira as cartas, muda o atributo virada e esvazia as cartas 1 e 2
            setTimeout(() => {
                this.cartaSprite.setFrame(0);
                this.virada = false;
                gameState.carta1 = "";
                gameState.carta2 = "";
                numCartasViradas = 0
            }, 1000);

        }
    }
}