import { ScreenMask, CenteredDiv, Container } from './globals';
import alert from '../alert.png';

const ErrorScreen = (props: {show: boolean}): JSX.Element | never => {
  const { show } = props;
  return(
    <>
      {
        show
        &&
        <ScreenMask style={{background: "#fff"}}>
          <Container>
            <CenteredDiv>
              <img src={alert} alt="alert"/>
              <h1>There is a problem with API we are using. Please, restart the page or try again in couple of minutes</h1>
            </CenteredDiv>
          </Container>
        </ScreenMask>
      }
    </>
  )
}

export default ErrorScreen;