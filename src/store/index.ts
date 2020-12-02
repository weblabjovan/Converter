import { types, flow, Instance, onSnapshot, getSnapshot } from 'mobx-state-tree';
import { Period } from '../interfaces';
import { setLatest, setCurrencyList, setCurrencyIndex, getDateInPast, setHistoryDataObject, getCurrencyBenchmarks } from '../lib/helpers';

const CurrencyTimeModel = types.model('CurrencyTime', {
  name: types.string,
  value: types.number
});

const CurrencyModel = types.model('Currency', {
  currency: types.string,
  value: types.number
});

const LatestModel = types.model('Latest', {
  rates: types.array(CurrencyModel),
  base: types.string,
  date: types.string
});

const HistoryModel = types.model('History', {
  rates: types.array(CurrencyTimeModel),
  start: types.string,
  end: types.string
})

const ConverterModel = types.model('Converter', {
  base: types.string,
  baseAmount: types.string,
  marker: types.string,
  currencyList: types.array(types.string),
  currencyIndexObject: types.map(types.number),
  latest: LatestModel,
  history: HistoryModel,
  loader: types.boolean,
  historyPeriod: types.string,
  error: types.boolean
})
.actions(self => {
  const fetchLatest = flow(function*(){
    try{
      const latest = yield fetch(`https://api.exchangeratesapi.io/latest?base=${self.base}`);
      const data = yield latest.json();
      self.currencyList = setCurrencyList(data['rates']);
      self.latest = setLatest(data);
      self.currencyIndexObject = setCurrencyIndex(self.latest.rates);
    }catch(error){
      console.log(error);
      self.error = true;
    }
  })

  const changeBaseAmount = (amount: string) => {
    self.baseAmount = amount;
  }

  const changeBase = (value: string) => {
    openLoader();
    self.base = value;
    fetchLatest();
    fetchHistory();
    closeLoader();
  }

  const changeMarker = (value: string) => {
    openLoader();
    self.marker = value;
    fetchHistory();
    closeLoader();
  }

  const closeLoader = () => {
    self.loader = false;
  }

  const openLoader = () => {
    self.loader = true;
  }

  const changeHistoryPeriod = (period: string) => {
    openLoader();
    self.historyPeriod = period;
    fetchHistory();
    closeLoader();
  }

  const fetchHistory = flow(function*(){
    try{
      const end = getDateInPast("Now");
      const period = self.historyPeriod.split(' ')[0];
      const start = getDateInPast(period as keyof Period);
      const history = yield fetch(`https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&symbols=${self.marker}&base=${self.base}`);
      const data = yield history.json();
      const rates = setHistoryDataObject(data['rates']) as HistoryRatesType;
     self.history = { rates, start, end } 
    }catch(error){
      console.log(error);
      self.error = true;
    }
  })

  return{ fetchLatest, changeBaseAmount, changeBase, changeMarker, changeHistoryPeriod, fetchHistory, closeLoader }
})
.views( self =>({
  get markerAmount(){
    let res =  0;
    if(Object.keys(self.currencyIndexObject).length > 2 && self.baseAmount){
      const indexes = getSnapshot(self.currencyIndexObject);
      const i = indexes[self.marker];
      const rates = getSnapshot(self.latest.rates);
      if(rates[i]){
        res = +(parseFloat(self.baseAmount) * rates[i].value).toPrecision(5);
      }
    }
    
    return res;
  },

  get historyRates(){
    return getSnapshot(self.history.rates);
  },

  get historyBenchmarks(){
    return getCurrencyBenchmarks(getSnapshot(self.history.rates));
  }
}))


export const ConverterInstance = ConverterModel.create({
  base: "EUR",
  marker: "USD",
  baseAmount: "1",
  currencyList: [],
  currencyIndexObject: {},
  latest: {rates: [], base: "EUR", date: ""},
  history: { rates: [], start:"", end:"" },
  loader: true,
  historyPeriod: "Week",
  error: false
});

onSnapshot(ConverterInstance, snapshot => console.log("snapshot: ", snapshot));


export type CurrencyTimeType = Instance<typeof CurrencyTimeModel>;
export type CurrencyType = Instance<typeof CurrencyModel>;
export type LatestType = Instance<typeof LatestModel>;
export type HistoryType = Instance<typeof HistoryModel>;
export type ConverterType = Instance<typeof ConverterModel>;

export type RatesType = Instance<typeof ConverterInstance.latest.rates>;
export type CurrencyListType = Instance<typeof ConverterInstance.currencyList>;
export type CurrencyIndexType = Instance<typeof ConverterInstance.currencyIndexObject>;

export type HistoryRatesType = Instance<typeof ConverterInstance.history.rates>;
export type HistoryCurrencyType = Instance<typeof CurrencyTimeModel>;