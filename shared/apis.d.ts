type QueryOutput<E, T> = T extends `.${string}` ? E[] : E;

/**
 * Selects an element, by #id or .class.
 *
 * If an ID is given, the functions performs a FindChildInContext, which searches the layout file first, then any other
 * associated panels in the current context. `$('#MyPanel')` is therefore equivalent to
 * `$.GetContextPanel().FindChildInContext('MyPanel')`.
 *
 * If a class is given, the function performs a FindChildrenWithClass. `$('.MyPanel')` is therefore equivalent to
 * `$.GetContextPanel().FindChildrenWithClass('MyPanel')`.
 *
 * @param selector The element selector. This can be an id selector (#xyz) or a class selector (.xyz)
 *
 * @example Basic use.
 * ```js
 * const my_button = $("#MyButton");
 * const my_items = $(".my-item");
 * ```
 * When using Typescript, generic parameters can also be used to specify the return types.
 * ```ts
 * const my_button = $<Button>("#MyButton")!;
 * ```
 *
 * @alias "$"
 * @alias Query
 */
declare function $<E extends GenericPanel, T extends string = string>(selector: T): QueryOutput<E, T> | null;

/**
 * Namespace for common DOM manipulation operations.
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

		/**
		 * When passed a key name, will return that key's value.
		 * @example $.persistentStorage.getItem('settings.mainMenuMovie');
		 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/main-menu/main-menu.js#L241)
		 */
		function getItem<T extends JsonValue>(keyName: string): T | null;

		/**
		 * When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
		 * @example $.persistentStorage.setItem('dontShowAgain.' + key, true);
		 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/modals/popups/dont-show-again.js#L8)
		 */
		function setItem(keyName: string, keyValue: JsonValue): void;

		/** When passed a key name, will remove that key from the storage. */
		function removeItem(keyName: string): void;
	}

	/**
	 * Make a web request.
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

	/**
	 * Cancel a scheduled function.
	 * @example
	 * ```ts
	 * const scheduleOpacity = $.Schedule(5, () => { ... });
	 * ...
	 * $.CancelScheduled(scheduleOpacity);
	 * ```
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/console-notify.js#L8)
	 */
	function CancelScheduled(event: uuid): void;

	/** Compresses the given string, and encodes result in base64. */
	function CompressString(str: string): string;

	/**
	 * Create a new panel.
	 *
	 * @example $.CreatePanel('Split', wrapper, '', { class: 'split--hud split--latest' });
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L107)
	 */
	function CreatePanel<T extends keyof PanelTagNameMap>(type: T, parent: GenericPanel, id: string, properties?: Record<string, unknown>): PanelTagNameMap[T];

	/**
	 * Create a new panel for a panel type unknown to TypeScript.
	 *
	 * @example $.CreatePanel('Split', wrapper, '', { class: 'split--hud split--latest' });
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L107)
	 *
	 * If you're seeing an error here, it's because the ALLOW_MISSING_PANELS option is disabled for this repo, because
	 * we're FORCING you to provide type definitions for panels :D
	 */
	function CreatePanel(type: ALLOW_MISSING_PANELS extends true ? string : 'Define this panel in PanelTagNameMap!', parent: Panel, id: string, properties?: Record<string, unknown>): ALLOW_MISSING_PANELS extends true ? GenericPanel : never;
	
	/** Call during JS startup code to check if script is being reloaded */
	function DbgIsReloadingScript(...args: any[]): void;

	/** Decompresses the given base64 encoded input into a string. */
	function DecompressString(str: string): string;

	/**
	 * Define an event.
	 * @param event The event name.
	 * @param argscount The number of arguments that this event takes.
	 * @param argsdesc An optional description for the event arguments.
	 * @param desc An option description for the event.
	 * @example $.DefineEvent(eventName, NumArguments, [optional] ArgumentsDescription, [optional] Description)
	 * @example $.DefineEvent('SettingsNavigateToPanel', 2, 'category, settingPanel', 'Navigates to a setting by panel handle');
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/util/event-definition.js#L6)
	 */
	function DefineEvent(event: string, argscount: number, argsdesc?: string, desc?: string): void;

	/**
	 * Appears to be identical to $.DefineEvent(...). This function is not used anywhere in Momentum UI.
	 *
	 * @param event The event name.
	 * @param argscount The number of arguments that this event takes.
	 * @param argsdesc An optional description for the event arguments.
	 * @param desc An option description for the event.
	 *
	 * @example $.DefinePanelEvent(eventName, NumArguments, [optional] ArgumentsDescription, [optional] Description)
	 *
	 * @example $.DefinePanelEvent('SettingsNavigateToPanel', 2, 'category, settingPanel', 'Navigates to a setting by panel handle');
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/util/event-definition.js#L7)
	 */
	function DefinePanelEvent(event: string, argscount: number, argsdesc?: string, desc?: string): void;

	/**
	 * Dispatch an event.
	 * @example $.DispatchEvent('SettingsNavigateToPanel', matches.tabID, matches.panel);
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/settings/search.js#L262)
	 */
	function DispatchEvent<T extends string>(event: T, ...args: T extends keyof GlobalEventNameMap ? Parameters<GlobalEventNameMap[T]> : any[]): void;

	/**
	 * Dispatch an event to occur later.
	 */
	function DispatchEventAsync(...args: any[]): void;

	/**
	 * Call a function on each given item. Functionally identical to (...).forEach(...).
	 * @deprecated This was probably added by Valve before .forEach was added to JavaScript. There's no benefit to this over .forEach.
	 **/
	function Each<T>(items: T[], callback: (item: T, index: number) => void): void;

	/**
	 * Find an element within the current panel context.
	 *
	 * This function first calls FindChildInLayoutFile, and if that fails, search other panels in the current context.
	 */
	function FindChildInContext<T extends GenericPanel = GenericPanel>(...args: any[]): T | undefined;

	/**
	 * Gets the root panel of the current Javascript context.
	 *
	 * @example $.GetContextPanel().color = color;
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/components/color-display.js#L17)
	 */
	function GetContextPanel<T extends GenericPanel = Panel>(): T;

	/**
	 * Get the current Javascript context object.
	 *
	 * Scripts (non-modules) run in this context directly. Any variables defined in the outermost scope of those scripts
	 * are accessible by one-another and are effectively properties of that context object, as well as event handlers
	 * and <script> blocks in XML.
	 *
	 * Modules run in an encapsulated context, and have no access to the outside context without use of this function.
	 * To expose values from a module, call this function and set properties on the returned object.
	 */
	function GetContextObject(): Record<string, any>;

	/**
	 * Converts str, which must be 2048 utf-8 bytes or shorter, into an HTML-safe
	 * version.
	 *
	 * If truncate=true, too long strings will be truncated instead of throwing an exception.
	 */
	function HTMLEscape(str: string, truncate?: boolean): string;

	/** Get the current language */
	function Language(): string;

	/**
	 * Load a named key values file and return as JS object.
	 *
	 * @param url The path to the file, including the extension, relative to the content folder root.
	 *
	 * @example $.LoadKeyValuesFile('panorama/data/changelog.vdf');
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/pages/drawer/about.js#L76)
	 */
	function LoadKeyValuesFile(url: string): Record<string, unknown>;

	/**
	 * Load a named key values file and return as JS object.
	 *
	 * @param url The path to the file, including the extension, relative to the content folder root.
	 */
	function LoadKeyValues3File(url: string): Record<string, unknown>;

	/**
	 * Localizes a string.
	 *
	 * @example $.Localize('#HudStatus_Spawn');
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/status.js#L47)
	 */
	function Localize(str: string): string | null;

	/** Localize a string, but return empty string if the localization token is not found */
	function LocalizeSafe(str: string): string;

	/** Log a message */
	function Msg(...messages: any[]): void;

	/**
	 * Plays the specified soundscript.
	 *
	 * @todo If a game session is active, sounds will not play until the game is unpaused.
	 * @returns A unique event identifier.
	 */
	function PlaySoundEvent(sound: string): uuid;

	/**
	 * Register an event handler for an existing event.
	 *
	 * @example $.RegisterEventHandler('OnNewChatEntry', $.GetContextPanel(), this.onNewChatEntry.bind(this));
	 *
	 * @returns A unique event identifier.
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/components/chat.js#L8)
	 */
	function RegisterEventHandler<T extends keyof PanelEventNameMap | keyof GlobalEventNameMap>(
		event: T, context: GenericPanel | string,
		callback: T extends keyof PanelEventNameMap 
			? PanelEventNameMap[T] : T extends keyof GlobalEventNameMap
				? GlobalEventNameMap[T] : never
	): uuid;

	/**
	 * Register an event handler for an event unknown to TypeScript.
	 *
	 * If this is erroring, you need to add the event to either PanelEventNameMap or GlobalEventNameMap.
	 *
	 * @example $.RegisterEventHandler('OnNewChatEntry', $.GetContextPanel(), () => this.onNewChatEntry());
	 *
	 * @returns A unique event identifier.
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/components/chat.js#L8)
	 */
	function RegisterEventHandler(event: ALLOW_MISSING_EVENTS extends true ? string : 'Define this event in PanelEventNameMap or GlobalEventNameMap!', context: GenericPanel | string, callback: Func): ALLOW_MISSING_EVENTS extends true ? uuid : never;

	/**
	 * Register a handler for an event that is not otherwise handled.
	 *
	 * @example $.RegisterForUnhandledEvent('OnMomentumTimerStateChange', this.onTimerEvent.bind(this));]
	 *
	 * @returns A unique event identifier.
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L18)
	 */
	function RegisterForUnhandledEvent<T extends keyof GlobalEventNameMap>(event: T, callback: GlobalEventNameMap[T]): uuid;

	/**
	 * Register a handler for an event that is not otherwise handled.
	 *
	 * If this is erroring, you need to add the type to GlobalEventNameMap.
	 *
	 * @example $.RegisterForUnhandledEvent('OnMomentumTimerStateChange', this.onTimerEvent.bind(this));]
	 *
	 * @returns A unique event identifier.
	 *
	 * @see [Example](https://github.com/momentum-mod/panorama/blob/721f39fe40bad57cd93943278d3a3c857e9ae9d7/scripts/hud/comparisons.js#L18)
	 */
	function RegisterForUnhandledEvent(event: ALLOW_MISSING_EVENTS extends true ? string : 'Define this event in GlobalEventNameMap!', callback: Func): ALLOW_MISSING_EVENTS extends true ? uuid : never;

	/** Register a key binding */
	function RegisterKeyBind(panel: GenericPanel, key: string, event: Func | string): void;

	/** Register a handler for whenever a convar changes */
	function RegisterConVarChangeListener(convar: string, callback: (value: string) => void): uuid;

	/** Unregister a handler for a convar change */
	function UnregisterConVarChangeListener(id: uuid): void;

	/** Schedule a function to be called later
	 * @returns A unique event identifier.
	 */
	function Schedule(time: duration, callback: Func): uuid;

	/** Stops a sound event by the specified uuid returned from a previous call to PlaySoundEvent. fadetime is optional. */
	function StopSoundEvent(guid: uuid, fadetime?: duration): void;

	/** Returns whether the OS's theme is in dark mode */
	function SystemInDarkMode(): boolean;

	/** Remove an event handler */
	function UnregisterEventHandler<T extends keyof PanelEventNameMap | keyof GlobalEventNameMap>(event: T, context: GenericPanel, eventHandler: uuid): void;

	/** Remove an event handler */
	function UnregisterEventHandler(event: ALLOW_MISSING_EVENTS extends true ? string : 'Define this event in PanelEventNameMap or GlobalEventNameMap!', context: GenericPanel, eventHandler: uuid): ALLOW_MISSING_EVENTS extends true ? void : never;

	/** Remove an unhandled event handler */
	function UnregisterForUnhandledEvent<T extends keyof GlobalEventNameMap>(event: T, eventHandler: uuid): void;

	/** Remove an unhandled event handler */
	function UnregisterForUnhandledEvent(event: ALLOW_MISSING_EVENTS extends true ? string : 'Define this event in GlobalEventNameMap!', eventHandler: uuid): ALLOW_MISSING_EVENTS extends true ? void : never;

	/** Decodes str, which must be 2048 utf-8 bytes or shorter, from URL-encoded form. */
	function UrlDecode(...args: any[]): void;

	/** Encodes str, which must be 2048 utf-8 bytes or shorter, into URL-encoded form. */
	function UrlEncode(...args: any[]): void;

	/** Log a warning */
	function Warning(...args: any[]): void;
}

