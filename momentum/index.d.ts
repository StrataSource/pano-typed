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

 /***************************************************************************************** */

interface Region extends JsonObject {
	points: Vec2D[];
	bottom: number;
	height: number;
	teleDestTargetName: string; // mutually exclusive to other two teleport fields
	teleDestPos: Vec3D; // TODO: This below are required if region is part of a volume used by stafe or major checkpoint zone
	teleDestYaw: number; // See convo in mom red 25/09/23 02:00 GMT
	safeHeight: number;
}
  
interface Zone extends JsonObject {
	regions: Region[];
	filtername: string;
}
  
interface Segment extends JsonObject {
	limitStartGroundSpeed: boolean;
	checkpointsRequired: boolean;
	checkpointsOrdered: boolean;
	checkpoints: Zone[];
	cancel: Zone[];
	name: string;
}

interface TrackZones extends JsonObject {
	segments: Segment[];
	end: Zone;
}
  
interface TrackMovementParams extends JsonObject {
	maxVelocity: number;
	defragFlags: number;
}

interface TrackBase extends JsonObject {
	zones: TrackZones;
	movementParams: TrackMovementParams;
}

interface MainTrack extends TrackBase {
	stagesEndAtStageStarts: boolean;
}

interface BonusTrack extends TrackBase {
}

interface MapTracks extends JsonObject {
	main: MainTrack;
	bonuses: BonusTrack[];
}

interface ZoneDef extends JsonObject {
	formatVersion: number;
	dataTimestamp: number;
	tracks: MapTracks;
}
  /**************************************************************************************************************/

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
