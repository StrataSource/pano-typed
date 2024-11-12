/**
 * @file P2:CE-specific event definitions.
 */

interface GlobalEventNameMap {
	AchievementInfoLoaded:              () => void;
	AchievementEarned:                  (player_index: number, achievement_index: number) => void;
	GameSaved:							(save_name: string, save_type: SaveType) => void,
}
