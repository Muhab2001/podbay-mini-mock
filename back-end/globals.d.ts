// defining the types of env vars needed for auto completion
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_USER: string;
      DB_PASS: string;
      DB_PORT: int;
      DB_HOST: string;
    }
  }
}

export {}