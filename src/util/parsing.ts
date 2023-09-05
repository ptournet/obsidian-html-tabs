import { Tabs } from "../tabs";

export class Parser {}

export function parseTabs(source: string): Tabs {
	const lines = source.split("\n");
    const tabs: Tabs = { tabs: [], active_id: "" };
	let newTab = null;

	for (const line of lines) {
		if (line.startsWith("---tab")) {
			if (newTab) {
				tabs.tabs.push(newTab);
				newTab = null;
			}

			const match = line.match(/---tab(\*)? (\w+) (.+)/);
			if (match) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [_, isStarred, id, label] = match;
				newTab = {
					id: id.trim(),
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
