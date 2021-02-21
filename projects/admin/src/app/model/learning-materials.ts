import { BaseMaster } from "@bootcamp-core/models/base-master";

export class LearningMaterials extends BaseMaster {
    public code: string;

    public learningMaterialName: string;

    public description: string;

    // public byte[] file;

    public fileType: string;
}