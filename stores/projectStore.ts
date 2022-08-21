import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IPartnerCountries, PartnerCountryData } from '../types/shared';

const emptyPartnerCountryData: PartnerCountryData = {
  country: '',
  organization: '',
  reimbursment: '0',
};

const useStore = create<IPartnerCountries>()(
  immer((set) => ({
    partnerCountries: [
      {
        country: '',
        organization: '',
        reimbursment: '0',
      },
    ],

    addPartnerCountry: () =>
      set((state) => {
        state.partnerCountries.push(emptyPartnerCountryData);
      }),

    updatePartnerCountryName: (index, country) =>
      set(({ partnerCountries }) => {
        partnerCountries[index].country = country;
      }),

    updatePartnerCountryReimbursment: (index, reimbursment) =>
      set((state) => {
        state.partnerCountries[index].reimbursment = reimbursment;
      }),

    updatePartnerCountryOrganization: (index, organization) =>
      set((state) => {
        state.partnerCountries[index].organization = organization;
      }),

    removePartnerCountry: (index) =>
      set((state) => {
        state.partnerCountries.splice(index, 1);
      }),
  }))
);

export { useStore };
