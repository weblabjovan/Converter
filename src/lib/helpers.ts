import { ILatestFetched, Period, BigObject, ICurrencyBenchmark } from '../interfaces/';
import { LatestType, CurrencyType, RatesType, CurrencyListType, CurrencyIndexType, HistoryCurrencyType } from '../store';

export const setLatest = (latest: ILatestFetched): LatestType => {
  const arr = [];
  
  let key: string;
  for(key in latest.rates){
    const obj: CurrencyType = { currency: key, value: latest.rates[key] as number}
    arr.push(obj);
  }

  const res: LatestType = {
    rates: bubbleSort(arr, "currency", "ASC") as RatesType,
    base: latest.base,
    date: latest.date
  }

  return res;
}

export const setCurrencyList = (rates: RatesType): CurrencyListType => {
  let eurPresent = false;
  const res = [];

  for(let key in rates){
    if(key as string === "EUR"){
      eurPresent = true;
    }
    res.push(key as string);
  }

  !eurPresent && res.push("EUR");

  return bubbleSort(res, "", "ASC") as CurrencyListType;
}

export const setCurrencyIndex = (rates: RatesType): CurrencyIndexType => {
  let obj = {};

  for (let index = 0; index < rates.length; index++) {
    const x = rates[index]['currency'];
    obj = {...obj, [x]: index };
  }

  return obj as CurrencyIndexType;
}

export const binarySearch = <T>(arr: Array<any>, fieldName: string, searchable: T): any => { 
  let start=0;
  let end =arr.length-1; 

  while (start<=end){ 
      let mid=Math.floor((start + end)/2); 
 
      if (arr[mid][fieldName] === searchable){
        return arr[mid]; 
      }else if (arr[mid][fieldName] < searchable){
        start = mid + 1;
      }else{
        end = mid - 1;
      }       
  } 
 
  return null; 
}

export const bubbleSort = (a: Array<any>, b: string, d: string): Array<any> => {
  
  var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
          const condition = d === "DESC" && b ? x[i][b] < x[i+1][b] : d === "DESC" && !b ? x[i] < x[i+1] : d === "ASC" && b ? x[i][b] > x[i+1][b] : x[i] > x[i+1];
            if (condition)
            {
              var temp = x[i];
              x[i] = x[i+1];
              x[i+1] = temp;
              swapp = true;
            }
        }
        n--;
    } while (swapp);

  return x; 
}

export const bubbleSortDate = (a: Array<any>, b: string, d: string): Array<any> => {

  const dateThis = (date: string): Date => {
    const d = new Date(date);
    return d;
  }
  
  var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
          const condition = d === "DESC" && b ? dateThis(x[i][b]) < dateThis(x[i+1][b]) : d === "DESC" && !b ? dateThis(x[i]) < dateThis(x[i+1]) : d === "ASC" && b ? dateThis(x[i][b]) > dateThis(x[i+1][b]) : dateThis(x[i]) > dateThis(x[i+1]);
            if (condition)
            {
              var temp = x[i];
              x[i] = x[i+1];
              x[i+1] = temp;
              swapp = true;
            }
        }
        n--;
    } while (swapp);

  return x; 
}

export const getDateInPast = (ref: keyof Period): string => {
  const map: Period = { "Now": 0, "Week": 7, "Month": 30, "Half": 188, "Year": 365 };
  const date = new Date(Date.now() -  map[ref] * 24 * 60 * 60 * 1000);
  return formatDate(date);
  
}

const formatDate = (date: Date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

let bigObject: BigObject<object> = {}


export const setHistoryDataObject = (data: any): Array<HistoryCurrencyType> => {
  const arr: Array<HistoryCurrencyType> = [];
  let bigObject: BigObject<object> = data;

  Object.keys(bigObject).forEach(key => {
    const currency: string = Object.keys(data[key])[0];
    arr.push({name: key, value: data[key][currency]})
  });

  return bubbleSortDate(arr, "name", "ASC") as Array<HistoryCurrencyType>;
}

export const getCurrencyBenchmarks = (rates: Array<HistoryCurrencyType>): ICurrencyBenchmark => {
  const obj = { start: rates.length ? rates[0].value : 0, end: rates.length ? rates[rates.length - 1].value : 0, highest: 0, lowest: 100000};

  if (rates.length) {
    for (let index = 0; index < rates.length; index++) {
      if (rates[index].value < obj.lowest) {
        obj.lowest = rates[index].value;
      }
      
      if (rates[index].value > obj.highest) {
        obj.highest = rates[index].value;
      }
    }
  }

  

  return obj;
}
