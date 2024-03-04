/**
 * This function shall convert the absolute import.meta.url
 * passed to createTestSuite into a relative path.
 * In a node context, it will use @anio-node-foundation/fs-find-nearest-file
 * to find package.json and assume the project root from there.
 *
 * In a browser, it is assumed that all project files are located at [url]/project_files/
 */
import isNode from "@anio-js-foundation/is-node"
import stripSuffix from "@anio-js-foundation/strip-suffix"
import nodeFindNearestFile from "@anio-node-foundation/fs-find-nearest-file"
import normalizePath from "./lib/normalizePath.mjs"

let node_modules = {}

if (isNode()) {
	node_modules.fs = await import("node:fs")
	node_modules.path = await import("node:path")
	node_modules.url = await import("node:url")
	node_modules.findNearestFile = nodeFindNearestFile
}

function convertImportURLToRelativePathNode(import_url) {
	const {fs, path, url, findNearestFile} = node_modules
	const {fileURLToPath} = url

	const absolute_import_url = fs.realpathSync(fileURLToPath(import_url))
	const project_config_path = findNearestFile.sync(
		"package.json", path.dirname(absolute_import_url)
	)

	const project_root = path.dirname(project_config_path)
	const relative_path = path.relative(project_root, absolute_import_url)

	//
	// todo:
	//
	// as an additional safe-guard, compare
	// a globally set project root path (by anio-jtest cli)
	// with the value "project_root"
	//

	return normalizePath(`/${relative_path}`)
}

function getDocumentLocationOrigin() {
	// detect web worker
	if (typeof self === "object" && typeof document === "undefined") {
		return self.location.origin
	} else if (typeof document === "object") {
		return document.location.origin
	}

	throw new Error(`Cannot determine document.location.origin value.`)
}

function convertImportURLToRelativePathBrowser(import_url) {
	let relative_path = stripSuffix(
		import_url, `${getDocumentLocationOrigin()}/project_files/`
	)

	return normalizePath(`/${relative_path}`)
}

export default function(import_url) {
	if (isNode()) {
		return convertImportURLToRelativePathNode(import_url)
	}

	return convertImportURLToRelativePathBrowser(import_url)
}
