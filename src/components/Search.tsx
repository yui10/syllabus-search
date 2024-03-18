import ISubjectFull from '@/Interface/ISubjectFull';
import SearchParams from '@/types/SearchParams';
import Fetch from '@/util/fetch/Fetch';
import SyllabusAPI from '@/util/fetch/SyllabusAPI';
import {
    Autocomplete,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField
} from '@mui/material';
import { useEffect, useRef } from 'react';

let department: [string, string][] = [];


const lbl_type = [["1", '必修'], ["2", '選択'], ["3", '選択必修'], ["4", '自由']];
const day_of_week = [["A", "月"], ["B", "火"], ["C", "水"], ["D", "木"], ["E", "金"], ["F", "土"], ["Z", "集"]];
let campus: [string, string][] = [];
const semester = [["00", "通年"], ["01", "前期"], ["02", "後期"], ["03", "集前"], ["04", "集後"]];

type Props = {
    setResult: (result: ISubjectFull[]) => void
}

const Search = (props: Props) => {
    let select_campus: string | null = null
    let select_department: string | null = null
    let select_schoolyear = useRef<HTMLInputElement>(null)
    let select_subject_name = useRef<HTMLInputElement>(null)
    let select_subject_type: string | null = null
    let select_day_of_week: string | null = null
    let select_period = useRef<HTMLInputElement>(null)
    let select_semester: string | null = null
    let select_teacher = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetch_department = (async () => {
            const res = await Fetch.get("/api/department");
            const data = res as [string, string][];
            if (department.length > 0) return;
            department.push(...data);
        });

        const fetch_campus = (async () => {
            const res = await Fetch.get("/api/campus");
            const data = res as [string, string][];
            if (campus.length > 0) return;
            campus.push(...data);
        });

        fetch_department();
        fetch_campus();
    }, []);

    const onSearch = async () => {
        const params: SearchParams = {
            campus_id: Number(select_campus ?? -1),
            department_id: select_department ?? '',
            schoolyear: Number(select_schoolyear.current?.value ?? -1),
            subject_name: select_subject_name.current?.value ?? '',
            subject_type: Number(select_subject_type ?? 0),
            day_of_week: select_day_of_week ?? '',
            period: Number(select_period.current?.value ?? 0),
            semester: select_semester ?? '',
            teacher: select_teacher.current?.value ?? ''
        }
        console.log(params)

        const result = await SyllabusAPI.search(params);
        props.setResult(result);
        console.log(select_department)
    }

    return (
        <Container>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>学部学科</TableCell>
                        <TableCell>
                            <Autocomplete
                                id="department-autocomplete"
                                options={department}
                                getOptionLabel={option => option[1]}
                                onChange={(event, value) => select_department = (value == null ? null : value[0])}
                                renderInput={(params) => <TextField {...params} label="学部学科" variant="standard" fullWidth />}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>学年</TableCell>
                        <TableCell>
                            <TextField id="schoolyear-text" label="学年" variant="standard"
                                inputRef={select_schoolyear}
                                fullWidth />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>科目名</TableCell>
                        <TableCell>
                            <TextField id="subject-name-text" label="科目名" variant="standard"
                                inputRef={select_subject_name}
                                fullWidth />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>曜日</TableCell>
                        <TableCell>
                            <Autocomplete
                                id="day-of-week-autocomplete"
                                options={day_of_week}
                                getOptionLabel={option => option[1]}
                                onChange={(event, value) => select_day_of_week = (value == null ? null : value[0])}
                                renderInput={(params) => <TextField {...params} label="曜日" variant="standard" fullWidth />}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>時限</TableCell>
                        <TableCell>
                            <TextField id="period-text" label="時限" variant="standard"
                                inputRef={select_period}
                                fullWidth />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>履修区分</TableCell>
                        <TableCell>
                            <Autocomplete
                                id="subject-type-autocomplete"
                                options={lbl_type}
                                getOptionLabel={option => option[1]}
                                onChange={(event, value) => select_subject_type = (value == null ? null : value[0])}
                                renderInput={(params) => <TextField {...params} label="履修区分" variant="standard" fullWidth />}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>学期</TableCell>
                        <TableCell>
                            <Autocomplete
                                id="semester-autocomplete"
                                options={semester}
                                getOptionLabel={option => option[1]}
                                onChange={(event, value) => select_semester = (value == null ? null : value[0])}
                                renderInput={(params) => <TextField {...params} label="学期" variant="standard" fullWidth />}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>教員名</TableCell>
                        <TableCell>
                            <TextField id="teacher-text" label="教員名" variant="standard"
                                inputRef={select_teacher}
                                fullWidth />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>キャンパス</TableCell>
                        <TableCell>
                            <Autocomplete
                                id="campus-autocomplete"
                                options={campus}
                                getOptionLabel={(option) => option[1]}
                                onChange={(event, value) => select_campus = (value == null ? null : value[0])}
                                renderInput={(params) => <TextField {...params} label="キャンパス" variant="standard" fullWidth />}
                            />
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <Button
                variant="contained"
                onClick={onSearch}
            >
                検索
            </Button>
        </Container>
    )
}

export default Search
