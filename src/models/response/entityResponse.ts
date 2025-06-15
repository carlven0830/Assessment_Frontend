export interface EntityResponse {
  id: string;
  createBy: string;
  createDate: string; // DateTime as ISO string
  modifiedBy: string;
  modifiedDate: string;
  isEnabled: boolean;
}
