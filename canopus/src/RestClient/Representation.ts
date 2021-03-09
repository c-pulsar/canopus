export interface Link {
  rel: string,
  href: string,
  title: string
}

export interface Representation {
  _links: Link[],
  _type: string,
  _title: string
}

export interface RepresentationCollection extends Representation {
  _items: any[]
}

export function collectionOrUndefined(representation: Representation) : RepresentationCollection | undefined {
  var collection = representation as RepresentationCollection;
  if (collection && collection._items) {
    return collection;
  }

  return undefined;
}