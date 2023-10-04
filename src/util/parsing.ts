import { MarkdownPostProcessorContext, MarkdownSectionInformation } from "obsidian";
import { Tabs } from "../tabs";

export function getFullSource(el: HTMLElement, ctx: MarkdownPostProcessorContext): string[] {
	const sectionInfo = ctx.getSectionInfo(el);
	if (!sectionInfo) {
		return [];
	}

	let lines = sectionInfo.text.split("\n");
	lines = lines.slice(sectionInfo.lineStart, sectionInfo.lineEnd + 1);
	console.log("getFullSource:\n", lines);
	return lines;
}

export function parseTabs(source: string): Tabs {
	console.log("parseTabs");
	const lines = source.split("\n");
	const tabs: Tabs = new Tabs();
	let newTab = null;
	let id = 0;

	for (const line of lines) {
		if (line.startsWith("---tab")) {
			if (newTab) {
				tabs.tabs.push(newTab);
				newTab = null;
			}

			const match = line.match(/---tab(\*)? (.+)/);
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
				newTab.content += line;
			} else {
				newTab.content += "\n" + line;
			}
		}
	}

	if (newTab) {
		tabs.tabs.push(newTab);
	}

	return tabs;
}
