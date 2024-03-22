type SearchParams = {
    year: number;
    campus_id: number;
    department_id: string;
    schoolyear: number;
    subject_name: string;
    subject_type: number;
    day_of_week: string;
    period: number;
    semester: string;
    teacher: string;
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
