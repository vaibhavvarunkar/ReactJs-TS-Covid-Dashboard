export interface ICovidDataStatewise {
  active: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  state: string;
}

export type stateOption = {label: string, value: string}