/**
 * @file Index
 * @see https://github.com/StrataSource/pano-typed/
 */

/// <reference path="./style.d.ts" />
/// <reference path="./events.d.ts" />

/* ========================    PRIMITIVES   ======================== */

type ValueOf<T> = T[keyof T];
type Func = (...args: any[]) => any;
type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/* ========================    JSON   ======================== */

// From https://github.com/sindresorhus/type-fest/blob/main/source/basic.d.ts
type JsonPrimitive = string | number | boolean | null;
type JsonObject = {[Key in string]: JsonValue} & {[Key in string]?: JsonValue | undefined};
type JsonArray = JsonValue[] | readonly JsonValue[];
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

interface PanelTagNameMap {
	'Panel': Panel,
	'Button': Button,
	'TextEntry': TextEntry,
	'ToggleButton': ToggleButton,
	'Frame': Frame,
	'Image': Image,
	'Label': Label,
	'Movie': Movie
	'NumberEntry': NumberEntry,
	'ProgressBar': ProgressBar,
	'ResizeDragKnob': ResizeDragKnob,
	'ModelPanel': ModelPanel,
	'UICanvas': UICanvas,
	'ChaosBackbufferImagePanel': ChaosBackbufferImagePanel,
	'ChaosLoadingScreen': ChaosBackbufferImagePanel,
	'ChaosMainMenu': ChaosMainMenu,
	'ChaosSettingsSlider': ChaosSettingsSlider,
}

/** Defines a panel event source. */
declare type PanelEventSource = ValueOf<PanelEventSourceEnum>;
interface PanelEventSourceEnum {
	PROGRAM:  0,
	GAMEPAD:  1,
	KEYBOARD: 2,
	MOUSE:    3,
	INVALID:  4,
}

/** Defines the current game state. */
declare type GameUIState = ValueOf<GameUIStateEnum>;
interface GameUIStateEnum {
	INVALID:       0,
	LOADINGSCREEN: 1,
	INGAME:        2,
	MAINMENU:      3,
	PAUSEMENU:     4,
	INTROMOVIE:    5
}

/** Represents the info object provided by a DragEvent */
interface DragEventInfo {
	removePositionBeforeDrop: boolean;
	offsetX: number;
	offsetY: number;
	displayPanel: Panel|null;
}

declare type float = number;
declare type double = number;

declare type uint16 = number;
declare type uint32 = number;
declare type uint64 = number;

declare type int16 = number;
declare type int32 = number;
declare type int64 = number;

/** A duration in seconds. */
declare type duration = number;

/** Represents a unique id return. */
declare type uuid = int32;

/** Represents a keyframes animation return. */
declare type Keyframes = unknown;

/* ======================== PANEL SELECTOR  ======================== */

type QueryOutput<E, T> = T extends `.${string}` ? E[] : E;

/** Selects an element. */
declare function $<E extends Panel, T extends string = string>(selector: T): QueryOutput<E, T>|null;

declare namespace $ {

	namespace persistentStorage {
		/** $.persistentStorage.length.  Returns an integer representing the number of data items stored in the Storage object. */
		const length: int32;

		/** $.persistentStorage.clear().  When invoked, will empty all keys out of the storage. */
		function clear(): void;

		/** $.persistentStorage.key(n).  When passed a number n, this method will return the name of the nth key in the storage. */
		function key(n: int32): string|null;

		/** $.persistentStorage.getItem(keyName).  When passed a key name, will return that key's value.
		 * @example $.persistentStorage.getItem('settings.mainMenuMovie');
		 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/main-menu/main-menu.js#L241)
		 */
		function getItem<T extends JsonValue>(keyName: string): T|null;

		/** $.persistentStorage.setItem(keyName, keyValue).  When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
		 * @example $.persistentStorage.setItem('dontShowAgain.' + key, true);
		 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/modals/popups/dont-show-again.js#L8)
		 */
		function setItem(keyName: string, keyValue: JsonValue): void;
	}

	/** Make a web request.
	 * @example $.AsyncWebRequest(DATA_URL, {
	 *  type: 'GET',
	 * 	complete: (data) =>
	 * 	data.statusText === 'success' ? resolve(data.responseText) : reject(data.statusText)
	 * });
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/learn.js#L259)
	 */
	function AsyncWebRequest(url: string, options?: {
		// https://fetch.spec.whatwg.org/#methods
		type: 'DELETE'|'GET'|'HEAD'|'OPTIONS'|'POST'|'PUT',
		complete: (data: {
			responseText: string,
			statusText: string,
		}) => void,
	}): void;

	/** Cancel a scheduled function.
	 * @example $.CancelScheduled(ConsoleNotify.scheduleOpacity);
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/console-notify.js#L8)
	 */
	function CancelScheduled(event: number): void;

