import styled from '@emotion/styled';

export const Container = styled.div`
  width: 1080px;
  margin: auto;
  padding: 15px;
  padding-bottom: 0px;
`;

export const MainFocusBlue = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-sizing: border-box;
  background: rgb(29 0 141 / 90%);
}
`;

export const MainFocus = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-sizing: border-box;
}
`;

export const MainFocusCenter = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-sizing: border-box;
  text-align: -webkit-center;
}
`

export const MainArticle = styled.p`
  text-align: center;
  font-weight: 300;
  font-size: 18px;
  color: #fff;
  line-height: 24px;
  padding-bottom: 20px;
`;

export const MainSingleP = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 36px;
  color: #0744a0;
`;

export const MainHeadlineCenter = styled.h1`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 40px;
`;

export const MainH = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  margin: 0px;
  line-height: 38px;
`;

export const ThemeGradient = styled.div`
  background: linear-gradient(90deg, rgb(3 37 255) 0%, rgb(58 84 253) 35%, rgb(138 208 241) 100%);
`;

export const ScreenMask = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  background: #fff;
  text-align: center;
  background: rgb(255 255 255 / 90%);
`;

export const CenteredDiv = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 30px;
  padding-top: 10px;
`;

export const HistoryButton = styled.button`
  width: 200px;
  outline: none;
  border: none;
  background: #000;
  color: #fff;
  font-weight: 600;
  padding: 6px 0px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover{
    background: #415ffc;
  }
`;

export const HistoryButtonActive = styled.button`
  width: 200px;
  outline: none;
  border: none;
  background: #adadad;
  color: #fff;
  font-weight: 600;
  padding: 6px 0px;
  border-radius: 10px;
  font-size: 18px;
  cursor: not-allowed;
`;

export const HistoryBenchmarkH = styled.h3`
  font-weight: 700;
  font-size: 25px;
  color: #006bc7;
  line-height: 22px;
  text-align: center;
`;

export const HistoryBenchmarkP = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 18px;
  text-align: center;
`;

export const Footer = styled.div`
  width: 100%;
  margin-top: 50px;
  padding: 15px 0px;
  color: #fff;
  line-height: 28px;
  font-size: 14px;
  text-align: center;
  background: #232c97;
`;
