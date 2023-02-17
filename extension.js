const vscode = require('vscode')
import * as fs from 'fs';

exports.activate = function(context) {
  vscode.window.showInformationMessage('hello, ppz')

	let disposable = vscode.commands.registerCommand('extension.helloWorld', function() {
    // 在编辑器右下角展示一个message box
    vscode.window.showInformationMessage('Hello World!');
		fs.writeFile('./test11.js', 'asdfadf', (err) => {
			console.log(err)
		})
  });

	context.subscriptions.push(disposable)


	// 注册命令
	context.subscriptions.push(vscode.commands.registerCommand('extension.readFiles', function () {
		console.log('tttttttttttttttttttt')
		// 读取文件
		
		// const files = fs.readdirSync('./packages')
		// console.log('files', files)
	}));
}