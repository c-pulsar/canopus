import { Representation } from "./Representation";

export interface RestApi {
  get(uri: string): Promise<Representation>;
  relation(rel: string, representation: Representation): Promise<Representation>;
}