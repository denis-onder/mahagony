export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidatorResponse {
  valid: boolean;
  errors: Array<ValidationError>;
}
