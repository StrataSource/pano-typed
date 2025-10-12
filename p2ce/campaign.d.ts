/**
 * @packageDocumentation
 * P2:CE Campaign API.
 */

interface ChapterInfo {
    id: string; 
    title: string;

    meta: any;
}

interface CampaignInfo {
    id: string; 
    title: string; 
    chapters: ChapterInfo[];
    is_coop: boolean;

    meta: any;
}

/** [API not finalized] The Campaign API. Exclusive to P2:CE! */
declare namespace CampaignAPI {
    function GetAllCampaigns(): CampaignInfo[];

    function GetCampaignMeta(name: string|null): any;

    function SetActiveCampaign(name: string): boolean;
    function StartCampaign(campaign: string, chapter: string): boolean;
    function ContinueCampaign(campaign: string): boolean;

    function GetCampaignUnlockProgress(campaign: string): number;
}
