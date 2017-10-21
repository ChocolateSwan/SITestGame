window.SinglePlayerStrategy = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;

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
			console.info('SinglePlayerStrategy fn');
			super();

			this.interval = null;
		}

		onLoggedIn(payload) {
			console.log('SinglePlayerStrategy.fn.onLoggedIn!!', arguments);
			this.me = payload.username;
			this.opponent = 'Test Opponent';
			// this.fireOpponentFound(this.me, this.opponent);
			this.fireStartGame();
			this.state = {
				bullets: [],
				me: {
					x_position: 500,
					y_position: 500,
					healthOfBase: 100,
					healthOfUnit: 50,
					towers:[],
				},
				opponent: {
					x_position: 18,
					y_position: 32,
					healthOfBase: 100,
					healthOfUnit: 50,
					towers:[
						{ x_position: 10,
							y_position: 200,
							coolDown: 1,

						}
					],
				}
			};
      this.fireSetNewGameState(this.state);
			this.startGameLoop();
		}

		onNewCommand(payload) {
			console.log('SinglePlayerStrategy.fn.onNewCommand', payload);
			// console.log(payload);

			// if (this._pressed('FIRE', payload)) {
			// 	const bullet = {
			// 		x: this.state.me.xpos,
			// 		y: this.state.me.ypos + 1,
			// 		dir: 'up'
			// 	};
			// 	this.state.bullets.push(bullet);
			// 	return;
			// }
			if (this._pressed('LEFT', payload)) {
				// if (this.state.me.xpos <100) {
					this.state.me.xpos-=20;
				// }
				return;
			}
			if (this._pressed('RIGHT', payload)) {
				// if (this.state.me.xpos >1) {
					this.state.me.xpos += 20;
				// }
				return;
			}
			if (this._pressed('UP', payload)) {
				if (this.state.me.y_position > 6) {
					this.state.me.y_position-=20;
				}
				return;
			}
			if (this._pressed('DOWN', payload)) {
				if (this.state.me.y_position >1) {
					this.state.me.y_position+=20;
				}
				return;
			}

		}

		gameLoop() {
			console.log("hello");
			// Это пули (управление)
			if (this.state && this.state.bullets) {
				this.state.bullets = this.state.bullets.map(blt => {
					switch (blt.dir) {
						case 'right': {
							blt.x_position += 50;
							// if (Math.abs(this.state.me.xpos - blt.x) <= 1) {
							// 	if (Math.abs(this.state.me.ypos - blt.y) <= 1) {
							// 		this.state.me.hp--;
							// 		return null;
							// 	}
							// }
							break;
						}
						case 'up': {
							blt.y++;
							if (Math.abs(this.state.opponent.xpos - blt.x) <= 1) {
								if (Math.abs(this.state.opponent.ypos - blt.y) <= 1) {
									this.state.opponent.hp--;
									return null;
								}
							}
							break;
						}
					}
					if (blt.y > 1000 || blt.y < 0) {
						return null;
					}
					return blt;
				});
				// this.state.bullets = this.state.bullets.filter(blt => blt);
			}

			if (this.state.me.healthOfBase <= 0) {
				return this.fireGameOver(`Игра окончена, вы проиграли (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			}

			if (this.state.opponent.healthOfBase <= 0) {
				return this.fireGameOver(`Игра окончена, вы победили (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			}

			this.state.opponent.towers.forEach(towel => {
				if (towel.coolDown > 0) {
					console.log("bullet down");
					towel.coolDown -- ;
				} else {
					console.log("bullet");
					this.state.bullets.push(
						{
              x_position: towel.x_position,
              y_position: towel.y_position,
              dir: 'right'
						}
					)
					towel.coolDown = 10;
				}

			})

			this.fireSetNewGameState(this.state);
		}

    startGameLoop() {
			this.interval = setInterval(() => this.gameLoop(), 500);
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
