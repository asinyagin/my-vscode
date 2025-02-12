import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	const out = vscode.window.createOutputChannel('My VSCode');

	const removeUntrackedGitBranches = vscode.commands.registerCommand('my-vscode.removeUntrackedGitBranches', async () => {
		const gitOutput = await execShell("git fetch -p && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D");
		out.appendLine(gitOutput);
	});
	context.subscriptions.push(removeUntrackedGitBranches);
}

export function deactivate() { }

const execShell = (cmd: string) =>
	new Promise<string>((resolve, reject) => {
		cp.exec(cmd, (err, out) => {
			if (err) {
				return reject(err);
			}
			return resolve(out);
		});
	});