/** @group api */
declare namespace FriendsAPI {
	/** Gets the name of the local player */
	function GetLocalPlayerName(): string;

	/**
	 * Gets the name of the player with the given XUID.
	 *
	 * This will only be known by the local user if the given user is in their friends list, on the same game server,
	 * in a chat room or lobby, or in a small group with the local user.
	 *
	 * @see https://partner.steamgames.com/doc/api/ISteamFriends#GetFriendPersonaName
	 */
	function GetNameForXUID(xuid: steamID): string;
}

/** @group api */
declare namespace GameInterfaceAPI {
	function ConsoleCommand(command: string): void;

	function GetSettingBool(key: string): boolean;

	function GetSettingColor(key: string): string;

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
	/**
	 * Opens the Steam overlay to the given user/group profile by their Steam ID.
	 * @param profileID - 64bit int Steam ID in a string.
	 */
	function OpenToProfileID(profileID: steamID): void;

	/** Opens the Steam overlay browser at the given URL */
	function OpenURL(url: string): void;

	/** Opens the Steam overlay browser at the given URL in a modal window (no other windows in overlay, and overlay closes when window closes) */
	function OpenURLModal(url: string): void;

	/** Opens the Steam overlay achievements dialog */
	function OpenGameOverlayAchievements(): void;

