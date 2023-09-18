/**
 * @author Koerismo
 * @see https://github.com/koerismo/pano-typed/
 */

interface WeaponInfo {
	classname: string;
	slot: number;				// Inventory slot occupied - From the weapon script
	position: number;			// Position occupied - From the weapon script (slightly hl2-specific)
	type: 'gun' | 'melee';		// Can be either melee or gun (for now)
	primary: {
		usesPrimary: boolean;	// True when this weapon uses primary ammo
		usesClips: boolean;		// True when this weapon uses clips
		clipSize: number;		// The clip size of the weapon
		maxAmmo: number;		// The max amount of primary ammo
		ammo: number;			// The actual ammo count for the weapon right now
		ammoType: string;		// A string representing the ammo type
	};
	secondary: {
		usesSecondary: boolean;	// True when this weapon uses secondary ammo
		usesClips: boolean;		// True when this weapon uses clips
		clipSize: number;		// The clip size of the weapon
		maxAmmo: number;		// The max amount of primary ammo
		ammo: number;			// The actual ammo count for the weapon right now
		ammoType: string;		// A string representing the ammo type
	};
}

declare namespace WeaponAPI {
	function GetWeaponCount(): uint32;
	function GetWeapon(index: uint32): string;
	function GetActiveWeapon(): string;
	function DropWeapon(index: uint32): boolean;
	function CanSwitchToWeapon(index: uint32): boolean;
	function HasWeapon(name: string): boolean;
	function SwitchToWeapon(index: uint32): boolean;
	function GetWeaponIndex(name: string): uint32;
	function GetWeaponInfo(index: uint32): WeaponInfo;
}