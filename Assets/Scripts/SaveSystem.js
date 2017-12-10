#pragma strict

var player : GameObject;
var mainScript : Main1;
var parsed : String[];
var playerStats : PlayerStats;

function Start () {
	player = GameObject.Find("Player");
	Load();
}

function Awake () {
	mainScript = gameObject.Find("Main").GetComponent(Main1);
	playerStats = player.GetComponent(PlayerStats);
}

function Load () {
	if (PlayerPrefs.HasKey("playerX")) {
		player.transform.position.x = (PlayerPrefs.GetFloat("playerX"));
		player.transform.position.y = (PlayerPrefs.GetFloat("playerY"));
		player.transform.position.z = (PlayerPrefs.GetFloat("playerZ"));

		playerStats.curHp = (PlayerPrefs.GetFloat("curHp"));
		playerStats.curAtk = (PlayerPrefs.GetFloat("curAtk"));
		playerStats.curDef = (PlayerPrefs.GetFloat("curDef"));
		playerStats.curSpd = (PlayerPrefs.GetFloat("curSpd"));
	}
	else {
		player.transform.position.x = -8.0;
		player.transform.position.y = -55.0;
		player.transform.position.z = 75.0;
	}
	if (PlayerPrefs.HasKey("monsters")) {
		mainScript.monsterCount = PlayerPrefs.GetInt("monsterCount");
		Debug.Log(PlayerPrefs.GetString("monsters"));
		parsed = PlayerPrefs.GetString("monsters").Split(" "[0]);
		for (var i = 0; i < mainScript.monsterCount; i++) {
//			var m = new Monster();
			var m = mainScript.copyMonster(parsed[i*6]);
			m.curHp = int.Parse(parsed[i*6+1]);
			m.isHealing = (parsed[i*6+2] == "True");
			m.curAtk = int.Parse(parsed[i*6+3]);
			m.curDef = int.Parse(parsed[i*6+4]);
			m.curSpd = int.Parse(parsed[i*6+5]);
			mainScript.monsterInventory[i] = m;
		}
	}
	else {
		mainScript.monsterCount = 1;
		mainScript.monsterInventory[0] = mainScript.copyMonster("Coyote");
	}
}

function Display () {
	for (var i = 0; i < mainScript.monsterCount; i++){
		GUI.Label(Rect(170,100+(i*20),200,100),""+mainScript.monsterInventory[i].name);
	}
}


function Save () {
	PlayerPrefs.SetFloat("playerX",player.transform.position.x);
	PlayerPrefs.SetFloat("playerY",player.transform.position.y);
	PlayerPrefs.SetFloat("playerZ",player.transform.position.z);

	PlayerPrefs.SetFloat("curHp",playerStats.curHp);
	PlayerPrefs.SetFloat("curAtk",playerStats.curAtk);
	PlayerPrefs.SetFloat("curDef",playerStats.curDef);
	PlayerPrefs.SetFloat("curSpd",playerStats.curSpd);

	PlayerPrefs.SetInt("monsterCount",mainScript.monsterCount);

	var monsters = "";
	for (var i = 0; i < mainScript.monsterCount-1; i++) {
		var m = mainScript.monsterInventory[i];
		monsters += m.name + " " + m.curHp + " " + m.isHealing + " " + m.curAtk + " " + m.curDef + " " + m.curSpd + " ";
		Debug.Log(m.isHealing);
	}
	var l = mainScript.monsterInventory[mainScript.monsterCount-1];
	monsters += l.name + " " + l.curHp + " " + l.isHealing + " " + l.curAtk + " " + l.curDef + " " + l.curSpd;
	PlayerPrefs.SetString("monsters", monsters);
}
