import { MarkdownPostProcessorContext } from "obsidian";
import { Tabs } from "tabs";

export function render(tabs: Tabs, source: string, container: HTMLElement, ctx: MarkdownPostProcessorContext): void {
	if (!tabs.hasTabs()) {
		renderCodeBlock(container, source, "html");
		return;
	}

	const divMain = container.createEl("div", "{'attr':{'x-data': '{ tab: " + tabs.active_id + " }'}}");
	const divTabs = divMain.createEl("div", { cls: ["html-tabs"] });
	for (let index = 0; index < tabs.tabs.length; index++) {
		const element = tabs.tabs[index];
		divTabs.createEl("div", { text: element.label });
	}

	const divContent = divMain.createEl("div");
	for (let index = 0; index < tabs.tabs.length; index++) {
		const element = tabs.tabs[index];
		divContent.createEl("div", { text: element.content });
	}
}

export function renderCodeBlock(container: HTMLElement, source: string, language?: string): HTMLElement {
	const code = container.createEl("code", { cls: ["html-tabs"] });
	if (language) {
		code.classList.add("language-" + language);
	}
	code.appendText(source);
	return code;
}
