import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  .header-wrapper {
    width: 1200px;
    height: 4rem;
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
        color: #adb5bd;
        &.active {
          color: yellow;
          font-weight: 500;
        }
        & + a {
          margin-left: 1.5rem;
        }
      }
    }
  }
`;
