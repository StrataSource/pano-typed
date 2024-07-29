type QueryOutput<E, T> = T extends `.${string}` ? E[] : E;

/** Selects an element.
 * @param selector The element selector. This can be an id selector (#xyz) or a class selector (.xyz)
 * @example Basic use.
 * ```js
 * const my_button = $("#MyButton");
 * const my_items = $(".my-item");
 * ```
 * When using Typescript, generic parameters can also be used to specify the return types.
 * ```ts
 * const my_button = $<Button>("#MyButton")!;
 * ```
 * @alias "$"
 * @alias Query
 */
declare function $<E extends Panel, T extends string = string>(selector: T): QueryOutput<E, T> | null;

/** Namespace for common DOM manipulation operations.
 * For the query selector function, see {@link $ | $(...)}
 * @example
 * ```
 * const my_button = $("#MyButton");
 * $.RegisterEventHandler("onactivate", my_button, () => $.Msg("Hello world!"));
 * ```
 */
declare namespace $ {
	namespace persistentStorage {
		/** Returns an integer representing the number of data items stored in the Storage object. */
		const length: int32;

		/** When invoked, will empty all keys out of the storage. */
		function clear(): void;

		/** When passed a number n, this method will return the name of the nth key in the storage. */
		function key(n: int32): string | null;

		/** When passed a key name, will return that key's value.
		 * @example $.persistentStorage.getItem('settings.mainMenuMovie');
		 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/main-menu/main-menu.js#L241)
		 */
		function getItem<T extends JsonValue>(keyName: string): T | null;

		/** When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
		 * @example $.persistentStorage.setItem('dontShowAgain.' + key, true);
		 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/modals/popups/dont-show-again.js#L8)
		 */
		function setItem(keyName: string, keyValue: JsonValue): void;

		/** When passed a key name, will remove that key from the storage. */
		function removeItem(keyName: string): void;
	}

	/** Make a web request.
	 * @example $.AsyncWebRequest(DATA_URL, {
	 *  type: 'GET',
	 * 	complete: (data) =>
	 * 	data.statusText === 'success' ? resolve(data.responseText) : reject(data.statusText)
	 * });
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/learn.js#L259)
	 */
	function AsyncWebRequest(
		url: string,
		options?: {
			// https://fetch.spec.whatwg.org/#methods
			type: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT';
			complete: (data: { responseText: string; statusText: string }) => void;
		}
	): void;

	/** Cancel a scheduled function.
	 * @example
	 * ```
	 * ConsoleNotify.scheduleOpacity = $.Schedule(5, () => {\/* ... *\/});
	 * \/* ... *\/
	 *
	 * $.CancelScheduled(ConsoleNotify.scheduleOpacity);
	 * ```
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/console-notify.js#L8)
	 */
	function CancelScheduled(event: uuid): void;

	/** Compresses the given string, and encodes result in base64. */
	function CompressString(str: string): string;

	/** Create a new panel.
	 * @example $.CreatePanel('Split', wrapper, '', { class: 'split--hud split--latest' });
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L107)
	 */
	function CreatePanel<T extends keyof PanelTagNameMap>( type: T, parent: Panel, id: string, properties?: Record<string, unknown> ): PanelTagNameMap[T];
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
	function DispatchEvent<T extends string>( event: T, ...args: T extends keyof GlobalEventNameMap ? Parameters<GlobalEventNameMap[T]> : any[] ): void;

	/** Dispatch an event to occur later.
	 *  @todo There don't appear to be any uses of this in Momentum UI. This needs to be documented!
	 */
	function DispatchEventAsync(...args: any[]): void;

	/** Call a function on each given item. Functionally identical to (...).forEach(...) */
	function Each<T>(items: T[], callback: (item: T, index: number) => void): void;

	/** Find an element.
	 *  @todo There don't appear to be any uses of this in Momentum UI. This needs to be documented!
	 */
	function FindChildInContext(...args: any[]): Panel | undefined;

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
	function Localize(str: string): string | null;

	/** Localize a string, but return empty string if the localization token is not found */
	function LocalizeSafe(str: string): string;

	/** Log a message */
	function Msg(...messages: any[]): void;

	/** Plays the specified soundscript.
	 * @todo If a game session is active, sounds will not play until the game is unpaused.
	 * @returns A unique event identifier.
	 */
	function PlaySoundEvent(sound: string): uuid;

	/** Register an event handler
	 * @example $.RegisterEventHandler('OnNewChatEntry', $.GetContextPanel(), this.onNewChatEntry.bind(this));
	 * @returns A unique event identifier.
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/components/chat.js#L8)
	 *
	 */
	function RegisterEventHandler<T extends keyof PanelEventNameMap>( event: T, context: Panel | string, callback: PanelEventNameMap[T] ): number;
	function RegisterEventHandler(event: string, context: Panel | string, callback: Func): number;

