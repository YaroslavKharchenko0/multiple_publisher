import { RmqResponse, SuccessResponse } from "@app/contracts";
import { Injectable } from "@nestjs/common";
import { RmqErrorService } from "./rmq-error.service";

@Injectable()
export class RmqResponseService {
  constructor(private readonly rmqErrorService: RmqErrorService) { }

  handleResponse<T>(response: RmqResponse<T>): T {
    if (response.isError) {
      throw this.rmqErrorService.customError(response.error.message, response.code);
    }

    const successResponse = response as SuccessResponse<T>;

    return successResponse.payload;
  }
}
