
alert("I'm Space Invasion Game");

const canvas = document.getElementById("canvas");
// Context
ctx = canvas.getContext('2d');
// New image
man = new Image();

man.src    = 'images/man.png';
man.onload = function() {
  ctx.drawImage(man, 250, 250, 50,50);  //x,y,width,height
}



const KEYS = {
  FIRE: [' ', 'Enter'],
  LEFT: ['a', 'A', 'ф', 'Ф', 'ArrowLeft'],
  RIGHT: ['d', 'D', 'в', 'В', 'ArrowRight'],
  DOWN: ['s', 'S', 'ы', 'Ы', 'ArrowDown'],
  UP: ['w', 'W', 'ц', 'Ц', 'ArrowUp'],
};


function playerMove(e) {
  var y = e.pageY;
  if (player.height / 2 + 10 < y && y < game.height - player.height / 2 - 10) {
    player.y = y - player.height / 2;
  }
}
