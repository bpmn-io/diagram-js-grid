# Changelog

All notable changes to [diagram-js-grid](https://github.com/bpmn-io/diagram-js-grid) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 2.0.1

* `DEPS`: explicitly depend on `min-dom`

## 2.0.0

* `DEPS`: update to `min-dash@5.0.0`
* `DEPS`: update to `tiny-svg@4.1.4`
* `CHORE`: turn into ES module ([#39](https://github.com/bpmn-io/diagram-js-grid/pull/39))
* `CHORE`: drop `UMD` and `CJS` distributions

### Breaking Changes

* No longer ships with CJS or UMD. Consume with `Node >= 20.12` as an ES module ([#39](https://github.com/bpmn-io/diagram-js-grid/pull/39))

## 1.1.0

* `FEAT`: support `diagram-js@15.1.0`

## 1.0.0

* `FEAT`: enable grid per default ([#11](https://github.com/bpmn-io/diagram-js-grid/pull/11), )
* `FEAT`: allow grid to work in viewer ([#2](https://github.com/bpmn-io/diagram-js-grid/issues/2))
* `DEPS`: dependency updates

## 0.2.0

* `FEAT`: add public API for introspection + toggling

## 0.1.0

_Initial version._