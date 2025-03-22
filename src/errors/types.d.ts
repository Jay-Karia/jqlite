export type ErrorParams = {
  message: string;
  code: string;
  cause: string;
  solution?: string;
  metadata?: Record<string, any>;
};
