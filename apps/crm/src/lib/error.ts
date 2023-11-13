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
      case ErrorEnum.INVALID:
        return "Email or password is invalid.";
      case ErrorEnum.EVENT_CATEGORY_ALREADY:
        return "Event Category Name Already";
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