	/** Compresses the given string, and encodes result in base64. */
	function CompressString(str: string): string;

	/** Create a new panel.
	 * @example $.CreatePanel('Split', wrapper, '', { class: 'split--hud split--latest' });
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L107)
	 */
	function CreatePanel<T extends keyof PanelTagNameMap>(type: T, parent: Panel, id: string, properties?: Record<string, unknown>): PanelTagNameMap[T];
	function CreatePanel(type: string, parent: Panel, id: string, properties?: Record<string, unknown>): Panel;

	/** Call during JS startup code to check if script is being reloaded */
	function DbgIsReloadingScript(...args: any[]): void;

	/** Decompresses the given base64 encoded input into a string. */
	function DecompressString(str: string): string;

	/** Define an event.
	 *  @param event The event name.
	 *  @param argscount The number of arguments that this event takes.
	 *  @param argsdesc An optional description for the event arguments.
	 *  @param desc An option description for the event.
	 *  @example $.DefineEvent( eventName, NumArguments, [optional] ArgumentsDescription, [optional] Description )
	 *  @example $.DefineEvent('SettingsNavigateToPanel', 2, 'category, settingPanel', 'Navigates to a setting by panel handle');
	 *  @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/util/event-definition.js#L6)
	 */
	function DefineEvent(event: string, argscount: number, argsdesc?: string, desc?: string): void;

	/** Appears to be identical to $.DefineEvent(...). This function is not used anywhere in Momentum UI.
	 *  @param event The event name.
	 *  @param argscount The number of arguments that this event takes.
	 *  @param argsdesc An optional description for the event arguments.
	 *  @param desc An option description for the event.
	 *  @example $.DefinePanelEvent( eventName, NumArguments, [optional] ArgumentsDescription, [optional] Description )
	 *  @example $.DefinePanelEvent('SettingsNavigateToPanel', 2, 'category, settingPanel', 'Navigates to a setting by panel handle');
	 *  @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/util/event-definition.js#L7)
	 */
	function DefinePanelEvent(event: string, argscount: number, argsdesc?: string, desc?: string): void;

	/** Dispatch an event.
	 *  @example $.DispatchEvent('SettingsNavigateToPanel', matches.tabID, matches.panel);
	 *  @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/settings/search.js#L262)
	*/
	function DispatchEvent<T extends string>(event: T, ...args: T extends keyof GlobalEventNameMap ? Parameters<GlobalEventNameMap[T]> : any[]): void;

	/** Dispatch an event to occur later.
	 *  @todo There don't appear to be any uses of this in Momentum UI. This needs to be documented!
	 */
	function DispatchEventAsync(...args: any[]): void;

	/** Call a function on each given item. Functionally identical to (...).forEach(...) */
	function Each<T>(items: T[], callback: (item: T, index: number) => void): void;

	/** Find an element.
	 *  @todo There don't appear to be any uses of this in Momentum UI. This needs to be documented!
	 */
	function FindChildInContext(...args: any[]): Panel|undefined;

	/** Gets the root panel of the current Javascript context.
	 *  @example $.GetContextPanel().color = color;
	 *  @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/components/color-display.js#L17)
	 */
	function GetContextPanel<T extends Panel = Panel>(): T;

	/**
	 * $.HTMLEscape(str, truncate=false).  Converts str, which must be 2048 utf-8 bytes or shorter, into an HTML-safe version.  If truncate=true, too long strings will be truncated instead of throwing an exception
	 * @todo There don't appear to be any uses of this in Momentum UI. This needs to be documented!
	 */
	function HTMLEscape(str: string, truncate?: boolean): string;

	/** Get the current language */
	function Language(): string;

	/** Load a named key values file and return as JS object.
	 * @param url The path to the file, including the extension, relative to the content folder root.
	 * @example $.LoadKeyValuesFile('panorama/data/changelog.vdf');
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/drawer/about.js#L76)
	 */
	function LoadKeyValuesFile(url: string): Record<string, unknown>;

	/** Load a named key values file and return as JS object.
	 * @param url The path to the file, including the extension, relative to the content folder root.
	 */
	function LoadKeyValues3File(url: string): Record<string, unknown>;

	/** Localizes a string.
	 * @example $.Localize('#HudStatus_Spawn');
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/status.js#L47)
	 */
	function Localize(str: string): string|null;

	/** Localize a string, but return empty string if the localization token is not found */
	function LocalizeSafe(str: string): string;

	/** Log a message */
	function Msg(...messages: any[]): void;

	/** $.PlaySoundEvent(str).  Plays the named sound event. */
	function PlaySoundEvent(...args: any[]): void;

