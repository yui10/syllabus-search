"use client";
import ISubjectFull from '@/Interface/ISubjectFull';
import SearchParams from '@/types/SearchParams';
import Fetch from '@/util/fetch/Fetch';
import SyllabusAPI from '@/util/fetch/SyllabusAPI';
import { Add, Close } from '@mui/icons-material';
import {
    Autocomplete,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const lbl_type = [["1", '必修'], ["2", '選択'], ["3", '選択必修'], ["4", '自由']];
const day_of_week = [["A", "月"], ["B", "火"], ["C", "水"], ["D", "木"], ["E", "金"], ["F", "土"], ["Z", "集"]];
const semester = [["00", "通年"], ["01", "前期"], ["02", "後期"], ["03", "集前"], ["04", "集後"]];

type Props = {
    setResult: (result: ISubjectFull[]) => void
}

const Search = (props: Props) => {
    const [select_campus, setSelectCampus] = useState<string>("")
    let select_department: string | null = null
    const [schoolyear, setSchoolyear] = useState<string>("");
    let select_subject_name = useRef<HTMLInputElement>(null)
    const [select_subject_type, setSelectSubjectType] = useState<string>("")
    const [select_day_of_week, setSelectDayOfWeek] = useState<string>("")
    const [select_period, setSelectPeriod] = useState<string>("")
    const [select_semester, setSelectSemester] = useState<string>("")
    let select_teacher = useRef<HTMLInputElement>(null);

    const [department, setDepartment] = useState<[string, string][]>([]);
    const [campus, setCampus] = useState<[string, string][]>([]);

    useEffect(() => {
        const fetch_department = (async () => {
            const res = await Fetch.get("/api/department");
            const data = res as [string, string][];
            setDepartment(data);
        });

        const fetch_campus = (async () => {
            const res = await Fetch.get("/api/campus");
            const data = res as [string, string][];
            setCampus(data);
        });

        fetch_department();
        fetch_campus();
    }, []);

    const onSearch = async () => {
        const params: SearchParams = {
            campus_id: Number(select_campus === '' ? -1 : select_campus),
            department_id: select_department ?? '',
            schoolyear: Number(schoolyear),
            subject_name: select_subject_name.current?.value ?? '',
            subject_type: Number(select_subject_type ?? 0),
            day_of_week: select_day_of_week,
            period: Number(select_period ?? 0),
            semester: select_semester,
            teacher: select_teacher.current?.value ?? ''
        }
        console.log(params);
        const result = await SyllabusAPI.search(params);
        props.setResult(result);
    }

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={6}>
                    <Autocomplete
                        id="department-autocomplete"
                        options={department}
                        getOptionLabel={option => option[1]}
                        onChange={(event, value) => select_department = (value == null ? null : value[0])}
                        renderInput={(params) => <TextField {...params} label="学部学科" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>学年</InputLabel>
                        <Select
                            value={schoolyear}
                            onChange={(event) => setSchoolyear(event.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField id="subject-name-text" label="科目名" variant="standard"
                        inputRef={select_subject_name} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="teacher-text" label="教員名" variant="standard"
                        inputRef={select_teacher} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleClick}>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <span>詳細検索</span>
                            {open ? <Close /> : <Add />}
                        </Stack>
                    </Button>
                    {open && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>学期</InputLabel>
                                    <Select
                                        value={select_semester}
                                        onChange={(event) => setSelectSemester(event.target.value)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {semester.map((sem) => (<MenuItem value={sem[0]} key={sem[0]}>{sem[1]}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>曜日</InputLabel>
                                    <Select
                                        value={select_day_of_week}
                                        onChange={(event) => setSelectDayOfWeek(event.target.value)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {day_of_week.map((day) => (<MenuItem value={day[0]} key={day[0]}>{day[1]}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>時限</InputLabel>
                                    <Select
                                        value={select_period}
                                        onChange={(event) => setSelectPeriod(event.target.value)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>履修区分</InputLabel>
                                    <Select
                                        value={select_subject_type}
                                        onChange={(event) => setSelectSubjectType(event.target.value)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {lbl_type.map((type) => (<MenuItem value={type[0]} key={type[0]}>{type[1]}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>キャンパス</InputLabel>
                                    <Select
                                        value={select_campus}
                                        onChange={(event) => setSelectCampus(event.target.value)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {campus.map((campus) => (<MenuItem value={campus[0]} key={campus[0]}>{campus[1]}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                    <Button variant="contained" onClick={onSearch}>検索</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Search
