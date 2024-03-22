import ISubjectFull from "@/Interface/ISubjectFull";
import { useState } from "react";

export const useModalHook = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [syllabus, setSyllabus] = useState<ISubjectFull>({} as ISubjectFull);
    return { open, setOpen, syllabus, setSyllabus };
}
