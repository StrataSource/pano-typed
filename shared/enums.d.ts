/** Defines a panel event source. */
declare type PanelEventSource = ValueOf<PanelEventSourceEnum>;
/** @group enum */
interface PanelEventSourceEnum {
	PROGRAM:	0;
	GAMEPAD: 	1;
	KEYBOARD: 	2;
	MOUSE: 		3;
	INVALID: 	4;
}

/** Defines the current game state. */
declare type GameUIState = ValueOf<GameUIStateEnum>;
/** @group enum */
interface GameUIStateEnum {
	INVALID: 		0;
	LOADINGSCREEN: 	1;
	INGAME: 		2;
	MAINMENU: 		3;
	PAUSEMENU: 		4;
	INTROMOVIE: 	5;
}
