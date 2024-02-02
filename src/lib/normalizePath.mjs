export default function(path) {
	while (path.includes("//")) {
		path = path.split("//").join("/")
	}

	return path
}
