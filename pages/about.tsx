import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Navbar />
      <div>AboutPage</div>
    </>
  );
};

export default AboutPage;
