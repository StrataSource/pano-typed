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
