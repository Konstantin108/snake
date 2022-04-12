class Game {
    constructor() {
        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
    }

    /**
     * метод получает другие игровые объекты, которые нужны ему для работы
     * @param settings
     * @param status
     * @param board
     * @param snake
     * @param menu
     * @param food
     */
    init(settings, status, board, snake, menu, food, score) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
        this.score = score;
    }

    /**
     * метод назначает обработчики событий на кнопки старт и пауза,
     * а так же на стрелки направлений
     */
    run() {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    /**
     * метод запускает игру
     */
    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    /**
     * метод ставит игру на паузу
     */
    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickIdentifier);
        }
    }

    /**
     * метод запускается каждую секунду
     * 1 - двигает змейку на один шаг
     * 2 - проверяет проигрыш или победу
     * 3 - увеличивает размер змейки на 1, если она ест еду
     * 4 - заново отрисовывает положение змейки и еды
     */
    doTick() {
        this.snake.performStep();
        this.score.setCurrent(this.snake.body.length - 1);
        if (this.isSnakeSteppedOnToItself()) {
            return;
        }
        if (this.isGameLost()) {
            return;
        }
        if (this.board.isHeadOnFood()) {   //Если голова находится на еде, то длина +1, еда появляется в новом месте
            this.snake.increaseBody();
            this.food.setNewFood();
        }
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
    }

    /**
     * метод проверяет выиграна ли игра и останавливает её, выводит
     * сообщение о выигрыше
     * @returns {boolean}
     */
    isGameWon() {
        if (this.snake.body.length === this.settings.winLength) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы выиграли');
            return true;
        }
        return false;
    }

    /**
     * Метод проверяет съела ли змейка себя
     */
    isSnakeSteppedOnToItself() {
        let cellArr = this.snake.body.map(function (cellCoords) {
            return cellCoords.x.toString() + cellCoords.y.toString();
        });
        let head = cellArr.shift();
        if (cellArr.includes(head)) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
    }


    /**
     * метод проверяет проиграна ли игра и останавливает её
     * @returns {boolean}
     */
    isGameLost() {
        if (this.board.isNextStepToWall(this.snake.body[0])) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
    }

    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;

        }
    }

    /**
     * метод выводит сообщение на странице
     * @param text
     */
    setMessage(text) {
        this.messageEl.innerText = text;
    }

}