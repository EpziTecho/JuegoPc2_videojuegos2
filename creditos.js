document.addEventListener("DOMContentLoaded", function () {
    var juego = new Phaser.Game(370, 768, Phaser.CANVAS, "bloque_juego");

    var estadoCreditos = {
        preload: function () {
            juego.load.image("fondo", "img/creditos.png");
        },
        create: function () {
            var fondo = juego.add.sprite(0, 0, "fondo");
            fondo.width = juego.width;
            fondo.height = juego.height;
            var nombres = [
                "Nombre Uno",
                "Nombre Dos",
                "Nombre Tres",
                "Nombre Cuatro",
            ];
            var yPos = juego.world.centerY - 100;

            nombres.forEach((nombre, index) => {
                var texto = juego.add.text(juego.world.centerX, yPos, nombre, {
                    font: "24px Arial",
                    fill: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 3,
                    align: "center",
                });
                texto.anchor.setTo(0.5, 0.5);
                yPos += 40; // Espaciado entre nombres
            });

            // Botón para regresar a la portada
            var botonRegresar = juego.add.button(
                juego.world.centerX,
                juego.world.height - 100,
                "boton_regresar",
                this.regresarAPortada,
                this
            );
            botonRegresar.anchor.setTo(0.5);
            botonRegresar.scale.setTo(0.8); // Ajusta el tamaño según tus necesidades
        },
        regresarAPortada: function () {
            window.location.href = "index.html";
        },
    };

    juego.state.add("creditos", estadoCreditos);
    juego.state.start("creditos");
});
