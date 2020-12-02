import { number } from "mobx-state-tree/dist/internal";

export interface BigObject<T> {
  [index: string]: T
}

export interface ILatestFetched{
  rates: any;
  base: string;
  date: string;
} 

export interface Period { 
  Now: number;
  Week: number;
  Month: number;
  Half: number;
  Year: number;
};

export interface ICurrencyBenchmark{
  start: number;
  end: number;
  highest: number;
  lowest: number;
}