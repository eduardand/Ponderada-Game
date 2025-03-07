// cada linha imposta uma cena do jogo
import {StartScene} from "./scenes/start.js";
import {WelcomeScene} from "./scenes/welcome.js";
import {GameScene} from "./scenes/game.js";
import {EndScene} from "./scenes/end.js";

// configurações do jogo
const config = {
    type: Phaser.AUTO, // escolhe, automaticamente, a melhor renderização
    width: 800, // largura do jogo
    height: 600, // altura do jogo
    backgroundColor: "#9e9a87", // cor de fundo
    scale: {
        mode: Phaser.Scale.FIT, // não distorce o jogo em outras telas
        autoCenter: Phaser.Scale.CENTER_BOTH // centraliza o jogo na tela
    },
    physics: { // física do jogo
        default: "arcade", // configurações específicas para o sistema de física 'arcade'
        arcade: {
            gravity: { y: 250 }, // define a gravidade no eixo y como 250
            debug: false// não visualisar as informações de depuração (debug) relacionadas à física do jogo
        }
    },
    scene: [StartScene, WelcomeScene, GameScene, EndScene] // cenas carregadas em ordem
};

export default config // exporta as configurações definidas na main

const game = new Phaser.Game(config); // cria o jogo com as configurações definidas