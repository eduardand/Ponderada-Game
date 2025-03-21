import config from "../main.js"; // importa as configurações definidas na main

export class GameScene extends Phaser.Scene { // cria uma cena chamada GameScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("GameScene"); // registra o nome da cena
    }

    preload() {
        this.load.image("paisagem", "assets/fundo.png"); // carrega o fundo da cena
        this.load.image("moeda", "assets/moeda.png"); // carrega imagem da moeda
        this.load.image("plataforma", "assets/plataforma1.png"); // carrega a imagem das plataformas
        this.load.spritesheet("personagem", "assets/personagem_direita.png", { frameWidth: 184, frameHeight: 195 }); // carrega a spritesheet da personagem para a direita
    }

    create() {

        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem").setScale(0.53); // adiciona o fundo da cena

        

        this.cursors = this.input.keyboard.createCursorKeys(); // acessa as setas do teclado e atribui suas propriedades

        // Personagem parado
        this.edu = this.physics.add.sprite(400, 50, 'personagem').setScale(0.3); // Redimensiona o personagem
        this.edu.body.setSize(120, 180).setOffset(32, 10); // Ajusta a hitbox
        this.edu.setCollideWorldBounds(true); // Adiciona bordas ao mundo para o personagem

        // Adiciona a moeda
        this.moeda = this.physics.add.image(300, 450, 'moeda').setScale(0.9);
        this.moeda.body.setSize(42, 42); // Ajusta a hitbox
        this.moeda.setCollideWorldBounds(true); // Adiciona bordas ao mundo para a moeda
        this.physics.world.setBounds(0, 0, 800, 500);; // Adiciona bordas ao mundo para a moeda

        // Cria a animação do personagem andando
        this.anims.create({
            key: 'andando', // Nome da animação
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 7 }), // Usa os mesmos frames de 0 a 7 para a animação de movimento
            frameRate: 4, // Velocidade da animação (4 frames por segundo, mais lento que o parado)
            repeat: -1 // A animação se repete continuamente enquanto o personagem estiver andando
        });

        // Cria a animação do personagem parado
        this.anims.create({
            key: 'parado', // Nome da animação
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 7 }), // Usa os mesmos frames para a animação de pulo
            frameRate: 1, // Velocidade da animação (1 frames por segundo)
            repeat: 0 // A animação só acontece uma vez e não se repete
        });

        // Cria a animação do personagem pulando
        this.anims.create({
            key: 'pulando', // Nome da animação
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 7 }), // Usa os mesmos frames para a animação de pulo
            frameRate: 6, // Velocidade da animação (6 frames por segundo)
            repeat: 0 // A animação só acontece uma vez e não se repete
        });


        // Inicializa a pontuação do jogador no início do jogo
        this.pontuacao = 0;

        // Detecta a colisão entre o personagem e a moeda
        this.physics.add.overlap(this.edu, this.moeda, () => {
            // Torna a moeda invisível ao ser coletada
            this.moeda.setVisible(false);

            // Define uma nova posição X aleatória para a moeda, dentro dos limites da tela
            var novaPosicaoMoeda_X = Phaser.Math.RND.between(50, 550);

            // Move a moeda para a nova posição na tela (sempre na altura Y = 150)
            this.moeda.setPosition(novaPosicaoMoeda_X, 150);

            // Incrementa a pontuação do jogador ao coletar a moeda
            this.pontuacao += 1;

            // Atualiza o placar exibido na tela com a nova pontuação
            this.placar.setText('Moedas: ' + this.pontuacao);

            // Torna a moeda visível novamente para que possa ser coletada outra vez
            this.moeda.setVisible(true);
        });


        // Cria um grupo de plataformas estáticas (não sofrem influência da física)
        this.plataformas = this.physics.add.staticGroup();

        // Cria a primeira plataforma na posição (200, 450)
        let plat1 = this.plataformas.create(200, 450, 'plataforma').setScale(1.0).refreshBody();
        plat1.body.setSize(140, 45, true); // Ajusta a hitbox da plataforma para colisões mais precisas

        // Cria a segunda plataforma na posição (580, 360)
        let plat2 = this.plataformas.create(580, 360, 'plataforma').setScale(1.0).refreshBody();
        plat2.body.setSize(140, 45, true); // Ajusta a hitbox da plataforma para colisões mais precisas

        // Cria a terceira plataforma na posição (300, 200)
        let plat3 = this.plataformas.create(300, 200, 'plataforma').setScale(1.0).refreshBody();
        plat3.body.setSize(140, 45, true); // Ajusta a hitbox da plataforma para colisões mais precisas

        // Adiciona colisão entre o personagem e as plataformas, permitindo que ele pise nelas
        this.physics.add.collider(this.edu, this.plataformas);

        // Adiciona colisão entre a moeda e as plataformas para evitar que ela atravesse
        this.physics.add.collider(this.moeda, this.plataformas);

        // Adiciona um placar no canto superior esquerdo da tela para exibir a quantidade de moedas coletadas
        this.placar = this.add.text(30, 30, 'Moedas: ' + this.pontuacao, { fontSize: '35px', fill: '#495613' });
