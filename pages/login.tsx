import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import Head from 'next/head';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { withPublic } from '../hooks/routes';

type TInputs = {
  email: string;
  password: string;
};

interface IProps {
  auth: Auth;
}

const LoginPage = ({ auth }: IProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log('Logged in: ', userCredential.user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            setError('email', { message: 'This email is not registered' });
        }
        console.log(error.code);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <Container borderRadius='xl' borderWidth='2px' p='8' mt='32'>
        <Heading textAlign={'center'} mb='8'>
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              type='email'
              placeholder='your.email@domain.example'
              {...register('email', {
                required: 'Email is required',
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl my='8' isInvalid={!!errors.password}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              id='password'
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Your password is too short',
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button isFullWidth colorScheme={'green'} type='submit'>
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default withPublic(LoginPage);
