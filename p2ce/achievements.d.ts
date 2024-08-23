interface Achievement {
	/** Name of the achievement */
	name: string; 
	/** Index of the achievement (for use with the API) */
	index: number; 
	/** True if this has been achieved */
	achieved: boolean; 
	/** True if this is available */
	available: boolean; 
	/** 	True if this is a "hidden" achievement. It should not be displayed in its full glory until achieved */
	hide_until_achieved: boolean; 
	flags: number;
	/** Current count, if a stat is involved with this achievement. The achievement is granted when count >= goal */
	count: number; 
	/**Stat goal for this achievement */
	goal: number; 
}

declare namespace AchievementsAPI {
	/**
	 * Returns true if cheats were turned on at any point during this session
	 */
	function HasCheated(): boolean;

	/**
	 * Returns the total number of achievements
	 */
	function GetAchievementCount(): number;

	/**
	 * Returns a description of the specified achievement
	 * @param index Index of the achievement
	 */
	function GetAchievement(index: number): Achievement;

	/**
	 * Returns a complete list of all achievements. Shorthand for calling GetAchievement for each index
	 */
	function GetAchievements(): Array<Achievement>;

	/**
	 * Returns true if this achievement has been granted
	 * @param index Achievement index
	 */
	function HasAchievement(index: number): boolean;

	/**
	 * Returns true if this achievement has been granted
	 * @param name Name of the achievement
	 */
	function HasAchievementByName(name: string): boolean;

	/**
	 * Returns an array of achievement indices that have been achieved during this session of gameplay
	 */
	function GetAchievedDuringCurrentGame(): Array<number>;
}
