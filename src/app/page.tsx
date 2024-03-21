"use client";
import ISubjectFull from "@/Interface/ISubjectFull";
import ResultTable from "@/components/ResultTable";
import Search from "@/components/SearchBeta";
import { KeyboardDoubleArrowUp } from '@mui/icons-material';
import { Container, Fab } from "@mui/material";
import { useState } from "react";

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

export default function Home() {
    const [result, setResult] = useState<ISubjectFull[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFabClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Container>
            <Search setResult={setResult} />
            <ResultTable searchResult={result} />
            <Fab color="primary" aria-label="up to Top" sx={fabStyle} onClick={handleFabClick}>
                <KeyboardDoubleArrowUp />
            </Fab>
        </Container>
    );
}
