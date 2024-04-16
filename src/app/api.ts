import { UpdateCar, CarStatus, Winners, Instance, UpdateWinner, SortField } from 'shared/types/types';
import { carMovementControl } from 'features/carMovementControl';
import { setWinner } from 'features/setWinner';
import { state } from './state';

const baseUrl = 'http://127.0.0.1:3000';
const garageUrl = `${baseUrl}/garage`;
const winnersUrl = `${baseUrl}/winners`;
const engineUrl = `${baseUrl}/engine`;

let hasWinner: boolean = false;

export const getData = async (instance: Instance, sort?: SortField) => {
  let response;
  const { wins, time } = state.getState().sortType;

  if (instance === 'cars') {
    response = await fetch(`${garageUrl}`);
  } else if (instance === 'winners') {
    if (sort === 'wins') {
      response = await fetch(`${winnersUrl}?_sort=${sort}&_order=${wins}`);
    } else if (sort === 'time') {
      response = await fetch(`${winnersUrl}?_sort=${sort}&_order=${time}`);
    } else {
      response = await fetch(`${winnersUrl}`);
    }
  }
  const data = await response?.json();
  state.setData(instance, data);
};

export const deleteData = async (id: number) => {
  const { winners } = state.getState();

  await fetch(`${garageUrl}/${id}`, {
    method: 'DELETE',
  });

  if (winners.find((item) => item.id === id)) {
    await fetch(`${winnersUrl}/${id}`, {
      method: 'DELETE',
    });
  }
  state.removeData(id);
};

export const updateData = async (id: number, updatedData: UpdateCar | UpdateWinner, instance: Instance) => {
  let url;

  if (instance === 'cars') {
    url = garageUrl;
  } else url = winnersUrl;

  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  const changedData = await response.json();
  state.updateItems(changedData, instance);
};

export const addData = async (newData: UpdateCar | Winners, instance: Instance) => {
  let url;

  if (instance === 'cars') {
    url = garageUrl;
  } else url = winnersUrl;

  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });

  const newItem = await response.json();
  state.addItems(newItem, instance);
};

export const carMovement = async (id: number, status: CarStatus) => {
  const response = await fetch(`${engineUrl}?status=${status}&id=${id}`, {
    method: 'PATCH',
  });

  if (status === 'started' && response.ok) {
    hasWinner = false;

    const { velocity, distance } = await response.json();
    const time = distance / velocity / 1000;
    state.setCarsTime(id, time);

    carMovementControl({ id, time });
    await carMovement(id, 'drive');
  }

  if (status === 'drive') {
    if (response.status === 500) {
      carMovementControl({ id, error: true });
    }
    if (response.status === 200 && !hasWinner) {
      setWinner(id);
      hasWinner = true;
    }
  }

  if (status === 'stopped' && response.ok) {
    carMovementControl({ id, stop: true });
  }
};
