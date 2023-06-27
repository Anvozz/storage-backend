export class ServiceResponse<T> {
  public data?: T = undefined;
  public message: string = undefined;
  public success = true;
  public statusCode = 200;
}
