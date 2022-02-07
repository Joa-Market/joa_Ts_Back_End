
import { RequestHandler, Response, Request ,NextFunction } from 'express';

import { ZodSchema, ZodTypeDef } from 'zod';

export type ValidateRequestSchema<TParams, TQuery, TBody, TUser> = {
    params?: ZodSchema<TParams, ZodTypeDef, any>;
    query?: ZodSchema<TQuery, ZodTypeDef, any>;
    body?: ZodSchema<TBody, ZodTypeDef, any>;
    user?: ZodSchema<TUser, ZodTypeDef, any>;
  };
  export type TypedReqAPI<TParams, TQuery, TBody, U> = (
    req: Request<TParams, any, TBody, TQuery, U>,
    res: Response,
    next: NextFunction
  ) => Promise<any>;

  function errorCatcherZEM<TParams, TQuery = {}, TBody = {}>(
    cb: (req: Request<TParams, {}, TBody, TQuery>, res: Response, next: NextFunction) => Promise<any>
  ) {
    return function (req: Parameters<typeof cb>[0], res: Parameters<typeof cb>[1], next: Parameters<typeof cb>[2]) {
      cb(req, res, next).catch(next);
    } as RequestHandler<TParams, any, TBody, TQuery>;
  }

  export const createRequestValidator: <TParams = any, TQuery = any, TBody = any, U = any>(
    schemas: ValidateRequestSchema<TParams, TQuery, TBody, U>
  ) => GenericsHolder<TParams, TQuery, TBody> = ({ params, query, body, user }) => async (req) => {
    if (params) {
      req.params = await params.parseAsync(req.params);
    }
    if (query) {
      req.query = await query.parseAsync(req.query);
    }
    if (body) {
      req.body = await body.parseAsync(req.body);
    }
    if (user) {
      req.user = await user.parseAsync(req.user);
    }
  };
  export function responseHandler<TParams, TQuery, TBody, U>(
    validationSchema: ValidateRequestSchema<TParams, TQuery, TBody, U>,
    api: TypedReqAPI<TParams, TQuery, TBody, U>
  ): RequestHandler<TParams, any, TBody, TQuery>;
  // Overload 2: API only
  export function responseHandler<TParams, TQuery, TBody, U>(
    api: TypedReqAPI<TParams, TQuery, TBody, U>
  ): RequestHandler<TParams, any, TBody, TQuery>;
  export function responseHandler<TParams, TQuery, TBody, U>(
    validationSchemaOrApi: ValidateRequestSchema<TParams, TQuery, TBody, U> | TypedReqAPI<TParams, TQuery, TBody, U>,
    apiOrNothing?: TypedReqAPI<TParams, TQuery, TBody, U>
  ): RequestHandler<TParams, any, TBody, TQuery> {
    return errorCatcherZEM<TParams, TQuery, TBody>(async (req, res, next) => {
      // TS Compiler only checks against the implementation signature, doesnt use overload signatures
      // -> type assertions are necessary
      const api = (apiOrNothing ? apiOrNothing : validationSchemaOrApi) as TypedReqAPI<TParams, TQuery, TBody, U>;
      if (apiOrNothing) {
        await createRequestValidator(validationSchemaOrApi as ValidateRequestSchema<TParams, TQuery, TBody, U>)(req);
      }
      const apiCallResult = await api(req, res, next);
      if (!res.headersSent) {
        res.status(200).json({
          success: true,
          data: apiCallResult ?? {},
          error: '',
          errorDetails: [],
          message: '',
        });
      }
    });
  }
export type GenericsHolder<A = any, B = any, C = any, D = any> = (req: {
    params?: any;
    query?: any;
    body?: any;
    user?: any;
  }) => Promise<void>;
  