import { Lines } from "../lines";
import { App, CachedMetadata, LinkCache, MetadataCache, TFile, TagCache } from "obsidian";
import { parseLinesForCache } from "./parsing";

// interface EmbedCacheEx extends EmbedCache {
// 	intabs: boolean;
// }

// interface HeadingCacheEx extends HeadingCache {
// 	intabs: boolean;
// }

export interface LinkCacheEx extends LinkCache {
	intabs: boolean;
}

// interface ListItemCacheEx extends ListItemCache {
// 	intabs: boolean;
// }

// interface SectionCacheEx extends SectionCache {
// 	intabs: boolean;
// }

export interface TagCacheEx extends TagCache {
	intabs: boolean;
}

export function updateCache(app: App, tabLines: Lines) {
	rebuildCurrentPageCache(app, tabLines);
}
function rebuildCurrentPageCache(app: App, tabLines: Lines) {
	const current_file = app.workspace.getActiveFile();
	const pageCache = getPageCache(current_file);
	rebuildPageCache(pageCache, tabLines);
	app.metadataCache.trigger("changed", current_file);
	app.metadataCache.trigger("resolve", current_file);

	console.log("rebuildCurrentPageCache", pageCache);
	updateCacheLinks(app.metadataCache, pageCache, current_file);
}

function updateCacheLinks(metadataCache: MetadataCache, pageCache: CachedMetadata | null, current_file: TFile | null) {
	if (!pageCache || !pageCache.links || !current_file) {
		return;
	}

	const pageResolvedLinks: Record<string, number> = {};
	const pageUnresolvedLinks: Record<string, number> = {};

	pageCache.links.forEach((link) => {
		if (!(link as LinkCacheEx).intabs) {
			return;
		}

		let path = "";
		let pageLinks = pageResolvedLinks;
		const file = metadataCache.getFirstLinkpathDest((link as LinkCacheEx).link, "");
		if (!file) {
			pageLinks = pageUnresolvedLinks;
			path = (link as LinkCacheEx).link;
		}
		else {
			path = file.path;
		}
		if (pageLinks[path] === undefined) {
			pageLinks[path] = 0;
		}
		pageLinks[path]++;
	});

	metadataCache.resolvedLinks[current_file.path] = pageResolvedLinks;
	metadataCache.unresolvedLinks[current_file.path] = pageUnresolvedLinks;
}

function getPageCache(current_file: TFile | null): CachedMetadata | null {
	if (!current_file) {
		return null;
	}

	return app.metadataCache.getFileCache(current_file);
}

function rebuildPageCache(pageCache: CachedMetadata | null, tabLines: Lines) {
	if (!pageCache) {
		return;
	}

	const tabCache: CachedMetadata = parseLinesForCache(tabLines);

	rebuildEmbedsCache(pageCache, tabCache);
	rebuildHeadingsCache(pageCache, tabCache);
	rebuildLinksCache(pageCache, tabCache);
	rebuildListItemsCache(pageCache, tabCache);
	rebuildSectionsCache(pageCache, tabCache);
	rebuildTagsCache(pageCache, tabCache);
}


function rebuildEmbedsCache(pageCache: CachedMetadata, tabCache: CachedMetadata) {
	if (!tabCache.embeds) {
		return;
	}

	if (!pageCache.embeds) {
		pageCache.embeds = [];
	}

	// TODO: rebuildEmbedsCache
}

function rebuildHeadingsCache(pageCache: CachedMetadata, tabCache: CachedMetadata) {
	// TODO: rebuildHeadingsCache
	// if (pageCache.headings) {
	// 	const newHeading: HeadingCacheEx = {
	// 		heading: "Heading 2",
	// 		level: 2,
	// 		position: {
	// 			end: {
	// 				line: 4,
	// 				col: 12,
	// 				offset: 88,
	// 			},
	// 			start: {
	// 				line: 4,
	// 				col: 0,
	// 				offset: 76,
	// 			},
	// 		},
	// 		intabs: true,
	// 	};

	// 	if (!(pageCache.headings[0] as HeadingCacheEx).intabs) {
	// 		pageCache.headings.unshift(newHeading);
	// 	}
	// }
}

function rebuildLinksCache(pageCache: CachedMetadata, tabCache: CachedMetadata) {
	if (!tabCache.links) {
		return;
	}

	if (!pageCache.links) {
		pageCache.links = [];
	}

	const filteredLinks = pageCache.links.filter(link => !(link as LinkCacheEx).intabs);
	const newLinks = filteredLinks.concat(tabCache.links as LinkCacheEx[]).sort((a, b) => {
		return a.position.start.offset - b.position.start.offset;
	});

	pageCache.links = newLinks;
}

function rebuildListItemsCache(pageCache: CachedMetadata, tabCache: CachedMetadata) {
	// TODO: rebuildListItemsCache
	// if (pageCache.listItems) {
	// 	const newTask1: ListItemCacheEx = {
	// 		parent: -7,
	// 		position: {
	// 			end: {
	// 				line: 6,
	// 				col: 12,
	// 				offset: 102,
	// 			},
	// 			start: {
	// 				line: 6,
	// 				col: 0,
	// 				offset: 90,
	// 			},
	// 		},
	// 		task: " ",
	// 		intabs: true,
	// 	};
	// 	const newTask2: ListItemCacheEx = {
	// 		parent: -7,
	// 		position: {
	// 			end: {
	// 				line: 7,
	// 				col: 12,
	// 				offset: 115,
	// 			},
	// 			start: {
	// 				line: 7,
	// 				col: 0,
	// 				offset: 103,
	// 			},
	// 		},
	// 		task: " ",
	// 		intabs: true,
	// 	};
	// 	if (!(pageCache.listItems[0] as ListItemCacheEx).intabs) {
	// 		pageCache.listItems.unshift(newTask2);
	// 		pageCache.listItems.unshift(newTask1);
	// 	}
	// }
}

function rebuildSectionsCache(pageCache: CachedMetadata, tabCache: CachedMetadata) {
	// TODO: rebuildSectionsCache
	// if (pageCache.sections) {
	// 	if (pageCache.sections[0].type == "code") {
	// 		const tabsSection = pageCache.sections[0];
	// 		tabsSection.type = "tabs";
	// 		tabsSection.position.end.col = 7;
	// 		tabsSection.position.end.line = 1;
	// 		tabsSection.position.end.offset = 8;

	// 		const newSection: SectionCache = {
	// 			type: "list",
	// 			position: {
	// 				end: {
	// 					col: 12,
	// 					line: 7,
	// 					offset: 115,
	// 				},
	// 				start: {
	// 					col: 0,
	// 					line: 6,
	// 					offset: 90,
	// 				},
	// 			},
	// 		};

	// 		pageCache.sections.splice(1, 0, newSection);
	// 	}
	// }
}

function rebuildTagsCache(pageCache: CachedMetadata, tabCache: CachedMetadata) {
	if (!tabCache.tags) {
		return;
	}

	if (!pageCache.tags) {
		pageCache.tags = [];
	}

	const filteredTags = pageCache.tags.filter(tag => !(tag as TagCacheEx).intabs);
	const newTags = filteredTags.concat(tabCache.tags as TagCacheEx[]).sort((a, b) => {
		return a.position.start.offset - b.position.start.offset;
	});

	pageCache.tags = newTags;
}
