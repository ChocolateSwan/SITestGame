window.SinglePlayerStrategy = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;
	const {Player} = window;
	const {Tower} = window;

  const modelWidth = 960;
  const modelHeight = 640;

	const mediator = new Mediator;

	const KEYS = {
		FIRE: [' ', 'Enter'],
		LEFT: ['a', 'A', 'ф', 'Ф', 'ArrowLeft'],
		RIGHT: ['d', 'D', 'в', 'В', 'ArrowRight'],
		DOWN: ['s', 'S', 'ы', 'Ы', 'ArrowDown'],
		UP: ['w', 'W', 'ц', 'Ц', 'ArrowUp'],
	};

	class SinglePlayerStrategy extends GameStrategy {
		constructor() {
			super();
			this.interval = null;
		}

		onLoggedIn(payload) {
			this.me = payload.username;
			this.opponent = 'Test Opponent';
			// this.fireOpponentFound(this.me, this.opponent);
			this.fireStartGame();
			this.state = {
				bullets: [],
				me: new Player(840,230,100,
					750,260,50),
				opponent: new Player(10,230,100,
					190,260,50),
			};
			this.state.opponent.towers.push(new Tower(1, 130, 120));
      this.state.opponent.towers.push(new Tower(1, 130, 400));
			this.state.opponent.man.coolDown = 63;
      this.fireSetNewGameState(this.state);
			this.startGameLoop();
		}

		onNewCommand(payload) {
			if (this._pressed('FIRE', payload)) {
				this.state.bullets.push(this.state.me.fireMan());
				return;
			}
			if (this._pressed('LEFT', payload)) {
				this.state.me.moveMan('LEFT');
			}
			if (this._pressed('RIGHT', payload)) {
        this.state.me.moveMan('RIGHT');
			}
			if (this._pressed('UP', payload)) {
        this.state.me.moveMan('UP');
			}
			if (this._pressed('DOWN', payload)) {
        this.state.me.moveMan('DOWN');
			}
		}

		gameLoop() {
			// Это пули (управление)

			if (this.state && this.state.bullets) {
				this.state.bullets = this.state.bullets.map(blt => {

					switch (blt.direction) {
						case 'RIGHT': {
							blt.x_position += 10;
							if ( blt.x_position + blt.width > this.state.me.man.x_position
								&& blt.x_position + blt.width < this.state.me.man.x_position + this.state.me.man.width
							  && (blt.y_position + blt.height > this.state.me.man.y_position &&
                  blt.y_position + blt.height < this.state.me.man.y_position + this.state.me.man.height // TODO
										|| this.state.me.man.y_position + this.state.me.man.height > blt.y_position &&
                  this.state.me.man.y_position + this.state.me.man.height < blt.y_position + blt.height
								)) {

                  this.state.me.man.health -= 10;
                  console.error("Our health = ", this.state.me.man.health);
                  return null;


							}
							break;
						}
						case 'LEFT': {
              blt.x_position -= 10;


							// blt.y++;
							// if (Math.abs(this.state.opponent.xpos - blt.x) <= 1) {
							// 	if (Math.abs(this.state.opponent.ypos - blt.y) <= 1) {
							// 		this.state.opponent.hp--;
							// 		return null;
							// 	}
							// }
							// break;

              // if ( blt.x_position  < this.state.opponent.base.x_position + this.state.opponent.base.x_position.width){
               //  this.state.opponent.base.health -=10;
               //  console.warn("opponent base",this.state.opponent.base.health);
							// }

						}
					}
					if (blt.y > 1000 || blt.y < 0) {
						return null;
					}
					return blt;
				});
				this.state.bullets = this.state.bullets.filter(blt => blt);
			}

			// if (this.state.me.man.health <= 0) {
			// 	alert ("Вы проиграли!!!!!!");
				// return this.fireGameOver(`Игра окончена, вы проиграли (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			// }
      //
			// if (this.state.opponent.healthOfBase <= 0) {
			// 	return this.fireGameOver(`Игра окончена, вы победили (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			// }

			// Пульки
			this.state.opponent.towers.forEach(towel => {
				if (towel.coolDown > 0) {
					towel.coolDown -- ;
				} else {
					this.state.bullets.push(
               new Bullet ("RIGHT",
                towel.x_position + towel.width + 1,
                towel.y_position + towel.height/4 +1),
					)
					towel.coolDown = 10;
				}
			})

			if (this.state.opponent){
        if (this.state.opponent.man.coolDown >= 0) {
          switch (this.state.opponent.man.coolDown) {
						case (48):
              this.state.opponent.moveMan("UP");
              this.state.bullets.push(
                new Bullet ("RIGHT",
                  this.state.opponent.man.x_position + this.state.opponent.man.width + 1,
                  this.state.opponent.man.y_position + this.state.opponent.man.height/2 + 1),
              )
              break;
						case (32):
              this.state.opponent.moveMan("DOWN");
              this.state.bullets.push(
                new Bullet ("RIGHT",
                  this.state.opponent.man.x_position + this.state.opponent.man.width + 1,
                  this.state.opponent.man.y_position + this.state.opponent.man.height/2 + 1),
              )
              break;
            case (16):
              this.state.opponent.moveMan("DOWN");
              this.state.bullets.push(
                new Bullet ("RIGHT",
                  this.state.opponent.man.x_position + this.state.opponent.man.width + 1,
                  this.state.opponent.man.y_position + this.state.opponent.man.height/2 + 1),
              )
              break;
						case (0):
							this.state.opponent.moveMan("UP");
              this.state.bullets.push(
                new Bullet ("RIGHT",
                  this.state.opponent.man.x_position + this.state.opponent.man.width + 1,
                  this.state.opponent.man.y_position + this.state.opponent.man.height/2 + 1),
              )
              break;
        }
          this.state.opponent.man.coolDown -= 1;
        }else{
          this.state.opponent.man.coolDown = 63;
				}

			}

			this.fireSetNewGameState(this.state);
		}

    startGameLoop() {
			this.interval = setInterval(() => this.gameLoop(), 100);
    }
    //
		// stopGameLoop() {
		// 	if (this.interval) {
		// 		clearInterval(this.interval);
		// 	}
		// }
    //
		_pressed(name, data) {
			return KEYS[name].some(k => data[k.toLowerCase()]);
		}
    //
		// destroy() {
		// 	super.destroy();
    //
		// 	this.stopGameLoop();
		// }
	}


	return SinglePlayerStrategy;
})(window);
