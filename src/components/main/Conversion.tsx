import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Input } from 'antd';
import { ConverterType } from '../../store';
import { ThemeGradient, MainHeadlineCenter, Container, MainFocusBlue, MainArticle, MainH, } from '../globals';


const MainConversion = (props:{ store: ConverterType }): JSX.Element => {
  const { store } = props;

  return(
    <ThemeGradient>
      <Container>
        <Row>
          <Col span={24}><MainHeadlineCenter>Currency converter</MainHeadlineCenter></Col>
        </Row>
        <Row>
          <Col span={18} offset={3}>
            <MainFocusBlue>
              <Row>
                <Col span={24}>
                  <MainArticle>Enter amount that you would like to convert</MainArticle>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <Input 
                    size="large" 
                    value={store.baseAmount} 
                    onChange={(e) => store.changeBaseAmount(e.target.value)} 
                    style={{"fontSize": "26px", "fontWeight": 800, "padding": "0px 10px", "color": "rgb(7 45 145)"}}
                  />
                </Col>
                <Col span={5}><MainH>{store.base}</MainH></Col>
                <Col span={3}><MainH>=</MainH></Col>
                <Col span={6}><MainH>{store.markerAmount}</MainH></Col>
                <Col span={5}><MainH>{store.marker}</MainH></Col>
              </Row>
            </MainFocusBlue>
          </Col>
        </Row>
      </Container>
    </ThemeGradient>
  )
}

export default observer(MainConversion);