	/** Opens the Steam overlay community dialog */
	function OpenGameOverlayCommunity(): void;

	/** Opens the Steam overlay friends dialog */
	function OpenGameOverlayFriends(): void;

	/** Opens the Steam overlay offical game group dialog */
	function OpenGameOverlayOfficialGameGroup(): void;

	/** Opens the Steam overlay players dialog */
	function OpenGameOverlayPlayers(): void;

	/** Opens the Steam overlay settings dialog */
	function OpenGameOverlaySettings(): void;

	/** Opens the Steam overlay stats dialog */
	function OpenGameOverlayStats(): void;

	/**
	 * Opens the Steam store for a specified app or DLC ID.
	 * @see https://partner.steamgames.com/doc/api/ISteamFriends#ActivateGameOverlayToStore
	 */
	function OpenGameOverlayStore(appID: int32, flags: Flags<OverlayToStoreFlags>): void;
}

/** @group api */
declare namespace UiToolkitAPI {
	/** Denies input to the game by filtering input events. Returns a handle used by ReleaseDenyAllInputToGame. */
	function AddDenyAllInputToGame(panelPtr: GenericPanel, strDebugContextName: string): uint64_str;

	/** Denies mouse input to the game by filtering mouse input events. Returns a handle used by ReleaseDenyMouseInputToGame. */
	function AddDenyMouseInputToGame(panelPtr: GenericPanel, strDebugContextName: string): uint64_str;

