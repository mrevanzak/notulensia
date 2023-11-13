export type ApiErrorResponse = {
  message: ErrorEnum;
};

export enum ErrorEnum {
  INVALID = "INVALID_USERNAME_OR_PASSWORD",
  EVENT_CATEGORY_ALREADY = "EVENT_CATEGORY_NAME_ALREADY_USED",
}
