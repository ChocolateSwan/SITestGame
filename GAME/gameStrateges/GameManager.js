window.GameManager = (function (window) {
	const GameScene = window.GameScene;
	const ControllersManager = window.ControllersManager;


	class GameManager {

		constructor(username, canvas, Strategy) {
			console.log('HELLO Im GameManager');

			this.username = username;
			this.strategy = new Strategy(this.onNewState.bind(this), this.onFinishTheGame.bind(this));
			this.scene = new GameScene(canvas);
			this.controllers = new ControllersManager();

			console.log("ONSTART");
      this.onStart();
			this.strategy.onLoggedIn(this.username);

		}

		onStart() {
			console.log('GameManager.fn.onStart', arguments);
			// mediator.emit(EVENTS.OPEN_GAME_VIEW);

			this.controllers.init();
			this.startGameLoop();
		}
    //
		onNewState(state) {
			this.state = state;
		}

		startGameLoop() {
			this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
		}

		gameLoop() {
			const controlsUpdates = this.controllers.diff();
			if (Object.keys(controlsUpdates).some(k => controlsUpdates[k])) {
				this.strategy.onNewCommand(controlsUpdates);
			}

			this.scene.setState(this.state);
			this.scene.render();
			this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
		}

		onFinishTheGame(message) {
			console.log('GameManager.fn.onFinishTheGame');

			if (this.requestID) {
				cancelAnimationFrame(this.requestID);
			}

			this.strategy.destroy();
			this.scene.destroy();
			this.controllers.destroy();

			alert(message)
		}

	}

	return GameManager;
})(window);
