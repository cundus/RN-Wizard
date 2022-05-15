import axios from 'axios';

export const getData = async url => {
  try {
    const response = await axios.get(
      'https://dev.farizdotid.com/api/daerahindonesia/' + url,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
