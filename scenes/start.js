import config from "../main.js"; // importa as configurações definidas na main

export class StartScene extends Phaser.Scene { // cria uma cena chamada StartScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("StartScene"); // registra o nome da cena
    }

    preload() {
        this.load.image("start", "assets/tela_inicial.png"); // carrega a imagem de pré start do jogo
        this.load.audio("musica", "assets/music.mp3"); // carrega música ao jogo

    };

    create() {
        this.Start = this.add.image(this.larguraJogo/2, this.alturaJogo/2, "start").setScale(0.53).setInteractive(); // adiciona a tela de pré start, aumenta o tamanho e a torna interativa

        this.Start.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // quando o mouse passa sobre a imagem, o cursor muda para mãozinha clicável
        });
        
        this.Start.on("pointerout", () => {
            this.input.setDefaultCursor("default"); // quando o mouse sai da imagem, o cursor volta ao normal
        });

        this.Start.on("pointerdown", () => {
            this.scene.start("WelcomeScene"); // quando se clica na imagem a cena muda para "WelcomeScene"
        });

        // música
        this.musica = this.sound.add("musica"); // adiciona música ao jogo
        this.musica.play({ // reproduz a música
            loop: true, // deixa a música em loop
            volume: 0.5 // define o volume da música em 50%
        });

    }

    update() {

    }
}