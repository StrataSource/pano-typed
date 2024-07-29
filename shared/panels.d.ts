interface PanelTagNameMap {
	Panel: Panel;
	Button: Button;
	TextEntry: TextEntry;
	ToggleButton: ToggleButton;
	Frame: Frame;
	Image: Image;
	Label: Label;
	Movie: Movie;
	NumberEntry: NumberEntry;
	ProgressBar: ProgressBar;
	ResizeDragKnob: ResizeDragKnob;
	ModelPanel: ModelPanel;
	UICanvas: UICanvas;
	BackbufferImagePanel: BackbufferImagePanel;
	LoadingScreen: BackbufferImagePanel;
	MainMenu: MainMenu;
	SettingsSlider: SettingsSlider;
}

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
	FindChild(id: string): Panel | null;

	FindChildInLayoutFile(id: string): Panel | null;

	FindChildrenWithClassTraverse(classname: string): Panel[];

	FindChildTraverse(id: string): Panel | null;

	GetAttributeInt(attribute: string, fallback: int32): int32;

	GetAttributeString(attribute: string, fallback: string): string;

	GetAttributeUInt32(attribute: string, fallback: uint32): uint32;

	GetChild(index: int32): Panel | null;

	GetChildCount(): int32;

	GetChildIndex(child: Panel): int32;

	GetFirstChild(): Panel | null;

	GetLastChild(): Panel | null;

	GetLayoutFileDefine(def: string): unknown;

	GetParent(): Panel | null;

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

	ScrollToFitRegion( arg0: float, arg1: float, arg2: float, arg3: float, arg4: unknown, arg5: boolean, arg6: boolean ): void;

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

	/** Check if this panel is still valid */
	IsValid(): boolean;
}

declare interface Button extends Panel {}

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

	SetSelected(selected: boolean): void;
}

declare interface RadioButton extends Button {
	group: string;

	SetSelected(selected: boolean): void;

	GetSelectedButton(): Panel;
}

/** A simple button type that contains a label */
declare interface TextButton extends Button {
	text: string;
}

declare interface NStateButton extends Button {
	numstates: int32;

	currentstate: int32;

	/**
	 * Increment the current state of the button
	 * Wraps around to 0 when numstates+1 >= currentstate
	 */
	IncrementState(): void;

	/**
	 * Resets the current state to 0
	 */
	ResetState(): void;
}

declare interface HoldButton extends Button {}

declare interface Frame extends Panel {
	/** Sets the Frame content to the specified snippet. */
	SetSnippet(snippet: string): void;

	/** Sets the Frame content to the specified layout file url. */
	SetSource(source: string): void;
}

/**
 * @example <Image src="file://{images}/spectatingIcon.svg" textureheight="64" scaling="stretch-to-cover-preserve-aspect" />
 * @see [Example](https://github.com/momentum-mod/panorama/blob/15bbaf2243166aa5f3a053783906f7304a9e74ac/layout/hud/spectate.xml#L13)
 */
declare interface Image extends Panel {
	/** The image source. Set this through Image.SetImage(...)! */
	readonly src: string;

	/** The scaling mode of the image. Set this through Image.SetScaling(...)! */
	readonly scaling: string;

	textureheight: string;

	SetImage(path: string): void;

	SetScaling(mode: 'stretch-to-cover-preserve-aspect' | 'stretch-to-fit-preserve-aspect'): void;
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

/** An interactive dropdown menu.
 * @example <DropDown
 * 	   id="ColorMode"
 *	   class="dropdown settings-enum-dropdown__dropdown"
 * 	   menuclass="dropdown-menu" />
 */
declare interface DropDown extends Panel {
	min: int32;

	max: int32;

	value: int32;

	AddOption(panel: Panel): void;

	HasOption(panelId: string): boolean;

	RemoveOption(panelId: string): void;

	RemoveOptionIndex(index: int32): void;

	RemoveAllOptions(): void;

	GetSelected(): Panel;

	SetSelected(selection: string): void;

	SetSelectedIndex(index: int32): void;

	FindDropDownMenuChild(panelId: string): Panel;

	AccessDropDownMenu(): Panel;
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
declare interface StaticConsoleMessageTarget extends Panel {}

/** Renders 2d shapes in the UI.
 * @todo These types are incomplete and unverified!
 */
declare interface UICanvas extends Panel {
	/**
	 * @param count The number of points to draw.
	 * @param coords An array of float x/y coordinates.
	 * @param thickness The thickness of the line.
	 * @param color The color of the line as a string.
	 */
	DrawLinePoints(count: number, coords: number[], thickness: number, color: string): void;

