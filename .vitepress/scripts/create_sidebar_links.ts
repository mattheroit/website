import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";

const getDataDir = (baseDir: string): string => path.resolve(__dirname, `../../src${baseDir}`);
const getFileNames = (dataDir: string, WFT: boolean = false): fs.Dirent => fs.readdirSync(dataDir, { withFileTypes: WFT });
const readFile = (path: string): GrayMatterFile<any> => matter(fs.readFileSync(path, "utf-8"));

function extractFirstHeading(content: string): string {
	const match = content.match(/^#\s+(.+)/m);
	return match ? match[1] : "Untitled";
}

// Filters out everything that isn't a directory or md files (exept for index.md)
function filterFileNames(fileNames: fs.Dirent[]): fs.Dirent[] {
	return fileNames
		.filter((entry: fs.Dirent) => entry.isDirectory() || entry.name.endsWith(".md"))
		.filter((entry: fs.Dirent) => entry.name !== "index.md");
}

const FOLDER_TITLE_FILE: string = "_title.md";

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
			const titlePath = path.join(fullPath, FOLDER_TITLE_FILE);
			if (fs.existsSync(indexPath)) {
				text = extractFirstHeading(readFile(indexPath).content);
				link = `${newBaseDir}/`;
			} else if (fs.existsSync(titlePath)) {
				text = extractFirstHeading(readFile(titlePath).content);
			}
		} else {
			text = extractFirstHeading(readFile(fullPath).content);
			link = newBaseDir;
		}

		if (text === null) {
			throw new Error(
				`
				Folder doesn't have a top level heading.
				Add a "${FOLDER_TITLE_FILE}" or "index.md" file
				Location: ${newBaseDir}
				`
			);
		}

		if (entry.name.endsWith("_title.md")) return;

		return {
			text: text,
			...(link ? { link: link } : {}),
			...(subfolderItems.length > 0 ? { collapsed: false, items: subfolderItems } : {}),
		};
	});
}

export function CJLrozbory() {
	const baseDir: string = "/CJL/rozbory";
	return getSidebarItems(getDataDir(baseDir), baseDir);
}

export function CJLzapisky() {
	const baseDir: string = "/CJL/zapisky";
	return getSidebarItems(getDataDir(baseDir), baseDir);
}
