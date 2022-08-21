import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react';
import shallow from 'zustand/shallow';
import { INPUT_ELEMENT_TOP_MARGIN } from '../../constants/createProjectConstants';
import { useStore } from '../../stores/projectStore';
import CountryDetailsInput from './CountryDetailsInput';

interface Props {
  className?: string;
}

const PartnerCountriesInput = ({ className }: Props) => {
  const [addPartnerCountry, partnerCountries] = useStore(
    (state) => [state.addPartnerCountry, state.partnerCountries],
    shallow
  );

  return (
    <FormControl className={className} isRequired>
      <FormLabel>Partner countries</FormLabel>

      {partnerCountries.map((countryData, index) => (
        <CountryDetailsInput
          country={countryData.country}
          organization={countryData.organization}
          reimbursment={countryData.reimbursment}
          index={index}
          key={index}
          mt={index !== 0 ? INPUT_ELEMENT_TOP_MARGIN / 2 : null}
        />
      ))}

      <Button
        isFullWidth
        variant='outline'
        onClick={addPartnerCountry}
        mt={INPUT_ELEMENT_TOP_MARGIN}
      >
        Add a new partner country
      </Button>
    </FormControl>
  );
};

export default PartnerCountriesInput;