	/**
	 * Draws a line, but softer!
	 * @param count Number of points
	 * @param coords Array of float x/y coordinates. Must be count * 2 in length
	 * @param thickness Thickness of the line
	 * @param softness Softness of the line
	 * @param color Color of the line
	 */
	DrawSoftLinePoints(count: number, coords: number[], thickness: number, softness: number, color: string): void;

	/**
	 * Draws a bunch of discrete points
	 * @param count Number of points
	 * @param coords Array of float x/y coordinates. Must be count * 2 in length
	 * @param thickness Thickness of the line
	 * @param softness Softness of the line
	 * @param color Color of the line
	 */
	DrawSoftLinePointsDisconnected(
		count: number,
		coords: number[],
		thickness: number,
		softness: number,
		color: string
	): void;

	/**
	 * @param count The number of points to draw.
	 * @param coords An array of float x/y coordinates.
	 * @param color The color of the line as a string.
	 */
	DrawPoly(count: number, coords: number[], color: string): void;

	/**
	 * @param count Number of points
	 * @param coords An array of float x/y coords. Must be count * 2 in length
	 * @param colors An array of colors for each point. Must be count in length
	 */
	DrawShadedPoly(count: number, coords: number[], colors: string[]): void;

	/**
	 * Draws a circle with lines (i.e. not filled)
	 * @param cX X coord of center
	 * @param cY Y coord of center
	 * @param radius Radius of the circle
	 * @param color Color of the lines
	 */
	DrawLineCircle(cX: number, cY: number, radius: number, color: string): void;

	/**
	 * Draws a filled circle
	 * @param cX X coord of center
	 * @param cY Y coord of center
	 * @param radius Radius of the circle
	 * @param color Color of the circle
	 */
	DrawFilledCircle(cX: number, cY: number, radius: number, color: string): void;

	/**
	 * Draws a filled wedge, basically a slice of a circle
	 * @param cX X coord of center
	 * @param cY Y coord of center
	 * @param radius Radius of the circle
	 * @param startAngle Starting angle (in radians)
	 * @param angleDelta Angle delta (in radians)
	 * @param color Color of the wedge
	 */
	DrawFilledWedge( cX: number, cY: number, radius: number, startAngle: number, angleDelta: number, color: string ): void;

	SetMaxDrawCommands(max: number): void;

	/**
	 * Set current draw color
	 * @param color
	 */
	SetDrawColor(color: string): void;

	/**
	 * Set current draw size
	 * @param size
	 */
	SetDrawSize(size: float): void;

	/**
	 * Set additive rendering mode
	 * @param additive
	 */
	SetAdditive(additive: boolean): void;

	/**
	 * Clear the canvas with the specified color
	 * @param color Clear color
	 */
	Clear(color: string): void;
}

declare interface BackbufferImagePanel extends Panel {}

declare interface LoadingScreen extends Panel {}

declare interface MainMenu extends Panel {
	IsMultiplayer(): boolean;
}

declare interface SettingsSlider extends Panel {
	convar: string;

	max: float;

	min: float;

	value: float;

	ActualValue(): float;

	OnShow(): void;

	RestoreCVarDefault(): void;
}

declare interface SettingsKeyBinder extends Panel {
	bind: string;

	OnShow(): void;
}

declare interface SettingsToggle extends Panel {
	convar: string;

	/** Set the cvar back to default */
	RestoreCVarDefault(): void;

	OnShow(): void;
}

declare interface SettingsEnum extends Panel {
	convar: string;
}

declare interface SettingsEnumDropDown extends Panel {
	convar: string;

	OnShow(): void;

	RefreshDisplay(): void;

	/** Set the cvar back to default */
	RestoreCVarDefault(): void;
}

declare interface AvatarImage extends Panel {
	accountid: string;

	steamid: string;
}

declare interface BaseBlurTarget extends Panel {
	/**
	 * Add a panel to the blur list
	 * @param panel
	 */
	AddBlurTarget(panel: Panel);

	/**
	 * Remove a panel from the blur list
	 * @param panel
	 */
	RemoveBlurPanel(panel: Panel);
}

declare interface TripleMonitorBackground extends Panel {}

declare type ClockType = ValueOf<ClockTypeEnum>;

/** @group enum */
declare interface ClockTypeEnum {
	NONE: 		'none';
	REALTIME: 	'realtime';
	WALL: 		'wall';
	GAME: 		'game';
	GAMETICK: 	'game-tick';
	GAMESERVER: 'game-server';
}

declare interface CountdownTimer extends Panel {
	timeleft: number;

	clocktype: ClockType;
}

declare interface Carousel extends Panel {
	SetSelectedChild(panel: Panel);

	GetFocusChild(): Panel;

	GetFocusIndex(): number;

	SetAutoScrollEnabled(enabled: boolean);
}
