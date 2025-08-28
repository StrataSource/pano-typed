/**
 * @example Declaring new events
 * You can define new event types by redeclaring the GlobalEventNameMap interface with your new events. This is required when using Typescript and `ALLOW_MISSING_EVENTS` is `false`.
 * ```js
 * interface GlobalEventNameMap {
 *   MyCustomEvent:    (yippee: boolean) => void;
 * }
 * ```
 */

interface GlobalEventNameMap {
	AchievementInfoLoaded:              () => void;
	AchievementEarned:                  (player_index: number, achievement_index: number) => void;
	GameSaved:							(save_name: string, save_type: SaveType) => void,
}
