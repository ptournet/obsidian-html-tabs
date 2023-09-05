import { Tabs } from "../tabs";

export class Parser {}

export function parseTabs(source: string): Tabs {
	const lines = source.split("\n");
    const tabs: Tabs = { tabs: [], active_id: 0 };
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