	/** Register a handler for an event that is not otherwise handled
	 * @example $.RegisterForUnhandledEvent('OnMomentumTimerStateChange', this.onTimerEvent.bind(this));]
	 * @returns A unique event identifier.
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L18)
	 */
	function RegisterForUnhandledEvent<T extends keyof GlobalEventNameMap>( event: T, callback: GlobalEventNameMap[T] ): number;
	function RegisterForUnhandledEvent(event: string, callback: Func): number;

	/** Register a key binding */
	function RegisterKeyBind(panel: Panel, key: string, event: Func | string): void;

	/** Schedule a function to be called later
	 * @returns A unique event identifier.
	 */
	function Schedule(time: duration, callback: Func): uuid;

	/** Stops a sound event by the specified uuid returned from a previous call to PlaySoundEvent. fadetime is optional. */
	function StopSoundEvent(guid: uuid, fadetime?: duration): void;

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

/** @group api */
declare namespace FriendsAPI {
	/** Gets the name of the local player */
	function GetLocalPlayerName(): string;

	/** Gets the name of the player with the given XUID. This will only be known by the local user if the given user is in their friends list, on the same game server, in a chat room or lobby, or in a small group with the local user */
	function GetNameForXUID(xuid: uint64): string;
}

/** @group api */
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

	/** Gets the current map name, or null if no map is active. */
	function GetCurrentMap(): string | null;
}

/** @group api */
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
			};
		};
	}): void;
}

/** @group api */
declare namespace SteamOverlayAPI {
	/** Opens the steam overlay to the given user/group profile by their steam ID. profileID is the 64bit int steam ID in a string. */
	function OpenToProfileID(profileID: string): void;

	/** Opens the steam overlay browser at the given URL */
	function OpenURL(url: string): void;

	/** Opens the steam overlay browser at the given URL in a modal window (no other windows in overlay, and overlay closes when window closes) */
	function OpenURLModal(url: string): void;
}

/** @group api */
declare namespace UiToolkitAPI {
	/** Denies input to the game by filtering input events. Returns a handle used by ReleaseDenyAllInputToGame. */
	function AddDenyAllInputToGame(panelPtr: Panel, strDebugContextName: string): uint64;

	/** Denies mouse input to the game by filtering mouse input events. Returns a handle used by ReleaseDenyMouseInputToGame. */
	function AddDenyMouseInputToGame(panelPtr: Panel, strDebugContextName: string): uint64;

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
	function ShowCustomLayoutContextMenuParameters( targetPanelID: string, contentmenuID: string, layoutFile: string, parameters: string ): unknown;

	/** Show a context menu with a specific id and using the given layout and parameters and call a function when dismissed. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowCustomLayoutContextMenuParametersDismissEvent( targetPanelID: string, contentmenuID: string, layoutFile: string, parameters: string, dismissJsFunc: unknown ): unknown;
	
	/** Show a tooltip with a specifix id and using the given layout and parameters. */
	function ShowCustomLayoutParametersTooltip( targetPanelID: string, tooltipID: string, layoutFile: string, parameters: string ): void;

	/** Show a tooltip with a specifix id and using the given layout and parameters. Also apply a CSS class named "style" (to the tooltip root panel) in order to allow custom styling (eg. "Tooltip_NoArrow" to remove tooltip's arrow). */
	function ShowCustomLayoutParametersTooltipStyled( targetPanelID: string, tooltipID: string, layoutFile: string, parameters: string, style: string ): void;

	/** Show a popup that lets you specify a layout. */
	function ShowCustomLayoutPopup(popupID: string, layoutFile: string): unknown;

	/** Show a popup that lets you specify a layout and parameters. */
	function ShowCustomLayoutPopupParameters(popupID: string, layoutFile: string, parameters: string): unknown;

	/** Show a tooltip with a specifix id and using the given layout. */
	function ShowCustomLayoutTooltip(targetPanelID: string, tooltipID: string, layoutFile: string): void;

	/** Show a tooltip with a specifix id and using the given layout. Also apply a CSS class named "style" (to the tooltip root panel) in order to allow custom styling (eg. "Tooltip_NoArrow" to remove tooltip's arrow). */
	function ShowCustomLayoutTooltipStyled( targetPanelID: string, tooltipID: string, layoutFile: string, style: string ): void;

