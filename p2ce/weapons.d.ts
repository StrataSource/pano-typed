/**
 * @file P2:CE Weapons API
 * @see https://github.com/StrataSource/pano-typed/
 */

declare interface GlobalEventNameMap {
	'WeaponStateChange':		(mode: WeaponStateMode, index: int32) => void,
	'WeaponSelect':				(action: WeaponSelectAction) => void,
}

declare type WeaponStateMode = ValueOf<WeaponStateModeEnum>;
interface WeaponStateModeEnum {
    Switch: 0,
    Pickup: 1,
    Drop: 2,
}

declare type WeaponSelectAction = ValueOf<WeaponSelectActionEnum>;
interface WeaponSelectActionEnum {
    Next: 0,
    Prev: 1,
    Show: 2,
    Hide: 3,
}

interface Weapon {
    name: string;
    classname: string;
    viewmodel: string;
    playermodel: string;

    slot: number;
    position: number;

    type: 'melee' | 'gun';

    primary: {
        usesPrimary: boolean;		// True when this weapon uses primary ammo
        usesClips: boolean;			// True when this weapon uses clips
        clipSize: number;			// The clip size of the weapon
        clipAmmo: number;			// The ammo in the current clip
        ammoType: string;			// The name of the ammo, or an empty string if no name given
        maxAmmo: number;			// The max amount of primary ammo
        ammo: number;				// The amount of ammo remaining
    };

    secondary: {
        usesSecondary: boolean;		// True when this weapon uses secondary ammo
        usesClips: boolean;			// True when this weapon uses clips
        clipSize: number;			// The clip size of the weapon
        clipAmmo: number;			// The ammo in the current clip
        ammoType: string;			// The name of the ammo, or an empty string if no name given
        maxAmmo: number;			// The max amount of secondary ammo
        ammo: number;				// The amount of ammo remaining
    };
}

declare namespace WeaponsAPI {
    function GetWeaponCount(): uint32;
    function GetWeapons(): (Weapon | null)[];
    function GetActiveWeapon(): uint32;
    function HasWeaponClass(classname: string): boolean;
    function HasWeapon(id: uint32): boolean;
    function GetWeaponInfo(id: uint32): Weapon | null;
    function GetActiveWeaponInfo(): Weapon | null;
    function CanSwitchToWeapon(id: uint32): boolean;
    function SwitchToWeapon(id: uint32): boolean;
    function GetWeaponIndexFromClass(classname: string): uint32;
    function DropWeapon(id: uint32, throwVecX: number, throwVecY: number, throwVecZ: number): boolean;
}
