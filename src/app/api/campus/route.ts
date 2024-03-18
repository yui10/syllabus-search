import syllabusSearch from "@/util/database/SyllabusDB";
import { NextRequest, NextResponse } from "next/server";
let campusList: [string, string][] = [];
export async function GET(request: NextRequest) {
    try {
        if (campusList.length === 0) {
            campusList = await syllabusSearch.campusList();
        }
        return NextResponse.json(campusList);
    } catch (error) {
    }
}
