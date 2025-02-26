export enum HttpStatus {
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 401,
  NOT_FOUND = 404
}

export enum HttpMethod {
  POST,
  GET,
  PUT,
  PATCH,
  DELETE
}

export default class Http {
  public instance: Http;

  constructor() {
    
  }

  async request(url: string, data: any, method: HttpMethod) {
    try {
      
    } catch (error) {
      
    }
  }
}