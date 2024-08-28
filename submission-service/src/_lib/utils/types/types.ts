export interface RunStatus {
  status: string;
  time_used: string;
  memory_used: string;
  output: string;
  stderr: string;
  stdout:string
}

export interface CompileStatus {
  status: string;
  message: string;
}

export interface Result {
  run_status: RunStatus;
  compile_status: string | CompileStatus;
  time_limit: number;
  memory_limit: number;
  output: string;
  output_html: string;
  status_update_url: string;
}

export interface RequestStatus {
  code: string;
  message: string;
}

export interface FinalResponse {
  result: Result;
  he_id: string;
  status_update_url: string;
  request_status: RequestStatus;
}

export interface TestCase {
  [x: string]: any;
  input: string; 
  expectedOutput: string; 
}

export interface User {
  points: number;
  _id: string;
  email: string;
  username: string;
  // other fields...
}