	/** Force closing all visible popups */
	function CloseAllVisiblePopups(): void;

	/** Returns a global object that can be used to store global variables you would like to share across js files. */
	function GetGlobalObject(): Record<string, unknown>;

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
	function ReleaseDenyAllInputToGame(handle: uint64_num | uint64_str): void;

	/** ReleaseDenyMouseInputToGame takes a handle as parameters previously returned by AddDenyMouseInputToGame */
	function ReleaseDenyMouseInputToGame(handle: uint64_num | uint64_str): void;

	/** Show a context menu with a specific id and using the given layout. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowCustomLayoutContextMenu<T extends GenericPanel = GenericPanel>(targetPanelID: string, contentmenuID: string, layoutFile: string): T;

	/** Show a context menu with a specific id and using the given layout and parameters. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowCustomLayoutContextMenuParameters<T extends GenericPanel = GenericPanel>(targetPanelID: string, contentmenuID: string, layoutFile: string, parameters: string): T;

	/** Show a context menu with a specific id and using the given layout and parameters and call a function when dismissed. targetPanelID  can be the empty string in which case the cursor position is used to position the context menu. Returns context menu panel. */
	function ShowCustomLayoutContextMenuParametersDismissEvent<T extends GenericPanel = GenericPanel>(targetPanelID: string, contentmenuID: string, layoutFile: string, parameters: string, dismissJsFunc: unknown): T; 
	/** Show a tooltip with a specifix id and using the given layout and parameters. */
	function ShowCustomLayoutParametersTooltip(targetPanelID: string, tooltipID: string, layoutFile: string, parameters: string): boolean;
	
