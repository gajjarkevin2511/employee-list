
export interface Employee {
    id: string;
    name: string; 
    position: string;
    department: string; 
  }

export type EditRow = { id: string; updatedData: Record<string, any> };
export type AddUser = { name : string, position: string; department:string };
