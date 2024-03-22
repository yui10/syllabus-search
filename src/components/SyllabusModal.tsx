import ISubjectFull from "@/Interface/ISubjectFull";
import { Box, Button, Modal, Table, TableBody, TableCell, TableRow } from "@mui/material";

type Props = {
    syllabus: ISubjectFull;
    open: boolean;
    setOpen: (open: boolean) => void;
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SyllabusModal = (props: Props) => {
    const { syllabus, open, setOpen } = props;
    const handleClose = () => {
        setOpen(false);
    }

    const url = "";

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <h1>授業詳細</h1>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>授業コード</TableCell>
                            <TableCell>{syllabus.ClassCode}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>科目名</TableCell>
                            <TableCell>{syllabus.SubjectName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>対象学科名</TableCell>
                            <TableCell>{syllabus.DepartmentName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>対象学年</TableCell>
                            <TableCell>{syllabus.Grade}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>学期名</TableCell>
                            <TableCell>{syllabus.SemesterName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>曜日・時限</TableCell>
                            <TableCell>{syllabus.ClassDay} {syllabus.ClassPeriod}限</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>開講キャンパス</TableCell>
                            <TableCell>{syllabus.CampusName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>開講区分</TableCell>
                            <TableCell>{syllabus.SubjectType}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>教員名</TableCell>
                            <TableCell>{syllabus.TeacherName}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button LinkComponent={Button} href={url} target="_blank">シラバスを見る</Button>
                <Button onClick={handleClose}>閉じる</Button>
            </Box>
        </Modal>
    )
}

export default SyllabusModal
