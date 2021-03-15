import { Representation } from "./Representation";

export interface RestApi {
  get(uri: string): Promise<Representation>;
  getAny(uri: string): Promise<any>;
  create(uri: string, representation: any) : Promise<string | undefined>;
  relation(rel: string, representation: Representation): Promise<Representation>;
}