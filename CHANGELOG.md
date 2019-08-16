# [Change Log]

## [0.6.0] - 2019-08-16
### Fixed
 * Refactor extension to use the new packages [@types/vscode and vscode-test](https://code.visualstudio.com/updates/v1_36#_splitting-vscode-package-into-typesvscode-and-vscodetest)

### Removed
 * Travis / AppVeyor integration to reduce complexity (all platforms are still covered by Azure DevOps)

## [0.5.1] - 2018-12-12
### Fixed
 * Fixed formatting bug when segment terminator is preceded by escaped release character (related to fix in version 0.5.0)

## [0.5.0] - 2018-12-11
### Added
 * TSLint Integration

### Fixed
 * Fixed hidden segment terminator when preceded by escaped release character

## [0.4.0] - 2018-09-19
### Added
 * Azure DevOps Integration
 * Segments comprise their terminators at the end of the line

## [0.3.0] - 2018-04-09
### Fixed
 * Fixed missing segments in symbol list for files with CRLF line ending

## [0.2.0] - 2017-12-08
### Added
 * Allow collapsing messages 

## [0.1.0] - 2017-09-22
### Added
 * Automatically detect EDIFACT language in files with unknown extension

### Fixed
 * Fixed bug of showing nonexistent segments in symbol list

## [0.0.5] - 2017-08-04
### Added
 * Show EDIFACT segments in symbol list

## [0.0.4] - 2017-04-22
### Added
 * AppVeyor Integration
 * Implemented formatting for messages with non-standard segment terminator

## [0.0.3] - 2016-11-27
### Added
 * Travis CI Integration

### Fixed
 * Fixed regression in test suite due to [new format command](https://code.visualstudio.com/updates/v1_7#_new-commands)

## [0.0.2] - 2016-09-15
### Added 
 * Included link to GitHub repo in Marketplace page

### Fixed
 * Fixed highlighting only the first 2 characters of RFF / NAD code qualifier

## [0.0.1] - 2016-09-13
 * Initial release
