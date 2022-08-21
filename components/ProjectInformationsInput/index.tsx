import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Flex,
  FormErrorMessage,
  Textarea,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { INPUT_ELEMENT_TOP_MARGIN } from '../../constants/createProjectConstants';
import { useForm } from 'react-hook-form';

interface IFormData {
  projectTitle: string;
  projectType: string;
}

const ProjectInformationsInput = () => {
  

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormData>();

  //@ts-ignore
  const onSubmit = (data: IFormData) => {
    console.log(data);
    console.log(errors);
    console.log('submited');
  };

  return (

  );
};

export default ProjectInformationsInput;
