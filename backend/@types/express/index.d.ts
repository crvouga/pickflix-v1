/* 
attach user to express request
  SOURCE: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
*/
declare namespace Express {
  export interface Request {
    currentUser: any;
  }
}
