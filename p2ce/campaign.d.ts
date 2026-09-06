/**
 * @packageDocumentation P2:CE Campaign API.
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
	max_players: number; // Maximum number of players that can be in the lobby.
	max_num_teams: number; // Maximum number of teams that players can be on.
	default_team: LobbyTeam; // Default team that the first player is set on before next player joining goes to another team.
	can_switch_teams: boolean; // If other players than the host can switch teams.
	required_players: number; // Minimum number of players required to start.
	required_num_team_players: number; // Minimum number of players on each team required to start.
	allow_splitscreen: boolean; // If split-screen should be allowed with this campaign.
	wait_for_players: boolean; // Wait for another player to join before the game progresses. Ex. Waiting for coop partner behavior.
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

/** [API not finalized] The Campaign API. Exclusive to P2:CE! */
declare namespace CampaignAPI {
    function ReloadCampaigns(): void;

	function GetAllCampaignBuckets(): CampaignBucket[];
	function GetActiveCampaign(): CampaignPair|null;
	function IsCampaignActive(): boolean;
	function FindCampaign(campaign: string): CampaignPair|null;

	function GetCampaignMeta(name: string|null): Map<string, string>|null;

	function SetActiveCampaign(name: string|null): boolean;
	function StartCampaign(campaign: string, chapter: string, map: number): boolean;
	function ContinueCampaign(campaign: string): boolean;

    function GetCampaignUnlockProgress(campaign: string): number;

    function CampaignHasSaveData(campaign: string|null): boolean;
    function MoveToNextMap(): void;

    function OpenRatingMenu(): void;
    function IsRatingCampaign(): boolean;
    function CompleteRating(): void;
}

interface GlobalEventNameMap {
    PanoramaComponent_Campaign_OnActiveCampaignChanged: (campaign: string|null) => void;
    PanoramaComponent_Campaign_OnRefreshList: () => void;
}
