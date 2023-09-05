import {expect, test} from '@jest/globals';
import { parseTabs } from "../../src/util/parsing";

test("parseTabs", () => {
    const source = `Line to ignore
---tab Profile
One liner profile tab content.
---tab* Account
---tab Settings
Multiline settings
tab content.`;
    const expectedTabs = {
		active_id: 1,
		tabs: [
			{
				id: 0,
				label: "Profile",
				content: "One liner profile tab content.",
			},
			{
				id: 1,
				label: "Account",
				content: "",
			},
			{
				id: 2,
				label: "Settings",
				content: "Multiline settings\ntab content.",
			},
		],
	};
     
    
    const parsedTabs = parseTabs(source);
    expect(parsedTabs).toMatchObject(expectedTabs);
})
