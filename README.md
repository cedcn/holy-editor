# HolyEditor

### [Demo](http://demo.cedcn.com/holy-editor/current/example/)  👈👈👈
![img](http://oopa8bahf.bkt.clouddn.com/holy-editor.jpg)

## Install
```
$ npm install holy-editor --save
```

or

```
$ yarn add holy-editor
```

## Usage for webpack

```javascript
import HolyEditor from 'holy-editor';

const editor = new HolyEditor(selector [,options]);
```

### selector

default: '#editor'

### options

  - toolbars: Array

    > Display what tools you'll need. Grouping by '|' separator.

  - theme: String

  - tools: Object

    > Each tools can be configure. key value is the tool's name of camel format.

### methods

- setValue(value: String)

- getValue()

- append(value: String)

- clear()

## How to extension?

... ...
