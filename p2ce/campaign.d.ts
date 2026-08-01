/**
 * @packageDocumentation
 * P2:CE Campaign API.
 */

interface ChapterMap {
	name: string;

	meta: Map<string, string>;
}

interface ChapterInfo {
	id: string; 
	title: string;
	maps: ChapterMap[];

	meta: Map<string, string>;
}

interface CampaignMultiPlayerOptions {
	required_players: number;
	allow_splitscreen: boolean;
	wait_for_players: boolean;
}

interface CampaignInfo {
	id: string; 
	title: string; 
	chapters: ChapterInfo[];
	multiplayer: boolean;
	multiplayer_options: CampaignMultiPlayerOptions;

	meta: Map<string, string>;
}

// Holds multiple campaigns
interface CampaignBucket {
	id: string;
	addon_id: number; // Workshop Addon ID or -1 if not present
	campaigns: CampaignInfo[];

	meta: Map<string, string>;
}

interface CampaignPair
{
	bucket: CampaignBucket;
	campaign: CampaignInfo;
}

declare const enum CampaignStartFlags {
	NONE = 0x0,
	// Requries multiplayer campaign, and it must allow splitscreen
	SPLITSCREEN = 0x01
}

/** [API not finalized] The Campaign API. Exclusive to P2:CE! */
declare namespace CampaignAPI {
	function ReloadCampaigns();

	function GetAllCampaignBuckets(): CampaignBucket[];
	function GetActiveCampaign(): CampaignPair|null;
	function IsCampaignActive(): boolean;
	function FindCampaign(campaign: string): CampaignPair|null;

	function GetCampaignMeta(name: string|null): Map<string, string>|null;

	function SetActiveCampaign(name: string|null): boolean;
	function StartCampaign(campaign: string, chapter: string, map: number, flags?: CampaignStartFlags): boolean;
	function ContinueCampaign(campaign: string): boolean;

	function GetCampaignUnlockProgress(campaign: string): number;
	
	function CampaignHasSaveData(campaign: string|null): boolean;
	function MoveToNextMap(): void;
}

interface GlobalEventNameMap {
	PanoramaComponent_Campaign_OnActiveCampaignChanged: (campaign: string|null) => void;
	PanoramaComponent_Campaign_OnRefreshList: () => void;
	PanoramaComponent_Campaign_OnCampaignEvaluationRequested: (campaign: string) => void;
}
