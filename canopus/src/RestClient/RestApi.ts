import { Representation } from "./Representation";

export interface RestApi {
  get(uri: string): Promise<Representation>;
  getAny(uri: string): Promise<any>;
  relation(rel: string, representation: Representation): Promise<Representation>;
}