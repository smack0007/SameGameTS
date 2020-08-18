import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export interface ExecResult {
    stdout: string;
    stderr: string;
}

export class Process {
    public static exec(command: string): Promise<ExecResult> {
        return execPromise(command);
    }
}
