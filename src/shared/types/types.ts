export interface Cars {
  name?: string;
  color?: string;
  id: number;
}

export interface Winners {
  id: number;
  wins?: number;
  time?: number;
}

export type UpdateCar = Omit<Cars, 'id'>;
export type UpdateWinner = Omit<Winners, 'id'>;

export type SortOrder = 'ASC' | 'DESC';
export type SortField = 'id' | 'wins' | 'time';

export interface SortType {
  wins: SortOrder;
  time: SortOrder;
  id: SortOrder;
}

export type Instance = 'cars' | 'winners';

export type CarStatus = 'started' | 'stopped' | 'drive';

export type PaginationDirection = 'prev' | 'next';

export interface CarsTime {
  id: number;
  time: number;
}

export interface StateProps {
  cars: Cars[];
  winners: Winners[];
  isEditing: boolean;
  isRacing: boolean;
  currentGaragePage: number;
  currentWinnersPage: number;
  carsPerPage: number;
  winnersPerPage: number;
  carsTime: CarsTime[];
  sortType: SortType;
}
