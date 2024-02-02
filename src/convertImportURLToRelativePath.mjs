/**
 * This function shall convert the absolute import.meta.url
 * passed to createTestSuite into a relative path.
 * In a node context, it will use @anio-js-core-foundation/node-find-nearest-file
 * to find anio_project.mjs and assume the project root from there.
 *
 * In a browser, it is assumed that all project files are located at [url]/project_files/
 */
import isNode from "@anio-js-core-foundation/is-node"
import nodeFindNearestFileFactory from "@anio-js-core-foundation/node-find-nearest-file/factory"
import normalizePath from "./lib/normalizePath.mjs"

let node_modules = {}

if (isNode()) {
	node_modules.fs = await import("node:fs")
	node_modules.path = await import("node:path")
	node_modules.url = await import("node:url")
	node_modules.findNearestFile = await nodeFindNearestFileFactory()
}

function convertImportURLToRelativePathNode(import_url) {
	const {fs, path, url, findNearestFile} = node_modules
	const {fileURLToPath} = url

	const absolute_import_url = fs.realpathSync(fileURLToPath(import_url))
	const project_config_path = findNearestFile(
		"anio_project.mjs", path.dirname(absolute_import_url)
	)

	const project_root = path.dirname(project_config_path)
	const relative_path = path.relative(project_root, absolute_import_url)

	return normalizePath(`/${relative_path}`)
}

function convertImportURLToRelativePathBrowser(import_url) {
	let relative_path = import_url.slice(
		(document.location.origin + "/project_files/").length
	)

	return normalizePath(`/${relative_path}`)
}

export default function(import_url) {
	if (isNode()) {
		return convertImportURLToRelativePathNode(import_url)
	}

	return convertImportURLToRelativePathBrowser(import_url)
}
