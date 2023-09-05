import { Tab } from "../tab";

export class Parser {}

export function parseTabs(source: string): Tab[] {
	const lines = source.split("\n");
	const tabs: Tab[] = [];
	let newTab = null;

	for (const line of lines) {
		if (line.startsWith("---tab")) {
			if (newTab) {
				tabs.push(newTab);
				newTab = null;
			}

			const match = line.match(/---tab (\w+) (.+)/);
			if (match) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [_, id, label] = match;
				newTab = {
					id: id.trim(),
					label: label.trim(),
					content: "",
				};
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
		tabs.push(newTab);
	}

	return tabs;
}
