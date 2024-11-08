# Progress

Это простой блок кругового индикатора прогреса. Использовал TypeScript и Sass, собирается с помощью Vite. Лежит [здесь](./src/circularProgress/)

Реализовано с помощью `svg` и свойства `stroke-dasharray`. Еще был вариант попроще использовать `conic-gradient`, но его не получится анимировать при изменении значения прогресса, чтобы полоска заполнялась плавно.

## Как использовать

```js
import CircularProgress from "./circularProgress";

// Создает все необходимые элементы и добавляет их в пустой контейнер(по ID)
const circularProgress = new CircularProgres("progress-container");

circularProgress.setProgress(40);
circularProgress.getProgress(); // 40

// ...

circularProgress.startAnimation();
circularProgress.isAnimated(); // true

circularProgress.stopAnimation();
circularProgress.isAnimated(); // false

// ...

circularProgress.hide();
circularProgress.isHidden(); // true

circularProgress.show();
circularProgress.isHidden(); // false
```

### Конструктор

```js
CircularProgress(containerId: string, spinInterval?: number): CircularProgress
```

- `containerId` ID контейнера, внутрь которого будет добавлен элемент
- `spinInterval` Интервал вращения во время анимации в миллисекундах. По умолчанию `1000`

`CircularProgress.hide()` скрывает блок, но не контейнер родителя. Но так как родитель с фиксированными размерами, то будет оставаться его пустое место в потоке элементов. Возможно, когда-то понадобится оставить место под индикатор, но не показывать его самого, тогда текущая логика будет как раз. А если же нужно полностью убрать пустое место, то пусть разработчик самостоятельно удаляет родительский контейнер.

Также `CircularProgress.hide()` не останавливает анимацию, если она запущена. В тз было написано `isAnimated` - _независимое_ состояние, я понял это так.

`CircularProgress.stopAnimation()` не сбрасывает угол поворота, а просто останавливает анимацию.
`CircularProgress.startAnimation()` продолжает с места остановки. Чтобы сбросить угол поворота, нужно вызвать `CircularProgress.resetRotation()`.

## Стили

Стили попадают в итоговый CSS при импорте, поэтому если настроен сборщик, то ничего больше делать не нужно.

Блок занимает 100% ширины и высоты родителя, поэтому родитель должен иметь заданные размеры.

```css
.progress-container {
  width: 200px;
  height: 200px;

  /* 
    Ширина линии индикатора, в процентах от диаметра:
    50% - полностью заполненный круг
    Либо любые валидные значения для stroke-width
  */
  --circular-progress-stroke-width: 10%;

  /* Цвет линии индикатора */
  --circular-progress-stroke-color: blue;

  /* Цвет незаполненной части линии индикатора  */
  --circular-progress-empty-color: grey;
}
```
