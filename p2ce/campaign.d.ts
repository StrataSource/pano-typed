/**
 * @packageDocumentation
 * P2:CE Campaign API.
 */

interface ChapterMap {
    name: string;

    meta: any;
}

interface ChapterInfo {
    id: string; 
    title: string;
    maps: ChapterMap[];

    meta: any;
}

interface CampaignInfo {
    id: string; 
    title: string; 
    chapters: ChapterInfo[];

    meta: any;
}

// Holds multiple campaigns
interface CampaignBucket {
	id: string;
    addon_id: number; // Workshop Addon ID or -1 if not present
	campaigns: CampaignInfo[];

	meta: any;
}

interface CampaignPair
{
	bucket: CampaignBucket;
	campaign: CampaignInfo;
}

/** [API not finalized] The Campaign API. Exclusive to P2:CE! */
declare namespace CampaignAPI {
    function ReloadCampaigns();

    function GetAllCampaignBuckets(): CampaignBucket[];
    function GetActiveCampaign(): CampaignPair|null;
    function IsCampaignActive(): boolean;
    function FindCampaign(campaign: string): CampaignPair|null;

    function GetCampaignMeta(name: string|null): any;

    function SetActiveCampaign(name: string|null): boolean;
    function StartCampaign(campaign: string, chapter: string): boolean;
    function ContinueCampaign(campaign: string): boolean;

    function GetCampaignUnlockProgress(campaign: string): number;
}

interface GlobalEventNameMap {
    PanoramaComponent_Campaign_OnActiveCampaignChanged: (campaign: string|null) => void;
}
