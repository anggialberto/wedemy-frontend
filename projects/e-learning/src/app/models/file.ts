import { BaseMaster } from "@bootcamp-core/models/base-master";

export class File extends BaseMaster {
  id?: string;
  file?: Blob;
  name?: string;
  isActive?: boolean;
  type?: string;
  version?: number;
}