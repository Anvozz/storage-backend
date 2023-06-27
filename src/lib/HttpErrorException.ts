import { HttpException, HttpStatus } from '@nestjs/common';

export const HttpErrorException = (error: any) => {
  throw new HttpException(
    {
      message: error.message || error,
      success: false,
      statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    },
    error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
