export interface Link {
  rel: string,
  href: string,
  title: string
}

export enum RepresentationType {
  Resource = "Resource",
  Collection = "Collection",
  EditForm = "EditForm",
  CreateForm = "CreateForm"
}

export interface Representation {
  _links: Link[],
  _type: RepresentationType
  _title: string,
}

export interface RepresentationCollectionItem {
  href: string,
  title: string
}

export interface RepresentationCollection extends Representation {
  _items: RepresentationCollectionItem[]
}

export interface CreateFormRepresentation extends Representation {
}

export interface EditFormRepresentation extends Representation {
  _canDelete: boolean
}

export function collectionOrUndefined(representation: Representation): RepresentationCollection | undefined {
  var collection = representation as RepresentationCollection;
  if (collection && collection._items && collection._type === RepresentationType.Collection) {
    return collection;
  }

  return undefined;
}

export function createFormOrUndefined(representation: Representation): CreateFormRepresentation | undefined {
  var createForm = representation as CreateFormRepresentation;
  if (createForm && createForm._type === RepresentationType.CreateForm) {
    return createForm;
  }

  return undefined;
}

export function editFormOrUndefined(representation: Representation): EditFormRepresentation | undefined {
  var editForm = representation as EditFormRepresentation;
  if (editForm && editForm._type === RepresentationType.EditForm) {
    return editForm;
  }

  return undefined;
}