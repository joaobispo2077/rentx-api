/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
