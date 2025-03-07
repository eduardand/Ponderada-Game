import config from "../main.js"; // importa as configurações definidas na main

export class WelcomeScene extends Phaser.Scene { // cria uma cena chamada WelcomeScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("WelcomeScene"); // registra o nome da cena
    }

    preload() {
        this.load.image("fundo", "assets/welcome.png"); // carrega a imagem de fundo da tela de inicio
        this.load.image("play", "assets/botao_iniciar.png"); // carrega o botão de start do jogo
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, 'fundo').setScale(0.53); // adiciona o fundo da tela e aumenta seu tamanho
        
        this.botaoJogar = this.add.image(this.larguraJogo/2, 90, "play").setScale(0.3).setInteractive(); // adiciona um botão de start, diminui seu tamanho e a torna interativa

        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // quando o mouse passa sobre a imagem, o cursor muda para mãozinha clicável
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default"); // quando o mouse sai da imagem, o cursor volta ao normal
        });

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("GameScene"); // quando se clica na imagem a cena muda para "GameScene"
        });
    }

    update() {

    }
}
