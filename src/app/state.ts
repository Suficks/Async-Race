import { updateButtonState } from 'features/pagination';
import { Cars, Instance, PaginationDirection, SortOrder, SortType, StateProps, Winners } from 'shared/types/types';
import { filtersGenerator } from 'widgets/filtersGenerator/filtersGenerator';
import { garageGenerator } from 'widgets/garageGenerator/garageGenerator';
import { tableGenerator } from 'widgets/tableGenerator/tableGenerator';

class State {
  state: StateProps;

  constructor() {
    this.state = {
      cars: [],
      winners: [],
      isEditing: false,
      isRacing: false,
      currentGaragePage: 0,
      currentWinnersPage: 0,
      carsPerPage: 7,
      winnersPerPage: 10,
      carsTime: [],
      sortType: {
        wins: 'ASC',
        time: 'ASC',
        id: 'ASC',
      },
    };
  }

  getState() {
    return this.state;
  }

  setData(item: 'cars' | 'winners', data: Cars[] | Winners[]) {
    if (item === 'cars') {
      this.state.cars = data;
    } else {
      this.state.winners = data;
      tableGenerator();
    }
  }

  addItems(newItem: Cars | Winners, instance: Instance) {
    if (instance === 'cars') {
      this.state.cars.push(newItem);
      garageGenerator();
    } else {
      this.state.winners.push(newItem);
      tableGenerator();
    }
    updateButtonState();
  }

  removeData(id: number) {
    const { cars, winners, carsPerPage, winnersPerPage } = this.state;

    const carIndex = cars.findIndex((item) => item.id === id);
    this.state.cars = cars.filter((item) => item.id !== id);
    const winnerIndex = winners.findIndex((item) => item.id === id);
    this.state.winners = winners.filter((item) => item.id !== id);

    if (carIndex === this.state.cars.length && carIndex % carsPerPage === 0) {
      this.pagination('prev', 'cars');
    }

    if (winnerIndex === this.state.winners.length && winnerIndex % winnersPerPage === 0 && winnerIndex !== 0) {
      this.pagination('prev', 'winners');
    }

    garageGenerator();
    tableGenerator();
    updateButtonState();
  }

  updateItems(changedData: Cars | Winners, instance: Instance) {
    const targetArray = instance === 'cars' ? this.state.cars : this.state.winners;
    const index = targetArray.findIndex((car) => car.id === changedData.id);

    if (index !== -1) {
      targetArray[index] = changedData;
    }

    if (instance === 'cars') {
      garageGenerator();
    } else {
      tableGenerator();
    }
  }

  pagination(direction: PaginationDirection, instance: Instance) {
    if (instance === 'cars') {
      if (direction === 'prev') {
        this.state.currentGaragePage -= 1;
      } else this.state.currentGaragePage += 1;
      garageGenerator();
    } else if (instance === 'winners') {
      if (direction === 'prev') {
        this.state.currentWinnersPage -= 1;
      } else this.state.currentWinnersPage += 1;
      tableGenerator();
    }
    updateButtonState();
  }

  setCarsTime(id: number, time: number) {
    this.state.carsTime.push({ id, time });
  }

  removeCarsTime() {
    this.state.carsTime = [];
  }

  setSortType(field: keyof SortType, type: SortOrder) {
    this.state.sortType[field] = type;
  }

  setIsEditing(isEditing: boolean) {
    this.state.isEditing = isEditing;
    filtersGenerator();
  }

  setIsRacing(isRacing: boolean) {
    this.state.isRacing = isRacing;
    filtersGenerator();
  }
}

export const state = new State();
