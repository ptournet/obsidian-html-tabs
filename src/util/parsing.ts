import { CachedMetadata, Loc, MarkdownPostProcessorContext } from "obsidian";
import { Line, Lines } from "../lines";
import { Tabs } from "../tabs";
import { LinkCacheEx } from "./cache";

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

export function parseLinesForCache(lines: Lines): CachedMetadata {
	const tabCache: CachedMetadata = {};

	for (const line of lines) {
		parseLineForEmbed(line, tabCache);
		parseLineForHeadings(line, tabCache);
		parseLineForLinks(line, tabCache);
		parseLineForListItems(line, tabCache);
		parseLineForSections(line, tabCache);
		parseLineForTags(line, tabCache);
	}

	return tabCache;
}

function parseLineForEmbed(line: Line, tabCache: CachedMetadata) {
	// TODO: parseLineForEmbed
}

function parseLineForHeadings(line: Line, tabCache: CachedMetadata) {
	// TODO: parseLineForHeadings
}

function parseLineForLinks(line: Line, tabCache: CachedMetadata) {
	const linkRegex = /(?<!!)\[\[(?<link>[^|\]]+)(\|(?<display>[^\]]+))?\]\]/g;
	const matches: RegExpMatchArray[] = [...line.text.matchAll(linkRegex)];
	if (matches.length > 0) {
		tabCache.links = [];
		matches.forEach(function (match: RegExpMatchArray) {
			const col = match.index ? match.index : 0;
			const start: Loc = {
				col: col,
				line: line.loc.line,
				offset: line.loc.offset + col,
			};
			const linkCache: LinkCacheEx = {
				intabs: true,
				link: match.groups ? match.groups.link : match[1],
				original: match[0],
				position: {
					end: {
						col: start.col + match[0].length,
						line: start.line,
						offset: start.offset + match[0].length,
					},
					start: start,
				},
			};

			if (match.groups && match.groups.display) {
				linkCache.displayText = match.groups.display;
			}

			tabCache.links?.push(linkCache);
		});
	}
}

function parseLineForListItems(line: Line, tabCache: CachedMetadata) {
	// TODO: parseLineForListItems
}

function parseLineForSections(line: Line, tabCache: CachedMetadata) {
	// TODO: parseLineForSections
}

function parseLineForTags(line: Line, tabCache: CachedMetadata) {
	// TODO: parseLineForTags
}
