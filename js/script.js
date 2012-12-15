var canvas = $("#canvas");
var context = canvas.get(0).getContext("2d");

context.fillRect(0, 0, canvas.width(), canvas.height());
context.fillStyle = "white";
context.fillText("Hello, world!", 100, 100);