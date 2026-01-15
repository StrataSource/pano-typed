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
    addon_id: number; // Workshop Addon ID or -1 if not present

    meta: any;
}

/** [API not finalized] The Campaign API. Exclusive to P2:CE! */
declare namespace CampaignAPI {
    function ReloadCampaigns();

    function GetAllCampaigns(): CampaignInfo[];
    function GetActiveCampaign(): CampaignInfo|null;

    function GetCampaignMeta(name: string|null): any;

    function SetActiveCampaign(name: string): boolean;
    function StartCampaign(campaign: string, chapter: string): boolean;
    function ContinueCampaign(campaign: string): boolean;

    function GetCampaignUnlockProgress(campaign: string): number;
}

interface GlobalEventNameMap {
    PanoramaComponent_Campaign_OnActiveCampaignChanged: (campaign: string) => void;
}
