# security-document-loader Changelog

## 6.0.0 - 2024-08-04
### Added
- Add support for VC DM 2.0 context

### Changed
- **BREAKING**: Switch to `@digitalcredentials/http-client` fork.

## 5.0.0 - 2024-02-10
### Changed
- **BREAKING**: For the HTTP protocol handler (for fetching un-cached documents
  from the web), switch to using `@digitalbazaar/http-client` instead of the
  global `fetch()` object. Improves React Native compatibility.

## 4.0.0 - 2024-01-23
### Changed
- **BREAKING**: Use the Typescript-enabled `@interop/did-web-resolver@4.0.0`, 
  which uses DigitalBazaar's version of `http-client`,
  and updated `@digitalcredentials/bnid@3.0.1`.
  Usage and API should remain unchanged, but bumping to major semver due to
  significant backend change.

## 3.2.0 - 2024-01-23
### Added
- Add support for OBv3 v3.0.3 and Extensions contexts.

## 3.1.0 - 2023-07-16
### Added
- Add support for optionally loading OBv3 BETA context.

## 3.0.0 - 2023-07-16
### Changed
- **BREAKING**: Now includes OBv3 contexts from beta to 3.0.2

## 2.0.0 - 2023-05-17
### Changed
- **Breaking**: Update OpenBadges v3 context to `v1.0.0`.

## 1.0.0 - TBD

### Added

- Initial commit.
