import ISubjectFull from '@/Interface/ISubjectFull'
import { useModalHook } from '@/hooks/TableHook'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ResultTableRow from './ResultTableRow'
import SyllabusModal from './SyllabusModal'
type Props = {
    searchResult: ISubjectFull[]
}
const Header = {
    ClassCode: "授業コード",
    SubjectCode: "科目コード",
    SubjectName: "科目名",
    SubjectType: "履修区分",
    SemesterName: "学期名",
    CampusName: "キャンパス名",
    DepartmentName: "学科名",
    Grade: "学年",
    ClassDay: "曜日",
    ClassPeriod: "時限",
    TeacherName: "教員名",
}
const ResultTable = (props: Props) => {
    const { open, setOpen, syllabus, setSyllabus } = useModalHook()
    return (
        <div>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>{Header.ClassCode}</TableCell>
                        <TableCell>{Header.DepartmentName}</TableCell>
                        <TableCell>{Header.Grade}</TableCell>
                        <TableCell>{Header.SubjectName}</TableCell>
                        <TableCell>{Header.SemesterName}</TableCell>
                        <TableCell>{Header.SubjectType}</TableCell>
                        <TableCell>{Header.ClassDay}</TableCell>
                        <TableCell>{Header.ClassPeriod}</TableCell>
                        <TableCell>{Header.TeacherName}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.searchResult.map((result, index) =>
                        <ResultTableRow key={index} searchResult={result} setOpen={setOpen} setSyllabus={setSyllabus} />
                    )}
                </TableBody>
            </Table>
            <SyllabusModal open={open} setOpen={setOpen} syllabus={syllabus} />
        </div>
    )
}

export default ResultTable
