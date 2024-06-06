class TelaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'TelaFinal' });
        //atributo que será usado para retornar à cena posteriormente
        this.key = "TelaFinal";
    }

    preload() {
        //carrega a tela de fundo
        this.input.setDefaultCursor("default");

        //Botão de confirmar a instituição
        this.load.image("botaoCofirmarSuperficieFinal", "assets/telaFinal/botaoPularCreditosSuperficie.svg");

        //Sombra do botão Confirmar
        this.load.image("SombraBotaoFinal", "assets/telaFinal/botaoPularCreditosSombra.svg");

        //Carrega a pagina do PC utilizada nessa cena
        this.load.image("bgFinal", "assets/telaFinal/background.png");

        //Carrega os créditos do jogo
        this.load.image("creditos", "assets/telaFinal/Creditos.png");

        //Carrega a logo do jogo
        this.load.image("logoEngage", "assets/telaInicial/logo.png");
    }

    create() {

        //faz uma transição na tela
        this.cameras.main.fadeIn(3000, 0, 0, 0);

        // cria a tela final
        this.bgFinal = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 1.04, "bgFinal")
        this.bgFinal.setScale((gameState.gameHeight / this.bgFinal.height) * 1.5);

        // cria os créditos
        this.creditos = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 3.7, "creditos")
        this.creditos.setScale((gameState.gameHeight / this.creditos.height) * 3.5);

        // Cria a sombra do botão criar conta no lugar adequado
        this.SombraBotaoFinal = this.add.image((gameState.gameWidth * 0.92) * 1, gameState.mediaHeight * 1.88, "SombraBotaoFinal").setInteractive();
        this.SombraBotaoFinal.setScale((gameState.gameHeight / this.SombraBotaoFinal.height) * 0.07);
        this.SombraBotaoFinal.setVisible(false)

        // Adiciona a imagem do botão de Instituição/Educador ao cenário e regula a escala definindo como interativo
        this.botaoCofirmarSuperficieFinal = this.add.image((gameState.gameWidth * 0.92) * 1, gameState.mediaHeight * 1.86, "botaoCofirmarSuperficieFinal")
        this.botaoCofirmarSuperficieFinal.setScale((gameState.gameHeight / this.botaoCofirmarSuperficieFinal.height) * 0.07).setInteractive();
        this.botaoCofirmarSuperficieFinal.setVisible(false)

        // Adiciona a mecânica de mudança de seta para mão no mouse
        this.botaoCofirmarSuperficieFinal.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        this.botaoCofirmarSuperficieFinal.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Atribui movimento ao botão Confirmar
        movimentoDosBotoes(this, this.botaoCofirmarSuperficieFinal);

        // Mantem o crédito parado por 3 segundos
        this.creditSpeed = 0

        setTimeout(() => {
                // Inicia o movimento dos créditos
                this.creditSpeed = 1;
    
                //torna os botões visiveis
                this.botaoCofirmarSuperficieFinal.setVisible(true)
                this.SombraBotaoFinal.setVisible(true)

            //faz a transição quando o botão de confirmar conta é clicado
            this.botaoCofirmarSuperficieFinal.on("pointerdown", () => {
                this.cameras.main.fadeOut(500, 109, 109, 109, (camera, progress) => {
                    // Quando a transição estiver concluída, carrega o novo cenário
                    if (progress == 1) {
                        this.scene.transition({ target: 'TelaInicial', duration: 500 });
                        this.scene.stop('TelaFinal');
                        // recarregar a pagina
                        location.reload();
                    }

                    //faz com que possa dormir
                    gameState.dormir = true;
                });
            });
        }, 2000);

        // Inicia a transição para a próxima cena após um certo tempo
        setTimeout(() => {
            // Inicia a transição para a próxima cena
            this.cameras.main.fadeOut(4000, 0, 0, 0, (camera, progress) => {
                // Quando a transição estiver concluída, carrega o novo cenário
                if (progress == 1) {
                    this.scene.transition({ target: 'TelaInicial', duration: 500 });
                    this.scene.stop('TelaFinal');
                    // recarregar a pagina
                    location.reload();
                }
            });
        }, 40000); // ajuste o tempo conforme necessário

        setTimeout(() => {
            this.logoEngage = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 0.9, "logoEngage")
            this.logoEngage.setScale((gameState.gameHeight / this.logoEngage.height) * 0.8);
            this.logoEngage.setAlpha(0); // Define a transparência para 0
            this.tweens.add({
                targets: this.logoEngage,
                alpha: 1, // Aumenta a transparência gradualmente para 1
                duration: 2000, // Duração da transição
                delay: 500, // Atraso antes de iniciar a transição
                ease: 'Power2', // Tipo de transição (opcional)
                onComplete: function() {
                    // Callback opcional a ser executado quando a transição estiver concluída
                }
            });
        }, 36000); // Aumenta a trans

        // Adiciona a logo
        this.logoEngage = this.add.image(gameState.mediaWidth + 1.5, gameState.mediaHeight * 0.5, "logoEngage");
        this.logoEngage.setScale((gameState.gameHeight / this.logoEngage.height) * 0.9);
        this.logoEngage.setVisible(false); // torna a logo invisível inicialmente
    }
    update() {
        // Atualiza o movimento dos créditos
        // Move os créditos para cima com base na velocidade definida
        this.creditos.y -= this.creditSpeed;

        // Se os créditos saírem da tela, reinicie sua posição para que continuem subindo
        if (this.creditos.y < -this.creditos.height) {
            this.creditos.y = gameState.mediaHeight + this.creditos.height;
        }
    }
}
