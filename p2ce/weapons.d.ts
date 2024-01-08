/**
 * @packageDocumentation
 * P2:CE Weapons API.
 * @example Select the crowbar if the player has it.
 * ```
 * const crowbar = WeaponsAPI.GetWeaponIndexFromClass("weapon_crowbar");
 * if (WeaponsAPI.HasWeapon(crowbar)) {
 *   WeaponsAPI.SwitchToWeapon(crowbar);
 * }
 * ```
 */

type WeaponHUDState = ValueOf<WeaponHUDStateEnum>;
interface WeaponHUDStateEnum {
	Showing:  0,		// Means that the menu should be shown
	Selected: 1,		// Means that the menu should be hidden instantly, and that the current slot should be selected
	Expired:  2,		// Means that the menu should fade away without selecting the current slot
}

/** @group enum */
declare enum WeaponStateMode {
    Switch  = 0,
    Pickup  = 1,
    Drop    = 2,
}

/** @group enum */
declare enum WeaponSelectAction {
    Next = 0,
    Prev = 1,
    Show = 2,
    Hide = 3,
}

interface Weapon {
	id: uint32;
	name: string;
	classname: string;
	viewmodel: string;
	playermodel: string;

	slot: number;
	position: number;

	usesPrimary: boolean;		// True when this weapon uses primary ammo
	usesSecondary: boolean;		// True when this weapon uses secondary ammo

	primary: {
		usesClips: boolean;		// True when this weapon uses clips
		clipSize: number;		// The clip size of the weapon
		maxAmmo: number;		// The max amount of primary ammo
		ammoType: string;		// A string representing the ammo type
	};

	secondary: {
		usesClips: boolean;		// True when this weapon uses clips
		clipSize: number;		// The clip size of the weapon
		maxAmmo: number;		// The max amount of primary ammo
		ammoType: string;		// A string representing the ammo type
	};
}

interface WeaponInfo {
	primaryAmmo: number;
	primaryClip: number;
	secondaryAmmo: number;
	secondaryClip: number;
}

declare namespace WeaponsAPI {
	/** Gets the total number of weapons in the game. */
	function GetWeaponCount(): uint32;
	/** Gets info on the specified weapon. */
	function GetWeapon(id: uint32): Weapon;
	/** Retrieves ammo info for the specified weapon. */
	function GetWeaponInfo(id: uint32): WeaponInfo;
	/** Gets the index of the player's currently held weapon. */
	function GetActiveWeapon(): uint32;

	/** Returns whether the player owns the specified weapon. */
	function HasWeapon(id: uint32): boolean;
	/** Selects the specified weapon. */
	function SelectWeapon(id: uint32): boolean;
	/** Drops the weapon, giving it the specified world velocity. */
	function DropWeapon(id: uint32, velX?: float, velY?: float, velZ?: float): boolean;
}
