export interface Link {
  rel: string,
  href: string,
  title: string
}

export interface Representation {
  _links: Link[],
  _type: string,
  _title: string,
  _schema: string
}

export interface RepresentationCollectionItem {
  href: string,
  title: string
}

export interface RepresentationCollection extends Representation {
  _items: RepresentationCollectionItem[]
}

export function collectionOrUndefined(representation: Representation) : RepresentationCollection | undefined {
  var collection = representation as RepresentationCollection;
  if (collection && collection._items) {
    return collection;
  }

  return undefined;
}