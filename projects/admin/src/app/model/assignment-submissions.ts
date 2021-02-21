import { Assignments } from "./assignments";
import { Grades } from "./grades";
import { SubmissionStatus } from "./submission-status";
import { Users } from "./users";

export class AssignmentSubmissions {
    // public byte[] file;

    public fileType: string;

    public score: number;

    public submitDateTime: Date;

    public idParticipant: Users = new Users();

    public idGrade: Grades = new Grades();

    public idSubmissionStatus: SubmissionStatus = new SubmissionStatus();

    public idAssignments: Assignments = new Assignments();
}