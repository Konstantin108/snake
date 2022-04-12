class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    /**
     * метод назначает переданные функции в качестве бработчиков событий клика
     * на кнопки старт и пауза
     * @param startBtnClickHandler
     * @param pauseBtnClickHandler
     */
    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }
}