	/** Register an event handler
	 * @example $.RegisterEventHandler('OnNewChatEntry', $.GetContextPanel(), this.onNewChatEntry.bind(this));
	 * @returns A unique event identifier.
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/components/chat.js#L8)
	 *
	 */
	function RegisterEventHandler<T extends keyof PanelEventNameMap>(event: T, context: Panel|string, callback: PanelEventNameMap[T]): number;
	function RegisterEventHandler(event: string, context: Panel|string, callback: Func): number;

	/** Register a handler for an event that is not otherwise handled
	 * @example $.RegisterForUnhandledEvent('OnMomentumTimerStateChange', this.onTimerEvent.bind(this));]
	 * @returns A unique event identifier.
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L18)
	 */
	function RegisterForUnhandledEvent<T extends keyof GlobalEventNameMap>(event: T, callback: GlobalEventNameMap[T]): number;
	function RegisterForUnhandledEvent(event: string, callback: Func): number;

	/** Register a key binding */
	function RegisterKeyBind(panel: Panel, key: string, event: Func|string): void;

	/** $.persistentStorage.removeItem(keyName).  When passed a key name, will remove that key from the storage. */
	function removeItem(keyName: string): void;

	/** Schedule a function to be called later
	 * @returns A unique event identifier.
	 */
	function Schedule(time: duration, callback: Func): number;

	/** $.StopSoundEvent(guid, [fadetime]). Stops the sound event. guid was returned from a previous call to PlaySoundEvent. fadetime is optional. */
	function StopSoundEvent(guid: any, fadetime?: number): void;

	/** Remove an event handler */
	function UnregisterEventHandler(...args: any[]): void;

	/** Remove an unhandled event handler */
	function UnregisterForUnhandledEvent(...args: any[]): void;

	/** $.UrlDecode(str).  Decodes str, which must be 2048 utf-8 bytes or shorter, from URL-encoded form. */
	function UrlDecode(...args: any[]): void;

	/** $.UrlEncode(str).  Encodes str, which must be 2048 utf-8 bytes or shorter, into URL-encoded form. */
	function UrlEncode(...args: any[]): void;

	/** Log a warning */
	function Warning(...args: any[]): void;

}

/* ======================== PANEL ELEMENTS  ======================== */

declare interface Panel {
	activationenabled: boolean;

	readonly actuallayoutheight: float;

	readonly actuallayoutwidth: float;

	readonly actualuiscale_x: float;

	readonly actualuiscale_y: float;

	readonly actualxoffset: float;

	readonly actualyoffset: float;

	checked: boolean;

	readonly contentheight: float;

	readonly contentwidth: float;

	defaultfocus: string;

	readonly desiredlayoutheight: float;

	readonly desiredlayoutwidth: float;

	enabled: boolean;

	hittest: boolean;

	hittestchildren: boolean;

	readonly id: string;

	inputnamespace: string;

	readonly layoutfile: string;

	readonly paneltype: string;

	rememberchildfocus: boolean;

	readonly scrolloffset_x: float;

	readonly scrolloffset_y: float;

	selectionpos_x: float;

	selectionpos_y: float;

	readonly style: Style;

	tabindex: float;

	visible: boolean;

	AcceptsFocus(): boolean;

	AcceptsInput(): boolean;

	AddClass(classname: string): void;

	/** @todo Document this. */
	ApplyStyles(arg0: boolean): void;

	/** @todo Document this. */
	BAscendantHasClass(arg0: string): boolean;

	CanSeeInParentScroll(): boolean;

	Children(): Panel[];

	ClearPanelEvent(event: string): void;

	/** @todo Document this. */
	ClearPropertyFromCode(arg0: unknown): void;

	CreateChildren(elements: string): boolean;

	/** @todo Document this. */
	CreateCopyOfCSSKeyframes(animation: string): Keyframes;

	Data(...args: any[]): void;

	DeleteAsync(delay: float): void;

	DeleteKeyframes(animation: Keyframes): void;

	/** Searches this element's direct children and returns a child with the specified id. */
	FindChild(id: string): Panel|null;

	FindChildInLayoutFile(id: string): Panel|null;

	FindChildrenWithClassTraverse(classname: string): Panel[];

	FindChildTraverse(id: string): Panel|null;

	GetAttributeInt(attribute: string, fallback: int32): int32;

	GetAttributeString(attribute: string, fallback: string): string;

	GetAttributeUInt32(attribute: string, fallback: uint32): uint32;

	GetChild(index: int32): Panel|null;

	GetChildCount(): int32;

	GetChildIndex(child: Panel): int32;

	GetFirstChild(): Panel|null;

	GetLastChild(): Panel|null;

	GetLayoutFileDefine(def: string): unknown;

	GetParent(): Panel|null;

	GetPositionWithinWindow(): unknown;

	HasClass(classname: string): boolean;

	HasDescendantKeyFocus(): boolean;

