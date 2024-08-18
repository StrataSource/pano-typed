/**
 * @file Defines built-in events from Panorama's events system
 * @see https://github.com/StrataSource/pano-typed/
 */

/** Represents the info object provided by a DragEvent */
interface DragEventInfo {
	removePositionBeforeDrop: boolean;
	offsetX: number;
	offsetY: number;
	displayPanel: Panel | null;
}

interface PanelEventNameMap {
	'AddStyle':							(cls: string) => void,
	'AddStyleToEachChild':				(cls: string) => void,
	'CarouselAutoScroll':				(autoscroll_id: number) => void,
	'CarouselChildrenChanged':			(panel: Panel) => void,
	'CarouselNavIncrementSelectedIndex':(inc: number) => void,
	'CarouselNavSetSelectedIndex':		(index: number) => void,
	'DragStart':						(source: unknown, info: DragEventInfo) => void,
	'DropInputFocus':					() => void,
	'IfHasClassEvent':					(cls: string, eventToFire: string) => void,
	'IfHoverOtherEvent':				(otherPanelID: string, eventToFire: string) => void,
	'IfNotHasClassEvent':				(cls: string, eventToFire: string) => void,
	'IfNotHoverOtherEvent':				(otherPanelID: string, eventToFire: string) => void,
	'ImageFailedLoad':					() => void,
	'MovePanelDown':					(repeatCount: int32) => void,
	'MovePanelLeft':					(repeatCount: int32) => void,
	'MovePanelRight':					(repeatCount: int32) => void,
	'MovePanelUp':						(repeatCount: int32) => void,
	'PagePanelDown':					() => void,
	'PagePanelLeft':					() => void,
	'PagePanelRight':					() => void,
	'PagePanelUp':						() => void,
	'PanelLoaded':						() => void,
	'PanoramaCastVoteNo':				() => void,
	'PanoramaCastVoteYes':				() => void,
	'RemoveStyle':						(cls: string) => void,
	'RemoveStyleFromEachChild':			(cls: string) => void,
	'ResetCarouselMouseWheelCounts':	() => void,
	'ScrollPanelDown':					() => void,
	'ScrollPanelLeft':					() => void,
	'ScrollPanelRight':					() => void,
	'ScrollPanelUp':					() => void,
	'ScrollToBottom':					() => void,
	'ScrollToTop':						() => void,
	'SetCarouselSelectedChild':			(panel: Panel) => void,
	'SetChildPanelsSelected':			(selected: boolean) => void,
	'SetInputFocus':					() => void,
	'SetPanelEnabled':					(enabled: boolean) => void,
	'SetPanelSelected':					(selected: boolean) => void,
	'SwitchStyle':						(slot: string, cls: string) => void,
	'TogglePanelSelected':				() => void,
	'ToggleStyle':						(cls: string) => void,
	'TriggerStyle':						(cls: string) => void,
	'UpdateFocusAndDirtyChildStyles':	() => void,
}

interface GlobalEventNameMap {
	'AsyncEvent':						(delay: duration, eventToFire: string) => void,
	'MainMenuResumeGame':				() => void,
	'MainMenuPauseGame':				() => void,
	'ShowPauseMenu':					() => void,
	'HidePauseMenu':					() => void,
	'ShowMainMenu':						() => void,
	'HideMainMenu':						() => void,
	'HudProcessInput':					() => void,
	'HudThink':							() => void,
	'ShowIntroMovie':					() => void,
	'HideIntroMovie':					() => void,
	'DemoPlaybackControl': 				(str: string, flt: float) => void,
	'GameEventFired':					(event: string) => void,
	'LayoutReloaded':					() => void,
	'PageDown':							() => void,
	'PageLeft':							() => void,
	'PageRight':						() => void,
	'PageUp':							() => void,
	'PanoramaGameTimeJumpEvent':		(time: duration) => void,
	'ReloadBackground':					() => void,
	'ScrollDown':						() => void,
	'ScrollLeft':						() => void,
	'ScrollRight':						() => void,
	'ScrollUp':							() => void,
	'ShowCenterPrintText':				(message: string, priority: unknown) => void,
	'ShowContentPanel':					() => void,
	'ShowVoteContextMenu':				() => void,
	'StaticHudMenu_EntrySelected':		(panel: Panel) => void,
	'UnloadLoadingScreenAndReinit':		() => void,
}
