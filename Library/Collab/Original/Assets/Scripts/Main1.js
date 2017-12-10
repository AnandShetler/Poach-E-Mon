 #pragma strict
import System.Collections.Generic;

var AllMonsters : monster[];

var enemyMonster : monster;

var monsterInventory : monster[];
var monsterOnField : int;
var monsterCount : int;
var monsterCaughtInBall : monster;

var turn : int;
var thrown : boolean;

var other : PlayerStats;
var monsterAttacks : MonsterAttacks;

var PlayerTextStyle = new GUIStyle();
var EnemyTextStyle = new GUIStyle();
 
var hover : String;
var buttonText : String[];
var buttText : String[];

var combatText : String;
var dmg: int;
var missed : String;

function Awake () {
	other = gameObject.Find("Player").GetComponent(PlayerStats);
	monsterAttacks = gameObject.Find("Player").GetComponent(MonsterAttacks);
	PlayerTextStyle.normal.textColor = Color.green;
	EnemyTextStyle.normal.textColor = Color.green;
	buttonText = new String[4];
	combatText = "";
	missed = "";
	thrown = false;
}

function OnGUI() {
	if(other.isInCombat) {
		GUI.Label(Rect(50,100,200,100),""+monsterInventory[monsterOnField].name);
		GUI.Label(Rect(50,120,200,100),""+monsterInventory[monsterOnField].curHp+"/"+monsterInventory[monsterOnField].baseHp, PlayerTextStyle);
		GUI.DrawTexture(Rect(90,150,128,128),monsterInventory[monsterOnField].image);

		GUI.Label(Rect(Screen.width/2,100,200,100),""+enemyMonster.name);
		GUI.Label(Rect(Screen.width/2,120,200,100),""+enemyMonster.curHp+"/"+enemyMonster.baseHp, EnemyTextStyle);
		GUI.DrawTexture(Rect(Screen.width/2+40,150,128,128),enemyMonster.image);

		GUI.Label(Rect((50+Screen.width/2)/2,100,200,100),""+combatText);
		GUI.Label(Rect((50+Screen.width/2)/2,120,200,100),""+missed);

		for (var i = 0; i < 4; i++) {
			if(turn == 0 && !thrown) {
				if (monsterInventory[monsterOnField].attacks[i].type == AttackType.physical)
					GUI.backgroundColor = Color.red;
				else if (monsterInventory[monsterOnField].attacks[i].type == AttackType.health)
					GUI.backgroundColor = Color.magenta;
				else if (monsterInventory[monsterOnField].attacks[i].type == AttackType.decAttack)
					GUI.backgroundColor = Color.yellow;
				else if (monsterInventory[monsterOnField].attacks[i].type == AttackType.incAttack)
					GUI.backgroundColor = Color.cyan;
				else if (monsterInventory[monsterOnField].attacks[i].type == AttackType.decDefense)
					GUI.backgroundColor = Color.blue;
				else if (monsterInventory[monsterOnField].attacks[i].type == AttackType.incDefense)
					GUI.backgroundColor = Color.green;
				else if (monsterInventory[monsterOnField].attacks[i].type == AttackType.decSpeed)
					GUI.backgroundColor = Color.grey;
				else if (monsterInventory[monsterOnField].attacks[i].type == AttackType.incSpeed)
					GUI.backgroundColor = Color.white;
				buttonText[i] = ""+monsterInventory[monsterOnField].attacks[i].name;
				if (GUI.Button(Rect(150,300 + (i*50),100,30),GUIContent(buttonText[i], ""+i))) {
					dmg = monsterAttacks.useAbility(monsterInventory[monsterOnField].attacks[i],turn);
					if(dmg == 0) {
						if(monsterInventory[monsterOnField].attacks[i].type == AttackType.physical)
							missed = "...but it missed!";
						else
							missed = "...but it failed!";
					}
					combatText = "Your " + monsterInventory[monsterOnField].name + " used " + monsterInventory[monsterOnField].attacks[i].name;
					playerAttacked();
				}
			}
		} 
		hover = GUI.tooltip;

		if (hover != "") {
			var txt : String = ""+monsterInventory[monsterOnField].attacks[parseInt(hover)].name+": ";
			if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.physical)
				txt += "Damages opponent.";
			else if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.health)
				txt += "Heals self.";
			else if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.decAttack) 
				txt += "Decreases attack of opponent.";	
			else if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.incAttack)
				txt += "Increases attack of self.";
			else if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.decDefense)
				txt += "Decreases defense of opponent.";
			else if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.incDefense)
				txt += "Increases defense of self.";
			else if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.decSpeed)
				txt += "Decreases speed of opponent.";
			else if (monsterInventory[monsterOnField].attacks[parseInt(hover)].type == AttackType.incSpeed)
				txt += "Increases speed of self.";
			txt += "\nPower: " + monsterInventory[monsterOnField].attacks[parseInt(hover)].damage;
			txt += "\nAccuracy: " + monsterInventory[monsterOnField].attacks[parseInt(hover)].accuracy + "%";
			GUI.Label(Rect(Screen.width/2-200,Screen.height*3/4,400,100),txt);
		}

		if(turn == 0) {
			//to catch pokemon 
			if (GUI.Button(Rect(150,250 + (5*50),100,30),"Throw ball")) {
				thrown = true;
				threwBall();
			}
		}
	}
}

