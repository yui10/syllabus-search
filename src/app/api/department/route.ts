import syllabusSearch from "@/util/database/SyllabusDB";
import { NextRequest, NextResponse } from "next/server";
let departmentList: [string, string][] = [];
export async function GET(request: NextRequest) {
    try {
        if (departmentList.length === 0) {
            departmentList = await syllabusSearch.departmentList();
        }
        return NextResponse.json(departmentList);
    } catch (error) {
    }
}
