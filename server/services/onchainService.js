import axios from 'axios';

const BASE_URL = 'https://api.polygonscan.com/api';

export const fetchWalletTransactions = async (address) => {
  const API_KEY = process.env.POLYGONSCAN_API_KEY;

  const res = await axios.get(BASE_URL, {
    params: {
      module: 'account', action: 'txlist', address, apikey: API_KEY,
      startblock: 0, endblock: 99999999, sort: 'asc'
    },
    family: 4
  });
  return res.data.result;
};

export const fetchTokenTransfers = async (address) => {

  const API_KEY = process.env.POLYGONSCAN_API_KEY;
  const res = await axios.get(BASE_URL, {
    params: {
      module: 'account', action: 'tokentx', address,
      startblock: 0, endblock: 99999999, sort: 'asc', apikey: API_KEY
    },
    family: 4
  });
  return res.data.result;
};