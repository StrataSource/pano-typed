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
}
