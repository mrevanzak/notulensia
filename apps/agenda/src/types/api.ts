export type ApiErrorResponse = {
  message: ErrorEnum;
};

export enum ErrorEnum {
  INVALID = "INVALID_USERNAME_OR_PASSWORD",
}

export type QueryParams = {
  limit?: 5 | 10 | 15 | 20 | 25 | 30 | 50 | 100;
  orderBy: string;
  pageIndex: number;
  search: string;
};
