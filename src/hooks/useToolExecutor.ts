import { useEffect, useState } from "react";
import { writeFile } from "../tools/writeFile.js";
import { readFile } from "../tools/readFile.js";
import { createFile } from "../tools/createFile.js";
import { deleteFile } from "../tools/deleteFile.js";


export function useToolExecutor(answer: string, loading: boolean) {
    const [result, setResult] = useState("");

    useEffect(() => {
        if (loading) return;
        const clean = answer.replace(/|```/g, "").trim();
        if (!clean.startsWith("{") || !clean.endsWith("}")) return;
        try {
            const instruction = JSON.parse(clean);
            if (!instruction.action) return;

            switch (instruction.action) {
                case 'create_file':
                    createFile(instruction.file, instruction.content);
                    break;
                case 'read_file':
                    console.log(readFile(instruction.file));
                    break;

                case 'write_file':
                    writeFile(instruction.file, instruction.content);
                    break;
                case 'delete_file':
                    deleteFile(instruction.file);
                    break;
            }

        } catch (e: any) {
            console.error(`Error executing tool: ${e.message}`);
        }
    }, [loading, answer]);

    return result;
}