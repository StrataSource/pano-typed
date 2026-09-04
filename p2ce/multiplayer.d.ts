/**
 * @packageDocumentation P2:CE Multiplayer API.
 */

/**
 * Player desired team assignation
 * @group enum
 */
declare const enum LobbyTeam {
	ANY = 0,
	SPECTATOR,
	RED, // P-Body, Combine, etc.
	BLUE, // Atlas, Rebels, etc.
	COUNT
}

declare const enum LobbyVisibility {
	PRIVATE = 0,
	FRIENDS_ONLY,
	PUBLIC
}

declare const enum LobbyMemberReadyState {
	NOT_READY = 0,
	DOWNLOADING_ADDONS = 1,
	READY = 2
}

declare const enum LobbyState {
	INVALID = 0,
	LOBBY = 1,
	LOADING = 2,
	PLAYING = 3
}

/**
 * Internal representation of a player in the lobby UI.
 */
interface LobbyPlayer {
	owner: boolean; // Creator/host of the lobby.
	id: steamID;
	name: string;
	state: LobbyMemberReadyState;
	team: LobbyTeam;
}

interface LobbyData {
	state: LobbyState;
	campaign: string;
	chapter: string;
	map: number;
}

interface GlobalEventNameMap {
	GameDisconnection: (reason: string) => void;
	
	PanoramaComponent_P2CELobby_LobbyJoinInProgress: (lobbyid: string) => void;
	PanoramaComponent_P2CELobby_LobbyJoinFailed: (lobbyid: string, reason: string) => void;
	PanoramaComponent_P2CELobby_LobbyJoined: (lobbyid: string) => void;
	PanoramaComponent_P2CELobby_LobbyLeft: (lobbyid: string) => void;
	PanoramaComponent_P2CELobby_LobbyStateChanged: (metadata: LobbyData) => void; // Lobby metadata was updated
	PanoramaComponent_P2CELobby_PlayerStateChanged: (who: steamID, lobbyPlayer: LobbyPlayer) => void;  // Fired when when a player's state has changed within the lobby.
	PanoramaComponent_P2CELobby_PlayerJoined: (lobbyPlayer: LobbyPlayer) => void; // Fired specifically when player has joined the lobby.
	PanoramaComponent_P2CELobby_PlayerLeft: (lobbyPlayer: steamID) => void; // Fired specifically when player has left the lobby.
	PanoramaComponent_P2CELobby_ReadyStateChanged: (state: LobbyMemberReadyState) => void; // Local player's ready state
	PanoramaComponent_P2CELobby_JoiningGame: () => void; // When the local player starts joining the host
}

declare namespace P2CELobbyAPI {
	function IsInLobby(): boolean;
	function CreateLobby(campaign: string): void;
	function ChangeCampaign(campaign: string): void;
	function OpenInviteOverlay(): boolean;
	function ExitLobby(): void;
	function SetReadyStatus(ready: boolean): void; // Attempt to ready up. This will start downloading addons if necessary.
	function GetPlayerList(): LobbyPlayer[];
	function GetCampaignID(): string;
	function IsLobbyOwner(): boolean; // Check if the local user is the owner/host of the lobby.
	function KickPlayer(steamID: steamID): void;
	function BanPlayer(steamID: steamID): void;
	function UnBanPlayer(steamID: steamID): void;
	function GetBannedPlayers(): steamID[];
	// Requests the current player's team to be set to the provided value.
	// It may fail under some circumstances.
	function SetTeam(desired: LobbyTeam): boolean;
	function GetFriendsPlayingGame(): [ { id: string } ]; // Gets the list of friends (their Steam IDs) playing the same App ID
	function SetCampaignChapter(chapter: string): void;
	function SetCampaignMap(map: number): void;
}
