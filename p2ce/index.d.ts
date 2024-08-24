/**
 * @packageDocumentation
 * P2:CE-specific types.
 */

/// <reference path="../shared/index.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./weapons.d.ts" />
/// <reference path="./achievements.d.ts" />

declare namespace GameStateAPI {
	/** Returns true if this is a playtest build of P2CE */
	function IsPlaytest(): boolean;

	/** Returns true if the current playtest session is recording a demo */
	function IsPlaytestRecording(): boolean;
}
