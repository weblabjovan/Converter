import { observer } from 'mobx-react-lite';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Row, Col   } from 'antd';
import { ConverterType } from '../../store';
import { Container, MainFocusCenter, HistoryButton, CenteredDiv, HistoryButtonActive, HistoryBenchmarkH, HistoryBenchmarkP } from '../globals';

const HistoryConverterBlock = (props:{ store: ConverterType }): JSX.Element => {
  const { store } = props;
  const buttonData = ["Week", "Month", "Half Year", "Year"];
  const top = store.historyRates.length ? store.historyBenchmarks.highest + (store.historyBenchmarks.highest / 15) : 100;
  const bottom = store.historyRates.length ? store.historyBenchmarks.lowest - (store.historyBenchmarks.lowest / 10) : 100;
  
  return(
    <Container>
      <Row>
        {
          buttonData.map((item, index) => {
            return(
              store.historyPeriod === item
              ?
              <Col span={6} key={`buttonKey_${index}`}>
                <CenteredDiv>
                  <HistoryButtonActive>{item}</HistoryButtonActive>
                </CenteredDiv>
              </Col>
              :
              <Col span={6} key={`buttonKey_${index}`}>
                <CenteredDiv>
                  <HistoryButton onClick={()=> store.changeHistoryPeriod(item)}>{item}</HistoryButton>
                </CenteredDiv>
              </Col>
            )
          })
        }
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <MainFocusCenter>
            <LineChart
              width={700}
              height={300}
              data={ store.historyRates }
              margin={{
                top: 5, right: 30, left: 30, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[parseFloat(bottom.toFixed(4)), parseFloat(top.toFixed(4))]} />
              <Tooltip />
              <Line type="step" dataKey="value" stroke="#415ffc" />
            </LineChart>
          </MainFocusCenter>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3} offset={6}>
          <HistoryBenchmarkP>Value on period start</HistoryBenchmarkP>
          <HistoryBenchmarkH>{store.historyBenchmarks.start}</HistoryBenchmarkH>
        </Col>
        <Col span={3}>
          <HistoryBenchmarkP>Lowest value of the period</HistoryBenchmarkP>
          <HistoryBenchmarkH>{store.historyBenchmarks.lowest}</HistoryBenchmarkH>
        </Col> 

        <Col span={3}>
          <HistoryBenchmarkP>Value on period end</HistoryBenchmarkP>
          <HistoryBenchmarkH>{store.historyBenchmarks.end}</HistoryBenchmarkH>
        </Col>
        <Col span={3}>
          <HistoryBenchmarkP>Highest value of the period</HistoryBenchmarkP>
          <HistoryBenchmarkH>{store.historyBenchmarks.highest}</HistoryBenchmarkH>
        </Col>
      </Row>
    </Container>
  )
}

export default observer(HistoryConverterBlock);