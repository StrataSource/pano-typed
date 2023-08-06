/**
 * @author Koerismo
 * @see https://github.com/koerismo/pano-typed/
 */

/// <reference path="../shared/index.d.ts" />

/** [API not finalized] The workshop content API. Exclusive to P2:CE! */
declare namespace WorkshopAPI {
	function GetAddonCount(): number;
	function GetAddonMeta(index: number): AddonMeta;
	function GetAddonState(uuid: string): DownloadState;

	function GetAddonSubscribed(uuid: string): boolean;
	function GetAddonEnabled(uuid: string): boolean;

	function SetAddonSubscribed(uuid: string, subscribed: boolean): boolean;
	function SetAddonEnabled(uuid: string, enabled: boolean): boolean;
}

declare interface AddonMeta {
	uuid: string|null;
	name: string;
	desc: string;

	authors: string[];
	tags: string[];
	
	dependencies: {[uuid: string]: { required: boolean }};
	subscriptions: number;
	votescore: number;
	flagged: boolean;
	
	icon_small: string;
	icon_big: string;
}

declare type DownloadState = DownloadStateEnum[keyof DownloadStateEnum];
declare interface DownloadStateEnum {
	UninstallPending: 0,
	Uninstalling:     1,
	Uninstalled:      2,

	InstallPending:   3,
	Installing:       4,
	Installed:        5,
}
