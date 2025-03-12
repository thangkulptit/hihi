import { isDevelopment } from "../utils/helper";
import { useAuthStore } from "@/modules/auth/store";

/**
 * Http Interceptor
 */
export interface HttpInterceptor<V, T> {
  /**
   * Add a new interceptor to the stack
   * @param onFulfilled
   * @param onRejected
   */
  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: T) => T
  ): number;

  /**
   * Remove an interceptor from the stack
   * @param id
   */
  eject(id: number): boolean;
}

export interface HttpInterceptorHandler<V, T> {
  fulfilled?(value: V): V | Promise<V>;
  rejected?(error: T): T | Promise<T>;
}

export interface HttpConfig {
  endpoint: string;
  debug?: boolean;
}

export interface HttpContext {
  http: Http;
  config: HttpConfig;
  interceptors: {
    request: Array<HttpInterceptorHandler<HttpRequestOptions, HttpError>>;
    response: Array<HttpInterceptorHandler<HttpResponse, HttpError>>;
  };
}

export interface HttpRequestOptions {
  method?: string;
  body?: any;
  url?: string;
  headers?: any;
  responseType?: string;
  credentials?: RequestCredentials;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: any;
  ok: boolean;
}

export interface HttpError<T = any> {
  name: string;
  message: string;
  response?: HttpResponse<T>;
}

export interface Http {
  config: HttpConfig;
  interceptors: {
    request: HttpInterceptor<HttpRequestOptions, HttpError>;
    response: HttpInterceptor<HttpResponse, HttpError>;
  };
  request<T, R = HttpResponse<T>>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<R>;
  get<T, R = HttpResponse<T>>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<R>;
  post<T, R = HttpResponse<T>>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<R>;
  put<T, R = HttpResponse<T>>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<R>;
  delete<T, R = HttpResponse<T>>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<R>;
  patch<T, R = HttpResponse<T>>(
    url: string,
    options?: HttpRequestOptions
  ): Promise<R>;
  readonly _context: HttpContext;
}

export enum HttpMethods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Patch = "PATCH",
}

/**
 * Create interceptor
 * @param handlers
 */
const createInterceptor = function <V, T>(
  handlers: Array<HttpInterceptorHandler<V, T>>
): HttpInterceptor<V, T> {
  return {
    use(
      onFulfilled?: (value: V) => V | Promise<V>,
      onRejected?: (error: T) => T
    ): number {
      handlers.push({
        fulfilled: onFulfilled,
        rejected: onRejected,
      });
      return handlers.length - 1;
    },
    eject(id: number): boolean {
      if (typeof handlers[id] !== "undefined") {
        handlers.splice(id, 1);
        return true;
      }

      return false;
    },
  };
};

/**
 * Create default http content
 */
export function createHttpContext(): HttpContext {
  return {
    http: null as never,
    config: {
      endpoint: "",
    },
    interceptors: {
      request: [],
      response: [],
    },
  };
}

/**
 * Check body stream
 * @param body
 */
export function isStream(body: any): boolean {
  return (
    (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) ||
    (typeof FormData !== "undefined" && body instanceof FormData)
  );
}

/**
 * Initial request options
 * @param options
 */
export function initialRequest(
  options: HttpRequestOptions = {}
): HttpRequestOptions {
  const init: HttpRequestOptions = {
    method: options.method,
    headers: options.headers || {},
    url: options.url,
  };

  if (
    (!options.body || !isStream(options.body)) &&
    !init.headers["content-type"]
  ) {
    init.headers["content-type"] = "application/json";
  }

  if (options.body) {
    init.body = isStream(options.body)
      ? options.body
      : JSON.stringify(options.body);
  }

  return init;
}

/**
 * Parse request response
 * @param response
 * @param responseType
 */
async function parseResponse<T>(
  response: Response,
  responseType: string
): Promise<T> {
  let data;

  if (response.ok) {
    switch (responseType.toLowerCase()) {
      case "json":
        data = await response.json();
        break;
      case "text":
        data = await response.text();
        break;
      case "blob":
        data = await response.blob();
        break;
    }
  } else {
    try {
      data = await response.json();
    } catch (error) {
      console.log(error);
      data = undefined;
    }
  }

  return data;
}

/**
 * Handle error
 * @param err
 */
function handleError(err: HttpError): HttpError {
  return {
    name: err.name,
    message: err.message,
    response: err.response,
  };
}

