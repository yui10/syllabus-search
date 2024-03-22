import ISubjectFull from '@/Interface/ISubjectFull';
import { TableCell, TableRow } from '@mui/material';
type Props = {
    searchResult: ISubjectFull;
    setOpen: (open: boolean) => void;
    setSyllabus: (syllabus: ISubjectFull) => void;
}
const ResultTableRow = (props: Props) => {
    const { searchResult, setOpen, setSyllabus } = props;
    const onRowClick = () => {
        setSyllabus(searchResult);
        setOpen(true);
    }
    return (
        <TableRow onClick={onRowClick} hover={true}>
            <TableCell>{searchResult.ClassCode}</TableCell>
            <TableCell>{searchResult.DepartmentName}</TableCell>
            <TableCell>{searchResult.Grade == 0 ? "" : searchResult.Grade}</TableCell>
            <TableCell>{searchResult.SubjectName}</TableCell>
            <TableCell>{searchResult.SemesterName}</TableCell>
            <TableCell>{searchResult.SubjectType}</TableCell>
            <TableCell>{searchResult.ClassDay}</TableCell>
            <TableCell>{searchResult.ClassPeriod == 9 ? "" : searchResult.ClassPeriod}</TableCell>
            <TableCell>{searchResult.TeacherName}</TableCell>
        </TableRow >
    )
}

export default ResultTableRow
