// Classe gerenciadora de inputs
class InputTexto {
    // cria um atributo que armazena o id do campo
    // esse id serve para identificar o campo dentro do html da página
    constructor(id) {
        // passa a informação recebida para o atributo id
        this.id = id
    }

    // método que cria e posiciona o campo de input
    criaInput(textoPadrao, x, y, password = false) {
        // criação do campo do input via html
        this.campoInput = document.createElement('input');

        // verifica se o campo é de senha ou não
        this.campoInput.type = password ? 'password' : 'text';

        // configuração do campo html inserido
        this.campoInput.id = `input_${this.id}` //identificador do campo concatenando input e o id
        this.campoInput.placeholder = textoPadrao; //define que o texto padrão quando o campo está vazio
        this.campoInput.style.placeholderColor = '#434343';//define a cor do texto padrão
        this.campoInput.style.position = 'absolute'; // define o posicionamento do campo
        this.campoInput.style.top = `${y}%`; // define a posição vertical
        this.campoInput.style.left = `${x}%`; // define a posição vertical
        // this.campoInput.style.width = `${gameState.gameWidth*0.18}px`;
        // this.campoInput.style.height = `${gameState.gameHeight*0.0325}px`;
        this.campoInput.style.fontSize = `20px`; // define o tamanho da fonte 
        this.campoInput.style.border = 'none'; // retira a borda do campo
        this.campoInput.style.outline = 'none'; // retira o contorno do campo
        this.campoInput.style.color = '#434343'; // define a cor do texto
        this.campoInput.style.background = 'transparent'; // define a transparencia do campo
        document.body.appendChild(this.campoInput); // adiciona o campo na tag body do html
    }

    // método para retornar o valor contido no campo
    getInput() {
        //retorna valor contido
        return this.campoInput.value;
    }

    // método para destroir o campo
    destroiInput() {
        // remove o campo
        this.campoInput.remove()
    }
}

// classe para lidar com multiplos campos de input simultâneo
/*tem sua utilidade baseada em não termos que ativar manualmente os comandos para cada campo
independente do tamanho do formulário que criarmos, chamando o comando uma única vez e aplicando 
para todos os campos*/
class grupoInput {
    // recebe um número indevinido de elementos que chamamos de instâncias
    constructor(...instancias) {
        this.instancias = instancias
    }

    // remove todos os campos de input
    destroiGrupo() {
        // para cada instancia que compõe o atributo instancia, ativa o método destroiInput 
        this.instancias.forEach(instancia => {
            instancia.destroiInput()
        });
    }

    // pega valor de todos os campos
    getGrupo() {
        //cria lista vazia
        let lista = []

        // puxa o valor de cada instancia para a lista
        this.instancias.forEach(instancia => {
            lista.push(instancia.getInput())
        });

        // retorna a lista de valores obtida
        return lista
    }
}