import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import type { Session, SessionIndexEntry, SessionIndex } from "../types/sessionTypes.js";

const sessionsDir = path.join(os.homedir(), ".scrycli", "sessions");
const indexPath = path.join(sessionsDir, "index.json");

function ensureDir() {
    if (!fs.existsSync(sessionsDir)) {
        fs.mkdirSync(sessionsDir, { recursive: true });
    }
    if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, JSON.stringify({ sessions: [] }, null, 2));
    }
};


function readIndex(): SessionIndex {
    ensureDir();
    return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
};

function writeIndex(index: SessionIndex) {
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
};

export function listSessions(cwd?: string): SessionIndexEntry[] {
    const index = readIndex();
    let sessions = index.sessions;
    if (cwd) {
        sessions = sessions.filter((s) => s.cwd === cwd);
    }
    return sessions.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
};

export function createSession(cwd: string): Session {
    ensureDir();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const session: Session = {
        id,
        title: "New conversation",
        cwd,
        createdAt: now,
        updatedAt: now,
        messages: [],
    };
    fs.writeFileSync(
        path.join(sessionsDir, `${id}.json`),
        JSON.stringify(session, null, 2)
    );
    const index = readIndex();
    index.sessions.push({ id, title: session.title, cwd, updatedAt: now, messageCount: 0 });
    writeIndex(index);
    return session;
};

export function loadSession(id: string): Session {
    ensureDir();
    const filePath = path.join(sessionsDir, `${id}.json`);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

export function saveSession(session: Session): void {
    session.updatedAt = new Date().toISOString();
    if (session.title === "New conversation") {
        const firstUserMsg = session.messages.find((m) => m.role === "user");
        if (firstUserMsg) {
            session.title = firstUserMsg.content.slice(0, 50);
        }
    }
    fs.writeFileSync(
        path.join(sessionsDir, `${session.id}.json`),
        JSON.stringify(session, null, 2)
    );
    const index = readIndex();
    const entry = index.sessions.find((s) => s.id === session.id);
    if (entry) {
        entry.title = session.title;
        entry.updatedAt = session.updatedAt;
        entry.messageCount = session.messages.filter(
            (m) => m.role === "user" || m.role === "assistant"
        ).length;
    }
    writeIndex(index);
};

export function deleteSession(id: string): void {
    const filePath = path.join(sessionsDir, `${id}.json`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    const index = readIndex();
    index.sessions = index.sessions.filter((s) => s.id !== id);
    writeIndex(index);
};