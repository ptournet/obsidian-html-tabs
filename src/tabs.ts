export class Tab {
    id = 0;
    label = "";
    content = "";
}

export class Tabs {
    tabs: Tab[] = [];
    active_id = 0;

    constructor() {
    }
    
    public hasTabs() : boolean {
        return this.tabs.length > 0;
    }
}
