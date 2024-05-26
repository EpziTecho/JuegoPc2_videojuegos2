document.addEventListener("DOMContentLoaded", function () {
    var juego = new Phaser.Game(370, 768, Phaser.CANVAS, "bloque_juego");
    var personajeSeleccionado = 0; // Variable para guardar el índice del personaje seleccionado

    var estadoPortada = {
        preload: function () {
            juego.load.image("fondo", "img/seleccion.png"); // Cargar el nuevo fondo estático
            juego.load.image("boton_seleccionar", "img/button_select-character.png");
            juego.load.image("boton_seleccionar", "img/button_select.png"); // Asegúrate de tener esta imagen en tus archivos
            for (let i = 1; i <= 6; i++) {
                juego.load.spritesheet("personaje" + i, "img/personaje" + i + ".png", 48, 58);
                juego.load.spritesheet("personaje" + i + "_vista_frente", "img/personaje" + i + "_vista_frente.png", 48, 58);
            }
            juego.load.audio("audio", "audio/audio.mp3");
        },
        create: function () {
            var fondo = juego.add.sprite(0, 0, "fondo");
            fondo.width = juego.width;
            fondo.height = juego.height;

            // Textos de diseño y título
            var texto = juego.add.text(
                juego.world.centerX,
                juego.world.height - 20,
                "Diseñado por Sergio Alexander Huayllas ©",
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
                "Seleccion de PJ",
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

            this.personajes = [];
            this.personajesVistaFrente = [];

            for (let i = 1; i <= 6; i++) {
                let sprite = juego.add.sprite(
                    juego.world.centerX,
                    juego.world.centerY + 50,
                    "personaje" + i
                );
                sprite.anchor.setTo(0.5, 0.5);
                sprite.scale.setTo(2);
                sprite.animations.add("idle", [0, 1, 2], 10, true);
                sprite.animations.play("idle");
                sprite.visible = i === 1;
                this.personajes.push(sprite);

                let spriteFrente = juego.add.sprite(
                    juego.world.centerX,
                    juego.world.centerY - 100,
                    "personaje" + i + "_vista_frente"
                );
                spriteFrente.anchor.setTo(0.5, 0.5);
                spriteFrente.scale.setTo(3);
                spriteFrente.animations.add("idle", [0, 1, 2], 10, true);
                spriteFrente.animations.play("idle");
                spriteFrente.visible = i === 1;
                this.personajesVistaFrente.push(spriteFrente);
            }

            var botonSeleccionar = juego.add.button(
                juego.world.centerX,
                juego.world.height - 100,
                "boton_seleccionar",
                this.finalizarSeleccion,
                this
            );
            botonSeleccionar.anchor.setTo(0.5);
            botonSeleccionar.scale.setTo(1);

            var audio = juego.add.audio("audio");
            audio.play();

            this.teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.keyPressed = false;
        },
        update: function () {
            if (this.teclaIzquierda.isDown && !this.keyPressed) {
                this.cambiarPersonaje(-1);
                this.keyPressed = true;
            } else if (this.teclaDerecha.isDown && !this.keyPressed) {
                this.cambiarPersonaje(1);
                this.keyPressed = true;
            } else if (!this.teclaIzquierda.isDown && !this.teclaDerecha.isDown) {
                this.keyPressed = false;
            }
        },
        cambiarPersonaje: function (direccion) {
            let indiceActual = this.personajes.findIndex((p) => p.visible);
            let nuevoIndice = (indiceActual + direccion + this.personajes.length) % this.personajes.length;
            this.personajes[indiceActual].visible = false;
            this.personajesVistaFrente[indiceActual].visible = false;
            this.personajes[nuevoIndice].visible = true;
            this.personajesVistaFrente[nuevoIndice].visible = true;
            personajeSeleccionado = nuevoIndice;
        },
        finalizarSeleccion: function () {
            localStorage.setItem("personajeSeleccionado", personajeSeleccionado);
            window.location.href = "index.html";
        },
    };

    juego.state.add("portada", estadoPortada);
    juego.state.start("portada");
});
