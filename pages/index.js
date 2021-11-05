import React from 'react';
import Head from 'next/head';
import Menu from '../components/Menu';
import Home from '../components/Home'

export default function Index() {
  return (
    <>
    <Head>
      <title>FindMe</title>
    </Head>
    <Menu />
    <Home />
    </>
  );
}
