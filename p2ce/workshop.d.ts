/**
 * @example List all subscribed addons' names.
 * ```
 * const addon_count = WorkshopAPI.GetAddonCount();
 * for (let i = 0; i < addon_count; i++) {
 *   $.Msg(WorkshopAPI.GetAddonMeta(i).title);
 * }
 * ```
 */

/** @group enum */
declare enum DownloadState {
	UninstallPending	= 0,
	Uninstalling		= 1,
	Uninstalled			= 2,

	InstallPending		= 3,
	Installing			= 4,
	Installed			= 5,
}

/** @group enum */
declare enum AddonRating {
	None            = 0,
	ThumbsDown      = 1,
	ThumbsUp        = 2,
}

/** Describes a workshop item. */
interface AddonMeta {
	type: string;
	index: number;
	title: string;
	description: string;
	workshopid: number;
	local: boolean;

	authors: string[];
	tags: string[];

	dependencies: {[uuid: string]: { required: boolean }};
	votescore: number;
	flagged: boolean;
	upvotes: number;
	downvotes: number;
	createdTime: number;
	updatedTime: number;

	subscriptions: number;
	favorites: number;

	// The standard workshop thumbnail. Exists on all addons.
	thumb: string;

	// These only exist when the addon is a campaign.
	cover?: string;
	logo?: string;
}

/** A chapter of an addon. */
interface AddonChapterMeta {
	map: string;
	title: string;
	description: string;

	unlocked: boolean;
	thumb: string;
	background: string;
}

/** [API not finalized] The workshop content API. Exclusive to P2:CE! */
declare namespace WorkshopAPI {
	/** Returns the number of addons in the addons list. */
	function GetAddonCount(): number;
	
	/** Returns the metadata for the addon at the specified index. */
	function GetAddonMeta(index: uint32): AddonMeta;

	/** Sets the subscription state of the addon at the specified index */
	function SetAddonSubscribed(index: uint32, subscribed: boolean): void;

	/** Returns the subscription state of the addon at the specified index. */
	function GetAddonSubscribed(index: uint32): boolean;

	/** Sets the enable state of the addon at the specified index */
	function SetAddonEnabled(index: uint32, enabled: boolean): void;

	/** Returns the enable state of the addon at the specified index. */
	function GetAddonEnabled(index: uint32): boolean;

	/** Gets the user rating for the given addon. If installed locally, returns AddonRating.None */
	function GetAddonUserRating(index: uint32): AddonRating;

	/** Sets the user rating for the given addon */
	function SetAddonUserRating(index: uint32, rating: AddonRating): void;

	/** Enables or disables a set of addons in one fell swoop. Use this if you're planning to enable/disable multiple at once */
	function SetAddonListEnabled(addons: Record<int32, boolean>): void;

	/****** Below here are @TODO items!! *******/
	
	/** Returns the index of the addon that owns the specified map, or null if the map is not owned by an addon. */
	function GetAddonByMap(mapname: string): number|null;

	/** Returns the metadata of the maps for the addon at the specified index. */
	function GetAddonChapters(index: uint32): AddonChapterMeta[];

	/** Returns the download state of the addon at the specified index. */
	function GetAddonState(index: uint32): DownloadState;
}

interface GlobalEventNameMap {
	/** Fires when the installation state of an addon is updated.  */
	'WorkshopAddonStateUpdated':				(index: uint32, state: DownloadState) => void,
}
