document.addEventListener("DOMContentLoaded", function () {
    var juego = new Phaser.Game(370, 768, Phaser.CANVAS, "bloque_juego");
    var personajeSeleccionado = localStorage.getItem("personajeSeleccionado"); // Variable para guardar el índice del personaje seleccionado

    var estadoPortada = {
        preload: function () {
            juego.load.spritesheet(
                "fondo",
                "img/fondo-semana4.png",
                640,
                800,
                17
            ); // Cargar la hoja de sprites
            juego.load.image("boton", "img/button_start-game.png");
            juego.load.image("boton_player1", "img/button_player1.png");
            juego.load.image("boton_player2", "img/button_player2.png");
            juego.load.image("boton_creditos", "img/button_credis-game.png");
            juego.load.image(
                "boton_seleccionar",
                "img/button_select-character.png"
            );
            // Cargar sprites para todos los personajes
            for (let i = 1; i <= 6; i++) {
                juego.load.spritesheet(
                    "personaje" + i,
                    "img/personaje" + i + ".png",
                    48,
                    58
                );
                juego.load.spritesheet(
                    "personaje" + i + "_vista_frente",
                    "img/personaje" + i + "_vista_frente.png",
                    48,
                    58
                );
            }
            juego.load.audio("audio", "audio/audio.mp3"); // Cargar audio
        },
        create: function () {
            var fondo = juego.add.sprite(0, 0, "fondo");
            fondo.animations.add("animarFondo", null, 10, true); // 10 fps, animación en bucle
            fondo.animations.play("animarFondo");
            // Escalar el fondo para que encaje en toda la pantalla
            fondo.width = juego.width;
            fondo.height = juego.height;

            var x = (juego.width - 150) / 2;
            var y = (juego.height - 50) / 2;

            var botonJugar = juego.add.button(
                x - 20,
                y,
                "boton",
                this.iniciarJuego,
                this,
                2,
                1,
                0
            );
            botonJugar.fixedToCamera = true;
            botonJugar.events.onInputOver.add(this.hoverOver, this);
            botonJugar.events.onInputOut.add(this.hoverOut, this);

            var distanciaEntreBotones = 10;

            var botonSeleccionar = juego.add.button(
                juego.world.centerX,
                botonJugar.y + botonJugar.height + distanciaEntreBotones,
                "boton_seleccionar",
                this.seleccionarPersonaje,
                this,
                2,
                1,
                0
            );
            botonSeleccionar.fixedToCamera = true;
            botonSeleccionar.anchor.setTo(0.5, 0);
            botonSeleccionar.events.onInputOver.add(this.hoverOver, this);
            botonSeleccionar.events.onInputOut.add(this.hoverOut, this);

            var botonCreditos = juego.add.button(
                juego.world.centerX,
                botonSeleccionar.y +
                    botonSeleccionar.height +
                    distanciaEntreBotones,
                "boton_creditos",
                this.mostrarCreditos,
                this,
                2,
                1,
                0
            );
            botonCreditos.fixedToCamera = true;
            botonCreditos.anchor.setTo(0.5, 0);
            botonCreditos.events.onInputOver.add(this.hoverOver, this);
            botonCreditos.events.onInputOut.add(this.hoverOut, this);

            var audio = juego.add.audio("audio");
            audio.play();

            var texto = juego.add.text(
                // juego.world.centerX,
                // juego.world.height - 20,
                // "Diseñado por Sergio Alexander Huayllas ©",
                {
                    font: "bold 13px Arial",
                    fill: "black",
                    backgroundColor: "white",
                }
            );
            texto.anchor.setTo(0.5);

            var titulo = juego.add.text(
                juego.world.centerX,
                100,
                "UTP RUNNER",
                {
                    font: "bold 48px Arial",
                    fill: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 6,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: "#000000",
                }
            );
            titulo.anchor.setTo(0.5);

            // Mostrar el personaje seleccionado en vista frontal
            var spritePersonaje = juego.add.sprite(
                juego.world.centerX,
                juego.world.centerY - 150,
                "personaje" +
                    (parseInt(personajeSeleccionado) + 1) +
                    "_vista_frente"
            );
            spritePersonaje.anchor.setTo(0.5);
            spritePersonaje.scale.setTo(2);
            spritePersonaje.animations.add("idle", [0, 1, 2], 10, true);
            spritePersonaje.animations.play("idle");
        },
        iniciarJuego: function () {
            window.location.href = "nivel1.html";
        },
        seleccionarPersonaje: function () {
            window.location.href = "personaje.html";
        },
        iniciarPlayer1: function () {
            console.log("Iniciar Jugador 1");
        },
        iniciarPlayer2: function () {
            console.log("Iniciar Jugador 2");
        },
        mostrarCreditos: function () {
            window.location.href = "creditos.html";
        },
        salirJuego: function () {
            console.log("Salir del juego");
        },
        hoverOver: function (button) {
            button.scale.setTo(1.1, 1.1);
        },
        hoverOut: function (button) {
            button.scale.setTo(1, 1);
        },
    };

    juego.state.add("portada", estadoPortada);
    juego.state.start("portada");
});