	/** Show a tooltip with a specifix id and using the given layout and parameters. Also apply a CSS class named "style" (to the tooltip root panel) in order to allow custom styling (eg. "Tooltip_NoArrow" to remove tooltip's arrow). */
	function ShowCustomLayoutParametersTooltipStyled(targetPanelID: string, tooltipID: string, layoutFile: string, parameters: string, style: string): boolean;

	/** Show a popup that lets you specify a layout. */
	function ShowCustomLayoutPopup<T extends GenericPanel = GenericPanel>(popupID: string, layoutFile: string): T;

	/** Show a popup that lets you specify a layout and parameters. */
	function ShowCustomLayoutPopupParameters<T extends GenericPanel = GenericPanel>(popupID: string, layoutFile: string, parameters: string): T;

	/** Show a tooltip with a specifix id and using the given layout. */
	function ShowCustomLayoutTooltip(targetPanelID: string, tooltipID: string, layoutFile: string): boolean;

	/** Show a tooltip with a specifix id and using the given layout. Also apply a CSS class named "style" (to the tooltip root panel) in order to allow custom styling (eg. "Tooltip_NoArrow" to remove tooltip's arrow). */
	function ShowCustomLayoutTooltipStyled(targetPanelID: string, tooltipID: string, layoutFile: string, style: string): boolean;

