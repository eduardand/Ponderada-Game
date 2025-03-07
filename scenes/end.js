import config from "../main.js"; // importa as configurações definidas na main

export class EndScene extends Phaser.Scene { // cria uma cena chamada EndScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("EndScene"); // registra o nome da cena
    }

    preload() {
        this.load.image("final","assets/cenafinal.png")
        this.load.image("menu", "assets/botao_sair.png");
        this.load.image("restart", "assets/botao_voltar.png");

    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "final").setScale(0.53);
        this.botaoMenu = this.add.image(400, 350, "menu").setScale(0.3).setInteractive();
        this.botaoRestart = this.add.image(400, 410, "restart").setScale(0.3).setInteractive();

        this.botaoMenu.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoMenu.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoMenu.on("pointerdown", () => {
            this.scene.stop("EndScene")
            this.scene.start("StartScene")
        })

        this.botaoRestart.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoRestart.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoRestart.on("pointerdown", () => {
            this.scene.stop("EndScene");
            this.scene.start("GameScene");
        })
    }

    update() {

    }
}