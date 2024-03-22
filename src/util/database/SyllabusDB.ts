import ISubjectFull from "@/Interface/ISubjectFull";
import SearchParams from "@/types/SearchParams";
import db from "./db";
class SyllabusDBUtil {
    private readonly SyllabusDBQuery = `
    SELECT
        s.class_code AS class_code,
        s.year AS year,
        s.subject_code AS subject_code,
        s.subject_name AS subject_name,
        st.subject_type_name AS subject_type,
        s.campus_id AS campus_id,
        c.campus_name AS campus_name,
        s.department_id AS department_id,
        d.department_name AS department_name,
        s.schoolyear AS schoolyear,
        s.term_id AS term_id,
        tm.term_name AS term_name,
        dw.day_of_week_name  AS day_of_week,
        s.period        AS period,
        t.teacher_id    AS teacher_id,
        t.teacher_name  AS teacher_name,
        t.teacher_name_kana AS teacher_name_kana
    FROM syllabus s
    INNER JOIN subject_type st  ON s.subject_type_id = st.subject_type_id
    INNER JOIN campus c ON s.campus_id = c.campus_id
    INNER JOIN department d ON s.department_id = d.department_id
    INNER JOIN term tm ON s.term_id = tm.term_id
    INNER JOIN day_of_week dw ON s.day_of_week = dw.day_of_week_id
    INNER JOIN teacher t ON s.teacher_id = t.teacher_id
    WHERE s.year = :year
    AND (CASE WHEN :campus_id = -1 THEN 1 ELSE s.campus_id = :campus_id END)
    AND (CASE WHEN :department_id = '' THEN 1 ELSE s.department_id = :department_id END)
    AND (CASE WHEN :schoolyear <= 0 THEN 1 ELSE s.schoolyear = :schoolyear END)
    AND (CASE WHEN :subject_type <= 0 THEN 1 ELSE s.subject_type_id = :subject_type END)
    AND (CASE WHEN :day_of_week = '' THEN 1 ELSE s.day_of_week = :day_of_week END)
    AND (CASE WHEN :period <= 0 THEN 1 ELSE s.period = :period END)
    AND (CASE WHEN :semester = '' THEN 1 ELSE s.term_id = :semester END)
    AND (CASE WHEN :subject_name = '' THEN 1 ELSE s.subject_name LIKE CONCAT('%',:subject_name,'%') END)
    AND (CASE WHEN :teacher = '' THEN 1 ELSE t.teacher_name LIKE CONCAT('%',:teacher,'%') OR t.teacher_name_kana LIKE CONCAT('%',:teacher,'%') END)
    LIMIT 100;`;
    async search(searchParams: SearchParams): Promise<ISubjectFull[]> {
        const result = await db.query(this.SyllabusDBQuery, searchParams);
        const syllabus: ISubjectFull[] = [];
        for (const row of result) {
            syllabus.push({
                Year: row.year,
                ClassCode: row.class_code,
                SubjectCode: row.subject_code,
                SubjectName: row.subject_name,
                SubjectType: row.subject_type,
                SemesterCode: row.term_id,
                SemesterName: row.term_name,
                CampusCode: row.campus_id,
                CampusName: row.campus_name,
                DepartmentCode: row.department_id,
                DepartmentName: row.department_name,
                Grade: row.schoolyear,
                ClassDay: row.day_of_week,
                ClassPeriod: row.period,
                TeacherCode: row.teacher_id,
                TeacherName: row.teacher_name,
                TeacherNameKana: row.teacher_name_kana,
                TeacherType: row.teacher_type,
            });
        }
        return syllabus;
    }

    async departmentList(): Promise<[string, string][]> {
        const result = await db.query("SELECT department_id, department_name FROM department;");
        const department: [string, string][] = [];
        for (const row of result) {
            department.push([row.department_id, row.department_name]);
        }
        return department;
    }

    async campusList(): Promise<[string, string][]> {
        const result = await db.query("SELECT campus_id, campus_name FROM campus;");
        const campus: [string, string][] = [];
        for (const row of result) {
            campus.push([row.campus_id, row.campus_name]);
        }
        return campus;
    }
}

const SyllabusDB = new SyllabusDBUtil();
export default SyllabusDB;
