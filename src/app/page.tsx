"use client";
import ISubjectFull from "@/Interface/ISubjectFull";
import ResultTable from "@/components/ResultTable";
import Search from "@/components/Search";
import { useState } from "react";

export default function Home() {
    const [result, setResult] = useState<ISubjectFull[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div>
            <Search setResult={setResult} />
            <ResultTable searchResult={result} />
        </div>
    );
}
