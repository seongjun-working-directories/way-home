import express from 'express';
import type { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { HTTP_STATUS } from '../../status';
import dotenv from 'dotenv';
dotenv.config();

import {
  createHiwaySvarInfoList,
  createRestBrandList,
  createRestBestFoodList,
  createRestConvList,
  createRestThemeList,
  createRestVentureList,
  createHiwaySvarCoordinateList
} from '../../../db/settings';

const router = express.Router();

const axios_openapi_config: AxiosRequestConfig = {
  baseURL: 'http://data.ex.co.kr/openapi/',
};
const axios_openapi_client = axios.create(axios_openapi_config);

const axios_kakao_config: AxiosRequestConfig = {
  baseURL: 'https://dapi.kakao.com/'
};
const axios_kakao_client = axios.create(axios_kakao_config);

router.get(
  '/settings/createHiwaySvarInfoList',
  async (request: Request, response: Response) => {
    const _data = await axios_openapi_client.get(
      '/restinfo/hiwaySvarInfoList?key=2409065924&type=json'
    );

    // [TEST] console.log(Object.keys(_data.data));
    // [RESULT] [ 'list', 'count', 'message', 'code' ]

    const data: [] = _data.data.list;

    // [TEST] console.log(_data.data.list[0]);
    // [RESULT] {
    //   svarAddr: '경북 경주시 건천읍 경부고속도로 77',
    //   routeCd: '0010',
    //   routeNm: '경부선',
    //   svarCd: '000485',
    //   svarNm: '건천(부산)주유소',
    //   hdqrCd: '600000',
    //   hdqrNm: '대구경북본부',
    //   mtnofCd: '610200',
    //   mtnofNm: '대구',
    //   svarGsstClssCd: '1',
    //   svarGsstClssNm: '주유소',
    //   gudClssCd: '1',
    //   gudClssNm: '하행',
    //   pstnoCd: '780900',
    //   cocrPrkgTrcn: '0',
    //   fscarPrkgTrcn: '0',
    //   dspnPrkgTrcn: '0',
    //   bsopAdtnlFcltCd: 'B00200',
    //   rprsTelNo: '0547514600'
    // }

    const inserted_count = await createHiwaySvarInfoList(data);

    if (inserted_count == -1) {
      // Collection 생성 중 에러 발생
      return response.status(HTTP_STATUS['500'].CODE).json({
        error_messages:
          HTTP_STATUS['500'].comment + '. ' + HTTP_STATUS['500'].help,
      });
    }

    return response.status(HTTP_STATUS['201'].CODE).json({
      status_messages:
        HTTP_STATUS['201'].comment +
        '. ' +
        `${inserted_count} 개의 데이터가 hiwaySvarInfoList 컬렉션에 추가되었습니다.`,
    });
  }
);

router.get(
  '/settings/createRestBrandList',
  async (request: Request, response: Response) => {
    const _data = await axios_openapi_client.get(
      '/restinfo/restBrandList?key=2409065924&type=json&numOfRows=50'
    );

    // [TEST] console.log(Object.keys(_data.data));
    // [RESULT] ['list', 'count', 'pageNo', 'numOfRows', 'pageSize', 'message', 'code']

    const _page_size = _data.data.pageSize;
    // [TEST] console.log(_page_size);

    let data: [] = [];

    for (let i = 0; i < _page_size; i++) {
      const _page_data = await axios_openapi_client.get(
        `/restinfo/restBrandList?key=2409065924&type=json&numOfRows=50&pageNo=${
          i + 1
        }`
      );
      data = data.concat(_page_data.data.list) as [];
    }
    // [TEST] console.log(data.length);

    // [TEST] console.log(_data.data.list[0]);
    // [RESULT] {
    //   pageNo: null,
    //   numOfRows: null,
    //   stdRestCd: '000001',
    //   stime: '07:00',
    //   routeCd: '0010',
    //   svarAddr: '서울 서초구 원지동10-16',
    //   routeNm: '경부선',
    //   stdRestNm: '서울만남(부산)휴게소',
    //   brdCode: '012',
    //   brdName: '할리스커피',
    //   brdDesc: '깊은 향과 다양한 맛의 브랜드 커피 제공. 멤버십카드 적립 혜택. 기타 느린우체통 서비스를 제공하는 편안하고 쾌적한 쉼터입니다.',
    //   etime: '22:00',
    //   redId: 'S000001001',
    //   redDtime: '16/03/10',
    //   lsttmAltrUser: 'SYSTEM',
    //   lsttmAltrDttm: '2023-01-13'
    // }

    const inserted_count = await createRestBrandList(data);

    if (inserted_count == -1) {
      // Collection 생성 중 에러 발생
      return response.status(HTTP_STATUS['500'].CODE).json({
        error_messages:
          HTTP_STATUS['500'].comment + '. ' + HTTP_STATUS['500'].help,
      });
    }

    return response.status(HTTP_STATUS['201'].CODE).json({
      status_messages:
        HTTP_STATUS['201'].comment +
        '. ' +
        `${inserted_count} 개의 데이터가 restBrandList 컬렉션에 추가되었습니다.`,
    });
  }
);

router.get(
  '/settings/createRestBestFoodList',
  async (request: Request, response: Response) => {
    const _data = await axios_openapi_client.get(
      '/restinfo/restBestfoodList?key=2409065924&type=json&numOfRows=50'
    );

    // [TEST] console.log(Object.keys(_data.data));
    // [RESULT] ['count', 'list', 'pageNo', 'numOfRows', 'pageSize', 'message', 'code']

    const _page_size = _data.data.pageSize;
    // [TEST] console.log(_page_size);

    let data: [] = [];

    for (let i = 0; i < _page_size; i++) {
      const _page_data = await axios_openapi_client.get(
        `/restinfo/restBestfoodList?key=2409065924&type=json&numOfRows=50&pageNo=${
          i + 1
        }`
      );
      data = data.concat(_page_data.data.list) as [];
    }
    // [TEST] console.log(data.length);

    // [TEST] console.log(_data.data.list[0]);
    // [RESULT] {
    //   pageNo: null,
    //   numOfRows: null,
    //   stdRestCd: '000001',
    //   routeCd: '0010',
    //   svarAddr: '서울 서초구 원지동10-16',
    //   restCd: 'S000001',
    //   routeNm: '경부선',
    //   stdRestNm: '서울만남(부산)휴게소',
    //   lsttmAltrUser: 'SYSTEM',
    //   lsttmAltrDttm: '2023-01-13',
    //   seq: '269',
    //   foodNm: '눈꽃등심돈가스',
    //   foodCost: '9500',
    //   etc: '국내산 규격 돈육과 코바코 본사에서 자체 개발한 바삭하고 고소한 빵가루를 사용하여 부드러운 육질과 깊은 풍미를 자랑하는 돈까스 대표메뉴입니다.',
    //   recommendyn: 'N',
    //   seasonMenu: '4',
    //   bestfoodyn: 'N',
    //   premiumyn: 'Y',
    //   app: 'Y',
    //   foodMaterial: null,
    //   lastId: 'S000001001',
    //   lastDtime: '2022-07-28'
    // }

    const inserted_count = await createRestBestFoodList(data);

    if (inserted_count == -1) {
      // Collection 생성 중 에러 발생
      return response.status(HTTP_STATUS['500'].CODE).json({
        error_messages:
          HTTP_STATUS['500'].comment + '. ' + HTTP_STATUS['500'].help,
      });
    }

    return response.status(HTTP_STATUS['201'].CODE).json({
      status_messages:
        HTTP_STATUS['201'].comment +
        '. ' +
        `${inserted_count} 개의 데이터가 restBestFoodList 컬렉션에 추가되었습니다.`,
    });
  }
);

router.get(
  '/settings/createRestConvList',
  async (request: Request, response: Response) => {
    const _data = await axios_openapi_client.get(
      '/restinfo/restConvList?key=2409065924&type=json&numOfRows=50'
    );

    // [TEST] console.log(Object.keys(_data.data));
    // [RESULT] ['count', 'list', 'pageNo', 'numOfRows', 'pageSize', 'message', 'code']

    const _page_size = _data.data.pageSize;
    // [TEST] console.log(_page_size);

    let data: [] = [];

    for (let i = 0; i < _page_size; i++) {
      const _page_data = await axios_openapi_client.get(
        `/restinfo/restConvList?key=2409065924&type=json&numOfRows=50&pageNo=${
          i + 1
        }`
      );
      data = data.concat(_page_data.data.list) as [];
    }
    // [TEST] console.log(data.length);

    // [TEST] console.log(_data.data.list[0]);
    // [RESULT] {
    //   pageNo: null,
    //   numOfRows: null,
    //   stdRestCd: '000001',
    //   stime: '00:00',
    //   routeCd: '0010',
    //   svarAddr: '서울 서초구 원지동10-16',
    //   routeNm: '경부선',
    //   stdRestNm: '서울만남(부산)휴게소',
    //   etime: '24:00',
    //   redId: 'S000001001',
    //   redDtime: '16/03/10',
    //   lsttmAltrUser: 'SYSTEM',
    //   lsttmAltrDttm: '2023-01-13',
    //   psCode: '04',
    //   psName: '수유실',
    //   psDesc: '내부에 화장대가 배치되어 있고 개별 공간에 수유하실 수 있는 쇼파, 기저귀 교환대, 정수기 이용 가능 '
    // }

    const inserted_count = await createRestConvList(data);

    if (inserted_count == -1) {
      // Collection 생성 중 에러 발생
      return response.status(HTTP_STATUS['500'].CODE).json({
        error_messages:
          HTTP_STATUS['500'].comment + '. ' + HTTP_STATUS['500'].help,
      });
    }

    return response.status(HTTP_STATUS['201'].CODE).json({
      status_messages:
        HTTP_STATUS['201'].comment +
        '. ' +
        `${inserted_count} 개의 데이터가 restConvList 컬렉션에 추가되었습니다.`,
    });
  }
);

router.get(
  '/settings/createRestThemeList',
  async (request: Request, response: Response) => {
    const _data = await axios_openapi_client.get(
      '/restinfo/restThemeList?key=2409065924&type=json&numOfRows=50'
    );

    // [TEST] console.log(Object.keys(_data.data));
    // [RESULT] ['count', 'list', 'pageNo', 'numOfRows', 'pageSize', 'message', 'code']

    const _page_size = _data.data.pageSize;
    // [TEST] console.log(_page_size);

    let data: [] = [];

    for (let i = 0; i < _page_size; i++) {
      const _page_data = await axios_openapi_client.get(
        `/restinfo/restThemeList?key=2409065924&type=json&numOfRows=50&pageNo=${
          i + 1
        }`
      );
      data = data.concat(_page_data.data.list) as [];
    }
    // [TEST] console.log(data.length);

    // [TEST] console.log(_data.data.list[0]);
    // [RESULT] {
    //   detail: '4계절마다 꽃 전시를 통한 방문 고객들에게 정서적인 안정감을 부여하고 계절의 변화를 실감할수 있게 하고자 4계절 꽃이 있는 휴게소 테마를 운영하고 있습니다. \r\n' +
    //     '겨울에는 LED 트리전시를 운영하는데 방문고객님들에게 포토존으로서 인기가 매우 높습니다.\r\n' +
    //     '저희 휴게소 방문시 4계절 꽃이 있는 휴게소 잊지 마시고 감상해주시면 감사하겠습니다.',
    //   pageNo: null,
    //   numOfRows: null,
    //   stdRestCd: '000001',
    //   routeCd: '0010',
    //   svarAddr: '서울 서초구 원지동10-16',
    //   routeNm: '경부선',
    //   stdRestNm: '서울만남(부산)휴게소',
    //   lsttmAltrUser: 'SYSTEM',
    //   lsttmAltrDttm: '2023-01-13',
    //   itemNm: '4계절 꽃이 있는 휴게소',
    //   regId: 'S000001001',
    //   regDtime: '12/09/2020 06:26:57.'
    // }

    const inserted_count = await createRestThemeList(data);

    if (inserted_count == -1) {
      // Collection 생성 중 에러 발생
      return response.status(HTTP_STATUS['500'].CODE).json({
        error_messages:
          HTTP_STATUS['500'].comment + '. ' + HTTP_STATUS['500'].help,
      });
    }

    return response.status(HTTP_STATUS['201'].CODE).json({
      status_messages:
        HTTP_STATUS['201'].comment +
        '. ' +
        `${inserted_count} 개의 데이터가 restThemeList 컬렉션에 추가되었습니다.`,
    });
  }
);

router.get(
  '/settings/createRestVentureList',
  async (request: Request, response: Response) => {
    const _data = await axios_openapi_client.get(
      '/restinfo/restVentureList?key=2409065924&type=json&numOfRows=50'
    );

    // [TEST] console.log(Object.keys(_data.data));
    // [RESULT] ['count', 'list', 'pageNo', 'numOfRows', 'pageSize', 'message', 'code']

    const _page_size = _data.data.pageSize;
    // [TEST] console.log(_page_size);

    let data: [] = [];

    for (let i = 0; i < _page_size; i++) {
      const _page_data = await axios_openapi_client.get(
        `/restinfo/restVentureList?key=2409065924&type=json&numOfRows=50&pageNo=${
          i + 1
        }`
      );
      data = data.concat(_page_data.data.list) as [];
    }
    // [TEST] console.log(data.length);

    // [TEST] console.log(_data.data.list[0]);
    // [RESULT] {
    //   pageNo: null,
    //   numOfRows: null,
    //   stdRestCd: '000042',
    //   stime: '08:00',
    //   routeCd: '0010',
    //   svarAddr: '경북 김천시 봉산면광천리 737-1',
    //   routeNm: '경부선',
    //   stdRestNm: '추풍령(서울)휴게소',
    //   etime: '19:00',
    //   lsttmAltrUser: 'SYSTEM',
    //   lsttmAltrDttm: '2023-01-13',
    //   seq: '1002',
    //   regId: 'kamu127',
    //   regDtime: '2021-08-23 10:23:31.0',
    //   bzNm: '선미당'
    // }

    const inserted_count = await createRestVentureList(data);

    if (inserted_count == -1) {
      // Collection 생성 중 에러 발생
      return response.status(HTTP_STATUS['500'].CODE).json({
        error_messages:
          HTTP_STATUS['500'].comment + '. ' + HTTP_STATUS['500'].help,
      });
    }

    return response.status(HTTP_STATUS['201'].CODE).json({
      status_messages:
        HTTP_STATUS['201'].comment +
        '. ' +
        `${inserted_count} 개의 데이터가 restVentureList 컬렉션에 추가되었습니다.`,
    });
  }
);

router.get(
  '/settings/createHiwaySvarCoordinateList',
  async (request: Request, response: Response) => {
    const inserted_count = await createHiwaySvarCoordinateList();

    if (inserted_count == -1) {
      // Collection 생성 중 에러 발생
      return response.status(HTTP_STATUS['500'].CODE).json({
        error_messages:
          HTTP_STATUS['500'].comment + '. ' + HTTP_STATUS['500'].help,
      });
    }

    return response.status(HTTP_STATUS['201'].CODE).json({
      status_messages:
        HTTP_STATUS['201'].comment +
        '. ' +
        `${inserted_count} 개의 데이터가 hiwaySvarCoordinateList 컬렉션에 추가되었습니다.`,
    });
  }
);

export { router };