	/** Show a popup with the given title add message and optional style. Button present: "OK". */
	function ShowGenericPopup<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string): T;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "OK". */
	function ShowGenericPopupBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style. Button present: "Cancel". */
	function ShowGenericPopupCancel<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, cancelJSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Cancel". */
	function ShowGenericPopupCancelBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, cancelJSFunc: unknown, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style. Button present: "OK". */
	function ShowGenericPopupOk<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, okJSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "OK". */
	function ShowGenericPopupOkBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, okJSFunc: unknown, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style. Button present: "Ok"/"Cancel". */
	function ShowGenericPopupOkCancel<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, okJSFunc: unknown, cancelJSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Ok"/"Cancel". */
	function ShowGenericPopupOkCancelBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, okJSFunc: unknown, cancelJSFunc: unknown, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style and let you specify the name of one button. */
	function ShowGenericPopupOneOption<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, optionName: string, optionJSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style and let you specify the name of one button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupOneOptionBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, optionName: string, optionJSFunc: unknown, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. */
	function ShowGenericPopupThreeOptions<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, option3Name: string, option3JSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupThreeOptionsBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, option3Name: string, option3JSFunc: unknown, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. */
	function ShowGenericPopupTwoOptions<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style and let you specify the name of two button. You can specify the background style ("none", "dim" or "blur").  */
	function ShowGenericPopupTwoOptionsBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, option1Name: string, option1JSFunc: unknown, option2Name: string, option2JSFunc: unknown, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style. Button present: "Yes"/"No". */
	function ShowGenericPopupYesNo<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Yes"/"No". */
	function ShowGenericPopupYesNoBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, bgStyle: string): T;

	/** Show a popup with the given title add message and optional style. Button present: "Yes"/"No"/"Cancel". */
	function ShowGenericPopupYesNoCancel<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, cancelJSFunc: unknown): T;

	/** Show a popup with the given title add message and optional style. You can specify the background style ("none", "dim" or "blur"). Button present: "Yes"/"No"/"Cancel". */
	function ShowGenericPopupYesNoCancelBgStyle<T extends GenericPanel = GenericPanel>(title: string, message: string, style: string, yesJSFunc: unknown, noJSFunc: unknown, cancelJSFunc: unknown, bgStyle: string): T;

	/** Show a popup on the 'global popups top level window' that lets you specify a layout. */
	function ShowGlobalCustomLayoutPopup<T extends GenericPanel = GenericPanel>(popupID: string, layoutFile: string): T;

	/** Show a popup on 'global popups top level window' that lets you specify a layout and parameters. */
	function ShowGlobalCustomLayoutPopupParameters<T extends GenericPanel = GenericPanel>(popupID: string, layoutFile: string, parameters: string): T;

	/** Defines a context menu item. Used by various UIToolkitAPI methods. */
	interface SimpleContextMenuItem {
		label: string;
		jsCallback: () => void;
		style?: string;
		icon?: string;
	}

	/**
	 * Show a context menu with a specific id and populate the context menu item list using the given "items" array.
	 * targetPanelID can be the empty string in which case the cursor position is used to position the context menu.
	 * Returns context menu panel.
	 */
	function ShowSimpleContextMenu<T extends GenericPanel = GenericPanel>(targetPanelID: string, contentmenuID: string, items: SimpleContextMenuItem[]): T;

	/**
	 * Show a context menu with a specific id and populate the context menu item list using the given "items" array.
	 * targetPanelID can be the empty string in which case the cursor position is used to position the context menu.
	 * Returns context menu panel.
	 */
	function ShowSimpleContextMenuWithDismissEvent<T extends GenericPanel = GenericPanel>(targetPanelID: string, contentmenuID: string, items: SimpleContextMenuItem[], dismissJsFunc: unknown): T;

	/** Show a tooltip with the given text */
	function ShowTextTooltip(targetPanelID: string, text: string): boolean;

	/** Show a tooltip with the given text on given panel */
	function ShowTextTooltipOnPanel(targetPanel: unknown, text: string): boolean;

	/** Show a tooltip with the given text on given panel. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTextTooltipOnPanelStyled(targetPanel: unknown, text: string, style: string): boolean;

	/** Show a tooltip with the given text. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTextTooltipStyled(targetPanelID: string, text: string, style: string): boolean;

	/** Show a tooltip with the given title, image and text. */
	function ShowTitleImageTextTooltip(targetPanelID: string, title: string, image: string, text: string): boolean;

	/** Show a tooltip with the giben title, image and text. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTitleImageTextTooltipStyled(targetPanelID: string, title: string, image: string, text: string, style: string): boolean;

	/** Show a tooltip with the given title and text. */
	function ShowTitleTextTooltip(targetPanelID: string, title: string, text: string): boolean;

	/** Show a tooltip with the given title and text. Also apply a CSS class named "style" to allow custom styling. */
	function ShowTitleTextTooltipStyled(targetPanelID: string, title: string, text: string, style: string): boolean;

	/** Unregister a javascript callback previously registered with RegisterJSCallback. */
	function UnregisterJSCallback(jsCallbackHandle: int32): void;
}

/** @group api */
declare namespace UserAPI {
	/** Gets the XUID (numeric uint64 steamid as string) of the local player */
	function GetXUID(): steamID;
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
