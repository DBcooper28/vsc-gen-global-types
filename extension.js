const vscode = require('vscode')
const fs = require('fs')

// 中划线转大驼峰
const upperCase = (val) => {
  return val.replace(/(^|-)(\w)/g,(m,$1,$2)=>$2.toUpperCase())
}

exports.activate = function(context) {
  // vscode.window.showInformationMessage('hello, ppz')

	// let disposable = vscode.commands.registerCommand('extension.helloWorld', function() {
  //   // 在编辑器右下角展示一个message box
  //   vscode.window.showInformationMessage('Hello World!');
	// 	fs.writeFile('./test11.js', 'asdfadf', (err) => {
	// 		console.log(err)
	// 	})
  // });

	// context.subscriptions.push(disposable)


	// 注册命令
	context.subscriptions.push(vscode.commands.registerCommand('extension.readFiles', function (uri) {
		console.log('url=>', uri.path)
		vscode.window.showInformationMessage('开始生成global文件');
		
		// 读取目标文件夹下的内容
		const path = uri.path.slice(1)
		const files = fs.readdirSync(path)
		console.log('files==>', files)
		console.log('vscode.workspace.workspaceFile', vscode.workspace.name)
		const baseImportUrl = '.' + uri.path.split(vscode.workspace.name)[1]
		console.log('baseImportUrl', baseImportUrl)
		const components = []
		files.forEach(function (item) {
			const stat = fs.statSync(path + '/' + item)
			if (stat.isDirectory() === true) {
				components.push(item)
			}
		})

		console.log('components', components);
		let res = "import '@vue/runtime-core'\r\n"
		res += '\r\n'
		components.forEach((item, index) => {
			console.log('forEach', item)
			res += `import Crf${upperCase(item)} from "./dist/types/src/packages/${item}/crf-${item}.vue";\r\n`
			if (index === components.length - 1) {
				res += '\r\n'
			}
		})
		res += "declare module '@vue/runtime-core' {\r\n"
		res += "  export interface GlobalComponents {\r\n"

		components.forEach(item => {
			console.log('forEach', item)
			res += `    Crf${upperCase(item)}: typeof Crf${upperCase(item)}\r\n`
		})
		res += '  }\r\n'
		res += '}\r\n'
		res += 'export {}'
		console.log('res', res)
		const genFilePath = path.split(vscode.workspace.name)[0] + vscode.workspace.name + '/global.d.ts'
		fs.writeFileSync(genFilePath, res)


	}));
}