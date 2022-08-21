import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  Spacer,
  Button,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  DrawerFooter,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/clientApp';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [user, loading] = useAuthState(auth);

  const handleSignout = () => {
    signOut(auth)
      .then()
      .catch((error) => console.error(error));
  };

  return (
    <Box borderBottom='2px' borderColor='gray.200' p='4'>
      <Container maxW='container.xl'>
        <Flex flex='1' justifyContent={'space-between'}>
          <Link href='/'>
            <Heading size='md' p='2' mr='8' color='green'>
              Erasmus Projects
            </Heading>
          </Link>
          <HStack spacing='8' flex={1} display={{ base: 'none', md: 'flex' }}>
            <Link href='organizations'>
              <a>
                <Text color={'gray.600'}>Organizations</Text>
              </a>
            </Link>

            <Link href='about'>
              <a>
                <Text color={'gray.600'}>About</Text>
              </a>
            </Link>

            {user && (
              <Link href='create-project'>
                <a>
                  <Text color={'gray.600'}>Create a project</Text>
                </a>
              </Link>
            )}

            <Spacer />

            {user ? (
              <Button
                colorScheme='red'
                mr='6'
                variant='outline'
                onClick={handleSignout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href='/signup'>
                  <Button colorScheme='green' mr='6'>
                    Sign up
                  </Button>
                </Link>
                <Link href='/login'>
                  <Button colorScheme='green' variant='outline'>
                    Login
                  </Button>
                </Link>
              </>
            )}
          </HStack>

          <IconButton
            display={{ base: 'inline-flex', md: 'none' }}
            icon={
              isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={5} h={5} />
            }
            onClick={onToggle}
            variant='ghost'
            aria-label='Toggle Navigation'
          />
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Erasmus Projects</DrawerHeader>

          <DrawerBody>
            <VStack align='left' spacing={4}>
              <Link href='organizations'>
                <Text color={'gray.600'}>Organizations</Text>
              </Link>
              <Link href='about'>
                <Text color={'gray.600'}>About</Text>
              </Link>
              {user && (
                <Link href='create-project'>
                  <Text color={'gray.600'}>Create a project</Text>
                </Link>
              )}

              <Spacer />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='green' isFullWidth mr='4'>
              Sign up
            </Button>
            <Link href='/login'>
              <Button colorScheme='green' variant='outline' isFullWidth>
                Login
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
