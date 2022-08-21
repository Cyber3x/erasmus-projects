import { DeleteIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import shallow from 'zustand/shallow';
import { INPUT_ELEMENT_RIGHT_MARGIN } from '../../constants/createProjectConstants';
import { useStore } from '../../stores/projectStore';
import { PartnerCountryData } from '../../types/shared';
import COUNTRIES from '../../constants/countries';

interface Rest {
  index: number;
}
type Props = PartnerCountryData & { [x: string]: any } & Rest;

const PartnerCountryInput = ({
  country,
  organization,
  reimbursment,
  index,
  ...rest
}: Props) => {
  const format = (val: string): string => `€` + val;
  const parse = (val: string): string => val.replace(/^\€/, '');

  const [
    partnerCountries,
    updatePartnerCountryName,
    updatePartnerCountryOrganization,
    updatePartnerCountryReimbursment,
    removePartnerCountry,
  ] = useStore(
    (state) => [
      state.partnerCountries,
      state.updatePartnerCountryName,
      state.updatePartnerCountryOrganization,
      state.updatePartnerCountryReimbursment,
      state.removePartnerCountry,
    ],
    shallow
  );

  return (
    <Flex {...rest}>
      <Select
        flex='3'
        value={country}
        placeholder='Select country'
        onChange={(e) => updatePartnerCountryName(index, e.target.value)}
      >
        {COUNTRIES.map((countryData) => (
          <option value={countryData.code} key={countryData.code}>
            {countryData.flag} {countryData.name}
          </option>
        ))}
      </Select>
      <Input
        type='text'
        placeholder='Organization name'
        flex='6'
        onChange={(e) =>
          updatePartnerCountryOrganization(index, e.target.value)
        }
        value={organization}
        mx={INPUT_ELEMENT_RIGHT_MARGIN}
      />
      <NumberInput
        value={format(reimbursment)}
        min={0}
        flex={2}
        onChange={(value) =>
          updatePartnerCountryReimbursment(index, parse(value))
        }
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Tooltip
        label='You need to have at least one partner country.'
        shouldWrapChildren
        isDisabled={partnerCountries.length > 1}
      >
        <IconButton
          aria-label='Remove partner country'
          icon={<DeleteIcon />}
          disabled={partnerCountries.length <= 1}
          onClick={() => removePartnerCountry(index)}
          ml={INPUT_ELEMENT_RIGHT_MARGIN}
        />
      </Tooltip>
    </Flex>
  );
};

export default PartnerCountryInput;
