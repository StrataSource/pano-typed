/**
 * Defines a panel event source.
 * @group enum
 */
declare const enum PanelEventSource {
	PROGRAM = 0,
	GAMEPAD = 1,
	KEYBOARD = 2,
	MOUSE = 3,
	INVALID = 4
}

/**
 * Defines the current game state.
 * @group enum
 */
declare const enum GameUIState {
	INVALID = 0,
	LOADINGSCREEN = 1,
	INGAME = 2,
	MAINMENU = 3,
	PAUSEMENU = 4,
	INTROMOVIE = 5
}
