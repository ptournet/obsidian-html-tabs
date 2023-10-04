import { App, CachedMetadata, HeadingCache, ListItemCache, SectionCache } from "obsidian";

export function rebuildPageCache(app: App, source: string) {
	rebuildCache(getPageCache(app), source);
	app.metadataCache.trigger("changed", app.workspace.getActiveFile());
}

function getPageCache(app: App): CachedMetadata | null {
	const current_file = app.workspace.getActiveFile();
	if (!current_file) {
		return null;
	}

	return app.metadataCache.getFileCache(current_file);
}

interface HeadingCacheEx extends HeadingCache {
	intabs: boolean;
}

interface ListItemCacheEx extends ListItemCache {
	intabs: boolean;
}

function rebuildCache(pageCache: CachedMetadata | null, source: string) {
	if (!pageCache) {
		return;
	}

	// TODO: rebuildCache
	if (pageCache.headings) {
		const newHeading: HeadingCacheEx = {
			heading: "Heading 2",
			level: 2,
			position: {
				end: {
					line: 4,
					col: 12,
					offset: 88,
				},
				start: {
					line: 4,
					col: 0,
					offset: 76,
				},
			},
			intabs: true,
		};

		if (!pageCache.headings[0].intabs) {
			pageCache.headings.unshift(newHeading);
		}
	}

	if (pageCache.listItems) {
		const newTask1: ListItemCacheEx = {
			parent: -7,
			position: {
				end: {
					line: 6,
					col: 12,
					offset: 102,
				},
				start: {
					line: 6,
					col: 0,
					offset: 90,
				},
			},
			task: " ",
			intabs: true,
		};
		const newTask2: ListItemCacheEx = {
			parent: -7,
			position: {
				end: {
					line: 7,
					col: 12,
					offset: 115,
				},
				start: {
					line: 7,
					col: 0,
					offset: 103,
				},
			},
			task: " ",
			intabs: true,
		};
		if (!pageCache.listItems[0].intabs) {
			pageCache.listItems.unshift(newTask2);
			pageCache.listItems.unshift(newTask1);
		}
	}

	if (pageCache.sections) {
		if (pageCache.sections[0].type == "code") {
			const tabsSection = pageCache.sections[0];
			tabsSection.type = "tabs";
			tabsSection.position.end.col = 7;
			tabsSection.position.end.line = 1;
			tabsSection.position.end.offset = 8;

			const newSection: SectionCache = {
				type: "list",
				position: {
					end: {
						col: 12,
						line: 7,
						offset: 115,
					},
					start: {
						col: 0,
						line: 6,
						offset: 90,
					},
				},
			};

			pageCache.sections.splice(1, 0, newSection);
		}
	}

	console.log(pageCache);
}
