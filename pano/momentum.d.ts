/**
 * @author Koerismo
 * @see https://github.com/koerismo/pano-typed/
 * @todo Momentum-specific types need to be added here!
 */

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

/* interface MapData {
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
} */
