import axios from 'axios';

const HOST = 'https://dummyjson.com';

export const APICall = async ({url = ''}) => {
  try {
    let API = HOST + url;
    let apiRes = await axios.get(API);

    if (apiRes?.data) {
      return apiRes.data;
    } else {
    }
  } catch (error) {
    console.log('ERR', error);
  }
};
