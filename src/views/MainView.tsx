import MainConverterBlock from '../components/MainConverterBlock';
import HistoryConverterBlock from '../components/history/HistoryConverterBlock';
import { Footer } from '../components/globals';
import { ConverterInstance } from '../store';

const MainView = (): JSX.Element => {
  return(
    <>
      <MainConverterBlock store={ ConverterInstance } />
      <HistoryConverterBlock store={ ConverterInstance } />
      <Footer>2020 &copy; Made in Belgrade by Jovan</Footer>
    </>
  )
}

export default MainView;