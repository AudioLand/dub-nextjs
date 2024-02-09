const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
if (!JWT_SECRET_KEY) {
  throw Error("AppSumo JWT Secret Key is not defined.");
}

const APPSUMO_USERNAME = process.env.APPSUMO_USERNAME as string;
if (!APPSUMO_USERNAME) {
  throw Error("AppSumo username is not defined.");
}

const APPSUMO_PASSWORD = process.env.APPSUMO_PASSWORD as string;
if (!APPSUMO_PASSWORD) {
  throw Error("AppSumo password is not defined.");
}

export { APPSUMO_PASSWORD, APPSUMO_USERNAME, JWT_SECRET_KEY };
