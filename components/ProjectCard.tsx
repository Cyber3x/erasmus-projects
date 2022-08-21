import { Button, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  country: string;
}
const ProjectCard = (props: IProps) => {
  return (
    <GridItem borderRadius='lg' bgColor='green.200'>
      <Text p='10' textAlign={'center'}>
        {props.country}
      </Text>
      <Button width={'full'} borderTopRadius='0'>
        View project
      </Button>
    </GridItem>
  );
};

export default ProjectCard;
