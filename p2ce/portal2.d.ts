/**
 * @packageDocumentation
 * Portal 2
 */

declare enum MapStatus {
	NONE = 0,
	DOWNLOADING = 1,
	DELETING = 2
}

interface MapData {
	name: string;
	filename: string;
	bFileExists: boolean;
	currentOperation: MapStatus;
}

interface GlobalEventNameMap {
	PanoramaComponent_Portal2Workshop_OnMapActionCompleted: (mapIndex: number, map: MapData) => void;
	PanoramaComponent_Portal2Workshop_OnMapsRefreshed: () => void;
	PanoramaComponent_Portal2Workshop_OnAsyncActionFailed: (reasonLoc: string) => void;
	PanoramaComponent_Portal2Workshop_OnMapRequestRating: (mapIndex: number, map: ChapterInfo) => void;
	PanoramaComponent_Portal2Workshop_OnRefreshStarted: () => void;
}

declare namespace Portal2WorkshopAPI {
	function GetMapStatus(mapIndex: number): MapData;
	function IsEnabled(): boolean;
	function GetNumMaps(): number;
	function DownloadMap(mapIndex: number): void;
	function DeleteMap(mapIndex: number): void;
	function ReloadMaps(): void;
	function IsRatingMap(): boolean;
	// group is undefined if mapIndex === -1
	function GetVotingData(): { mapIndex: number, map: ChapterInfo };
	function SetItemVote(mapIndex: number, vote: number): void;
	function VotingCompleted(): void;
}
