window.GameScene = (function (window) {
	const Mediator = window.Mediator;

  const HDim = 10;
  const WDim = 20;
  const AR = HDim / WDim;
  const userspace = 8;


	class GameScene {
		constructor(canvas) {
			console.log('GameScene.fn');
			this.canvas = canvas;
			this.ctx = this.canvas.getContext('2d');
			this.fieldSize = 1;

			this.bindedResizer = this.resizer.bind(this);
			window.addEventListener('resize', this.bindedResizer);
			this.resizer();

			this.setState({});
			this.render();
		}

    resizer() {
      const height = window.innerHeight;
      this.fieldSize = (height / HDim) | 0;

      this.canvas.dheight = this.fieldSize * HDim;
      this.canvas.dwidth = this.fieldSize * WDim;

      this.canvas.height = this.canvas.dheight;
      this.canvas.width = this.canvas.dwidth;
    }
		setState(state) {
			this.state = state;
		}

		render() {
			const ctx = this.ctx;
			// Отрисовка фона
      const moonSerface = new Image();
      moonSerface.src    = 'images/moon_face.jpeg';
      moonSerface.onload = function() {
        ctx.drawImage(moonSerface, 0, 0, this.canvas.width,this.canvas.height);  //x,y,width,height
      }.bind(this)

			// Отрисовка Баз
			// Моя
      const plate = new Image();
      plate.src = 'images/plate.gif';
      plate.onload = function() {
        ctx.drawImage(plate,0 ,this.canvas.height*2/5 , this.canvas.height/5,this.canvas.height/5);  //x,y,width,height
      }.bind(this)

      const man = new Image();
      man.src = 'images/ufo.gif';
      man.onload = function() {
        ctx.drawImage(man,this.canvas.width/2 ,this.canvas.height/2 , this.canvas.width/7,this.canvas.height/5);  //x,y,width,height
      }.bind(this)


		}

		// setNames(me, opponent) {
		// 	this.players = {me, opponent};
		// }

		destroy() {
			window.removeEventListener('resize', this.bindedResizer);
		}
	}


	return GameScene;
})(window);