	HasHoverStyle(): boolean;

	HasKeyFocus(): boolean;

	IsDraggable(): boolean;

	IsReadyForDisplay(): boolean;

	IsSelected(): boolean;

	IsSizeValid(): boolean;

	IsTransparent(): boolean;

	/** @todo Validate these arguments. */
	LoadLayout(url: string, override: boolean, partial: boolean): boolean;

	/** @todo Validate these arguments. */
	LoadLayoutAsync(url: string, override: boolean, partial: boolean): void;

	/** @todo Validate these arguments. */
	LoadLayoutFromString(layout: string, override: boolean, partial: boolean): void;

	/** @todo Validate these arguments. */
	LoadLayoutFromStringAsync(layout: string, override: boolean, partial: boolean): void;

	/** @todo Validate these arguments. */
	LoadLayoutSnippet(snippet: string): boolean;

	MoveChildAfter(arg0: unknown, arg1: unknown): void;

	MoveChildBefore(arg0: unknown, arg1: unknown): void;

	/** Registers this panel to receive ready/unready events.
	 * @param enable Should this panel receive ready/unready events?
	 */
	RegisterForReadyEvents(enable: boolean): void;

	RemoveAndDeleteChildren(): void;

	RemoveClass(classname: string): void;

	ScrollParentToFitWhenFocused(): boolean;

	ScrollParentToMakePanelFit(arg0: number, arg1: boolean): void;

	ScrollToBottom(): void;

	ScrollToFitRegion(arg0: float, arg1: float, arg2: float, arg3: float, arg4: unknown, arg5: boolean, arg6: boolean): void;

	ScrollToLeftEdge(): void;

	ScrollToRightEdge(): void;

	ScrollToTop(): void;

	SetAcceptsFocus(istrue: boolean): void;

	SetAttributeInt(attribute: string, value: int32): void;

	SetAttributeString(attribute: string, value: string): void;

	SetAttributeUInt32(attribute: string, value: uint32): void;

	SetDialogVariable(arg0: string, arg1: string): void;

	SetDialogVariableFloat(arg0: string, arg1: float): void;

	SetDialogVariableInt(arg0: string, arg1: int32): void;

	SetDialogVariableTime(arg0: string, arg1: int64): void;

	SetDisableFocusOnMouseDown(istrue: boolean): void;

	SetDraggable(istrue: boolean): void;

	SetFocus(focus: boolean): boolean;

	SetHasClass(classname: string, hasclass: boolean): void;

	SetInputNamespace(arg0: string): void;

	/** Sets an event trigger for this panel.
	 * @example latestUpdateImage.SetPanelEvent('onactivate', () => SteamOverlayAPI.OpenURLModal(item.link));
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/568f2d8de1303b86592a9a8602efd416f6a2f5bf/scripts/pages/main-menu/news.js#L57)
	*/
	SetPanelEvent(event: string, callback: Func): void;

	SetParent(parent: Panel): void;

	SetReadyForDisplay(arg0: boolean): void;

	SetScrollParentToFitWhenFocused(arg0: boolean): void;

	SetTopOfInputContext(arg0: boolean): void;

	/** @todo Verify this typing! */
	SortChildrenOnAttribute(attribute: string, reverse: boolean): void;

	SwitchClass(oldclass: string, newclass: string): void;

	ToggleClass(classname: string): void;

	TriggerClass(classname: string): void;

	UpdateCurrentAnimationKeyframes(animation: Keyframes): void;

	UpdateFocusInContext(): boolean;
}

declare interface Button extends Panel {
}

/** An interactive text input.
 * @todo These types are incomplete and unverified!
 * @example <TextEntry
 *     id="MaxPlayers"
 *     textmode="numeric"
 *     placeholder="32"
 *     maxchars="3"
 *     ontextentrychange="LobbySettings.onChanged()" />
 */
declare interface TextEntry extends Panel {
	text: string;

	ClearSelection(): void;

	GetCursorOffset(): uint32;

	GetMaxCharCount(): uint32;

	RaiseChangeEvents(arg0: boolean): void;

	SetCursorOffset(offset: int32): void;

	SelectAll(): void;

	SetMaxChars(max: uint32): void;

	Submit(): boolean;
}

declare interface ToggleButton extends Panel {
	text: string;

	SetSelected(arg0: boolean): void;
}

declare interface Frame extends Panel {
	/** Sets the Frame content to the specified snippet. */
	SetSnippet(snippet: string): void;

	/** Sets the Frame content to the specified layout file url. */
	SetSource(source: string): void;
}

declare interface Image extends Panel {
	SetImage(arg0: string): void;

	SetScaling(arg0: string): void;
}

declare interface Label extends Panel {
	text: string;
}

declare interface Movie extends Panel {
	IsAdjustingVolume(): boolean;

