import ISubjectFull from "@/Interface/ISubjectFull";
import SearchParams from "@/types/SearchParams";
import Fetch from "./Fetch";
export default class SyllabusAPI {
    public static async search(params: SearchParams): Promise<ISubjectFull[]> {
        const param = new URLSearchParams(params as any).toString();
        const response = await Fetch.get(`/api/search?${param}`);
        const result = response.map((syllabus: any) => {
            return {
                Year: syllabus.Year,
                ClassCode: syllabus.ClassCode,
                SubjectCode: syllabus.SubjectCode,
                SubjectName: syllabus.SubjectName,
                SubjectType: syllabus.SubjectType,
                SemesterCode: syllabus.SemesterCode,
                SemesterName: syllabus.SemesterName,
                CampusCode: syllabus.CampusCode,
                CampusName: syllabus.CampusName,
                DepartmentCode: syllabus.DepartmentCode,
                DepartmentName: syllabus.DepartmentName,
                Grade: syllabus.Grade,
                ClassDay: syllabus.ClassDay,
                ClassPeriod: syllabus.ClassPeriod,
                TeacherCode: syllabus.TeacherCode,
                TeacherName: syllabus.TeacherName,
                TeacherNameKana: syllabus.TeacherNameKana,
                TeacherType: syllabus.TeacherType,
            };
        });

        return result;
    }
}
