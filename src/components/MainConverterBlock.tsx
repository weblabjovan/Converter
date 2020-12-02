import React from 'react';
import { observer } from 'mobx-react-lite';
import { ConverterType } from '../store';
import ErrorScreen from './ErrorScreen';
import LoaderLarge from './LoaderLarge';
import MainConversion from './main/Conversion';
import MainBaseMarker from './main/BaseMarker';


const MainConverterBlock = (props:{ store: ConverterType }): JSX.Element => {
  const { store } = props;

  React.useEffect(() => {
    store.fetchLatest();
    store.fetchHistory();
    store.closeLoader();
  }, [])

  return(
    <>
      <LoaderLarge show={ store.loader } />
      <ErrorScreen show={ store.error } />
      <MainConversion store={ store } />
      <MainBaseMarker store={ store } />

    </>
  )
}

export default observer(MainConverterBlock);