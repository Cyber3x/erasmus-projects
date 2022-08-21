import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';

import { INPUT_ELEMENT_RIGHT_MARGIN } from '../constants/createProjectConstants';

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Erasmus projects</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <Container
        maxW={{
          base: 'md',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
        }}
        my={{ base: 8, lg: '14' }}
      >
        <Heading
          mb={{ base: 8, lg: '16' }}
          color='green.500'
          textAlign='center'
          fontSize={{ base: '3xl', lg: '6xl' }}
        >
          Find your next adventure
        </Heading>

        {/* SEARCH BOX */}
        <Box borderColor='gray.200' borderRadius='xl' borderWidth='2px' p='8'>
          {/* FIRST ROW */}
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <FormControl flex='1'>
              <FormLabel htmlFor='projectType'>Project type</FormLabel>
              <Select
                id='projectType'
                variant={'filled'}
                size='lg'
                defaultValue={'ye'}
              >
                <option value='any'>Any</option>
                <option value='ye'>YE</option>
                <option value='tc'>TC</option>
              </Select>
            </FormControl>

            <FormControl
              flex='3'
              mx={{ base: 0, lg: 8 }}
              my={{ base: 4, lg: 0 }}
            >
              <FormLabel htmlFor='projectName'>Project name</FormLabel>
              <Input
                id='projectName'
                placeholder='With art we are united'
                variant={'filled'}
                size='lg'
              />
            </FormControl>

            <FormControl flex='1'>
              <FormLabel htmlFor='projectCountry'>Project Country</FormLabel>
              <Select id='projectType' variant={'filled'} size='lg'>
                <option>Any</option>
                <option>France</option>
                <option>Germany</option>
                <option>Croatia</option>
              </Select>
            </FormControl>
          </Flex>

          {/* SECOND ROW */}
          <Flex flexDirection={{ base: 'column', lg: 'row' }} mt={8}>
            <FormControl flex='1'>
              <FormLabel htmlFor='projectCountry'>
                Looking for paticipants from
              </FormLabel>
              <Select
                id='projectType'
                variant={'filled'}
                placeholder='Choose your country'
              >
                <option>🇫🇷 France</option>
                <option>🇩🇪 Germany</option>
                <option>🇭🇷 Croatia</option>
              </Select>
            </FormControl>

            <FormControl
              flex='1'
              mx={{ base: 0, lg: 8 }}
              my={{ base: 4, lg: 0 }}
            >
              <FormLabel htmlFor='startDate'>Start date</FormLabel>
              <Input
                id='startDate'
                type='date'
                min={new Date().getTime()}
                variant='filled'
              />
            </FormControl>

            <FormControl flex='1'>
              <FormLabel htmlFor='endDate'>End date</FormLabel>
              <Input
                id='endDate'
                type='date'
                min={new Date().getTime()}
                variant='filled'
              />
            </FormControl>
          </Flex>
        </Box>

        <Heading mt='16' mb='10' color='blackAlpha.600' size='xl'>
          Here's what we found for you
        </Heading>

        <Grid
          templateColumns={{
            base: '1',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap='10'
        >
          <ProjectCard country='Croatia' />
          <ProjectCard country='Hungary' />
          <ProjectCard country='Belgium' />
          <ProjectCard country='Belgium' />
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
