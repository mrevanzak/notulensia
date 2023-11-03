export type ApiErrorResponse = {
  message: ErrorEnum;
};

export enum ErrorEnum {
  INVALID = "INVALID_USERNAME_OR_PASSWORD",
}
