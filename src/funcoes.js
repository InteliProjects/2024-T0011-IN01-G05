//cria a função voltarCasa que será chamada em varias cenas
function voltarCasa(cena, click = () => { }) {

    //adiciona a imagem do botão
    cena.botaoVoltar = cena.add.image(gameState.mediaWidth * 1.86, gameState.mediaHeight * 0.20, "botaoVoltarCasa")
    cena.botaoVoltar.setScale((gameState.gameHeight/cena.botaoVoltar.height)*0.135);

    //torna o botão interativo
    cena.botaoVoltar.setInteractive();

    //modifica o cursor para o de clique quando o mouse esta em cima do botão.
    cena.botaoVoltar.on("pointerover", () => {
        cena.input.setDefaultCursor("pointer");

        //deixa o botão maior
        cena.botaoVoltar.setScale((gameState.gameHeight/cena.botaoVoltar.height)*0.15);
    });

    //modifica o cursor para o de seta quando o mouse esta fora do botão.
    cena.botaoVoltar.on("pointerout", () => {
        cena.input.setDefaultCursor("default");

        //deixa o botão menor
        cena.botaoVoltar.setScale((gameState.gameHeight/cena.botaoVoltar.height)*0.135);
    });

    //define a troca de tela quando o botao é clicado
    cena.botaoVoltar.on("pointerdown", () => {

        //faz um fadeout para a transição
        click();
        gameState.somClickMouse.play()
        cena.cameras.main.fadeOut(500, 209, 209, 209, (camera, progress) => {

            // Quando a transição estiver concluída, carrega o novo cenário
            if (progress == 1) {
                //começa a cena da casa
                cena.scene.transition({ target: 'CasaInicial', duration: 500 });

                //define a variável cenaComputador do game estate para o key da cena atual
                gameState.cenaComputador = cena.key;

                //para a cena atual
                cena.scene.stop(cena.key);
            }
        });
    });
}

//cria a função de abrir o configurações que será chamada em varias cenas
function botaoConfiguracoes(cena, click = () => { }) {

    //adiciona a imagem do botão de configurações
    cena.botaoConfiguracoes = cena.add.image(gameState.mediaWidth * 1.86, gameState.mediaHeight * 0.55, "btnConfig").setScale(gameState.gameHeight *0.0011);

    //torna o botão de configurações interativo
    cena.botaoConfiguracoes.setInteractive();

    //modifica o cursor para o de clique quando o mouse esta em cima do botão.
    cena.botaoConfiguracoes.on("pointerover", () => {
        cena.input.setDefaultCursor("pointer");

        //deixa o botão maior
        cena.botaoConfiguracoes.setScale(gameState.gameHeight *0.00124);
    });

    //modifica o cursor para o de seta quando o mouse esta fora do botão.
    cena.botaoConfiguracoes.on("pointerout", () => {
        cena.input.setDefaultCursor("default");

        //deixa o botão menor
        cena.botaoConfiguracoes.setScale(gameState.gameHeight *0.0011);
    });

    //define a troca de tela quando o botao é clicado, vai para a tela de configurações
    cena.botaoConfiguracoes.on("pointerdown", () => {
        click();
        gameState.somClickMouse.play()
    
        //faz um fadeout para a transição
        cena.cameras.main.fadeOut(500, 209, 209, 209, (camera, progress) => {

            // Quando a transição estiver concluída, carrega o novo cenário
            if (progress == 1) {
                //começa a cena da casa
                cena.scene.transition({ target: 'Configuracoes', duration: 500 });
                //modifica a variável de cena passada para a cena atual.
                gameState.cenaPassada = cena.key;

                //para a cena atual.
                cena.scene.stop(cena.key);
            }
        });
    });
}

function calcularPosicaoX(x1, x2) {
    let y = ((((gameState.gameWidth / gameState.gameHeight) - 2.037) * (x2 - x1)) / (2.25 - 2.037)) + x1;
    return y * gameState.gameWidth;
}

//função para movimentar os botões, será reutilizada em varias cenas
function movimentoDosBotoes(cena, botao) {
    cena.tweens.add({
        targets: botao, //informa qual botao será
        duration: 400,
        y: botao.y *1.0125, // Posição até onde o botao vai ir
        repeat: -1, // Define a animação como infinita
        yoyo: true  // Define que sera um movimento continuo
    });
}

//botão de criar a barra de progresso
function barraProgresso(cena) {
    // adiciona a barra de progresso no frame inicial e ajusta as dimensões 
    cena.progresso = cena.add.sprite(gameState.mediaWidth * 0.25, gameState.mediaHeight * 0.15, 'barraProgresso');
    cena.progresso.setFrame(gameState.spriteProgresso); // configura o frame inicial da barra de progresso
    cena.progresso.setScale(((gameState.mediaHeight / cena.progresso.height) * 0.13));
}

//função de mudar o progresso
function mudarProgresso(cena) {

    //verifica se o sprite de progresso é menor que 5
    if (gameState.spriteProgresso < 5) {

        //aumenta o sprite de progresso
        gameState.spriteProgresso++;
    }

    //modifica o frame de acordo com o sprite de progresso
    cena.progresso.setFrame(gameState.spriteProgresso)
}

//função de criar o fundo do pc em todas eas telas do computador
function criarFundoPc(cena) {
    //Cria a tela de fundo
    cena.bg = cena.add.image(gameState.mediaWidth, gameState.mediaHeight, "bg")

    // Ajusta a escala do background proporcionalmente ao tamanho da tela
    cena.bg.setScale((gameState.gameHeight / cena.bg.height) * 1.25);

    //Cria a tela do notebook
    cena.notebookBg = cena.add.image(gameState.mediaWidth * 1.012, gameState.mediaHeight * 1.1, "notebook").setScale(0.62);

    // Ajusta a escala do notebook proporcionalmente ao tamanho da tela
    cena.notebookBg.setScale((gameState.gameHeight / cena.notebookBg.height) * 0.91);

}

//função de descer o botão, não é utilizado
function descerBotao(cena, botao) {
    cena.tweens.add({
        targets: botao, //informa qual botao será
        duration: 1100,
        y: botao.y + 90, // Posição até onde o botao vai ir
        repeat: 0, // Define a animação como infinita
    });
}

//função de subir o botão, não é utilizado
function subirBotao(cena, botao) {
    cena.tweens.add({
        targets: botao, //informa qual botao será
        duration: 1100,
        y: botao.y - 90, // Posição até onde o botao vai ir
        repeat: 0, // Define a animação como infinita
    });
}