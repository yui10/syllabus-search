import ISubjectFull from "@/Interface/ISubjectFull";
import SearchParams from "@/types/SearchParams";
import SyllabusDB from "@/util/database/SyllabusDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const campus_id = Number(searchParams.get("campus_id") ?? -1);
        const department_id = searchParams.get("department_id") ?? "";
        const schoolyear = Number(searchParams.get("schoolyear") ?? 0);
        const subject_name = searchParams.get("subject_name") ?? "";
        const day_of_week = searchParams.get("day_of_week") ?? "";
        const period = Number(searchParams.get("period") ?? 0);
        const subject_type = Number(searchParams.get("subject_type") ?? -1);
        const semester = searchParams.get("semester") ?? "";
        const teacher = searchParams.get("teacher") ?? "";

        if (schoolyear < 0) throw new Error("Invalid schoolyear: " + schoolyear);
        if (period < 0) throw new Error("Invalid period: " + period);
        if (campus_id < -1) throw new Error("Invalid campus_id: " + campus_id);

        console.log(department_id);

        const searchParamsObj: SearchParams = {
            campus_id: campus_id,
            department_id: department_id,
            schoolyear: schoolyear,
            subject_name: subject_name,
            subject_type: subject_type,
            day_of_week: day_of_week,
            period: period,
            semester: semester,
            teacher: teacher
        };
        const result = await SyllabusDB.search(searchParamsObj);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        const result: ISubjectFull[] = [{
            ClassCode: "",
            Year: 0,
            SubjectCode: "",
            SubjectName: "",
            SubjectType: "",
            SemesterCode: "",
            SemesterName: "",
            CampusCode: "",
            CampusName: "",
            DepartmentCode: "",
            DepartmentName: "",
            Grade: 0,
            ClassDay: "",
            ClassPeriod: 0,
            TeacherCode: "",
            TeacherName: "",
            TeacherNameKana: "",
            TeacherType: ""
        }];
        return NextResponse.json(result);
    }
}
