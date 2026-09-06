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
	DOWNLOADING_ADDONS = 1, // User has selected to ready up, but they need to install some addon content before they can be fully ready.
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
	GameDisconnection: (reason: string) => void; // Fired when the local client disconnected from the game.

	// Events specific to the local client while not in a lobby.
	PanoramaComponent_P2CELobby_LobbyJoinInProgress: (lobbyid: string) => void; // Fired when the local client is current loading into a lobby, waiting for Steam to respond.
	PanoramaComponent_P2CELobby_LobbyJoinFailed: (lobbyid: string, reason: string) => void; // Fired when the local client failed to join a lobby.
	PanoramaComponent_P2CELobby_LobbyJoined: (lobbyid: string) => void; // Fired when the local client joined a lobby.
	PanoramaComponent_P2CELobby_LobbyLeft: (lobbyid: string) => void; // Fired when the local client left a lobby.

	// Events for the local client while in a lobby.
	PanoramaComponent_P2CELobby_ReadyStateChanged: (state: LobbyMemberReadyState) => void; // Fired when the local client's ready state has changed.
	PanoramaComponent_P2CELobby_LobbyStateChanged: (metadata: LobbyData) => void; // Fired when the lobby's data has changed and needs to be reflected on the client.
	PanoramaComponent_P2CELobby_PlayerStateChanged: (who: steamID, lobbyPlayer: LobbyPlayer) => void; // Fired when a player's state has changed within the lobby.
	PanoramaComponent_P2CELobby_PlayerJoined: (lobbyPlayer: LobbyPlayer) => void; // Fired when a player, not the local client, has joined the lobby.
	PanoramaComponent_P2CELobby_PlayerLeft: (lobbyPlayer: steamID) => void; // Fired when a player, not the local client, has left the lobby.
	PanoramaComponent_P2CELobby_JoiningGame: () => void; // When the local client starts joining the host's game.
}

declare namespace P2CELobbyAPI {
	function CreateLobby(campaign: string): void;
	function ExitLobby(): void;
	function IsInLobby(): boolean;
	function IsLobbyOwner(): boolean; // Check if the local user is the owner/host of the lobby.

	function OpenInviteOverlay(): boolean; // Opens the invite dialog
	function GetFriendsPlayingGame(): [ { id: string } ]; // Gets the list of friends (their Steam IDs) playing the same App ID

	function SetReadyStatus(ready: boolean): void; // Attempt to ready up. This will start downloading addons if necessary.
	function GetPlayerList(): LobbyPlayer[];

	function KickPlayer(steamID: steamID): void;
	function BanPlayer(steamID: steamID): void;
	function UnBanPlayer(steamID: steamID): void;
	function GetBannedPlayers(): steamID[];

	// Requests the current player's team to be set to the provided value.
	// It may fail under some circumstances.
	function SetTeam(desired: LobbyTeam): boolean;

	function GetCampaignID(): string;
	function ChangeCampaign(campaign: string): void;
	function SetCampaignChapter(chapter: string): void;
	function SetCampaignMap(map: number): void;
}
