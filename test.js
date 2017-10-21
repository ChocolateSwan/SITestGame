const canvas = document.createElement( 'canvas' );
document.appendChild(canvas);

// Объект двумерного контекста
const context = canvas.getContext( '2d' );
// Объект WebGL (3D) контекста

// обводит прямоугольную область
ctx.strokeRect(x, y, width, height);
// заливает прямоугольную область
ctx.fillRect(x, y, width, height);
// очищает прямоугольную область
ctx.clearRect(x, y, width, height);