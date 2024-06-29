export interface BaseResponse {
  code: number;
  isError: boolean;
  isRmqResponse: true;
}

export interface SuccessResponse<T> extends BaseResponse {
  code: 200;
  isError: false;
  payload: T;
}

export interface ErrorResponse extends BaseResponse {
  code: number;
  isError: true;
  error: {
    message: string;
  }
}
export type RmqResponse<T> = SuccessResponse<T> | ErrorResponse;

export const createSuccessResponse = <T>(payload: T): SuccessResponse<T> => {
  return {
    code: 200,
    isError: false,
    payload,
    isRmqResponse: true
  }
}

export const createErrorResponse = (code: number, message: string): ErrorResponse => {
  return {
    code,
    isError: true,
    error: {
      message
    },
    isRmqResponse: true
  }
}