	Pause(): void;

	Play(): void;

	SetControls(arg0: string): void;

	SetMovie(path: string): void;

	SetPlaybackVolume(volume: float): void;

	SetRepeat(istrue: boolean): void;

	SetSound(path: string): void;

	SetTitle(name: string): void;

	Stop(): void;
}

/** An interactive number input.
 * Values are all integers internally.
 * @example <NumberEntry max="255" />
 */
declare interface NumberEntry extends Panel {
	min: int32;

	max: int32;

	value: int32;

	increment: int32;
}

declare interface ProgressBar extends Panel {
	max: float;

	min: float;

	value: float;
}

declare interface ResizeDragKnob extends Panel {
	horizontalDrag: boolean;

	readonly target: unknown;

	verticalDrag: boolean;
}

interface FlexController {

	/** Min value of the flex */
	min: float;

	/** Max value of the flex */
	max: float;
}

interface PoseParameter {

	/** Starting (min) value of the pose param */
	start: float;

	/** Ending (max) value of the pose param */
	end: float;

	/** Looping range */
	loop: float;
}

/** Renders a 3d model in the UI.
 * @example <ModelPanel
 *     src="models/npcs/turret/turret.mdl"
 *     cubemap="cubemaps/cubemap_menu_model_bg.hdr"
 *     antialias="true"
 *     mouse_rotate="false" />
 */
declare interface ModelPanel extends Panel {
	/** The model that this ModelPanel should display, relative to `/` */
	src: string;

	/** The cubemap that this ModelPanel should display, excluding the `.vtf` extension. This path is relative to `materials/`. */
	cubemap: string;

	/** Index of the skin to use */
	skin: int32;

	/** Whether this ModelView should use antialiasing. */
	antialias: boolean;

	/** Animation sequence name for the model, may be changed later using `SetSequence` */
	sequence: string;

	/** Whether the mouse can be dragged over this ModelView to rotate the model.
	 * This property can only be set through XML. To modify it, use the `SetMouseRotationAllowed` method.
	 */
	readonly mouse_rotate: boolean;

	AddParticleSystem(arg0: string, arg1: string, arg2: boolean): void;

	LookAt(x: float, y: float, z: float): void;

	LookAtModel(): void;

	SetCameraAngles(x: float, y: float, z: float): void;

	SetCameraFOV(fov: float): void;

	SetCameraOffset(x: float, y: float, z: float): void;

	SetCameraPosition(x: float, y: float, z: float): void;

	/** Sets the color of a directional light as floats.
	 * @param {int32} light The ID of the light. (0-4)
	 */
	SetDirectionalLightColor(light: int32, r: float, g: float, b: float): void;

	/** Sets the direction of a directional light.
	 * @param {int32} light The ID of the light. (0-4)
	 */
	SetDirectionalLightDirection(light: int32, x: float, y: float, z: float): void;

	SetLightAmbient(r: float, g: float, b: float): void;

	SetModelBodygroup(arg0: int32, arg1: int32): void;

	SetModelColor(arg0: unknown): void;

	SetModelRotation(x: float, y: float, z: float): void;

	SetModelRotationAcceleration(x: float, y: float, z: float): void;

	SetModelRotationBoundsEnabled(x: boolean, y: boolean, z: boolean): void;

	SetModelRotationBoundsX(min: number, max: number): void;

	SetModelRotationBoundsY(min: number, max: number): void;

	SetModelRotationBoundsZ(min: number, max: number): void;

	SetModelRotationSpeed(x: float, y: float, z: float): void;

	SetModelRotationSpeedTarget(x: float, y: float, z: float): void;

	SetModelRotationTarget(x: float, y: float, z: float): void;

	SetMouseRotationAllowed(allow: boolean): void;

	SetMouseXRotationScale(x: number, y: number, z: number): void;

	SetMouseYRotationScale(x: number, y: number, z: number): void;

	SetParticleSystemOffsetAngles(x: float, y: float, z: float): void;

	SetParticleSystemOffsetPosition(x: float, y: float, z: float): void;
	
	/** Returns an array of all sequences for this model */
	GetSequences(): string[];

	/** Set the current animation sequence for this model
	 * @param sequence Sequence name
	 */
	SetSequence(sequence: string): void;
	
	/** Returns the current animation sequence for this model */
	GetSequence(): string;
	
	/** Sets a single pose parameter
	 * @param param Pose parameter to set, by name
	 * @param value Value of the pose parameter
	 */
	SetPoseParameter(param: string, value: float): void;
	
	/** Get a pose parameter's current value
	 * @param param Pose parameter to get, by name
	 */
	GetPoseParameter(param: string): float;
	
	/** Returns the number of pose parameters available for this model */
	GetPoseParamCount(): int32;

