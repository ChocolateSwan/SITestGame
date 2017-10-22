window.SinglePlayerStrategy = (function (window) {
	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;
	const {Player} = window;
	const {Tower} = window;

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
				me: new Player(10,10,100,2000,100,50),
				opponent: new Player(10,10,100,1000,1000,50),
			};
			this.state.opponent.towers.push(new Tower(1, 10, 200))
      this.fireSetNewGameState(this.state);
			this.startGameLoop();
		}

		onNewCommand(payload) {
			console.log('SinglePlayerStrategy.fn.onNewCommand', payload);

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
					switch (blt.dir) {
						case 'RIGHT': {
							blt.x_position += 100;
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

			// if (this.state.me.healthOfBase <= 0) {
			// 	return this.fireGameOver(`Игра окончена, вы проиграли (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			// }
      //
			// if (this.state.opponent.healthOfBase <= 0) {
			// 	return this.fireGameOver(`Игра окончена, вы победили (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			// }

			this.state.opponent.towers.forEach(towel => {
				if (towel.coolDown > 0) {
					towel.coolDown -- ;
				} else {
					this.state.bullets.push(
						{
              x_position: towel.x_position,
              y_position: towel.y_position,
              dir: 'RIGHT'
						}
					)
					towel.coolDown = 2;
				}

			})

			this.fireSetNewGameState(this.state);
		}

    startGameLoop() {
			this.interval = setInterval(() => this.gameLoop(), 5000);
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