//also make a health bar
//also also also kinda wanna make a stats screen for ur monsters

function Update () {
	if (other.isInCombat) {
		if (enemyMonster.curHp < enemyMonster.baseHp/2) {
			EnemyTextStyle.normal.textColor = Color.yellow;
		}
		if (enemyMonster.curHp < enemyMonster.baseHp/4) {
			EnemyTextStyle.normal.textColor = Color.red;
		}

		if (monsterInventory[monsterOnField].curHp < monsterInventory[monsterOnField].baseHp/2) {
			PlayerTextStyle.normal.textColor = Color.yellow;
		}
		if (monsterInventory[monsterOnField].curHp < monsterInventory[monsterOnField].baseHp/4) {
			PlayerTextStyle.normal.textColor = Color.red;
		}

		if (monsterInventory[monsterOnField].curHp <= 0) {
			PlayerTextStyle.normal.textColor = Color.green;
			Debug.Log("player monster died");
			combatChangeMonster();
		}
		else if (enemyMonster.curHp <= 0) {
			EnemyTextStyle.normal.textColor = Color.green;
			Debug.Log("enemy monster died");
			other.exitCombat();
		}
	}
}

function playerAttacked() {
	Debug.Log("player attacked");
	turn = 1;
	enemyAttacked();
}

function threwBall() {
	Debug.Log("Ball throw!");
	//if caught and over limit 
	var caught = catches();
	if (caught) {
		if (monsterCount >= 6) {
			var animalDeleted = false;
			Debug.Log("!!!!!!!!");
			GUI.Label(Rect(Screen.width/2,100,200,100),"Choose one animal to replace: ");
			Debug.Log("!!!!!!!!");
			for(var w = 0; w < 6; w++) {
				Debug.Log("!!!!!!!!"+w);
				GUI.backgroundColor = Color.red;
				if (GUI.Button(Rect(50 + (w*50),100,100,50),GUIContent(monsterInventory[w].name, ""+w))){
					Debug.Log("!!!!!!!!"+w+monsterInventory[w].name);
					monsterInventory[w] = monsterCaughtInBall;
					other.isInCombat = false;
					thrown = false;
					other.exitCombat();
				}
			}
		}
		//if caught and under limit 
		else if (monsterCount< 6) {
			monsterInventory[monsterCount] = monsterCaughtInBall;
			Debug.Log("Counter "+ (monsterCount + 1) + " new animal: " + monsterInventory[monsterCount].name);
			monsterCount++;
			other.isInCombat = false;
			thrown = false;
			other.exitCombat();
		}
	}
	else {
		Debug.Log("U r a failure.");
		turn = 1;
		thrown = false;
		enemyAttacked();
	}
}

