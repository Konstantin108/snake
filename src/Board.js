class Board {
    constructor() {
        this.boardEl = document.getElementById('game');
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек.
     * @param {Snake} snake объект змейки.
     */
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }

    /**
     * Метод отрисовывает игровое поле.
     */
    renderBoard() {
        this.boardEl.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    renderSnake() {
        const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
        if (snakeBodyElems) {
            snakeBodyElems.forEach(function (tdEl) {
                tdEl.classList.add('snakeBody');

            })
        }
    }

    /**
     * очищаем игровое поле
     */
    clearBoard() {
        const tdElems = document.querySelectorAll('td');
        tdElems.forEach(function (td) {
            td.className = "";
        });
    }

    getCellEl(x, y) {
        return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (let value of bodyCoords) {
                let elem = this.getCellEl(value.x, value.y);
                bodyElems.push(elem);
            }
            return bodyElems;
        }
        return null;
    }

    /**
     * метод проверяет является ли следующий шаг шагом в стену
     * @param nextCellCoords
     * @returns {boolean}
     */
    isNextStepToWall(nextCellCoords) {
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        return nextCell === null;
    }


    /**
     * метод рисует еду на игровом поле
     * @param coords
     */
    renderFood(coords) {
        const foodCell = this.getCellEl(coords.x, coords.y);
        foodCell.classList.add('food');
    }

    /**
     * метод проверяет съела ли змейка еду
     * @returns {boolean}
     */
    isHeadOnFood() {
        return this.boardEl.querySelector(' .food').classList.contains('snakeBody');
    }

}