import { Link, Representation } from "./Representation";

export abstract class IanaLinkRelations {
  static readonly Manifest: string = "manifest";
  static readonly Collection: string = "collection";
  static readonly About: string = "about";
  static readonly Self: string = "self";
}

function linkRelationOrUndefined(representation: Representation, relation: string) : Link | undefined {
  if (representation && representation._links) {
    return representation._links.find(
      x => x.rel.toLocaleLowerCase() === relation.toLocaleLowerCase());
  }

  return undefined;
}

export function manifestLink(representation: Representation) : Link {
  var result = linkRelationOrUndefined(representation, IanaLinkRelations.Manifest);
  if (result) {
    return result;
  }

  throw new Error("Could not find 'manifest' link relation");
} 

export function collectionLink(representation: Representation) : Link {
  var result = linkRelationOrUndefined(representation, IanaLinkRelations.Collection);
  if (result) {
    return result;
  }

  throw new Error("Could not find 'collection' link relation");
}

export function selfLink(representation: Representation) : Link {
  var result = linkRelationOrUndefined(representation, IanaLinkRelations.Self);
  if (result) {
    return result;
  }

  throw new Error("Could not find 'collection' link relation");
}

export function aboutLink(representation: Representation) : Link {
  var result = linkRelationOrUndefined(representation, IanaLinkRelations.About);
  if (result) {
    return result;
  }

  throw new Error("Could not find 'about' link relation");
}