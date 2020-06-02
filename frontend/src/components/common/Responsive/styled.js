import React from 'react';
import styled from 'styled-components';
import { breakpoint } from '../../../styles/variables';

const { huge, large, medium, small } = breakpoint;

const div = ({ children, className, ...rest }) => (
  <div {...rest} className={className}>
    {children}
  </div>
);

export const Container = styled(div)`
  width: 1200px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 auto;
  @media (max-width: ${huge}) {
    width: ${large};
  }

  @media (max-width: ${large}) {
    width: ${medium};
  }

  @media (max-width: ${medium}) {
    width: 100%;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  @media (max-width: ${small}) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;
