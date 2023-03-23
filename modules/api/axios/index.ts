import axios from 'axios';
import type {
  HTTPMethod,
  SigninData,
  SignupData,
  FindIdData,
  BoardData,
  tokenData,
} from '../types';

export default {
  methods: {
    async $callAPI(
      method: HTTPMethod,
      url: any,

      data?:
        | null
        | SigninData
        | SignupData
        | FindIdData
        | string
        | BoardData
        | tokenData
    ) {
      return await axios({
        method,
        url,
        data,
      }).catch((error) => {
        if (error.response) {
          return error.response;
        }
      });
    },
  },
};
