
/**
 * Defines the save type, used with 'GameSaved' event in the 'type' parameter
 */
declare const enum SaveType {
	Manual = 0,		/** User saved with custom filename */
	Autosave,		/** Game saved progress automatically */
	Quicksave,		/** User saved using the quicksave key */
}

interface Save {
	name: string;
	thumb: string;
	time: number;
}

declare namespace SaveRestoreAPI {
	/** Returns an array of save games */
	function GetSaves(): Array<Save>;

	/**
	 * Saves the game
	 * @param name Name of the save or null to generate one based on the current time
	 */
	function SaveGame(name: string|null): void;

	/**
	 * Deletes a save
	 * @param name Name of the save to delete
	 */
	function DeleteSave(name: string): void;

	/**
	 * Loads a save game
	 * @param name Name of the save. Allowed characters: A-z 0-9 _ -
	 */
	function LoadSave(name: string): void;
}
