class Score {
    constructor() {
        this.scoreCount = document.querySelector(' .score-count');
    }

    setCurrent(text) {
        this.scoreCount.textContent = text;
    }
}