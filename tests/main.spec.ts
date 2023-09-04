import { App, PluginManifest } from "obsidian";
import {expect, test} from '@jest/globals';
import HTMLTabsPlugin from "../src/main";

test("parseTabs", () => {
    const app = new App();
    const pm = {
            id: "",
            name: "",
            author: "",
            version: "",
            minAppVersion: "",
            description: "",
    } as PluginManifest;
    const plugin = new HTMLTabsPlugin(app, pm);
    const source = `Line to ignore
---tab 1 Profile
One liner profile tab content.
--- tab 2 Account
--- tab 3 Settings
Multiline settings
tab content.`;
    const expectedTabs = [
        {
            id: "1",
            label: "Profile",
            content: "One liner profile tab content."
        },
        {
            id: "2",
            label: "Account",
            content: ""
        },
        {
            id: "3",
            label: "Settings",
            content: "Multiline settings\ntab content."
        }
    ]
    
    const parsedTabs = plugin.parseTabs(source);
    expect(parsedTabs).toMatchObject(expectedTabs);
})
