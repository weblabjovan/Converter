import { Spin  } from 'antd';
import { ScreenMask } from './globals';

const LoaderLarge = (props: {show: boolean}): JSX.Element | never => {
  const { show } = props;
  return(
    <>
      {
        show
        &&
        <ScreenMask>
          <Spin tip="Loading..." size="large" style={{marginTop: "10%"}}></Spin>
        </ScreenMask>
      }
    </>
  )
}

export default LoaderLarge;