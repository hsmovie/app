import styled from 'styled-components';
import { materialShadow } from '../../../styles/mixins';

export const Container = styled.div`
  margin-top: 4rem;
  .block {
    display: flex;
  }
  .left-text {
    width: 600px;
    display: flex;
    align-items: center;
    h1 {
      font-size: 3.5rem;
      font-weight: 500;
      line-height: 4.25rem;
    }
  }
  p {
    font-size: 2rem;
    font-weight: 300;
    margin: ;
  }
  .right-form {
    flex: 1;
    padding-left: 7rem;
    margin-left: 1rem;
    margin-top: 2rem;
    .black-box {
      border_radius: 4rem;
      width: 100%;
      hegith: 500px;
      background: #e5e5e5;
      color: white;
      padding: 2rem;
      ${materialShadow(3, 0.5)}
    }
  }
`;