	/** Show a popup with the given title add message and optional style. Button present: "OK". */
	function ShowGenericPopup(title: string, message: string, style: string): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "OK". */
	function ShowGenericPopupBgStyle(title: string, message: string, style: string, bgStyle: string): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Cancel". */
	function ShowGenericPopupCancel(title: string, message: string, style: string, cancelJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Cancel". */
	function ShowGenericPopupCancelBgStyle( title: string, message: string, style: string, cancelJSFunc: unknown, bgStyle: string ): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "OK". */
	function ShowGenericPopupOk(title: string, message: string, style: string, okJSFunc: unknown): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "OK". */
	function ShowGenericPopupOkBgStyle( title: string, message: string, style: string, okJSFunc: unknown, bgStyle: string ): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Ok"/"Cancel". */
	function ShowGenericPopupOkCancel( title: string, message: string, style: string, okJSFunc: unknown, cancelJSFunc: unknown ): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Ok"/"Cancel". */
	function ShowGenericPopupOkCancelBgStyle( title: string, message: string, style: string, okJSFunc: unknown, cancelJSFunc: unknown, bgStyle: string ): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of one button. */
	function ShowGenericPopupOneOption( title: string, message: string, style: string, optionName: string, optionJSFunc: unknown ): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of one button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupOneOptionBgStyle( title: string, message: string, style: string, optionName: string, optionJSFunc: unknown, bgStyle: string ): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. */
	function ShowGenericPopupThreeOptions( title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, option3Name: string, option3JSFunc: unknown ): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupThreeOptionsBgStyle( title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, option3Name: string, option3JSFunc: unknown, bgStyle: string ): unknown;
	
	/** Show a popup with the given title add message and optional style and let you specify the name of two button. */
	function ShowGenericPopupTwoOptions( title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown ): unknown;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupTwoOptionsBgStyle( title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, bgStyle: string ): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Yes"/"No". */
	function ShowGenericPopupYesNo( title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown ): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Yes"/"No". */
	function ShowGenericPopupYesNoBgStyle( title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, bgStyle: string ): unknown;

	/** Show a popup with the given title add message and optional style. Button present: "Yes"/"No"/"Cancel". */
	function ShowGenericPopupYesNoCancel( title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, cancelJSFunc: unknown ): unknown;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Yes"/"No"/"Cancel". */
	function ShowGenericPopupYesNoCancelBgStyle( title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, cancelJSFunc: unknown, bgStyle: string ): unknown;

	/** Show a popup on the 'global popups top level window' that lets you specify a layout. */
	function ShowGlobalCustomLayoutPopup(popupID: string, layoutFile: string): unknown;

	/** Show a popup on 'global popups top level window' that lets you specify a layout and parameters. */
	function ShowGlobalCustomLayoutPopupParameters(popupID: string, layoutFile: string, parameters: string): unknown;

	/** Show a context menu with a specific id and populate the context menu item list using the given "items" array. Each elements of the items array is a javascript object of the form {label, jsCallback, style, icon}. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowSimpleContextMenu(targetPanelID: string, contentmenuID: string, items: unknown): unknown;

	/** Show a context menu with a specific id and populate the context menu item list using the given "items" array. Each elements of the items array is a javascript object of the form {label, jsCallback, style, icon}. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowSimpleContextMenuWithDismissEvent( targetPanelID: string, contentmenuID: string, items: unknown, dismissJsFunc: unknown ): unknown;

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
	function ShowTitleImageTextTooltipStyled( targetPanelID: string, title: string, image: string, text: string, style: string ): void;

	/** Show a tooltip with the given title and text. */
	function ShowTitleTextTooltip(targetPanelID: string, title: string, text: string): void;

	/** Show a tooltip with the given title and text. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTitleTextTooltipStyled(targetPanelID: string, title: string, text: string, style: string): void;

	/** Unregister a javascript callback previously registered with RegisterJSCallback. */
	function UnregisterJSCallback(jsCallbackHandle: int32): void;
}

/** @group api */
declare namespace UserAPI {
	/** Gets the XUID (steamid as integer) of the local player */
	function GetXUID(): uint64;
}

/** @group api */
declare namespace SentryAPI {
	/** Returns whether or not the user has consented to allow sentry to upload crash dumps. */
	function GetUserConsent(): boolean;

	/** Returns whether or not sentry is active. */
	function IsSentryActive(): boolean;
}

/** @group api */
declare namespace VersionAPI {
	function GetBranch(): string;

	function GetGraphicsAPI(): string;

	function GetPhysicsEngine(): string;

	function GetPlatform(): string;

	function GetVersion(): string;
}

/** @group api */
declare namespace OptionsMenuAPI {
	function RestoreKeybdMouseBindingDefaults(): void;

	function ShowSteamControllerBindingsPanel(): void;
}
