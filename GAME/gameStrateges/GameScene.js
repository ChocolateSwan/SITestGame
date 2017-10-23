window.GameScene = (function (window) {

	// const Mediator = window.Mediator;

	// Model coordinates
	const modelWidth = 960;
  const modelHeight = 640;

  //Scaling
  // let scaleWidthCoeff = window.innerWidth/modelWidth;
  let scaleCoeff = window.innerHeight/modelHeight;


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

      // scaleWidthCoeff = window.innerWidth/modelWidth;
    }

		setState(state) {
			this.state = state;
		}

		render() {

			const ctx = this.ctx;

      this.renderBackground(ctx)

      this.renderBases(ctx);

      this.renderMen(ctx);

      this.renderTowers(ctx);

      this.renderBullets(ctx);

		}

		renderBackground(ctx){
      const moonSerface = new Image();
      moonSerface.src    = "images/cartoon_moon_1.png";
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
      if (this.state.opponent){
        this.state.opponent.towers.forEach(tower=>{
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

		// setNames(me, opponent) {
		// 	this.players = {me, opponent};
		// }

		destroy() {
			window.removeEventListener('resize', this.bindedResizer);
		}
	}

	return GameScene;
})(window);
