import fs from "node:fs/promises"
import {fileURLToPath} from "node:url"
import path from "node:path"
import {execFileSync} from "node:child_process"

const __dirname = path.dirname(
	fileURLToPath(import.meta.url)
)

async function scandir_recursive_real(root, dir, ret) {
	const entries = await fs.readdir(path.join(root, dir))

	for (const entry of entries) {
		const entry_path = path.join(dir, entry)
		const absolute_path = path.join(root, dir, entry)
		const stat = await fs.lstat(absolute_path)

		if (stat.isDirectory()) {
			await scandir_recursive_real(root, entry_path, ret)
		} else {
			ret.push({entry_path, absolute_path})
		}
	}
}

async function scandir_recursive(dir) {
	let entries = []

	await scandir_recursive_real(dir, ".", entries)

	return entries
}

const test_files = await scandir_recursive(
	path.resolve(__dirname, "tests")
)

for (const test_file of test_files) {

	process.stderr.write(`Running ${test_file.entry_path}\n`)

	execFileSync("node", [
		test_file.absolute_path
	])
}
