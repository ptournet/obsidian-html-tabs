import { MarkdownPostProcessorContext, MarkdownRenderer } from "obsidian";
import { Tabs } from "tabs";

export function render(tabs: Tabs, source: string, container: HTMLElement, ctx: MarkdownPostProcessorContext): void {
	if (!tabs.hasTabs()) {
		renderCodeBlock(container, source, "html");
		return;
	}

	const plugin = window.html_tabs_plugin;

	const mainAttributes = { "data-x-data": "{ tab: " + tabs.active_id + " }" };
	const divMain = container.createEl("div", { attr: mainAttributes });
	const divTabs = divMain.createEl("div", { cls: ["html-tabs"] });
	for (let index = 0; index < tabs.tabs.length; index++) {
		const element = tabs.tabs[index];
		const classes = ["html-tab"];
		if (index > 0) {
			classes.push("html-tab-not-first");
		}
		if (index === tabs.active_id) {
			classes.push("html-tab-active");
		}
		const attributes = {
			"data-x-bind:class": "{ 'html-tab-active': tab == " + element.id + " }",
			"data-x-on:click": "tab = " + element.id,
		};
		divTabs.createEl("div", { text: element.label, cls: classes, attr: attributes });
	}
	
	const divContent = divMain.createEl("div", { cls: ["html-tab-content"] });
	for (let index = 0; index < tabs.tabs.length; index++) {
		const element = tabs.tabs[index];
		const attributes = {
			"data-x-show": "tab == " + element.id,
		};
		const divTabContent = divContent.createEl("div", { attr: attributes });
		MarkdownRenderer.render(plugin.app, element.content, divTabContent, ctx.sourcePath, plugin);
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
