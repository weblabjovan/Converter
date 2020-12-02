import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col,  Select  } from 'antd';
import { ConverterType } from '../../store';
import { Container, MainFocus, MainSingleP } from '../globals';


const MainBaseMarker = (props:{ store: ConverterType }): JSX.Element => {
  const { store } = props;
  const { Option } = Select;

  return(
    <Container>
      <Row>
        <Col span={18} offset={3}>
          <MainFocus>
            <Row gutter={16}>
              <Col span={6}><MainSingleP>Your base currency</MainSingleP></Col>
              <Col span={6}> 
                <Select size="large" defaultValue={store.base} style={{width: "100%"}} onChange={ (val) => store.changeBase(val)}>
                {
                  store.currencyList.map((item, index) => {
                    const countryCode = item.substring(0,2).toLowerCase();
                    return(
                    <Option value={item} key={`base_${index}`}><div><img alt={item} src={`https://www.countryflags.io/${countryCode}/flat/24.png`}style={{marginRight: "10px", verticalAlign: "text-top"}}></img><span>{item}</span></div> </Option>
                    )
                  })
                }
                </Select>
              </Col>
              <Col span={6}><MainSingleP>Your marker currency</MainSingleP></Col>
              <Col span={6}> 
              <Select size="large" defaultValue={store.marker}  style={{width: "100%"}} onChange={ (val) => store.changeMarker(val)} >
                {
                  store.currencyList.map((item, index) => {
                    const countryCode = item.substring(0,2).toLowerCase();
                    return(
                    <Option value={item} key={`marker_${index}`}><div><img alt={item} src={`https://www.countryflags.io/${countryCode}/flat/24.png`}style={{marginRight: "10px", verticalAlign: "text-top"}}></img><span>{item}</span></div> </Option>
                    )
                  })
                }
                </Select>
              </Col>
            </Row> 
          </MainFocus>
        </Col>
      </Row>
    </Container>
  )
}

export default observer(MainBaseMarker);