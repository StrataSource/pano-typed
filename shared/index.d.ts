/**
 * @packageDocumentation Shared types, present in all Strata games.
 * See the {@link shared/apis | APIs module} for a full list of APIs.
 * 
 * For more information, see the [official documentation](https://wiki.stratasource.org/shared/panorama/overview).
 */

/// <reference path="./primitives.d.ts" />
/// <reference path="./panels.d.ts" />
/// <reference path="./apis.d.ts" />
/// <reference path="./style.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./enums.d.ts" />

/**
 * Whether to throw type errors when trying to register an event handler with an
 * event that's not documented in TypeScript.
 */
type ALLOW_MISSING_EVENTS = false;

/**
 * Whether to throw type errors when trying to use $.CreatePanel or other API methods
 * taking a panel name, when that panel name is not documented in TypeScript.
 */
type ALLOW_MISSING_PANELS = false;
