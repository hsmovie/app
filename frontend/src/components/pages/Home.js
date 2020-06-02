import React from 'react';
import PageTemplate from '../template/PageTemplate';
import HomeTemplate from '../template/HomeTemplate';
import Header from '../../components/base/Header';

const Home = () => {
  return (
    <PageTemplate header={<Header />}>
      <HomeTemplate />
    </PageTemplate>
  );
};

export default Home;
