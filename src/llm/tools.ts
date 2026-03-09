import path from "path";
import { tool } from "@openrouter/sdk";
import { z } from "zod";
import { readFile } from "../tools/readFile.js";
import { writeFile } from "../tools/writeFile.js";
import { createFile } from "../tools/createFile.js";
import { deleteFile } from "../tools/deleteFile.js";
import { getFileTree } from "../tools/getFileTree.js";

export const readFileTool = tool({
    name: "read_file",
    description: "Read the contents of a file and return them",
    inputSchema: z.object({
        file: z.string().describe("Relative file path from project root"),
    }),
    execute: async (params) => {
        const content = readFile(params.file);
        return content;
    },
});
export const createFileTool = tool({
    name: "create_file",
    description: "Create a new file with the given content. Creates parent directories if needed.",
    inputSchema: z.object({
        file: z.string().describe("Relative file path to create"),
        content: z.string().describe("Content to write into the file"),
    }),
    execute: async (params) => {
        createFile(params.file, params.content);
        return `Created ${params.file}`;
    },
});
export const writeFileTool = tool({
    name: "write_file",
    description: "Overwrite an existing file with new content",
    inputSchema: z.object({
        file: z.string().describe("Relative file path to write"),
        content: z.string().describe("New content for the file"),
    }),
    execute: async (params) => {
        writeFile(params.file, params.content);
        return `Updated ${params.file}`;
    },
});
export const deleteFileTool = tool({
    name: "delete_file",
    description: "Delete a file from the project",
    inputSchema: z.object({
        file: z.string().describe("Relative file path to delete"),
    }),
    execute: async (params) => {
        deleteFile(params.file);
        return `Deleted ${params.file}`;
    },
});
export const listFilesTool = tool({
    name: "list_files",
    description: "List the file tree of the user's project directory. Returns the directory structure with files and folders. Use this to understand the project layout before making changes.",
    inputSchema: z.object({
        dir: z.string().optional().describe("Relative directory path to list. Defaults to project root if omitted."),
    }),
    execute: async (params) => {
        const targetDir = params.dir
            ? path.resolve(process.cwd(), params.dir)
            : process.cwd();
        return getFileTree(targetDir).join("\n");
    },
});
export const allTools = [readFileTool, createFileTool, writeFileTool, deleteFileTool, listFilesTool] as const;