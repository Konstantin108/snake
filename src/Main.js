window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const food = new Food();
    const game = new Game();
    const menu = new Menu();
    const score = new Score();

    settings.init({speed: 9, winLength: 5});
    snake.init(settings);
    board.init(settings, snake);
    food.init(settings, snake, board);
    game.init(settings, status, board, snake, menu, food, score);

    board.renderBoard();
    board.renderSnake();

    food.setNewFood();
    game.run();
});