function enemyAttacked() {
	yield WaitForSeconds(2);
	missed = "";
	if (other.isInCombat) {
		Debug.Log("enemy attacked");
		var randomAttack = Random.Range(0,4);
		dmg = monsterAttacks.useAbility(enemyMonster.attacks[randomAttack], turn);
		if(dmg == 0) {
			if(enemyMonster.attacks[randomAttack].type == AttackType.physical)
				missed = "...but it missed!";
			else
				missed = "...but it failed!";
		}
		combatText = "Enemy " + enemyMonster.name + " used " + enemyMonster.attacks[randomAttack].name;
	}
	yield WaitForSeconds(2);
	turn = 0;
	combatText = "";
	missed = "";
}

function randomizeMonster() {
	var other : PlayerStats;
	other = gameObject.Find("Player").GetComponent(PlayerStats);

	var tempMonsters: List.<monster> = new List.<monster>();
	var randomNum : int = Random.Range(0,100);

	if (randomNum == 1) {
		for (var i = 0; i < AllMonsters.Length; i++) {
			if(AllMonsters[i].rarity == Rarity.veryRare && AllMonsters[i].regionLocated == other.region)
				tempMonsters.Add(AllMonsters[i]);
		}
	}
	else if (randomNum <= 4) {
		for (var j = 0; j < AllMonsters.Length; j++) {
			if(AllMonsters[j].rarity == Rarity.rare && AllMonsters[j].regionLocated == other.region)
				tempMonsters.Add(AllMonsters[j]);
		}
	}
	else if (randomNum <= 10) {
		for (var k = 0; k < AllMonsters.Length; k++) {
			if(AllMonsters[k].rarity == Rarity.uncommon && AllMonsters[k].regionLocated == other.region)
				tempMonsters.Add(AllMonsters[k]);
		}
	}
	else if (randomNum <= 25) {
		for (var l = 0; l < AllMonsters.Length; l++) {
			if(AllMonsters[l].rarity == Rarity.common && AllMonsters[l].regionLocated == other.region)
				tempMonsters.Add(AllMonsters[l]);
		}
	}
	else {
		for (var m = 0; m < AllMonsters.Length; m++) {
			if(AllMonsters[m].rarity == Rarity.abundant && AllMonsters[m].regionLocated == other.region)
				tempMonsters.Add(AllMonsters[m]);
		}
	}
	var newRandom = Random.Range(0, tempMonsters.Count-1);
	enemyMonster = copyMonster(tempMonsters[newRandom].name);
}

function combatChangeMonster() {
	for (var i = 0; i < 6; i++) {
		if(monsterInventory[i].curHp > 0) {
			monsterOnField = i;
			return;
		}
	}
	other.exitCombat(); 
}

//catch a monster
function catches(){
	var x : float;
	var prob : float;
	x = Random.Range(0,100);
	prob = ((1.0 - (enemyMonster.curHp/enemyMonster.baseHp))*100);
	Debug.Log(prob);
	if (x <= prob){
		monsterCaughtInBall = enemyMonster;
		Debug.Log("Caught!");
		EnemyTextStyle.normal.textColor = Color.green;
		return true; 
	}
	else return false; 
}

function copyMonster(name : String) {
	for (var i = 0; i < AllMonsters.length; i++) {
		if (AllMonsters[i].name == name) {
			var equipMonster = new monster();
			var copyMonster = new monster();
			equipMonster = AllMonsters[i];
			copyMonster.name = equipMonster.name;
			copyMonster.image = equipMonster.image;
			copyMonster.rarity = equipMonster.rarity;
			copyMonster.regionLocated = equipMonster.regionLocated;
			copyMonster.type = equipMonster.type;
			copyMonster.baseHp = equipMonster.baseHp;
			copyMonster.curHp = equipMonster.curHp;
			copyMonster.baseAtk = equipMonster.baseAtk;
			copyMonster.curAtk = equipMonster.curAtk;
			copyMonster.baseDef = equipMonster.baseDef;
			copyMonster.curDef = equipMonster.curDef;
			copyMonster.baseSpd = equipMonster.baseSpd;
			copyMonster.curSpd = equipMonster.curSpd;
			copyMonster.attacks = equipMonster.attacks;
			return copyMonster;
		}
	}
}