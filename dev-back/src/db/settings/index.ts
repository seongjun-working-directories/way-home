import axios, { AxiosRequestConfig } from 'axios';
import { client } from '../default';
import type {
  HiwaySvarInfo,
  RestBrand,
  RestBestFood,
  RestConv,
  RestTheme,
  RestVenture,
  Coordinate,
} from '../../types';

async function createHiwaySvarInfoList(data: HiwaySvarInfo[]) {
  try {
    await client.connect();

    const inserted_count = await client
      .db('wayhome')
      .collection('hiwaySvarInfoList')
      .insertMany(data);

    return inserted_count.insertedCount;
  } catch (err) {
    return -1;
  }
}

async function createRestBrandList(data: RestBrand[]) {
  try {
    await client.connect();

    const inserted_count = await client
      .db('wayhome')
      .collection('restBrandList')
      .insertMany(data);

    return inserted_count.insertedCount;
  } catch (err) {
    return -1;
  }
}

async function createRestBestFoodList(data: RestBestFood[]) {
  try {
    await client.connect();

    const inserted_count = await client
      .db('wayhome')
      .collection('restBestFoodList')
      .insertMany(data);

    return inserted_count.insertedCount;
  } catch (err) {
    return -1;
  }
}

async function createRestConvList(data: RestConv[]) {
  try {
    await client.connect();

    const inserted_count = await client
      .db('wayhome')
      .collection('restConvList')
      .insertMany(data);

    return inserted_count.insertedCount;
  } catch (err) {
    return -1;
  }
}

async function createRestThemeList(data: RestTheme[]) {
  try {
    await client.connect();

    const inserted_count = await client
      .db('wayhome')
      .collection('restThemeList')
      .insertMany(data);

    return inserted_count.insertedCount;
  } catch (err) {
    return -1;
  }
}

async function createRestVentureList(data: RestVenture[]) {
  try {
    await client.connect();

    const inserted_count = await client
      .db('wayhome')
      .collection('restVentureList')
      .insertMany(data);

    return inserted_count.insertedCount;
  } catch (err) {
    return -1;
  }
}

async function createHiwaySvarCoordinateList() {
  try {
    await client.connect();

    const axios_config: AxiosRequestConfig = {
      baseURL: 'https://dapi.kakao.com/',
    };
    const axios_client = axios.create(axios_config);

    const _data = await client
      .db('wayhome')
      .collection('hiwaySvarInfoList')
      .find({})
      .toArray();

    // [TEST] console.log(_data[0]);

    let coordinate_list: Coordinate[] = [];

    for (let i = 0; i < _data.length; i++) {
      let address: string = _data[i].svarAddr;

      const _coordinate = await axios_client.get(
        `/v2/local/search/address.json?query=${address}`,
        {
          headers: {
            Authorization: process.env.KAKAO_AUTHORIZATION as string,
          },
        }
      );

      let address_name, address_type, x, y;

      if (_coordinate.data.documents[0]) {
        address_name = _coordinate.data.documents[0].address_name;
        address_type = _coordinate.data.documents[0].address_type;
        x = _coordinate.data.documents[0].x;
        y = _coordinate.data.documents[0].y;
      }

      coordinate_list.push({
        address_name, address_type, x, y
      } as Coordinate);

      console.log(`좌표 API를 받아오고 있습니다. ${(((i+1)/_data.length)*100).toFixed(1)}%`);
    }

    const inserted_count = await client
      .db('wayhome')
      .collection('hiwaySvarCoordinateList')
      .insertMany(coordinate_list);

    return inserted_count.insertedCount;
  } catch (err) {
    return -1;
  }
}

export {
  createHiwaySvarInfoList,
  createRestBrandList,
  createRestBestFoodList,
  createRestConvList,
  createRestThemeList,
  createRestVentureList,
  createHiwaySvarCoordinateList,
};
