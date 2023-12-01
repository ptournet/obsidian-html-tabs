import { Loc } from "obsidian";

export class Line {
	text: string;
	loc: Loc;

	constructor(text: string, line: number, offset: number) {
		this.text = text;
		this.loc = { col: 0, line, offset };
	}
}

export type Lines = Line[];
