import { AxiosError } from "axios";

export class ApiError extends AxiosError {
  constructor(error: ApiErrorResponse) {
    super(error.message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  stringify(): string {
    switch (this.message) {
      case ErrorEnum.INVALID:
        return "Email or password is invalid.";
      default:
        return "Something went wrong.";
    }
  }
}

type ApiErrorResponse = {
  message: ErrorEnum;
};

export enum ErrorEnum {
  INVALID = "INVALID_USERNAME_OR_PASSWORD",
}
