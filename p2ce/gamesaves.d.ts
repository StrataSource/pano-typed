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
	// Returns list of saves.
	function GetGameSaves(): Array<GameSave>;
	// Returns save by name.
	function FindGameSave(name: string): GameSave | null;
	// Saves the game using a given name. If null or undefined, the name is automatically generated using the current time.
	function CreateSaveGame(name: string | null | undefined): void;
	// Loads a save with a given name.
	function LoadSaveGame(name: string): void;
	// Deletes a save with a given name.
	function DeleteSaveGame(name: string): void;
	// Returns whether or not a game save is currently being saved.
	function IsSaveInProgress(): boolean;
	// Returns whether or not an game autosave is currently being saved.
	function IsAutosaveInProgress(): boolean;
}
