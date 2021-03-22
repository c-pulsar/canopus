import { Link, Representation } from "./Representation";

export abstract class LinkRelations {
  static readonly Manifest: string = "manifest";
  static readonly Collection: string = "collection";
  static readonly About: string = "about";
  static readonly Self: string = "self";
  static readonly Image: string = "image";
}

function linkRelationOrUndefined(representation: Representation, relation: string) : Link | undefined {
  if (representation && representation._links) {
    return representation._links.find(
      x => x.rel.toLocaleLowerCase() === relation.toLocaleLowerCase());
  }

  return undefined;
}

export function imageUriOrUndefined(representation: Representation) : string | undefined {
  var result = linkRelationOrUndefined(representation, LinkRelations.Image);
  if (result) {
    return result.href;
  }

  return undefined;
} 

export function manifestUri(representation: Representation) : string {
  var result = linkRelationOrUndefined(representation, LinkRelations.Manifest);
  if (result) {
    return result.href;
  }

  throw new Error("Could not find 'manifest' link relation");
} 

export function collectionUri(representation: Representation) : string {
  var result = linkRelationOrUndefined(representation, LinkRelations.Collection);
  if (result) {
    return result.href;
  }

  throw new Error("Could not find 'collection' link relation");
}

export function selfUri(representation: Representation) : string {
  var result = linkRelationOrUndefined(representation, LinkRelations.Self);
  if (result) {
    return result.href;
  }

  throw new Error("Could not find 'collection' link relation");
}

export function aboutUri(representation: Representation) : string {
  var result = linkRelationOrUndefined(representation, LinkRelations.About);
  if (result) {
    return result.href;
  }

  throw new Error("Could not find 'about' link relation");
}