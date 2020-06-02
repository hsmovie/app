import styled from 'styled-components';
import { materialShadow } from '../../../styles/mixins';
import { breakpoint } from '../../../styles/variables';

const { huge, large, medium } = breakpoint;

export const Container = styled.div`
  margin-top: 4rem;
  .block {
    display: flex;
    @media (max-width: ${large}) {
      flex-direction: column;
    }
  }
  .left-text {
    display: flex;
    flex: 1;
    align-items: center;
    h1 {
      font-size: 3.5rem;
      font-weight: 500;
      line-height: 4rem;
      @media (max-width: ${huge}) {
        font-size: 2.85rem;
      }

      @media (max-width: ${medium}) {
        font-size: 2rem;
      }
    }
  }
  p {
    font-size: 1.25rem;
    font-weight: 300;
    @media (max-width: ${huge}) {
      font-size: 1rem;
    }
    @media (max-width: ${medium}) {
      font-size: 1.25rem;
      br {
        display none;
      }
    }
  }
  .right-form {
    width: 480px;
    margin-left: 2rem;
    margin-top: 2rem;

    @media (max-width: ${large}) {
      margin-left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .black-box {
      @media (max-width: ${medium}) {
        display: none;
      }
      border-radius: 4px;
      width: 100%;
      height: 500px;
      background: black;
      color: white;
      padding: 2rem;
      ${materialShadow(3, 0.5)}
      @media (max-width: ${large}) {
        width: calc(100% - 2rem);
      }
    }

    .register-button {
      display: none;
      @media (max-width: ${medium}) {
        display: flex;
      }
      width: 15rem;
      background: black;
      color: white;
      font-weight: 500;
      padding-top: 1rem;
      padding-bottom: 1rem;
      justify-content: center;
      font-size: 2rem;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      &:active {
        border: 2px solid black;
        background: white;
        color: black;
      }
      ${materialShadow(1, 1)}
    }
  }
`;
