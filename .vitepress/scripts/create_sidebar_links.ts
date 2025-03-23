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

// TODO
export function CJLzapisky() {
	return [{ text: "", link: "" }];
}
