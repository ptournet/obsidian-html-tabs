# Obsidian HTML-Tabs

This plugin allows you to easily embed tab controls in your notes.

## Example

## Installation

## Usage

The definition of a tab control containing 3 tabs has the following structure:
```markdown
~~~tabs
---tab <label-of-first-tab>
<content-of-first-tab>
---tab <label-of-second-tab>
<content-of-second-tab>
---tab <label-of-third-tab>
<content-of-third-tab>
~~~
```
or:
~~~markdown
```tabs
---tab <label-of-first-tab>
<content-of-first-tab>
---tab <label-of-second-tab>
<content-of-second-tab>
---tab <label-of-third-tab>
<content-of-third-tab>
```
~~~

The `<label>` of a tab is in plain text (no markdown allowed), while its `<content>` can use the full Obsidian Markdown syntax. It's particularly possible to embed antother note (with the syntax `![[Note-to-embed]]`) or have a fenced code block.

In this case, you have to be careful not to use the same characters as the ones for defining your tabs: if you used 
```
~~~tabs
~~~
```
the code blocks in your tabs should be defined as:
~~~
```<lang>
```
~~~
but if you're used to defining you code blocks as:
```
~~~<lang>
~~~
```
then you should define your tabs as: 
~~~
```tabs
```
~~~

## Customization

For the time being, if you want to change the way your tabs look, you have to use a `CSS Snippet`.

For that, you'll first need to create a `html-tabs.css` file in your `snippets` directory. If you don't know where it lives on your hard drive, you can locate it at the bottom of the `Appearance` page in your Obsidian `Settings`.

## Contributing

## Pricing

This plugin is provided to everyone for free, however if you would like to say thanks or help support continued development, feel free to send a little my way through one of the following methods:

[![GitHub Sponsors](https://img.shields.io/github/sponsors/ptournet?style=social)](https://github.com/sponsors/ptournet)
[![Paypal](https://img.shields.io/badge/paypal-ptournet-yellow?style=social&logo=paypal)](https://paypal.me/ptournet)

## Todo
- [ ] First version of README
- [ ] Create Settings
- [ ] Test on Android
- [ ] Create a test-vault and modify *dev* script
- [ ] Releasing v1.0.0
- [ ] Improve standard editing experience (place cursor in the right place in the right tab)
- [ ] Improve embedded editing experience (if tab content is in another note, allow editing that note instead)
- [ ] Buttons to easily create/edit tabs
- [ ] More visual configuration (for people who don't master CSS)