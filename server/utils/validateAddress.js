import { isAddress } from 'web3-utils';

export const validateAddress = (address) => isAddress(address);