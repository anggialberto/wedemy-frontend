import { AssignmentSubmissions } from "./assignment-submissions";
import { Grades } from "./grades";

export class Evaluations {

    public idAssignmentSubmission: AssignmentSubmissions = new AssignmentSubmissions();
    public score: number;
    public idGrade: Grades = new Grades();

}