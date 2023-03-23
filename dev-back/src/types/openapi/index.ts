export type HiwaySvarInfo = {
  routeCd: string;
  svarAddr: string;
  routeNm: string;
  svarCd: string;
  svarNm: string;
  hdqrCd: string;
  hdqrNm: string;
  mtnofCd: string;
  mtnofNm: string;
  svarGsstClssCd: string;
  svarGsstClssNm: string;
  gudClssCd: string;
  gudClssNm: string;
  pstnoCd: string;
  cocrPrkgTrcn: string;
  fscarPrkgTrcn: string;
  dspnPrkgTrcn: string;
  bsopAdtnlFcltCd: string;
  rprsTelNo: string;
};

export type RestBrand = {
  pageNo?: string;
  numOfRows?: string;
  stdRestCd: string;
  stime: string;
  routeCd: string;
  svarAddr: string;
  routeNm: string;
  stdRestNm: string;
  brdCode: string;
  brdName: string;
  brdDesc: string;
  etime: string;
  redId: string;
  redDtime: string;
  lsttmAltrUser: string;
  lsttmAltrDttm: string;
};

export type RestBestFood = {
  pageNo?: string;
  numOfRows?: string;
  stdRestCd: string;
  routeCd: string;
  svarAddr: string;
  restCd: string;
  routeNm: string;
  stdRestNm: string;
  lsttmAltrUser: string;
  lsttmAltrDttm: string;
  seq: string;
  foodNm: string;
  foodCost: string;
  etc: string;
  recommendyn: string;
  seasonMenu: string;
  bestfoodyn: string;
  premiumyn: string;
  app: string;
  foodMaterial?: string;
  lastId: string;
  lastDtime: string;
};

export type RestConv = {
  pageNo?: string;
  numOfRows?: string;
  stdRestCd: string;
  stime: string;
  routeCd: string;
  svarAddr: string;
  routeNm: string;
  stdRestNm: string;
  etime: string;
  redId: string;
  redDtime: string;
  lsttmAltrUser: string;
  lsttmAltrDttm: string;
  psCode: string;
  psName: string;
  psDesc: string;
};

export type RestTheme = {
  detail: string;
  pageNo?: string;
  numOfRows?: string;
  stdRestCd: string;
  routeCd: string;
  svarAddr: string;
  routeNm: string;
  stdRestNm: string;
  lsttmAltrUser: string;
  lsttmAltrDttm: string;
  itemNm: string;
  regId: string;
  regDtime: string;
};

export type RestVenture = {
  pageNo: string;
  numOfRows: string;
  stdRestCd: string;
  stime: string;
  routeCd: string;
  svarAddr: string;
  routeNm: string;
  stdRestNm: string;
  etime: string;
  lsttmAltrUser: string;
  lsttmAltrDttm: string;
  seq: string;
  regId: string;
  regDtime: string;
  bzNm: string;
};

export type Coordinate = {
  address_name: string,
  address_type: string,
  x: string;
  y: string;
};