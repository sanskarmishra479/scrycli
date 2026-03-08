export interface CmdType {
    cmd: "/help" | "/path" | "/model" | "/apikey" | "/logout" | "/Report" | "/exit" | "/session";
    onDone: () => void
}