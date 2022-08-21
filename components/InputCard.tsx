import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};
const InputCard = ({ children, title }: Props) => {
  return (
    <Box borderColor='gray.200' borderRadius='xl' borderWidth='2px' p='8'>
      <Heading size='lg' mb='8'>
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default InputCard;
