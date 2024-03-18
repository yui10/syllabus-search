interface ISubjectFull {
    Year: number; //年度
    ClassCode: string;//授業コード
    SubjectCode: string;//科目コード
    SubjectName: string;//科目名
    SubjectType: string;//履修区分
    SemesterCode: string;//学期コード
    SemesterName: string;//学期名
    CampusCode: string;//キャンパスコード
    CampusName: string;//キャンパス名
    DepartmentCode: string;//学科コード
    DepartmentName: string;//学科名
    Grade: number;//学年
    ClassDay: string;//曜日
    ClassPeriod: number;//時限
    TeacherCode: string;//教員コード
    TeacherName: string;//教員名
    TeacherNameKana: string;//教員名（カナ）
    TeacherType: string;//教員区分
}

export default ISubjectFull;
