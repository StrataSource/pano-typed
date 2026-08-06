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

/**
 * Internal representation of a player in the lobby UI.
 */
interface LobbyPlayer {
	owner: boolean; // Creator/host of the lobby.
	id: steamID;
}

interface GlobalEventNameMap {
	PanoramaComponent_P2CELobby_LobbyStateChanged: () => void;
	PanoramaComponent_P2CELobby_PlayerStateChanged: () => void;
}

declare namespace P2CELobbyAPI {
	function IsInLobby(): boolean;
	function CreateLobby(campaign: string): void;
	function ChangeCampaign(campaign: string): void;
	function OpenInviteOverlay(): boolean;
	function ExitLobby(): void;
	function StartGameSession(): void;
	function GetPlayerList(): LobbyPlayer[];
}
