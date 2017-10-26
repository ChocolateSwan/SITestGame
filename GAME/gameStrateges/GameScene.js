window.GameScene = (function (window) {

  //Scaling
  let scaleCoeff = window.innerHeight/modelHeight;

  const RED = "#F00";
  const BLUE = "#000dd4";
  const FONT = "italic 30pt Arial";

	class GameScene {

		constructor(canvas) {

			this.canvas = canvas;
			this.ctx = this.canvas.getContext('2d');

			this.bindedResizer = this.resizer.bind(this);
			window.addEventListener('resize', this.bindedResizer);
			this.resizer();

			// TODO есть ли смысл?
			this.setState({});
			this.render();
		}

    resizer() {

		  // TODO убрать в другое место
      document.body.style.overflow = "hidden";

      scaleCoeff = window.innerHeight/modelHeight;

      this.canvas.height = window.innerHeight;
      this.canvas.width = modelWidth*scaleCoeff;

    }

		setState(state) {
			this.state = state;
		}

		render() {

			const ctx = this.ctx;

      this.renderBackground(ctx);

      this.renderBases(ctx);

      this.renderMen(ctx);

      this.renderTowers(ctx);

      this.renderBullets(ctx);

      this.renderText(ctx);

      this.renderBombs(ctx);

      this.renderCoins(ctx);

		}

		renderBackground(ctx){
      const moonSerface = new Image();
      moonSerface.src    = "images/moonBackground.png";
      moonSerface.onload = function() {
        ctx.drawImage(moonSerface,
          0,
          0,
          this.canvas.width,
          this.canvas.height);
      }.bind(this)
    }

		renderBases(ctx){
      if (this.state.opponent){
        ctx.drawImage(this.state.opponent.base.image,
          this.state.opponent.base.x_position*scaleCoeff,
          this.state.opponent.base.y_position*scaleCoeff,
          this.state.opponent.base.width*scaleCoeff,
          this.state.opponent.base.height*scaleCoeff);
      }
      if (this.state.me){
        ctx.drawImage(this.state.me.base.image,
          this.state.me.base.x_position*scaleCoeff,
          this.state.me.base.y_position*scaleCoeff,
          this.state.me.base.width*scaleCoeff,
          this.state.me.base.height*scaleCoeff);
      }
    }

		renderMen(ctx){
      if (this.state.opponent){
        ctx.drawImage(this.state.opponent.man.image,
          this.state.opponent.man.x_position*scaleCoeff,
          this.state.opponent.man.y_position*scaleCoeff,
          this.state.opponent.man.width*scaleCoeff,
          this.state.opponent.man.height*scaleCoeff);
      }
      if (this.state.me){
        ctx.drawImage(this.state.me.man.image,
          this.state.me.man.x_position*scaleCoeff,
          this.state.me.man.y_position*scaleCoeff,
          this.state.me.man.width*scaleCoeff,
          this.state.me.man.height*scaleCoeff);
      }
    }

		renderTowers(ctx){
      if (this.state.opponent) {
        this.state.opponent.towers.forEach(tower => {
          ctx.drawImage(tower.image,
            tower.x_position * scaleCoeff,
            tower.y_position * scaleCoeff,
            tower.width * scaleCoeff,
            tower.height * scaleCoeff);
        })
      }
        if (this.state.me){
          this.state.me.towers.forEach(tower=>{
            ctx.drawImage(tower.image,
              tower.x_position*scaleCoeff,
              tower.y_position*scaleCoeff,
              tower.width*scaleCoeff,
              tower.height*scaleCoeff);
          })
      }
    }

		renderBullets (ctx) {
      if (this.state.bullets) {
        this.state.bullets.forEach(blt => {
          ctx.drawImage(blt.image,
            blt.x_position*scaleCoeff,
            blt.y_position*scaleCoeff,
            blt.width*scaleCoeff,
            blt.height*scaleCoeff);
        });
      }
    }

    renderText(ctx){
		  // TODO масштабирование текста
      // TODO убрать захардкоженые координаты
      ctx.font = FONT;
      if (this.state.opponent) {
          ctx.shadowColor = RED;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 5;
          ctx.shadowBlur = 5;
          ctx.strokeText(this.state.opponent.name, 20, 50);
          ctx.strokeText("Base bombs: " + +(this.state.opponent.base.health), 20, 100);
          ctx.strokeText("Unit health: " + +(this.state.opponent.man.health), 20, 150);

      }
      if (this.state.me) {
        ctx.shadowColor = BLUE;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 5;
        ctx.strokeText(this.state.me.name, 1100, 50);
        ctx.strokeText("Base bombs: " + +(this.state.me.base.health), 1100, 100);
        ctx.strokeText("Unit health: " + +(this.state.me.man.health), 1100, 150);
        ctx.strokeText("Coins: " + this.state.me.coins,1100,200);
      }
      ctx.shadowColor = "";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
    }

    renderBombs(ctx){
      if (this.state.opponent && this.state.opponent.bomb){
        ctx.drawImage(this.state.opponent.bomb.image,
          this.state.opponent.bomb.x_position*scaleCoeff,
          this.state.opponent.bomb.y_position*scaleCoeff,
          this.state.opponent.bomb.width*scaleCoeff,
          this.state.opponent.bomb.height*scaleCoeff);
      }
        // TODO моя бомба
    }

    renderCoins(ctx){
      if (this.state && this.state.coins){
        this.state.coins.forEach(coin => {
          ctx.drawImage(coin.image,
            coin.x_position*scaleCoeff,
            coin.y_position*scaleCoeff,
            coin.width*scaleCoeff,
            coin.height*scaleCoeff);
        });
      }
    }

		destroy() {
			window.removeEventListener('resize', this.bindedResizer);
		}
	}

	return GameScene;
})(window);
