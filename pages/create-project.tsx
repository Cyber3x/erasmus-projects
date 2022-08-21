import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spacer,
  Textarea,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputCard from '../components/InputCard';
import Navbar from '../components/Navbar';
import PartnerCountriesInput from '../components/PartnerCountriesInput';
import {
  DESCRIPTION_MAX_LEN,
  INPUT_ELEMENT_RIGHT_MARGIN,
  INPUT_ELEMENT_TOP_MARGIN,
  TRAVEL_TIPS_MAX_LEN,
} from '../constants/createProjectConstants';
import { withProtected } from '../hooks/routes';
import { useStore } from '../stores/projectStore';
import { ICreateProjectForm } from '../types/shared';
import { storage } from '../firebase/clientApp';
import { ref } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';

import COUNTRIES from '../constants/countries';

const CreateProjectPage = () => {
  const headerImageInputRef = useRef<HTMLInputElement>(null);
  const partnerCountries = useStore((state) => state.partnerCountries);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    setError,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<ICreateProjectForm>({});

  const onSubmit = (data: ICreateProjectForm) => {
    if (getValues('headerImageUrl')) {
      const newData = { ...data, partnerCountries };
      console.log(newData);
      console.log('submited');
    } else {
      setError('headerImageUrl', { message: 'Make sure to upload your image' });
    }
  };

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [isHeaderImageUploaded, setIsHeaderImageUploaded] =
    useState<boolean>(false);
  const [headerImageName, setHeaderImageName] = useState<string>();

  const handleImageUpload = async () => {
    if (selectedImage) {
      const { name: imageName, type: imageType } = selectedImage;

      const imageRef = ref(storage, `images/${imageName}`);
      try {
        const result = await uploadFile(imageRef, selectedImage, {
          contentType: imageType,
        });
        setValue(
          'headerImageUrl',
          `https://firebasestorage.googleapis.com/v0/b/erasmus-projects-eu.appspot.com/o/images%2F${imageName}?alt=media`
        );
        console.log('IMAGE IS UP', result);
        setIsHeaderImageUploaded(true);
        clearErrors('headerImageUrl');
      } catch (error) {
        console.error('ERROR UPLAODING IAMGE:', error);
      }
    } else {
      setError('headerImageUrl', {
        type: 'custom',
        message: 'Please select an image to upload first',
      });
    }
  };

  return (
    <form>
      <Head>
        <title>Create a project</title>
      </Head>

      <Navbar />

      <Container maxW='container.xl' my='14'>
        <Heading my='8' color='green'>
          Create a new project
        </Heading>
        <Box>
          <InputCard title='Project informations'>
            {/* PROJECT TITLE */}
            <FormControl isInvalid={!!errors.title} isRequired>
              <FormLabel htmlFor='title'>Title</FormLabel>
              <Input
                id='title'
                type='text'
                maxLength={129}
                placeholder="Type your project's name here"
                {...register('title', {
                  required: 'This field is required',
                  maxLength: {
                    value: 128,
                    message: 'Keep your title short and simple',
                  },
                })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            {/* PROJECT TYPE */}
            <FormControl
              isInvalid={!!errors.type}
              mt={INPUT_ELEMENT_TOP_MARGIN}
              isRequired
            >
              <FormLabel htmlFor='type'>Type</FormLabel>
              <Select
                id='type'
                defaultValue='YE'
                {...register('type', {
                  required: 'This field is required',
                })}
              >
                <option value='YE'>YE - Youth Exchange</option>
                <option value='TC'>TC - Training Course</option>
                <option value='APV'>APV - Advance Planning Visit</option>
              </Select>
              <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
            </FormControl>

            {/* PROJECT START AND END DATE */}
            <Flex
              mt={INPUT_ELEMENT_TOP_MARGIN}
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              {/* START DATE */}
              <FormControl
                isRequired
                mr={INPUT_ELEMENT_RIGHT_MARGIN}
                isInvalid={!!errors.startDate}
              >
                <FormLabel htmlFor='startDate'>Start date</FormLabel>
                <Input
                  id='startDate'
                  type='date'
                  {...register('startDate', {
                    required: 'This field is required',
                  })}
                  min={new Date().toISOString().split('T')[0]}
                />
                <FormErrorMessage>
                  {errors?.startDate?.message}
                </FormErrorMessage>
              </FormControl>

              {/* END DATE */}
              <FormControl
                isRequired
                isInvalid={!!errors.endDate}
                mt={{ base: INPUT_ELEMENT_TOP_MARGIN, lg: 0 }}
              >
                <FormLabel htmlFor='endDate'>End date</FormLabel>
                <Input
                  id='endDate'
                  type={'date'}
                  {...register('endDate', {
                    required: 'This field is required',
                  })}
                  min={watch('startDate')}
                />
                <FormErrorMessage>{errors?.endDate?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            {/* PROJECT COUNTRY AND CITY */}
            <Flex
              mt={INPUT_ELEMENT_TOP_MARGIN}
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              {/* PROJECT COUNTRY */}
              <FormControl
                isInvalid={!!errors.projectCountry}
                mr={INPUT_ELEMENT_RIGHT_MARGIN}
                isRequired
              >
                <FormLabel htmlFor='projectCountry'>Project country</FormLabel>
                <Select
                  id='projectCountry'
                  placeholder='Select a country'
                  {...register('projectCountry', {
                    required: 'This field is required',
                  })}
                >
                  {COUNTRIES.map((countryData) => (
                    <option value={countryData.code}>
                      {countryData.flag} {countryData.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors?.projectCountry?.message}
                </FormErrorMessage>
              </FormControl>

              {/* PROJECT CITY */}
              <FormControl
                isInvalid={!!errors.city}
                isRequired
                mt={{ base: INPUT_ELEMENT_TOP_MARGIN, lg: 0 }}
              >
                <FormLabel htmlFor='city'>City</FormLabel>
                <Input
                  type='text'
                  id='city'
                  placeholder='City of the project'
                  maxLength={41}
                  {...register('city', {
                    required: 'This filed is required',
                    maxLength: {
                      value: 40,
                      message: 'City name too long',
                    },
                  })}
                />
                <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            {/* ORGANIZAION NAME */}
            <FormControl
              isInvalid={!!errors.organizationName}
              mt={INPUT_ELEMENT_TOP_MARGIN}
              isRequired
            >
              <FormLabel htmlFor='organizationName'>
                Organization name
              </FormLabel>
              <Input
                id='organizationName'
                type='text'
                placeholder='Project organizing organization name'
                maxLength={129}
                {...register('organizationName', {
                  required: 'This field is required',
                  maxLength: {
                    value: 128,
                    message: 'Organization name too long',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.organizationName?.message}
              </FormErrorMessage>
            </FormControl>

            {/* PROJECT DESCRIPTION */}
            <FormControl
              isInvalid={!!errors.description}
              mt={INPUT_ELEMENT_TOP_MARGIN}
            >
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Textarea
                id='description'
                placeholder='Enter the details about the projects'
                maxLength={DESCRIPTION_MAX_LEN + 1}
                rows={4}
                {...register('description', {
                  maxLength: {
                    value: DESCRIPTION_MAX_LEN,
                    message: 'Keep you description nice and short.',
                  },
                })}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            {/* INFOPACK LINK */}
            <FormControl
              mt={INPUT_ELEMENT_TOP_MARGIN}
              isRequired
              isInvalid={!!errors.infopackLink}
            >
              <FormLabel htmlFor='infopackLink'>Infopack link</FormLabel>
              <Input
                id='infopackLink'
                type='text'
                placeholder='Enter the infopack link'
                {...register('infopackLink', {
                  required: 'This field is required',
                })}
              />
              <FormErrorMessage>
                {errors.infopackLink?.message}
              </FormErrorMessage>
            </FormControl>

            {/* SIGNUP FORM LINK */}
            <FormControl
              mt={INPUT_ELEMENT_TOP_MARGIN}
              isInvalid={!!errors.signupFormLink}
            >
              <FormLabel htmlFor='signupFormLink'>Sign up form link</FormLabel>
              <Input
                id='signupFormLink'
                type='text'
                placeholder='Enter the sign up form link'
                {...register('signupFormLink')}
              />
              <FormErrorMessage>
                {errors.signupFormLink?.message}
              </FormErrorMessage>
            </FormControl>

            {/* HEADER IMAGE LINK */}
            <FormControl
              isInvalid={!!errors.headerImageUrl}
              mt={INPUT_ELEMENT_TOP_MARGIN}
              isRequired
            >
              <FormLabel htmlFor='headerImageUrl'>Header image</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<AddIcon color={'gray.500'} />}
                />
                <input
                  type='file'
                  accept={'image/png, image/jpg, image/jpeg'}
                  ref={headerImageInputRef}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : undefined;
                    if (file) {
                      setHeaderImageName(file.name);
                    }
                    if (
                      ['image/png', 'image/jpg', 'image/jpeg'].includes(
                        //@ts-ignore
                        file?.type
                      )
                    ) {
                      setSelectedImage(file);
                      setValue('headerImageUrl', '');
                      setIsHeaderImageUploaded(false);
                      clearErrors('headerImageUrl');
                    } else {
                      setError('headerImageUrl', {
                        type: 'custom',
                        message:
                          'Please select a supported file type (png/jpg/jpeg)',
                      });
                    }
                  }}
                />
                {/* THE INPUT THAT IS VISIBLE */}
                <Input
                  id='headerImageName'
                  placeholder='Choose your header image'
                  onClick={() => headerImageInputRef?.current?.click()}
                  value={headerImageName}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.headerImageUrl?.message}
              </FormErrorMessage>

              {/* HEADER UPLOAD BUTTON */}
              <Button
                mt={4}
                isFullWidth
                colorScheme={'green'}
                variant={isHeaderImageUploaded ? 'solid' : 'outline'}
                disabled={uploading || isHeaderImageUploaded}
                onClick={handleImageUpload}
              >
                {isHeaderImageUploaded ? 'Uploaded' : 'Upload'}
              </Button>
            </FormControl>
          </InputCard>

          <Divider my={INPUT_ELEMENT_TOP_MARGIN} />

          <InputCard title='Participant infromations'>
            {/* NUMBER OF PARTICIPANTS */}
            <FormControl isRequired isInvalid={!!errors.numberOfParticipants}>
              <FormLabel htmlFor='numberOfParticipants'>
                Number of participants
              </FormLabel>
              <NumberInput min={1} precision={0}>
                <NumberInputField
                  id='numberOfParticipants'
                  placeholder='Enter the number of participants'
                  {...register('numberOfParticipants', {
                    required: 'This filed is reqired',
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                {errors.numberOfParticipants?.message}
              </FormErrorMessage>
            </FormControl>

            {/* NORMAL PARTICIPANT AGE LIMITS */}
            <Flex mt={INPUT_ELEMENT_TOP_MARGIN}>
              {/* MIN AGE */}
              <FormControl
                isRequired
                mr={INPUT_ELEMENT_RIGHT_MARGIN}
                isInvalid={!!errors.participantMinAge}
              >
                <FormLabel>Participant minimum age</FormLabel>
                <NumberInput min={1} defaultValue={18} precision={0}>
                  <NumberInputField
                    id='participantMinAge'
                    {...register('participantMinAge', {
                      required: 'This field is required',
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.participantMinAge?.message}
                </FormErrorMessage>
              </FormControl>

              {/* MAX AGE */}
              <FormControl isRequired isInvalid={!!errors.participantMaxAge}>
                <FormLabel htmlFor='participantMaxAge'>
                  Participant maximum age
                </FormLabel>
                <NumberInput min={1} defaultValue={30} precision={0}>
                  <NumberInputField
                    id='participantMaxAge'
                    {...register('participantMaxAge', {
                      required: 'This field is required',
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.participantMaxAge?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            {/* TEAM LEADERS AGE LIMITS */}
            <Flex mt={INPUT_ELEMENT_TOP_MARGIN}>
              {/* MIN AGE */}
              <FormControl
                isRequired
                mr={INPUT_ELEMENT_RIGHT_MARGIN}
                isInvalid={!!errors.leaderMinAge}
              >
                <FormLabel htmlFor='leaderMinAge'>
                  Team leader/s minimum age
                </FormLabel>
                <NumberInput min={1} defaultValue={18} precision={0}>
                  <NumberInputField
                    id='leaderMinAge'
                    {...register('leaderMinAge', {
                      required: 'This field is reqired',
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.leaderMinAge?.message}
                </FormErrorMessage>
              </FormControl>

              {/* MAX AGE */}
              <FormControl>
                <FormLabel>Team leader/s maximum age</FormLabel>
                <NumberInput min={0} precision={0}>
                  <NumberInputField
                    placeholder="Set team leader's max age"
                    id='leaderMaxAge'
                    {...register('leaderMaxAge')}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  Leave empty or 0 if there is no max age limit
                </FormHelperText>
              </FormControl>
            </Flex>

            {/* NUMBER OF PARTNER COUNTIRES*/}
            <PartnerCountriesInput />
          </InputCard>

          <Divider my={INPUT_ELEMENT_TOP_MARGIN} />

          <InputCard title='Extra informations'>
            {/* CONTACT EMAIL */}
            <FormControl>
              <FormLabel htmlFor='contactEmail'>Contact email</FormLabel>
              <Input
                id='contactEmail'
                type='text'
                placeholder="Your organization's contact email"
                {...register('contactEmail')}
              />
              <FormErrorMessage>
                {errors.contactEmail?.message}
              </FormErrorMessage>
            </FormControl>

            {/* TRAVE TIPS */}
            <FormControl
              mt={INPUT_ELEMENT_TOP_MARGIN}
              isInvalid={!!errors.travelTips}
            >
              <FormLabel htmlFor='travelTips'>Travel tips</FormLabel>
              <Textarea
                maxLength={TRAVEL_TIPS_MAX_LEN + 2}
                rows={4}
                id='travelTips'
                placeholder='Give your participants tips on how to get to the project venue'
                {...register('travelTips', {
                  maxLength: {
                    value: TRAVEL_TIPS_MAX_LEN,
                    message: 'Keep your travel tips nice and short',
                  },
                })}
              />
              <FormErrorMessage>{errors.travelTips?.message}</FormErrorMessage>
            </FormControl>
          </InputCard>

          <Button
            onClick={handleSubmit(onSubmit)}
            isFullWidth
            my={8}
            colorScheme='red'
          >
            Submit
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default withProtected(CreateProjectPage);
