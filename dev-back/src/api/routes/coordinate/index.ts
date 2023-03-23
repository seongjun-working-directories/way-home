import express from 'express';
import type { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { HTTP_STATUS } from '../../status';
import dotenv from 'dotenv';
dotenv.config();

// import { createHiwaySvarCoordinateList } from '../../../db/coordinate';

const router = express.Router();

const axios_config: AxiosRequestConfig = {
  baseURL: 'https://dapi.kakao.com/',
};
const axios_client = axios.create(axios_config);

router.get(
  '/coordinate/searchCoordinate',
  async (request: Request, response: Response) => {
    const address: string = request.body.address;
    // [BODY-EXAMPLE]
    // { "address" : "경북 경주시 건천읍 경부고속도로 77" }

    const _data = await axios_client.get(
      `/v2/local/search/address.json?query=${address}`,
      {
        headers: {
          Authorization: process.env.KAKAO_AUTHORIZATION as string,
        },
      }
    );

    // [TEST] console.log(_data.data.documents[0]);
    // [RESULT] {
    //   address: {
    //     address_name: '경북 경주시 건천읍 방내리 14',
    //     b_code: '4713025628',
    //     h_code: '4713025600',
    //     main_address_no: '14',
    //     mountain_yn: 'N',
    //     region_1depth_name: '경북',
    //     region_2depth_name: '경주시',
    //     region_3depth_h_name: '건천읍',
    //     region_3depth_name: '건천읍 방내리',
    //     sub_address_no: '',
    //     x: '129.109224099653',
    //     y: '35.8299364675383'
    //   },
    //   address_name: '경북 경주시 건천읍 경부고속도로 77',
    //   address_type: 'ROAD_ADDR',
    //   road_address: {
    //     address_name: '경북 경주시 건천읍 경부고속도로 77',
    //     building_name: '',
    //     main_building_no: '77',
    //     region_1depth_name: '경북',
    //     region_2depth_name: '경주시',
    //     region_3depth_name: '건천읍 방내리',
    //     road_name: '경부고속도로',
    //     sub_building_no: '',
    //     underground_yn: 'N',
    //     x: '129.109224099653',
    //     y: '35.8299364675383',
    //     zone_no: '38180'
    //   },
    //   x: '129.109224099653',
    //   y: '35.8299364675383'
    // }

    if (_data.data.documents.length > 0) {
      return response.status(HTTP_STATUS['200'].CODE).json({
        status_messages:
          HTTP_STATUS['200'].comment +
          '. ' +
          `${_data.data.documents.length} 개의 좌표가 검색되었습니다.`,
        data: _data.data.documents,
      });
    } else {
      return response.status(HTTP_STATUS['204'].CODE).json({
        status_messages:
          HTTP_STATUS['204'].comment +
          '. ' +
          `${_data.data.documents.length} 개의 좌표가 검색되었습니다.`,
        data: null,
      });
    }
  }
);

router.get(
  '/coordinate/searchAddress',
  async (request: Request, response: Response) => {
    const { x, y } = request.body;
    // [BODY-EXAMPLE]
    // { "x": "129.109224099653", "y": "35.8299364675383" }

    const _data = await axios_client.get(
      `/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: process.env.KAKAO_AUTHORIZATION as string,
        },
      }
    );

    // [TEST] console.log(_data.data.documents);
    // [RESULT] [
    //   {
    //     region_type: 'B',
    //     code: '4713025628',
    //     address_name: '경상북도 경주시 건천읍 방내리',
    //     region_1depth_name: '경상북도',
    //     region_2depth_name: '경주시',
    //     region_3depth_name: '건천읍',
    //     region_4depth_name: '방내리',
    //     x: 129.10239477606,
    //     y: 35.81792221836197
    //   },
    //   {
    //     region_type: 'H',
    //     code: '4713025600',
    //     address_name: '경상북도 경주시 건천읍',
    //     region_1depth_name: '경상북도',
    //     region_2depth_name: '경주시',
    //     region_3depth_name: '건천읍',
    //     region_4depth_name: '',
    //     x: 129.1022367899233,
    //     y: 35.85000654902081
    //   }
    // ]

    if (_data.data.documents.length > 0) {
      return response.status(HTTP_STATUS['200'].CODE).json({
        status_messages:
          HTTP_STATUS['200'].comment +
          '. ' +
          `${_data.data.documents.length} 개의 주소가 검색되었습니다.`,
        data: _data.data.documents,
      });
    } else {
      return response.status(HTTP_STATUS['204'].CODE).json({
        status_messages:
          HTTP_STATUS['204'].comment +
          '. ' +
          `${_data.data.documents.length} 개의 주소가 검색되었습니다.`,
        data: null,
      });
    }
  }
);

export { router };
