const BASE_SIZE = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.7);
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;


export default class Constants {
    static getBaseSize() {
        return BASE_SIZE;
    }

    static getWindowWidth() {
        return WINDOW_WIDTH;
    }

    static getWindowHeight() {
        return WINDOW_HEIGHT;
    }
}