#pragma strict

var player : GameObject;
var mainScript : Main1;
var parsed : String[];

function Start () {
	player = GameObject.Find("Player");
	Load();
}

function Awake () {
	mainScript = gameObject.Find("Main").GetComponent(Main1);
}

function Load () {
	if (PlayerPrefs.HasKey("playerX")) {
		player.transform.position.x = (PlayerPrefs.GetFloat("playerX"));
		player.transform.position.y = (PlayerPrefs.GetFloat("playerY"));
		player.transform.position.z = (PlayerPrefs.GetFloat("playerZ"));
	}
	else {
		player.transform.position.x = -8.0;
		player.transform.position.y = -55.0;
		player.transform.position.z = 75.0;
	}
	if (PlayerPrefs.HasKey("monsters")) {
		mainScript.monsterCount = PlayerPrefs.GetInt("monsterCount");
		parsed = PlayerPrefs.GetString("monsters").Split(" "[0]);
		for (var i = 0; i < mainScript.monsterCount; i += 2) {
			mainScript.monsterInventory[i/2] = mainScript.copyMonster(parsed[i]);
			mainScript.monsterInventory[i/2].curHp = int.Parse(parsed[i+1]);
		}
	}
	else {
		mainScript.monsterCount = 1;
		mainScript.monsterInventory[0] = mainScript.copyMonster("Coyote");
	}
}

function Display () {
	for (var i = 1; i < mainScript.monsterCount+1; i++){
		GUI.Label(Rect(170,100+(i*10),200,100),""+mainScript.monsterInventory[i-1].name);
	}
}


function Save () {
	PlayerPrefs.SetFloat("playerX",player.transform.position.x);
	PlayerPrefs.SetFloat("playerY",player.transform.position.y);
	PlayerPrefs.SetFloat("playerZ",player.transform.position.z);

	PlayerPrefs.SetInt("monsterCount",mainScript.monsterCount);

	var monsters = "";
	for (var i = 0; i < mainScript.monsterCount; i++) {
		monsters += mainScript.monsterInventory[i].name + " " + mainScript.monsterInventory[i].curHp;
	}
	PlayerPrefs.SetString("monsters", monsters);
}
