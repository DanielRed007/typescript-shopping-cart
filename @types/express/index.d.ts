import { IRequestSession } from "../../src/interfaces/interfaces";

export {};

declare global {
  namespace Express {
    interface Request {
      session: IRequestSession;
    }
  }
}
