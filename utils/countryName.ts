interface Countries {
  [key: string]: string;
}

export const COUNTRIES: Countries = {
  HRV: 'Croatia',
  DEU: 'Germany',
  EMPTY: 'Select country',
};

export const getCountryNameFromCode = (countryCode: string): string => {
  if (COUNTRIES.hasOwnProperty(countryCode)) {
    return COUNTRIES[countryCode];
  } else {
    console.log('error gettin country name');
    return 'Select country';
  }
};
