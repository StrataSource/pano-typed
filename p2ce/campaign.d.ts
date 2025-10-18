/**
 * @packageDocumentation
 * P2:CE Campaign API.
 */

interface ChapterInfo {
    id: string; 
    title: string;
    thumbnail: string;
}

interface CampaignInfo {
    id: string; 
    title: string; 
    chapters: ChapterInfo[];
    transition_screens: string[];
    is_coop: boolean;
}

/** [API not finalized] The Campaign API. Exclusive to P2:CE! */
declare namespace CampaignAPI {
    function GetAllCampaigns(): CampaignInfo[];

    function GetBackgroundLevel(): string;
    function GetBackgroundMovie(): string;
    function GetBackgroundMusic(): string;
    function GetBackgroundImage(): string;

    function SetActiveCampaign(name: string): boolean;
    function StartCampaign(campaign: string, chapter: string): boolean;

    function GetCampaignUnlockProgress(campaign: string): number;
}
