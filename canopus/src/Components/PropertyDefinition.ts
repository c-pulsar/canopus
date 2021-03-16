export enum PropertyType {
  String = "string",
  Undefined = "undefined"
}

export class PropertyDefinition {
  constructor(public key: string, public propertySchema: any) {
  }

  titleOrDefault(): string {
    if (this.propertySchema.title) {
      return this.propertySchema.title;
    }

    return this.key;
  }

  type(): PropertyType {

    switch (this.propertySchema.type) {
      case "string": return PropertyType.String;
      default: return PropertyType.Undefined;
    }
  }
}