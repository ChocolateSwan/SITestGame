window.SinglePlayerStrategy = (function (window) {

	const Mediator = window.Mediator;
	const GameStrategy = window.GameStrategy;
	const {Player} = window;
	const {Tower} = window;
	const {findCollisions} = window;
	const {Bomb} = window;


	const INTERVAL = 20;

	const mediator = new Mediator;

	const KEYS = {
		FIRE: [' ', 'Enter'],
		LEFT: ['a', 'A', 'ф', 'Ф', 'ArrowLeft'],
		RIGHT: ['d', 'D', 'в', 'В', 'ArrowRight'],
		DOWN: ['s', 'S', 'ы', 'Ы', 'ArrowDown'],
		UP: ['w', 'W', 'ц', 'Ц', 'ArrowUp'],
		TOWER: ['shift']
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
				net: 0,
				bullets: [],
				coins: [],
				me: new Player("My name", {baseXpos: 840}, {manXpos:750}),
				opponent: new Player("Opponent", {baseXpos: 10}, {manXpos:190}),
			};
			this.state.opponent.towers.push(new Tower(1, 130, 120));
      this.state.opponent.towers.push(new Tower(1, 130, 400));
			this.state.opponent.man.coolDown = 63;
      this.fireSetNewGameState(this.state);
			this.startGameLoop();
		}

		onNewCommand(payload) {
			if (this._pressed('FIRE', payload)) {
				this.state.bullets.push(this.state.me.shootMan());
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

			if (this._pressed('TOWER', payload)) {
				if (this.state.me.man.x_position >= 480){
          this.state.me.towers.push(new Tower(3, this.state.me.man.x_position, this.state.me.man.y_position, "LEFT"));
				}

      }
		}

		gameLoop() {

      this.state.bullets = this.state.bullets.map(blt => {

        switch (blt.direction) {
          case 'RIGHT': {
            blt.x_position += 7;
            break;
          }
          case 'LEFT': {
            blt.x_position -= 7;
            break;
          }
        }
            return blt;
        });



			// Пересечения пуль с моим юнитом;
      if (this.state && this.state.bullets) {
        for(let collision of findCollisions(this.state.bullets,[this.state.me.man])) {
          // console.log(collision);
          collision[0].damaged(collision[1]);
					collision[1].damaged(collision[0]);
        }
      }
      this.state.bullets = this.state.bullets.filter(blt => blt.deleted === 0);

      // Установка бомбы
      if (this.state && this.state.me && this.state.opponent) {

        for(let collision of findCollisions([this.state.me.man],[this.state.opponent.base])) {
        	if (!this.state.opponent.bomb) {
            console.log("boomb");
            this.state.opponent.bomb = new Bomb(this.state.opponent.base.x_position,
							this.state.opponent.base.y_position, 10);
					}
        }
      }


			// if (this.state.me.man.health <= 0) {
			// 	alert ("Вы проиграли!!!!!!");
				// return this.fireGameOver(`Игра окончена, вы проиграли (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			// }
      //
			// if (this.state.opponent.healthOfBase <= 0) {
			// 	return this.fireGameOver(`Игра окончена, вы победили (${this.me}:${this.state.me.hp} / ${this.opponent}:${this.state.opponent.hp})`);
			// }

			// файерболы оппонента
			this.state.opponent.towers.forEach(tower => {
				if (tower.coolDown > 0) {
					tower.coolDown -- ;
				} else {
					this.state.bullets.push(
               new Bullet (tower.direction,
                tower.x_position + tower.width + 1,
                tower.y_position + tower.height/4 +1),
					)
					tower.coolDown = 50;
				}
			})

			// файерболы мои
      this.state.me.towers.forEach(tower => {
        if (tower.coolDown > 0) {
          tower.coolDown -- ;
        } else {
          this.state.bullets.push(
            new Bullet (tower.direction,
              tower.x_position,
              tower.y_position + tower.height/4 +1),
          )
          tower.coolDown = 50;
        }
      })

			//мной поставленные бомбы
			if (this.state.opponent && this.state.opponent.bomb) {
      	this.state.opponent.bomb.coolDown -= 1;
      	if (this.state.opponent.bomb.coolDown === 0){
      		this.state.opponent.bomb = null;
      		this.state.opponent.base.health -= 1;
				}
			}


			// TODO оппонентом постаавленные бомбы



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
			this.interval = setInterval(() => this.gameLoop(), 1000); //1000
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
