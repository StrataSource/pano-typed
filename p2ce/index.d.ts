/**
 * @file P2:CE-specific types
 * @see https://github.com/StrataSource/pano-typed/
 */

/// <reference path="../shared/index.d.ts" />
/// <reference path="./weapons.d.ts" />

type DownloadState = ValueOf<DownloadStateEnum>;
interface DownloadStateEnum {
	UninstallPending: 0,
	Uninstalling:     1,
	Uninstalled:      2,

	InstallPending:   3,
	Installing:       4,
	Installed:        5,
}

/** Describes a workshop item. */
interface AddonMeta {
	type: string;
	index: number;
	title: string;
	description: string;
	local: boolean;

	authors: string[];
	tags: string[];

	dependencies: {[uuid: string]: { required: boolean }};
	subscriptions: number;
	votescore: number;
	flagged: boolean;

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
	function GetAddonMeta(index: number): AddonMeta;
	/** Returns the metadata of the maps for the addon at the specified index. */
	function GetAddonChapters(index: number): AddonChapterMeta[];
	/** Returns the download state of the addon at the specified index. */
	function GetAddonState(index: number): DownloadState;
	/** Returns the subscription state of the addon at the specified index. */
	function GetAddonSubscribed(index: number): boolean;
	/** Returns the enable state of the addon at the specified index. */
	function GetAddonEnabled(index: number): boolean;
	/** Sets the subscription state of the addon at the specified index, returning whether the operation succeeded. */
	function SetAddonSubscribed(index: number, subscribed: boolean): boolean;
	/** Sets the enable state of the addon at the specified index, returning whether the operation succeeded. */
	function SetAddonEnabled(index: number, enabled: boolean): boolean;
}

interface GlobalEventNameMap {
	/** Fires when the installation state of an addon is updated.  */
	'WorkshopAddonStateUpdated':				(index: uint32, state: DownloadState) => void,
}
