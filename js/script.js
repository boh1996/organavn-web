$(document).ready(function () {
    renderer.initialize();
    renderer.canvasResize();
    renderer.render();
    generator.generate();
});

$(window).resize(function () {
    renderer.canvasResize();
    renderer.render(); 
});