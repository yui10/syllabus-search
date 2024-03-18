import ISubjectFull from '@/Interface/ISubjectFull'
import { TableCell, TableRow } from '@mui/material'
import React from 'react'
type Props = {
  searchResult: ISubjectFull
}
const ResultTableRow = (props: Props) => {
  const onRowClick = () => {
    console.log(props.searchResult);
  }
  return (
    <TableRow onClick={onRowClick}>
      <TableCell>{props.searchResult.ClassCode}</TableCell>
      <TableCell>{props.searchResult.DepartmentName}</TableCell>
      <TableCell>{props.searchResult.Grade == 0 ? "" : props.searchResult.Grade}</TableCell>
      <TableCell>{props.searchResult.SubjectName}</TableCell>
      <TableCell>{props.searchResult.SemesterName}</TableCell>
      <TableCell>{props.searchResult.SubjectType}</TableCell>
      <TableCell>{props.searchResult.ClassDay}</TableCell>
      <TableCell>{props.searchResult.ClassPeriod == 9 ? "" : props.searchResult.ClassPeriod}</TableCell>
      <TableCell>{props.searchResult.TeacherName}</TableCell>
    </TableRow >
  )
}

export default ResultTableRow
