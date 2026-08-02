/**
 * @packageDocumentation
 * P2:CE Multiplayer API.
 */

declare const enum Team
{
    TEAM_ANY = -2,
    TEAM_INVALID,
    TEAM_UNASSIGNED,
    TEAM_SP,
    TEAM_PBODY,
    TEAM_ATLAS
}

interface PlayerInfo
{
    name: string; // Cached username
    steamID: steamID; // User SteamID

    host: boolean; // Player is host of the lobby
    slotIndex: number; // Displayed UI slot, maybe not needed here and instead left to the UI

    hasAllAddons?: boolean; // Has required installed addons

    team?: Team; // Game team
}

interface GlobalEventNameMap {
    PanoramaComponent_P2CEMatchmaking_OnPlayerJoinedLobby: (xuid: steamID) => void;
    PanoramaComponent_P2CEMatchmaking_OnPlayerLeftLobby: (xuid: steamID) => void;
}