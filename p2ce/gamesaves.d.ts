interface GameSave {
	chapter: number;			// Chapter this save belongs to under P2:CE's Campaign API
	comment: string;
	elapsedSeconds: number;
	fileName: string;			// Name of the .sav file on disk, includes the extension
	fileTime: string;			// Save time
	fullFileName: string;		// Full path from the base game directory to the .sav file
	isAutoSave: boolean;
	isCloudSave: boolean;
	isSavedInCloud: boolean;
	mapGroup: string;			// Campaign ID this save belongs to under P2:CE's Campaign API
	mapName: string;			// Map this save was created on
	screenshotFileName: string; // Full path from the base game directory to the .sav file
}

declare namespace GameSavesAPI {
	function GetGameSaves(): Array<GameSave>;
	function CreateSaveGame(): void;
	function IsSaveInProgress(): boolean;
	function IsAutosaveInProgress(): boolean;
}
