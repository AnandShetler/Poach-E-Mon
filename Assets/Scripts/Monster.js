#pragma strict

class monster {
	var name : String;
	var level : int = 1;
	var experience : float;
	var isHealing : boolean = false;
	var image : Texture2D;
	var rarity : Rarity;
	var regionLocated : String;
	var type : Type;
	var baseHp : float;
	var curHp : float;
	var baseAtk : float;
	var curAtk : float;
	var baseDef : float;
	var curDef : float;
	var baseSpd : float;
	var curSpd : float;
	var attacks : Attack[];
}

enum Type {
air,
forest,
tundra,
desert,
freshwater,
saltwater,
savanna
}

enum Rarity {
abundant,
common,
uncommon,
rare,
veryRare
}