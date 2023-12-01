import { MarkdownPostProcessorContext } from "obsidian";
import { Line, Lines } from "../lines";
import { Tabs } from "../tabs";

export function getTabExtSource(el: HTMLElement, ctx: MarkdownPostProcessorContext): Lines {
	const sectionInfo = ctx.getSectionInfo(el);
	if (!sectionInfo) {
		return [];
	}

	const lines: Lines = [];
	const rawLines = sectionInfo.text.split("\n");
	let offset = 0;
	let lineNumber = 0;
	rawLines.forEach((rawLine) => {
		if (lineNumber < sectionInfo.lineStart) {
			offset += rawLine.length + 1;
			lineNumber++;
			return;
		}

		if (lineNumber >= sectionInfo.lineStart && lineNumber <= sectionInfo.lineEnd) {
			lines.push(new Line(rawLine, lineNumber, offset));
			offset += rawLine.length + 1;
			lineNumber++;
			return;
		}
	});

	return lines;
}

export function parseTabs(lines: Lines): Tabs {
	const tabs: Tabs = new Tabs();
	let newTab = null;
	let id = 0;

	for (const line of lines) {
		if (line.text.startsWith("---tab")) {
			if (newTab) {
				tabs.tabs.push(newTab);
				newTab = null;
			}

			const match = line.text.match(/---tab(\*)? (.+)/);
			if (match) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [_, isStarred, label] = match;
				newTab = {
					id: id++,
					label: label.trim(),
					content: "",
				};

				if (isStarred !== undefined) {
					tabs.active_id = newTab.id;
				}
			}
		} else if (newTab) {
			if (newTab.content === "") {
				newTab.content += line.text;
			} else {
				newTab.content += "\n" + line.text;
			}
		}
	}

	if (newTab) {
		tabs.tabs.push(newTab);
	}

	return tabs;
}
