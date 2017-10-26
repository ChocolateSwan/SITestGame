window.SinglePlayerStrategy = (function (window) {

	const GameStrategy = window.GameStrategy;
	const {Player} = window;
	const {Tower} = window;
	const {findCollisions} = window;
	const {Bomb} = window;
	const {Coin} = window;

	const INTERVAL = 20;
	const SET_TOWERS_COOL_DOWN = 500;
	const SPEED_OF_BULLETS = 6;

	// TODO башни с разной стоимостью
	const TOWER_COST = 5;

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
		}

		onLoggedIn(payload) {
			this.fireStartGame();
			this.state = {
				randomTowersCoolDown: SET_TOWERS_COOL_DOWN,
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
			// Построить башню
			if (this._pressed('TOWER', payload)) {
				if (this.state.me.man.x_position >= modelWidth/2 && this.state.me.coins >= TOWER_COST){
          this.state.me.towers.push(new Tower(3,
						this.state.me.man.x_position,
						this.state.me.man.y_position,
						"LEFT"))
					this.state.me.coins -= TOWER_COST;
				}
      }
		}

		gameLoop() {

			// Состояние пуль
      this.state.bullets = this.state.bullets.map(blt => {
        switch (blt.direction) {
          case 'RIGHT': {
            blt.x_position += SPEED_OF_BULLETS;
            break;
          }
          case 'LEFT': {
            blt.x_position -= SPEED_OF_BULLETS;
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
							this.state.opponent.base.y_position);
					}
        }
      }

      // пересечения пуль с башнями оппонента
      if (this.state && this.state.bullets) {
      	// console.log(this.state.opponent.towers);
        for(let collision of findCollisions(this.state.bullets,this.state.opponent.towers)) {
          console.log(collision);
          collision[0].damaged(collision[1]);
          collision[1].damaged(collision[0]);
        }
      }

      this.state.bullets = this.state.bullets.filter(blt => blt.deleted === 0);

      this.state.opponent.towers.forEach(tower => {
        if (tower.health === 0 ){
      		this.state.coins.push(new Coin(tower.x_position,tower.y_position));
				}
			})

      this.state.opponent.towers = this.state.opponent.towers.filter(tower => tower.health !== 0);

      // обработка монеток
      if (this.state && this.state.coins) {
        for(let collision of findCollisions(this.state.coins,[this.state.me.man])) {
          collision[0].collected = 1;
          this.state.me.coins += collision[0].cost;
        }
      }

      this.state.coins = this.state.coins.filter(coin => coin.collected === 0);

      this.state.randomTowersCoolDown -=1;
      if (this.state.randomTowersCoolDown === 0) {
      	this.setRandomTower();
        this.state.randomTowersCoolDown = SET_TOWERS_COOL_DOWN;
			}



      // пересечения пуль с моими
      if (this.state && this.state.bullets) {
        for(let collision of findCollisions(this.state.bullets,this.state.me.towers)) {
          collision[0].damaged(collision[1]);
          collision[1].damaged(collision[0]);
        }
      }

      this.state.bullets = this.state.bullets.filter(blt => blt.deleted === 0);

      this.state.me.towers = this.state.me.towers.filter(tower => tower.health !== 0);




      // TODO пули с пулями

			// if (this.state.me.man.health === 0) {
			// 	alert ("Вы проиграли!!!!!!");
			// }
      //
			// if (this.state.opponent.base.health === 0) {
			// 	alert ("Вы победили!!!!");
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
      	console.log(this.state.opponent.bomb.coolDown);
      	this.state.opponent.bomb.coolDown -= 1;
      	if (this.state.opponent.bomb.coolDown === 0){
      		this.state.opponent.bomb = null;
      		this.state.opponent.base.health -= 1;
				}
			}


			// TODO оппонентом поставленные бомбы
			// TODO монеты


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


		setRandomTower(){
			this.state.opponent.towers.push(new Tower(1, 130, Math.random()*640))
		}


    startGameLoop() {
			this.interval = setInterval(() => this.gameLoop(), INTERVAL); //1000
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