	/** Returns an array of all pose parameters */
	GetPoseParameters(): Record<string, PoseParameter>;
	
	/** Reset a single pose parameter to its default
	 * @param param Pose parameter to reset, must be in range [0,GetPoseParamCount())
	 */
	ResetPoseParam(param: int32): void;
	
	/** Resets all pose parameters to their default values */
	ResetPoseParams(): void;
	
	/** Sets the current skin
	 * @param skin Skin index, must be in range [0, GetSkinCount())
	 */
	SetSkin(skin: int32): void;
	
	/** Returns the current skin */
	GetSkin(): int32;
	
	/** Returns the total number of skins available to this model.
	 * Use with SetSkin
	 */
	GetSkinCount(): int32;
	
	/** Set the LOD for this model
	 * @param lod LOD level
	 */
	SetLOD(lod: int32): void;
	
	/** Returns the current LOD for this model */
	GetLOD(): int32;
	
	/** Enable/disable cloth sim on a model, if it supports it
	 * @param enable True to enable, false to disable
	 */
	SetClothSimulationEnabled(enable: boolean): void;
	
	/** Returns whether cloth simulation is enabled on this model. */
	GetClothSimulationEnabled(): boolean;

	/** Returns an array of objects describing all available flex controllers for this model
	 * The UI must take into account the min/max values specified in these structures
	 */
	GetFlexControllers(): Record<string, FlexController>;
	
	/** Set a flex controller value. Should be within the min/max returned by GetFlexControllers(),
	 * but out of range values will still be used to render.
	 * @param flexController Flex controller name
	 * @param value Value of the flex
	 */
	SetFlexControl(flexController: string, value: float): void;
	
	/** Returns the current value associated with a flex controller
	 * @param flexController Flex controller name
	 */
	GetFlexControl(flexController: string): float;
}

/** A console message target. */
declare interface StaticConsoleMessageTarget extends Panel {
}

/** Renders 2d shapes in the UI.
 * @todo These types are incomplete and unverified!
 */
declare interface UICanvas extends Panel {
	/**
	 * @param count The number of points to draw.
	 * @param coords An array of x/y coordinates.
	 * @param thickness The thickness of the line.
	 * @param color The color of the line as a string.
	 */
	DrawLinePoints(count: number, coords: number[], thickness: number, color: string): void;

	/**
	 * @param count The number of points to draw.
	 * @param coords An array of x/y coordinates.
	 * @param color The color of the line as a string.
	 */
	DrawPoly(count: number, coords: number[], color: string): void;
}

declare interface ChaosBackbufferImagePanel extends Panel {
}

declare interface ChaosLoadingScreen extends Panel {
}

declare interface ChaosMainMenu extends Panel {
	IsMultiplayer(): boolean;
}

declare interface ChaosSettingsSlider extends Panel {
	convar: string;

	max: float;

	min: float;

	value: float;

	ActualValue(): float;

	OnShow(): void;

	RestoreCVarDefault(): void;
}

/* ========================       APIS      ======================== */

declare namespace FriendsAPI {
	/** Gets the name of the local player */
	function GetLocalPlayerName(): string;

	/** Gets the name of the player with the given XUID. This will only be known by the local user if the given user is in their friends list, on the same game server, in a chat room or lobby, or in a small group with the local user */
	function GetNameForXUID(xuid: uint64): string;

}

declare namespace GameInterfaceAPI {
	function ConsoleCommand(command: string): void;

	function GetSettingBool(key: string): boolean;

	function GetSettingColor(key: string): unknown;

	function GetSettingFloat(key: string): float;

	function GetSettingInt(key: string): int32;

	function GetSettingString(key: string): string;

	/** Registers a callback for a specific game event type, returns an event handler ID to unregister with */
	function RegisterGameEventHandler(event_name: string, callback: Func): uuid;

	function SetSettingBool(key: string, value: boolean): void;

	function SetSettingColor(key: string, value: unknown): void;

	function SetSettingFloat(key: string, value: float): void;

	function SetSettingInt(key: string, value: int32): void;

	function SetSettingString(key: string, value: string): void;

	/** Unregisters a previously registered event handler for a game event */
	function UnregisterGameEventHandler(callback: uuid): void;

	/** Gets the current game state. */
	function GetGameUIState(): GameUIState;
}

declare namespace RichPresenceAPI {
	/** Clears the current rich presence data */
	function Clear(): void;

	/** Updates the game's current rich presence state. */
	function UpdateRichPresenceState(state: {
		discord: {
			state: string;
			name: string;
			details: string;
			assets: {
				large_image: string;
				large_text: string;
			}
		}
	}): void;

}

declare namespace SteamOverlayAPI {
	/** Opens the steam overlay to the given user/group profile by their steam ID. profileID is the 64bit int steam ID in a string. */
	function OpenToProfileID(profileID: string): void;

