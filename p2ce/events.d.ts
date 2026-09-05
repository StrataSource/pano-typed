interface GlobalEventNameMap {
	AchievementInfoLoaded:				() => void;
	AchievementEarned:					(player_index: number, achievement_index: number) => void;
	OnSaveMapVersionMismatch:			(mapName: string) => void;
	OnSaveBegin:						(saveName: string) => void;
	OnAutoSaveBegin:					(saveName: string) => void;
	OnAutoSaveDangerousBegin:			(saveName: string) => void;
	OnSaveBlocked:						(saveName: string) => void;
	OnSaveFinished:						(saveName: string) => void;
	OnAutoSaveDangerousMarkedSafe:		() => void;
}
