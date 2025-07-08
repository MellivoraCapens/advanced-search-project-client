/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_MAX_COUNT: number;
    REACT_APP_OPTIONS: string;
    REACT_APP_OPERATORS: string;
    REACT_APP_MAIN_DROPDOWN: string;
    REACT_APP_URL: string;
  }
}
