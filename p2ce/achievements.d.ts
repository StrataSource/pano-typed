/** Defines the structure of a single achievement. */
interface Achievement {
	name: string;						// Name of the achievement
	index: number;						// Index of the achievement (for use with the API)
	achieved: boolean;					// True if this has been achieved
	available: boolean;					// True if this is available
	hide_until_achieved: boolean;		// True if this is a "hidden" achievement. It should not be displayed in its full glory until achieved
	flags: number;
	count: number;						// Current count, if a stat is involved with this achievement. The achievement is granted when count >= goal
	goal: number;						// Stat goal for this achievement
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
