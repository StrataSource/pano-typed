/**
 * @packageDocumentation
 * P2:CE Multiplayer API.
 */

/**
 * Team index for players.
 * @group enum
 */
declare const enum Team {
	TEAM_ANY = -2,
	TEAM_INVALID,
	TEAM_UNASSIGNED,
	TEAM_SP,
	TEAM_PBODY,
	TEAM_ATLAS
}

declare const enum LobbyVisibility {
	PRIVATE = 0,
	FRIENDS_ONLY,
	PUBLIC
}

/**
 * Internal representation of a player in the lobby UI.
 */
interface LobbyPlayer {
	owner: boolean; // Creator/host of the lobby.
	id: steamID;
	name: string;
}

interface GlobalEventNameMap {
	PanoramaComponent_P2CELobby_LobbyStateChanged: () => void;
	PanoramaComponent_P2CELobby_PlayerStateChanged: () => void;  // Fired when when a player has joined or left the lobby.
	PanoramaComponent_P2CELobby_PlayerJoined: (lobbyPlayer: LobbyPlayer) => void; // Fired specifically when player has joined the lobby.
	PanoramaComponent_P2CELobby_PlayerLeft: (lobbyPlayer: LobbyPlayer) => void; // Fired specifically when player has left the lobby.
	PanoramaComponent_P2CELobby_OnStartWithAddonsMissing: () => void;
	PanoramaComponent_P2CELobby_OnClientJoiningGame: () => void;
}

declare namespace P2CELobbyAPI {
	function IsInLobby(): boolean;
	function CreateLobby(campaign: string): void;
	function ChangeCampaign(campaign: string): void;
	function OpenInviteOverlay(): boolean;
	function ExitLobby(): void;
	function StartGameSession(): void;
	function GetPlayerList(): LobbyPlayer[];
	function GetMissingAddons(): bigint[]; // Returns a list of workshop AppIDs the user currently doesn't have.
	function GetCampaignID(): string;
	function IsLobbyOwner(): boolean; // Check if the local user is the owner/host of the lobby.
	function KickPlayer(steamID: steamID): void;
	function BanPlayer(steamID: steamID): void;
	function UnBanPlayer(steamID: steamID): void;
}
