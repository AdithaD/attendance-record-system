export default class TopicData {
  name: string;
  isOptional: boolean;
  parts: Array<{ name: string }>;

  constructor(
    name: string,
    isOptional: boolean,
    parts: Array<{ name: string }>
  ) {
    this.name = name;
    this.isOptional = isOptional;
    this.parts = parts;
  }
}