	/** Opens the steam overlay browser at the given URL */
	function OpenURL(url: string): void;

	/** Opens the steam overlay browser at the given URL in a modal window (no other windows in overlay, and overlay closes when window closes) */
	function OpenURLModal(url: string): void;

}

declare namespace UiToolkitAPI {
	/** Denies input to the game by filtering input events. Returns a handle used by ReleaseDenyAllInputToGame. */
	function AddDenyAllInputToGame(panelPtr: unknown, strDebugContextName: string): uint64;

	/** Denies mouse input to the game by filtering mouse input events. Returns a handle used by ReleaseDenyMouseInputToGame. */
	function AddDenyMouseInputToGame(panelPtr: unknown, strDebugContextName: string): uint64;

	/** Force closing all visible popups */
	function CloseAllVisiblePopups(): void;

	/** Returns a global object that can be used to store global variables you would like to share across js files. */
	function GetGlobalObject(): unknown;

	/** Hide the tooltip with the given id. */
	function HideCustomLayoutTooltip(tooltipID: string): void;

	/** Hide the text tooltip */
	function HideTextTooltip(): void;

	/** Hide the title image text tooltip */
	function HideTitleImageTextTooltip(): void;

	/** Hide the title text tooltip */
	function HideTitleTextTooltip(): void;

	/** Invoke a javascript callback using a handle previously registered with RegisterJSCallback. First argument must be the callback handle followed by the callback's arguments. */
	function InvokeJSCallback(callback: uuid, ...args: any[]): void;

	/** Is Panorama in ECO (perf) mode */
	function IsPanoramaInECOMode(): boolean;

	function MakeStringSafe(str: string): string;

	/** Notify telemetry that a zone is been entered */
	function ProfilingScopeBegin(tagName: string): void;

	/** Notify telemetry that a zone is been left. Returns duration in milliseconds. */
	function ProfilingScopeEnd(): double;

	/** Register a HUD panel type name with the corresponding layout file */
	function RegisterHUDPanel2d(panelTypeName: string, layoutFile: string): void;

	/** Register a javascript callback that can be invoke at a later stage using InvokeJSCallback. Returns a callback handle. */
	function RegisterJSCallback(callback: Func): uuid;

	/** Register a panel type name with the corresponding layout file */
	function RegisterPanel2d(panelTypeName: string, layoutFile: string): void;

	/** ReleaseDenyAllInputToGame takes a handle as parameters previously returned by AddDenyAllInputToGame */
	function ReleaseDenyAllInputToGame(handle: uint64): void;

	/** ReleaseDenyMouseInputToGame takes a handle as parameters previously returned by AddDenyMouseInputToGame */
	function ReleaseDenyMouseInputToGame(handle: uint64): void;

	/** Show a context menu with a specific id and using the given layout. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowCustomLayoutContextMenu(targetPanelID: string, contentmenuID: string, layoutFile: string): unknown;

	/** Show a context menu with a specific id and using the given layout and parameters. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowCustomLayoutContextMenuParameters(targetPanelID: string, contentmenuID: string, layoutFile: string, parameters: string): unknown;

	/** Show a context menu with a specific id and using the given layout and parameters and call a function when dismissed. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowCustomLayoutContextMenuParametersDismissEvent(targetPanelID: string, contentmenuID: string, layoutFile: string, parameters: string, dismissJsFunc: unknown): unknown;

	/** Show a tooltip with a specifix id and using the given layout and parameters. */
	function ShowCustomLayoutParametersTooltip(targetPanelID: string, tooltipID: string, layoutFile: string, parameters: string): void;

	/** Show a tooltip with a specifix id and using the given layout and parameters. Also apply a CSS class named "style" (to the tooltip root panel) in order to allow custom styling (eg. "Tooltip_NoArrow" to remove tooltip's arrow). */
	function ShowCustomLayoutParametersTooltipStyled(targetPanelID: string, tooltipID: string, layoutFile: string, parameters: string, style: string): void;

	/** Show a popup that lets you specify a layout. */
	function ShowCustomLayoutPopup(popupID: string, layoutFile: string): unknown;

	/** Show a popup that lets you specify a layout and parameters. */
	function ShowCustomLayoutPopupParameters(popupID: string, layoutFile: string, parameters: string): unknown;

	/** Show a tooltip with a specifix id and using the given layout. */
	function ShowCustomLayoutTooltip(targetPanelID: string, tooltipID: string, layoutFile: string): void;

	/** Show a tooltip with a specifix id and using the given layout. Also apply a CSS class named "style" (to the tooltip root panel) in order to allow custom styling (eg. "Tooltip_NoArrow" to remove tooltip's arrow). */
	function ShowCustomLayoutTooltipStyled(targetPanelID: string, tooltipID: string, layoutFile: string, style: string): void;

