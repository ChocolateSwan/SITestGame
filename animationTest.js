
// Animation
let animateStep = 0;
let startTime, animationTime, length;

const animate = function(){

  // alert("helloo")
  let padding = 10;
  let length = canvas.width - padding * 2 - man.width;
  console.log(length);
  let y = (canvas.height - man.width) / 2;
  console.log(y);

  /* Трансформации */
  ctx.beginPath();

  /* Код из слайда */
  let time = performance.now();
  let shiftTime = time - startTime;
  let multiply = shiftTime / animationTime;
  let x = length * multiply + padding;
  /* Код из слайда */
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(man, x, y, 50,50);

  if (multiply < 1) {
    requestAnimationFrame(animate);
  } else {
    alert ("End OK")

  }
};




let _startTime = 0;
const start = function(){
  _startTime = performance.now();
};


document.querySelector('#startAnimate').addEventListener('click', function(){
  animateStep = 0;
  animationTime = 2000;
  startTime = performance.now();
  start();
  animate();
});