/**
 * Utility for simple HTTP calls
 */
export function createHttp(config?: HttpConfig): Http {
  const context = createHttpContext();
  if (config) {
    context.config = Object.assign(context.config, config);
  }

  const http: Http = (context.http = {
    interceptors: {
      request: createInterceptor<HttpRequestOptions, HttpError>(
        context.interceptors.request
      ),
      response: createInterceptor<HttpResponse, HttpError>(
        context.interceptors.response
      ),
    },
    /**
     * Make an http GET request
     * @param {string} url - url to call
     * @param {HttpRequestOptions} options
     * @returns {Promise}
     */
    get<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
      return http.request(url, { ...options, method: HttpMethods.Get });
    },

    /**
     * Make an http POST request
     * @param {string} url - url to call
     * @param {HttpRequestOptions} options
     * @returns {Promise}
     */
    post<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
      return http.request(url, { ...options, method: HttpMethods.Post });
    },

    /**
     * Make an http PUT request
     * @param {string} url - url to call
     * @param {HttpRequestOptions} options
     * @returns {Promise}
     */
    put<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
      return http.request(url, { ...options, method: HttpMethods.Put });
    },

    /**
     * Make an http DELETE request
     * @param {string} url - url to call
     * @param {HttpRequestOptions} options
     * @returns {Promise}
     */
    delete<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
      return http.request(url, { ...options, method: HttpMethods.Delete });
    },

    /**
     * Make an http PATCH request
     * @param {string} url - url to call
     * @param {HttpRequestOptions} options
     * @returns {Promise}
     */
    patch<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
      return http.request(url, { ...options, method: HttpMethods.Patch });
    },

    /**
     * Make an http request
     * @param {string} url - url to call
     * @param {HttpRequestOptions} options
     * @returns {Promise}
     */
    async request<T, R = HttpResponse<T>>(
      url: string,
      options: HttpRequestOptions = {}
    ): Promise<R> {
      options.url = url;
      const requestOptions = initialRequest(options);

      // Handler interceptors request
      let promise = Promise.resolve(requestOptions);
      context.interceptors.request.forEach((interceptor) => {
        promise = promise.then(interceptor.fulfilled);
      });
      await promise;

      // Perform request
      const rawUrl = requestOptions.url || "/";
      const requestUrl = rawUrl.startsWith("http")
        ? rawUrl
        : `${http.config.endpoint}${rawUrl}`;
      if (config?.debug) {
        console.log("[HTTP] Url", requestUrl);
        console.log("[HTTP] Headers", options.headers);
      }

      return fetch(requestUrl, {
        method: (requestOptions.method || HttpMethods.Get).toUpperCase(),
        body: requestOptions.body,
        headers: requestOptions.headers,
        credentials: requestOptions.credentials || "same-origin",
      })
        .then(async (response) => {
          const data = await parseResponse<T>(
            response,
            options.responseType || "json"
          );
          const result: HttpResponse<T> = {
            data: <T>data,
            status: response.status,
            statusText: response.statusText,
            headers: requestOptions.headers,
            ok: response.ok,
          };

          // Handle response success
          if (response.ok) {
            let promise = Promise.resolve(result);
            context.interceptors.response.forEach(function (interceptor) {
              promise = promise.then(interceptor.fulfilled);
            });
            await promise;

            return Promise.resolve(<R>(<unknown>result));
          }

          // Handle response error
          const err: HttpError = {
            name: response.statusText,
            message: response.statusText,
            response: result,
          };

          let promise = Promise.resolve(err);
          context.interceptors.response.forEach(function (interceptor) {
            promise = promise.then(interceptor.rejected);
          });
          await promise;

          return Promise.reject(err);
        })
        .catch((err) => {
          throw handleError(err);
        });
    },
    _context: context,
    config: context.config,
  });

  return http;
}

// Export instance;
const http = createHttp({
  endpoint: import.meta.env.VITE_API_BASE_URL,
  debug: isDevelopment(),
});

http.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

// http.interceptors.response.use(
//   (response) => {
//     try {
//       if (response.ok) {
//         return { success: true, data: response.data }
//       }

//       throw new Error('Có lỗi gì đó')
//     } catch (error) {
//       return {
//         success: false, data: response.data
//       }
//     }
//   },
// );

export default http as Http;
