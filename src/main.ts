import { MarkdownPostProcessorContext, Plugin } from 'obsidian';
// import { defaultSettings, HTMLTabsPluginSettings } from "./settings";
import { Tabs } from './tabs';
import { getTabExtSource, parseTabs } from './util/parsing';
import { rebuildPageCache } from "./util/cache";
import { render } from 'ui/rendering';
import Alpine from 'alpinejs';
 
Alpine.prefix("data-x-")
Alpine.start();

declare global {
	interface Window {
		html_tabs_plugin: HTMLTabsPlugin;
	}
}

export default class HTMLTabsPlugin extends Plugin {
	// settings: HTMLTabsPluginSettings | undefined;

	async onload() {
		window.html_tabs_plugin = this;

		// await this.loadSettings();

		this.registerCodeblockPostProcessorWithPriority("tabs", -100, async (source, el, ctx) => this.renderTabs(source, el, ctx));

		// // This creates an icon in the left ribbon.
		// const ribbonIconEl = this.addRibbonIcon('dice', 'HTML Tabs', (evt: MouseEvent) => {
		// 	// Called when the user clicks the icon.
		// 	new Notice('This is a notice!');
		// });
		// // Perform additional things with the ribbon
		// ribbonIconEl.addClass('html-tabs-ribbon-class');

		// // This adds a simple command that can be triggered anywhere
		// this.addCommand({
		// 	id: 'open-sample-modal-simple',
		// 	name: 'Open sample modal (simple)',
		// 	callback: () => {
		// 		new SampleModal(this.app).open();
		// 	}
		// });

		// // This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: 'sample-editor-command',
		// 	name: 'Sample editor command',
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		console.log(editor.getSelection());
		// 		editor.replaceSelection('Sample Editor Command');
		// 	}
		// });

		// // This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'open-sample-modal-complex',
		// 	name: 'Open sample modal (complex)',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// });

		// // This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new HTMLTabsSettingTab(this.app, this));

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		console.log(`Alpine.js ${Alpine.version} loaded`);
	}

	onunload() {
		console.log(`Alpine.js ${Alpine.version} unloaded`);
	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, defaultSettings, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }

    /** Register a markdown codeblock post processor with the given priority. */
    public registerCodeblockPostProcessorWithPriority(
        language: string,
        priority: number,
        processor: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>
    ) {
        const registered = this.registerMarkdownCodeBlockProcessor(language, processor);
        registered.sortOrder = priority;
    }

	public async renderTabs(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
		const tabLines = getTabExtSource(el, ctx);
		const tabs = parseTabs(tabLines);
		rebuildPageCache(this.app, tabLines);
		render(tabs, source, el, ctx);
	}

}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		const {contentEl} = this;
// 		contentEl.empty();
// 	}
// }

// class HTMLTabsSettingTab extends PluginSettingTab {
// 	plugin: HTMLTabsPlugin;

// 	constructor(app: App, plugin: HTMLTabsPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();

// 		new Setting(containerEl)
// 			.setName('Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue(this.plugin.settings.mySetting)
// 				.onChange(async (value) => {
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
