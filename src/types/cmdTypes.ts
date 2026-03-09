export interface CmdType {
    cmd: "/help" | "/model" | "/apikey" | "/logout" | "/Report" | "/exit" | "/session";
    onDone: () => void
}