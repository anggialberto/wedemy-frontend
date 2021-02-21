import { BaseMaster } from "@bootcamp-core/models/base-master";

export class Grades extends BaseMaster {
    public code: string;

    public minScore: number;

    public maxScore: number;
}