import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
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

const SignupPage = ({ auth }: IProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials: UserCredential) => {
        console.log('signed in: ', userCredentials.user.emailVerified);
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setError('email', {
            message: 'Email already in use',
            type: 'custom',
          });
        }
      });
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <Navbar />
      <Container borderRadius='xl' borderWidth='2px' p='8' mt='32'>
        <Heading textAlign={'center'} mb='8'>
          Signup
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              type='email'
              placeholder='your.email@domain.example'
              {...register('email', { required: 'Email is required' })}
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
            Signup
          </Button>
        </form>
      </Container>
    </>
  );
};

export default withPublic(SignupPage);
