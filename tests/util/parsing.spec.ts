import {expect, test} from '@jest/globals';
import { parseTabs } from "../../src/util/parsing";

test("parseTabs", () => {
    const source = `Line to ignore
---tab 1 Profile
One liner profile tab content.
---tab* 2 Account
---tab 3 Settings
Multiline settings
tab content.`;
    const expectedTabs = {
		active_id: "2",
		tabs: [
			{
				id: "1",
				label: "Profile",
				content: "One liner profile tab content.",
			},
			{
				id: "2",
				label: "Account",
				content: "",
			},
			{
				id: "3",
				label: "Settings",
				content: "Multiline settings\ntab content.",
			},
		],
	};
     
    
    const parsedTabs = parseTabs(source);
    expect(parsedTabs).toMatchObject(expectedTabs);
})
