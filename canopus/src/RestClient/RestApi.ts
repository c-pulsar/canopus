import { Representation } from "./Representation";

export interface RestApi {
  get(uri: string): Promise<Representation>;
  getAny(uri: string): Promise<any>;
  create(uri: string, representation: any) : Promise<string | undefined>;
  update(uri: string, representation: any) : Promise<void>;
  delete(uri: string) : Promise<void>;
  relation(rel: string, representation: Representation): Promise<Representation>;
}