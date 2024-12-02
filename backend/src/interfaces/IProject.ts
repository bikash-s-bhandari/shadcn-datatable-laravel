import IBase from "./IBase";

export default interface IProject extends IBase {
  name: string;
  project_manager_id: number;
  status: string;
  start_date: Date;
  end_date: Date;
  resources: string[];
  estimated_cost: number;
  last_updated: Date;
  last_updated_note: string;
}
