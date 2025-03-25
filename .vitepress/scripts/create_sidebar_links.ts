import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";

const getDataDir = (baseDir: string): string => path.resolve(__dirname, `../../src${baseDir}`);
const getFileNames = (dataDir: string, WFT: boolean = false): fs.Dirent => fs.readdirSync(dataDir, { withFileTypes: WFT });
const readFile = (path: string): GrayMatterFile<any> => matter(fs.readFileSync(path, "utf-8"));
const filterRozbory = (fileNames: string[]): string[] => fileNames.filter((f: string) => /^[1-9]/.test(f));

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
	const baseDir: string = "/CJL/rozbory";
	const dataDir: string = getDataDir(baseDir);
	return filterRozbory(getFileNames(dataDir)).map((filename: string) => {
		return {
			text: extractFirstHeading(readFile(path.join(dataDir, filename)).content),
			link: `${baseDir}/${filename}`,
		};
	});
}

export function CJLzapisky() {
	const baseDir: string = "/CJL/zapisky";
	return getSidebarItems(getDataDir(baseDir), baseDir);
}
