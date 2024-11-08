import "./styles.scss";

/**
 * Класс для создания кругового индикатора прогресса. Занимает все свободное пространство контейнера.
 */
class CircularProgress {
    static readonly className = "circular-progress";

    #currentElement: SVGSVGElement;
    #frontCircle: SVGCircleElement;

    private hidden = false;
    private animated = false;
    private progress = 0;
    private spinInterval: number;
    private requestId = 0;

    /**
     * Добавляет CircularProgress в указанный контейнер.
     * @param containerId ID контейнера, внутрь которого будет добавлен элемент.
     * @param spinInterval Интервал вращения во время анимации в миллисекундах. По умолчанию `1000`
     */
    constructor(containerId: string, spinInterval: number = 1000) {
        this.spinInterval = spinInterval;

        const containerEl = document.getElementById(containerId);

        if (!containerEl) {
            throw new Error(`Элемент с ID ${containerId} не найден`);
        }

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        this.#currentElement = svg;

        svg.setAttribute("viewBox", `0 0 100 100`);
        svg.classList.add(CircularProgress.className);

        const backCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        backCircle.classList.add("circular-progress__back");

        const frontCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        frontCircle.classList.add("circular-progress__front");
        this.#frontCircle = frontCircle;

        svg.appendChild(backCircle);
        svg.appendChild(frontCircle);

        containerEl.appendChild(svg);
    }

    /**
     * Устанавливает значение прогресса(0 - 100)
     * @param value - значение прогресса
     */
    setProgress(value: number) {
        value = Math.min(100, Math.max(0, value));
        this.progress = value;
        this.#currentElement.style.setProperty("--value", value.toString());
    }

    /**
     * Скрывает CircularProgress
     */
    hide() {
        this.hidden = true;
        this.#currentElement.classList.add(
            `${CircularProgress.className}_hiden`
        );
    }

    /**
     * Показывает CircularProgress, если он был скрыт
     */
    show() {
        this.hidden = false;
        this.#currentElement.classList.remove(
            `${CircularProgress.className}_hiden`
        );
    }

    /**
     * Запускает анимацию вращения
     */
    startAnimation() {
        this.animated = true;
        let prev = performance.now();
        const degPerSec = this.spinInterval / 360;
        let currentRotation = parseFloat(this.#frontCircle.style.rotate) || 0;

        const rotate = (time: number) => {
            if (time - prev > degPerSec) {
                currentRotation += (time - prev) / degPerSec;
                prev = time;
                currentRotation %= 360;
                this.#frontCircle.style.rotate = `${currentRotation}deg`;
            }

            this.requestId = requestAnimationFrame(rotate);
        };
        requestAnimationFrame(rotate);
    }

    /**
     * Останавливает анимацию вращения
     */
    stopAnimation() {
        this.animated = false;
        cancelAnimationFrame(this.requestId);
    }

    /**
     * Сбрасывает угол поворота после анимации
     */
    resetRotation() {
        this.#frontCircle.style.rotate = "0deg";
    }

    isAnimated() {
        return this.animated;
    }

    isHidden() {
        return this.hidden;
    }

    getProgress() {
        return this.progress;
    }
}

export default CircularProgress;
