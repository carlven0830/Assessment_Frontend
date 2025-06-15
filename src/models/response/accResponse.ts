import type { EntityResponse } from "./entityResponse";

export interface AccResponse extends EntityResponse {
  username: string;
  password: string;
  email: string;
  phone: string;
  sessionKey: string;
}
