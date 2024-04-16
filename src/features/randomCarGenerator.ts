import { addData } from 'app/api';

const carsMarks = [
  'Toyota',
  'Volkswagen',
  'Ford',
  'Honda',
  'Chevrolet',
  'Nissan',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Hyundai',
  'Kia',
  'Subaru',
  'Tesla',
  'Mazda',
  'Jeep',
];

const carsModels = [
  'Camry',
  'Golf',
  'Mustang',
  'Civic',
  'Silverado',
  'Altima',
  'E-Class',
  'Sonata',
  'Optima',
  'Outback',
  'Model S',
  'CX-5',
  'Wrangler',
  'Corolla',
  'Passat',
];

export const getRandomName = () => {
  const randomName = Math.floor(Math.random() * 15);
  const randomModel = Math.floor(Math.random() * 15);
  return `${carsMarks[randomName]} ${carsModels[randomModel]}`;
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomCars = () => {
  for (let i = 0; i < 100; i += 1) {
    addData(
      {
        name: getRandomName(),
        color: getRandomColor(),
      },
      'cars'
    );
  }
};
