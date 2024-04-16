const CAR_AND_CONTROLLERS_WIDTH = 150;
const CONTROLLERS_WIDTH = 90;

interface CarMovementProps {
  id: number;
  time?: number;
  stop?: boolean;
  error?: boolean;
}

export const carMovementControl = ({ id, time, stop = false, error = false }: CarMovementProps) => {
  const raceLines = document.querySelectorAll('.race_line');
  const currentLine = Array.from(raceLines).find((item) => Number(item.getAttribute('data-id')) === id);
  const currentCar = currentLine?.querySelector('.car_svg') as HTMLElement;

  if (!currentCar) return;

  if (time) {
    const translateWidth = Number(currentLine?.clientWidth) - CAR_AND_CONTROLLERS_WIDTH;

    currentCar.style.transform = `translateX(${translateWidth}px)`;
    currentCar.style.transition = `${time}s linear`;
  }

  if (error) {
    currentCar.style.transform = `translateX(${currentCar.getBoundingClientRect().x - CONTROLLERS_WIDTH}px)`;
    currentCar.style.transition = `0s`;
  }

  if (stop) {
    currentCar.style.transform = `translateX(0px)`;
    currentCar.style.transition = `0s`;
  }
};
