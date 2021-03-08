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