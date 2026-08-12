interface GameSave {
	name: string;				// Name of this save, used to load, delete, or otherwise refer to this save
	chapter: number;			// Chapter this save belongs to under P2:CE's Campaign API
	comment: string;
	elapsedSeconds: number;
	fileName: string;			// Name of the .sav file on disk, includes the extension
	fileTime: Date;				// Save time
	fullFileName: string;		// Full path from the base game directory to the .sav file
	isAutoSave: boolean;
	isCloudSave: boolean;
	isSavedInCloud: boolean;
	mapGroup: string;			// Campaign ID this save belongs to under P2:CE's Campaign API
	mapName: string;			// Map this save was created on
	screenshotFileName: string;	// Full path from the base game directory to the .tga file
	screenshotPath: string;		// Panorama path to the screenshot file
}

declare namespace GameSavesAPI {
	function GetGameSaves(): Array<GameSave>;
	function GetGameSave(name: string): GameSave | null;
	function CreateSaveGame(): void;
	function CreateNamedSave(name: string): void;
	function LoadSaveGame(name: string): void;
	function DeleteSaveGame(name: string): void;
	function IsSaveInProgress(): boolean;
	function IsAutosaveInProgress(): boolean;
}
