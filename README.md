# Example Isomorphic TS/JS Lib Template _(@digitalcredentials/security-document-loader)_

[![Build status](https://img.shields.io/github/workflow/status/digitalcredentials/security-document-loader/Node.js%20CI)](https://github.com/digitalcredentials/security-document-loader/actions?query=workflow%3A%22Node.js+CI%22)
[![NPM Version](https://img.shields.io/npm/v/@digitalcredentials/security-document-loader.svg)](https://npm.im/@digitalcredentials/security-document-loader)

> A Typescript/Javascript isomorphic library template, for use in the browser, Node.js, and React Native.

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Background

Included functionality:

* Bundled contexts:
  - DID, VC, DCC, Open Badges v3, ed25519 and x25519 crypto suite contexts
* DID resolver for `did:key` and `did:web`
* Optional loading of arbitrary contexts from the web (see Usage).

## Security

TBD

## Install

- Node.js 16+ is recommended.

### NPM

To install via NPM:

```
npm install @digitalcredentials/security-document-loader
```

### Development

To install locally (for development):

```
git clone https://github.com/digitalcredentials/security-document-loader.git
cd security-document-loader
npm install
```

## Usage

To get a default document loader (with the stock set of bundled contexts):

```js
import { securityLoader } from '@digitalcredentials/security-document-loader'

const documentLoader = securityLoader().build()
```

To add additional contexts:

```js
import { securityLoader } from '@digitalcredentials/security-document-loader'

const loader = securityLoader()
loader.addStatic('https://example.com/my-context/v1', contextObject)

const documentLoader = loader.build()
```

To enable fetching arbitrary contexts from the web (not recommended, if you can
avoid it):

```js
const documentLoader = securityLoader({ fetchRemoteContexts: true }).build()
```

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT License](LICENSE.md) © 2022 Digital Credentials Consortium.
