<div align="center" style="margin-top: 40px">
    <img src="./public/svg-logo-bg-trans-cropped.svg" alt="JQLite Logo" width="50px"/>
    <h1 style="margin-top: 15px;">JQLite</h1>
    <p>The query language for JSON</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-green?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT">
  <img src="https://img.shields.io/codecov/c/github/Jay-Karia/jqlite?style=flat-square"alt="Test Coverage">
</p>

---

<table align="center">
  <tr>
    <td align="center">
      <strong>🚀 Coming Soon!</strong><br>
    </td>
  </tr>
</table>

---

### 🌟 Features

- **Basic query selection**
- **Fallback Mechanism**
- **Wildcard support**
- **Array Slices**
- **Multiple Key Selection**
- **Multiple Key Omission**
- **Single Key Omission**
- **Functions**
- **Comparison Operators**
- **Configurable**

### 📦 Installation

```sh
# npm
npm install jqlite-ts
# yarn
yarn add jqlite-ts
# pnpm
pnpm add jqlite-ts
```

### 🚀 Getting Started

```js
import { config, data, query } from 'jqlite-ts';

// Load the data from a JSON file
data.load("./data.json");

// Override the default config
config.set({
  fallback: "No data found!"
});

// Run the query
query.run("$.friends[*].(name, age)", (result) => {
  console.log(result);
});

```

### 📌 Examples

```js
// Basic Selection
$.friends[0].name

// Fallback
$.friends[0].favorites.game ?? "No favorite game"

// Wildcard
$.friends[*].name

// Array Slices
$.friends[0:2].name

// Multiple Key Selection
$.friends[0].(name, age)

// Multiple Key Omission
$.friends[0].!(name, age)

// Single Key Omission
$.friends[0].!name

// Functions
$.friends[0].name.#upper()
$.friends[*].age.#avg()
$.friends[*].hobbies.#length()

// Comparison Operators
$.friends[0].age > 20

// Conditions
$.friends[?(@.age >= 18)]
$.friends[?(@.country.#contains('IN'))].name
```
