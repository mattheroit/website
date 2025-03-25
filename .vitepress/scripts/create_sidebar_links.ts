import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getFileNames(dataDir: string, recursive: boolean = false): string[] {
	return fs.readdirSync(dataDir, { recursive: recursive });
}

function filterRozbory(fileNames: string[]) {
	return fileNames.filter((f: string) => /^[1-9]/.test(f));
}

function extractFirstHeading(content: string): string {
	const match = content.match(/^#\s+(.+)/m);
	return match ? match[1] : "Untitled";
}

// Filters out everything that isn't a directory or md files (exept for index.md)
function filterFileNames(fileNames: fs.Dirent[]) {
	return fileNames
		.filter((entry: fs.Dirent) => entry.isDirectory() || entry.name.endsWith(".md"))
		.filter((entry: fs.Dirent) => entry.name !== "index.md");
}

// Recursive function to read folders and files
function getSidebarItems(dataDir: string, baseDir: string): any[] {
	return filterFileNames(getFileNames(dataDir, true)).map((entry: fs.Dirent) => {
		const fullPath = path.join(dataDir, entry.name);
		const newBaseDir = `${baseDir}/${entry.name}`;
		let subfolderItems: any[] = [];
		let text: string | null = null;
		let link: string | null = null;

		if (entry.isDirectory()) {
			subfolderItems = getSidebarItems(fullPath, newBaseDir) || [];

			// Check if this folder has an index.md
			const indexPath = path.join(fullPath, "index.md");
			if (fs.existsSync(indexPath)) {
				text = extractFirstHeading(readFile(indexPath).content);
				link = `${newBaseDir}/`;
			}
		} else {
			text = extractFirstHeading(readFile(fullPath).content);
			link = newBaseDir;
		}

		return {
			text: text || entry.name,
			...(link ? { link: link } : {}),
			...(subfolderItems.length > 0 ? { collapsed: false, items: subfolderItems } : {}),
		};
	});
}

export function CJLrozbory() {
	const dataDir: string = path.resolve(__dirname, "../../src/CJL/rozbory");
	return filterRozbory(getFileNames(dataDir)).map((filename: string) => {
		const { data: metadata, content } = matter(fs.readFileSync(path.join(dataDir, filename), "utf-8"));
		return {
			text: extractFirstHeading(content),
			link: `./${filename}`,
		};
	});
}

export function CJLzapisky() {
	const baseDir: string = "/CJL/zapisky";
	return getSidebarItems(getDataDir(baseDir), baseDir);
}
