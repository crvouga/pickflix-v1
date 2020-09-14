/* 
  I want to attach the current user to express requests
  and also inject dependencies
  SOURCE: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
*/
declare namespace Express {
  interface Request {
    [key: string]: any;
  }
}
