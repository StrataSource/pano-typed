/**
 * @packageDocumentation
 * P2:CE-specific types.
 */

/// <reference path="../shared/index.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./weapons.d.ts" />
/// <reference path="./achievements.d.ts" />
/// <reference path="./saverestore.d.ts" />
/// <reference path="./workshop.d.ts" />

declare namespace GameStateAPI {
	/** Returns true if this is a playtest build of P2CE */
	function IsPlaytest(): boolean;

	/** Returns true if the current playtest session is recording a demo */
	function IsPlaytestRecording(): boolean;
}

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
