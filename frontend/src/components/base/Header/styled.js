import styled from 'styled-components';
import { color } from '../../../styles/variables';

const { main } = color;

export const Header = styled.header`
  display: flex;
  .header-wrapper {
    height: 6rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .brand {
      font-size: 2.25rem;
      font-weight: 700;
    }
    .right {
      margin-left: auto;
    }

    nav {
      margin-left: 3rem;
      a {
        font-size: 1.25rem;
        color: ${main};
        &.active {
          font-weight: 500;
        }
        & + a {
          margin-left: 1.5rem;
        }
      }
    }
  }
`;
