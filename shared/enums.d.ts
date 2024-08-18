/**
 * Defines a panel event source.
 * @group enum
 */
declare const enum PanelEventSource {
	PROGRAM =		'program',
	GAMEPAD =		'gamepad',
	KEYBOARD =		'keyboard',
	MOUSE =			'mouse',
	INVALID =		'invalid'
}

/**
 * Defines the current game state.
 * @group enum
 */
declare const enum GameUIState {
	INVALID =		0,
	LOADINGSCREEN =	1,
	INGAME =		2,
	MAINMENU =		3,
	PAUSEMENU =		4,
	INTROMOVIE =	5
}
