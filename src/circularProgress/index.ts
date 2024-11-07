import "./styles.scss";

/**
 * Класс для создания кругового индикатора прогресса. Занимает все свободное пространство контейнера.
 */
class CircularProgress {
    static className = "circular-progress";

    isHidden = false;
    isAnimated = false;
    progress = 0;

    #currentElement: SVGSVGElement;
    #frontCircle: SVGCircleElement;

    private requestId = 0;

    /**
     * Добавляет CircularProgress в указанный контейнер.
     * @param containerId - ID контейнера, внутрь которого будет добавлен элемент
     */
    constructor(containerId: string) {
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
        this.isHidden = true;
        this.#currentElement.classList.add(
            `${CircularProgress.className}_hiden`
        );
    }

    /**
     * Показывает CircularProgress, если он был скрыт
     */
    show() {
        this.isHidden = false;
        this.#currentElement.classList.remove(
            `${CircularProgress.className}_hiden`
        );
    }

    /**
     * Запускает анимацию вращения
     */
    startAnimation() {
        this.isAnimated = true;
        const rotate = () => {
            let currentRotation =
                parseFloat(this.#frontCircle.style.rotate) || 0;
            currentRotation = currentRotation % 360;
            this.#frontCircle.style.rotate = `${currentRotation + 1}deg`;
            this.requestId = requestAnimationFrame(rotate);
        };
        rotate();
    }

    /**
     * Останавливает анимацию вращения
     */
    stopAnimation() {
        this.isAnimated = false;
        cancelAnimationFrame(this.requestId);
    }
}

export default CircularProgress;
