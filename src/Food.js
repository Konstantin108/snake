class Food {
    constructor() {
        this.x = null;
        this.y = null;
    }

    /**
     * метод получает другие игровые объекты, которые нужны
     * ему для работы
     * @param settings
     * @param snake
     * @param board
     */
    init(settings, snake, board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    /**
     * Метод устанавливает новое случайное положение на поле
     * для еды и отрисовывает ее
     */
    setNewFood() {
        const food = this.generateRandomCoordinates();
        this.board.renderFood(food);
    }

    /**
     * метод устанавливает на игровом поле еду по текущим координатам
     */
    setFood() {
        this.board.renderFood(this);
    }

    /**
     * метод генерирует объект
     * @returns {Food}
     */
    generateRandomCoordinates() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell = this.board.getCellEl(this.x, this.y);

            if (cell.classList.contains('snakeBody')) {
                continue;
            }
            return this;
        }
    }

}