// Detecção de mudança de orientação
this.scale.on('orientationchange', function(orientation) {
    // Atualiza as dimensões do jogo
    this.larguraJogo = window.innerWidth;
    this.alturaJogo = window.innerHeight;
    
    switch (orientation) {
        case Phaser.Scale.PORTRAIT:
        case Phaser.Scale.PORTRAIT_SECONDARY:
            console.log("Modo Retrato");
            // Ajustes específicos para o modo retrato
            this.scale.resize(this.larguraJogo, this.alturaJogo);
            
            // Reposiciona elementos da interface para o modo retrato
            this.reposicionarElementosRetrato();
            
            // Ajusta o tamanho e escala dos elementos de jogo
            this.ajustarTamanhoElementosRetrato();
            break;

        default:  // Phaser.Scale.LANDSCAPE ou Phaser.Scale.LANDSCAPE_SECONDARY
            console.log("Modo Paisagem");
            // Ajustes específicos para o modo paisagem
            this.scale.resize(this.larguraJogo, this.alturaJogo);
            
            // Reposiciona elementos da interface para o modo paisagem
            this.reposicionarElementosPaisagem();
            
            // Ajusta o tamanho e escala dos elementos de jogo
            this.ajustarTamanhoElementosPaisagem();
            break;
    }
    
    // Atualiza o posicionamento da câmera
    if (this.cameras && this.cameras.main) {
        this.cameras.main.setSize(this.larguraJogo, this.alturaJogo);
    }
    
}, this);

// Função para reposicionar elementos na orientação retrato
function reposicionarElementosRetrato() {
    // Exemplo: Posicionar botões no fundo da tela em coluna
    if (this.botoes) {
        const espacamento = 20;
        const posY = this.alturaJogo - 100;
        
        this.botoes.forEach((botao, index) => {
            botao.setPosition(this.larguraJogo / 2, posY - (index * espacamento));
        });
    }
    
    // Posiciona placar ou HUD no topo
    if (this.placar) {
        this.placar.setPosition(this.larguraJogo / 2, 50);
    }
}

// Função para reposicionar elementos na orientação paisagem
function reposicionarElementosPaisagem() {
    // Exemplo: Posicionar botões no lado direito em linha
    if (this.botoes) {
        const espacamento = 20;
        const posX = this.larguraJogo - 100;
        
        this.botoes.forEach((botao, index) => {
            botao.setPosition(posX - (index * espacamento), this.alturaJogo / 2);
        });
    }
    
    // Posiciona placar ou HUD no canto superior esquerdo
    if (this.placar) {
        this.placar.setPosition(100, 50);
    }
}

// Função para ajustar o tamanho dos elementos no modo retrato
function ajustarTamanhoElementosRetrato() {
    // Exemplo: Ajustar escala do jogador para tela mais estreita
    if (this.jogador) {
        // Em retrato, a escala pode precisar ser menor para caber na largura
        const escalaRetrato = Math.min(1, this.larguraJogo / 600);
        this.jogador.setScale(escalaRetrato);
    }
    
    // Ajusta o tamanho da área de jogo principal
    if (this.areaJogo) {
        this.areaJogo.setDisplaySize(this.larguraJogo * 0.9, this.alturaJogo * 0.7);
        this.areaJogo.setPosition(this.larguraJogo / 2, this.alturaJogo * 0.4);
    }
}

// Função para ajustar o tamanho dos elementos no modo paisagem
function ajustarTamanhoElementosPaisagem() {
    // Exemplo: Ajustar escala do jogador para tela mais larga
    if (this.jogador) {
        // Em paisagem, podemos usar uma escala maior
        const escalaPaisagem = Math.min(1.2, this.alturaJogo / 500);
        this.jogador.setScale(escalaPaisagem);
    }
    
    // Ajusta o tamanho da área de jogo principal
    if (this.areaJogo) {
        this.areaJogo.setDisplaySize(this.larguraJogo * 0.7, this.alturaJogo * 0.9);
        this.areaJogo.setPosition(this.larguraJogo * 0.4, this.alturaJogo / 2);
    }
}
}

update() {
        // Controles do personagem

        // Movimentação para a esquerda
        if (this.cursors.left.isDown) {
            this.edu.setVelocityX(-100); // Move o personagem para a esquerda
            this.edu.setFlipX(true); // Inverte a sprite para a esquerda

            // Se a animação 'andando' não estiver ativa, inicia a animação de caminhada
            if (this.edu.anims.currentAnim?.key !== 'andando') {
                this.edu.play('andando');
            }

            // Movimentação para a direita
        } else if (this.cursors.right.isDown) {
            this.edu.setVelocityX(100); // Move o personagem para a direita
            this.edu.setFlipX(false); // Mantém a sprite voltada para a direita

            // Se a animação 'andando' não estiver ativa, inicia a animação de caminhada
            if (this.edu.anims.currentAnim?.key !== 'andando') {
                this.edu.play('andando');
            }

            // Se nenhuma tecla de movimento horizontal estiver pressionada
        } else {
            this.edu.setVelocityX(0); // Personagem para de se mover

            // Se a animação 'parado' não estiver ativa, inicia a animação de inatividade
            if (this.edu.anims.currentAnim?.key !== 'parado') {
                this.edu.play('parado');
            }
        }

        // Pulo do personagem
        if (this.cursors.up.isDown) {
            // Se o jogador pressionar a tecla para cima, aplica uma velocidade vertical negativa
            this.edu.setVelocityY(-300); // Define a força do pulo

            // Se a animação 'pulando' não estiver ativa, inicia a animação de pulo
            if (this.edu.anims.currentAnim?.key !== 'pulando') {
                this.edu.play('pulando');
            }
        }

        // Aplicação da gravidade
        this.edu.setGravityY(250); // Define uma gravidade constante para o personagem

        // Verifica se a pontuação atingiu 5 para finalizar o jogo
        if (this.pontuacao >= 5) {
            this.scene.start("EndScene"); // Transita para a cena final
        }
    }
}