// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('snippet-autocreate.create_snippet', function () {

		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("no selection code");
			return;
		}

		var text = editor.document.getText(editor.selection);
		let src_lines = text.split(/\n/)

		let lines = [];
		for (let i = 0; i < src_lines.length; i++) {

			let snippet_line = src_lines[i]

			// sn:="nihao \n"
			snippet_line = snippet_line.replaceAll("\\", "\\\\");

			snippet_line = snippet_line.replaceAll("\"", "\\\"");

			// 
			snippet_line = snippet_line.trim();

			//
			snippet_line = "\"" + snippet_line + "\""

			lines.push(snippet_line)
		}

		// for (let i = 0; i < lines.length; i++) {
		// 	console.log(lines[i]);
		// }

		let snippet_text = lines.join(",");
		vscode.env.clipboard.writeText(snippet_text)

		vscode.window.showInformationMessage("snippet in your clipboard");
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
