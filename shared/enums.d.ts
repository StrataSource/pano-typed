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

declare const enum ScrollBehavior {
	SCROLL_MINIMUM_DISTANCE = 		0,
	SCROLL_TO_TOPLEFT_EDGE = 		1,
	SCROLL_TO_BOTTOMRIGHT_EDGE = 	2,
	SCROLL_TO_CENTER = 				3
}

declare const enum SpectateMode {
	/** Not in spectate mode */
	NONE = 		0,
	/** Death cam animation */
	DEATHCAM = 	1,
	/** TF2-styling freeze cam (unused) */
	FREEZECAM = 2,
	/** Fixed camera position (unused) */
	FIXED = 	3,
	/** Follows a player in first person */
	IN_EYE = 	4,
	/** Follows a player in third person */
	CHASE = 	5,
	/** Free roaming (noclip-like) */
	ROAMING = 	6
}

declare const enum OverlayToStoreFlags {
	NONE = 0,
	ADD_TO_CART = 1,
	ADD_TO_CART_AND_SHOW = 2
}
