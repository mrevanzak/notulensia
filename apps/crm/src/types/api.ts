export type ApiErrorResponse = {
  message: ErrorEnum;
};

export enum ErrorEnum {
  Invalid = "INVALID_USERNAME_OR_PASSWORD",
  EventCategoryAlready = "EVENT_CATEGORY_NAME_ALREADY_USED",
  UserIdUsed = "USER_ID_WAS_USED_ANOTHER_COMPANY",
}
