/**
 * @packageDocumentation
 * @example List all subscribed addons' names.
 * ```
 * const addon_count = WorkshopAPI.GetAddonCount();
 * for (let i = 0; i < addon_count; i++) {
 *   $.Msg(WorkshopAPI.GetAddonMeta(i).title);
 * }
 * ```
 */

declare type AddonIndex_t = int32;
declare type PublishedFileId_t = bigint;

/** @group enum */
declare enum AddonRating {
	None            = 0,
	ThumbsUp        = 1,
	ThumbsDown      = 2,
}

/** Describes a workshop item. */
interface AddonMeta {
	type: string;
	index: number;
	title: string;
	description: string;
	workshopid: PublishedFileId_t;
	local: boolean;

	authors: string[];
	tags: string[];

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
}

interface SteamUGCDetails_t {
	nPublishedFileId: PublishedFileId_t;
	rgchTitle: string;
	rgchDescription: string;
	ulSteamIDOwner: uint64_num;
	rtimeUpdated: Date;
	rtimeCreated: Date;
	tags: string[];
	previews: string[];
}

/** [API not finalized] The workshop content API. Exclusive to P2:CE! */
declare namespace WorkshopAPI {
	/** Returns the number of addons in the addons list. */
	function GetAddonCount(): number;
	
	/** Returns the metadata for the addon at the specified index. */
	function GetAddonMeta(index: AddonIndex_t): AddonMeta;

	/** Sets the subscription state of the addon at the specified index */
	function SetAddonSubscribed(index: AddonIndex_t, subscribed: boolean): void;

	/** Returns the subscription state of the addon at the specified index. */
	function GetAddonSubscribed(index: AddonIndex_t): boolean;

	/** Sets the enable state of the addon at the specified index */
	function SetAddonEnabled(index: AddonIndex_t, enabled: boolean): void;

	/** Returns the enable state of the addon at the specified index. */
	function GetAddonEnabled(index: AddonIndex_t): boolean;

	/** Gets the user rating for the given addon. If installed locally, returns AddonRating.None */
	function GetAddonUserRating(index: AddonIndex_t): AddonRating;

	/** Sets the user rating for the given addon */
	function SetAddonUserRating(index: AddonIndex_t, rating: AddonRating): void;

	/** Enables or disables a set of addons in one fell swoop. Use this if you're planning to enable/disable multiple at once */
	function SetAddonListEnabled(addons: Record<AddonIndex_t, boolean>): void;

	/** Returns the content path of an addon at the specified index. */
	function GetAddonNamedPath(index: AddonIndex_t): string;

	/** Launched the game from Hammer or using the -workshop_tools launch option */
	function IsWorkshopToolsMode(): boolean;

	function GetAddonDependencies(index: AddonIndex_t): Array<AddonIndex_t> | null;
	function GetAddonDependenciesMissing(index: AddonIndex_t): Array<PublishedFileId_t> | null;
	function CreateQueryUGCDetailsRequest(workshopIds: Array<PublishedFileId_t>): Promise<Array<SteamUGCDetails_t|null>>;
	function GetActiveMountList(): Array<AddonIndex_t>;
}

interface GlobalEventNameMap {
	'PanoramaComponent_Workshop_OnAddonInstalled': (index: AddonIndex_t) => void,
}