	/** Show a popup with the given title add message and optional style. Button present: "OK". */
	function ShowGenericPopup(title: string, message: string, style: string): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "OK". */
	function ShowGenericPopupBgStyle(title: string, message: string, style: string, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Cancel". */
	function ShowGenericPopupCancel(title: string, message: string, style: string, cancelJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Cancel". */
	function ShowGenericPopupCancelBgStyle(title: string, message: string, style: string, cancelJSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "OK". */
	function ShowGenericPopupOk(title: string, message: string, style: string, okJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "OK". */
	function ShowGenericPopupOkBgStyle(title: string, message: string, style: string, okJSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Ok"/"Cancel". */
	function ShowGenericPopupOkCancel(title: string, message: string, style: string, okJSFunc: unknown, cancelJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Ok"/"Cancel". */
	function ShowGenericPopupOkCancelBgStyle(title: string, message: string, style: string, okJSFunc: unknown, cancelJSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of one button. */
	function ShowGenericPopupOneOption(title: string, message: string, style: string, optionName: string, optionJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of one button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupOneOptionBgStyle(title: string, message: string, style: string, optionName: string, optionJSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. */
	function ShowGenericPopupThreeOptions(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, option3Name: string, option3JSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupThreeOptionsBgStyle(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, option3Name: string, option3JSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. */
	function ShowGenericPopupTwoOptions(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupTwoOptionsBgStyle(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Yes"/"No". */
	function ShowGenericPopupYesNo(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Yes"/"No". */
	function ShowGenericPopupYesNoBgStyle(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Yes"/"No"/"Cancel". */
	function ShowGenericPopupYesNoCancel(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, cancelJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Yes"/"No"/"Cancel". */
	function ShowGenericPopupYesNoCancelBgStyle(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, cancelJSFunc: unknown, bgStyle: string): unknown;

	/** Show a popup on the 'global popups top level window' that lets you specify a layout. */
	function ShowGlobalCustomLayoutPopup(popupID: string, layoutFile: string): unknown;

	/** Show a popup on 'global popups top level window' that lets you specify a layout and parameters. */
	function ShowGlobalCustomLayoutPopupParameters(popupID: string, layoutFile: string, parameters: string): unknown;

	/** Show a context menu with a specific id and populate the context menu item list using the given "items" array. Each elements of the items array is a javascript object of the form {label, jsCallback, style, icon}. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowSimpleContextMenu(targetPanelID: string, contentmenuID: string, items: unknown): unknown;

	/** Show a context menu with a specific id and populate the context menu item list using the given "items" array. Each elements of the items array is a javascript object of the form {label, jsCallback, style, icon}. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowSimpleContextMenuWithDismissEvent(targetPanelID: string, contentmenuID: string, items: unknown, dismissJsFunc: unknown): unknown;

	/** Show a tooltip with the given text */
	function ShowTextTooltip(targetPanelID: string, text: string): void;

	/** Show a tooltip with the given text on given panel */
	function ShowTextTooltipOnPanel(targetPanel: unknown, text: string): void;

	/** Show a tooltip with the given text on given panel. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTextTooltipOnPanelStyled(targetPanel: unknown, text: string, style: string): void;

	/** Show a tooltip with the given text. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTextTooltipStyled(targetPanelID: string, text: string, style: string): void;

	/** Show a tooltip with the given title, image and text. */
	function ShowTitleImageTextTooltip(targetPanelID: string, title: string, image: string, text: string): void;

	/** Show a tooltip with the giben title, image and text. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTitleImageTextTooltipStyled(targetPanelID: string, title: string, image: string, text: string, style: string): void;

	/** Show a tooltip with the given title and text. */
	function ShowTitleTextTooltip(targetPanelID: string, title: string, text: string): void;

	/** Show a tooltip with the given title and text. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTitleTextTooltipStyled(targetPanelID: string, title: string, text: string, style: string): void;

	/** Unregister a javascript callback previously registered with RegisterJSCallback. */
	function UnregisterJSCallback(jsCallbackHandle: int32): void;

}

declare namespace UserAPI {
	/** Gets the XUID (steamid as integer) of the local player */
	function GetXUID(): uint64;

}

declare namespace SentryAPI {
	/** Returns whether or not the user has consented to allow sentry to upload crash dumps. */
	function GetUserConsent(): boolean;

	/** Returns whether or not sentry is active. */
	function IsSentryActive(): boolean;
}

declare namespace VersionAPI {
	function GetBranch(): string;

	function GetGraphicsAPI(): string;

	function GetPhysicsEngine(): string;

	function GetPlatform(): string;

	function GetVersion(): string;
}
