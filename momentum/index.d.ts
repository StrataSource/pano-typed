/**
 * @packageDocumentation
 * Momentum-specific types.
 */

/// <reference path="../shared/index.d.ts" />

/** The map cache API. Exclusive to Momentum Mod! */
declare namespace MapCacheAPI {
	/** Gets the metadata for the current map */
	function GetCurrentMapData(): unknown;

	/** Gets the map data for a given mapID */
	function GetMapDataByID(mapID: uint32): unknown;

	/** Gets the current map's name. */
	function GetMapName(): string;

	/** Gets all the maps from the Map Cache */
	function GetMaps(): unknown;

	/** Returns true if the given mapID is queued for download */
	function MapQueuedForDownload(mapID: uint32): boolean;
}

interface MapData {
	name: string;
	thumbnail: {
		urlLarge: string;
	}
	mainTrack: {
		difficulty: number;
		numZones: number;
		isLinear: boolean;
	}
	credits: { type: string, user: { alias: string } }[];
}

declare type TimerEvent = TimerEventEnum[keyof TimerEventEnum];
declare interface TimerEventEnum {
	Started:     0,
	Finished:    1,
	Stopped:     2,
	Failed:      3,
}

declare type TimerState = TimerStateEnum[keyof TimerStateEnum];
declare interface TimerStateEnum {
	NotRunning:  0,
	Running:     1,
	Practice:    2,
}

declare interface GlobalEventNameMap {
	'OnMomentumTimerStateChange':		(ent: unknown, type: TimerEvent) => void,
	'OnMomentumZoneChange':				(enter: unknown, linear: unknown, curZone: unknown, curTrack: unknown, timerState: TimerState) => void,
	'OnSaveStateUpdate':				(count: number, current: unknown, usingMenu: boolean) => void,
	'OnMomentumReplayStopped':			() => void,
}

/**
 * API for reading and writing HUD config files.
 * 
 * C++ side is agnostic to what you pass it, and storing the entire layout structure in this
 * repo is annoying, so types here are deliberately very weak; types in the HUD customizer
 * files are much stronger.
 * 
 * Note that cfg/hud_default.kv3 is stored in a the licensee-only game repo, just let someone
 * (probably Tom) know if you need to update it.
 */
declare namespace HudCustomizerAPI {
	/** 
	 * Saves the given object to cfg/hud.kv3.
	 */
	function SaveLayoutFromJS(data: Record<string, any>): void;

	/** 
	 * Tries to get the contents of cfg/hud.kv3 as a JS object.
	 * 
	 * If cfg/hud.kv3 doesn't exist, loads cfg/hud_default.kv3.
	 */
	function GetLayout(): Record<string, any>;

	/**
	 * Gets the contents of cfg/hud_default.kv3 as a JS object.
	 */
	function GetDefaultLayout(): Record<string, any>;
}