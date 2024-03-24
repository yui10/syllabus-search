type SearchParams = {
    year: number;           // 学年
    campus_id: number;      // キャンパス
    department_id: string;  // 学科
    schoolyear: number;     // 学年
    subject_name: string;   // 科目
    subject_type: number;   // 科目区分
    day_of_week: string;    // 曜日
    period: number;         // 時限
    semester: string;       // 学期
    teacher: string;        // 教員
};
export default SearchParams;

const defaultSearchParams: SearchParams = {
    year: 0,
    campus_id: -1,
    department_id: "",
    schoolyear: 0,
    subject_name: "",
    subject_type: -1,
    day_of_week: "",
    period: 0,
    semester: "",
    teacher: "",
};
export { defaultSearchParams };
