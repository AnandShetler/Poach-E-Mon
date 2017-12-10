#pragma strict

var mainScript : Main1;
var e : monster;

function Awake () {
	mainScript = gameObject.Find("Main").GetComponent(Main1);
}

function catches(){
	e = mainScript.enemyMonster;
	if (!(e.maxHp == e.curHp)){
		var x : float;
		var prob : float;
		x = Random.Range(0,100);
		prob = ((1.0 - (e.curHp/e.maxHp))*100);
		if (x < prob){
			Debug.Log("Catched!");
			mainScript.monsterInventory[len(mainScript.monsterInventory)+1] = e;
			e.curHp = 0;
		}
	}
}

function Start () {
	
}

function Update () {
	
}
