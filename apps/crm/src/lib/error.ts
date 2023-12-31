import type { ApiErrorResponse } from "@/types/api";
import { ErrorEnum } from "@/types/api";
import { AxiosError } from "axios";

export class ApiError extends AxiosError {
  constructor(error: ApiErrorResponse) {
    super(error.message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  stringify(): string {
    switch (this.message) {
      case ErrorEnum.Invalid:
        return "Email or password is invalid.";
      case ErrorEnum.EventCategoryAlready:
        return "Event Category Name Already";
      case ErrorEnum.UserIdUsed:
        return "User ID is already used on another company.";
      default:
        return this.message;
    }
  }
}

export const errorMessages = (error: unknown): string | undefined => {
  if (error instanceof ApiError) {
    return error.stringify();
  }
};
