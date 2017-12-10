#pragma strict

var isPaused : boolean;
var menu : int;

function OnGUI() {

	var other : SaveSystem;
	other = GameObject.Find("Player").GetComponent(SaveSystem);

	if (isPaused) {
		if (GUI.Button(Rect(10,100,100,30),"ANIMALS")) menu = 1;
		if (GUI.Button(Rect(10,130,100,30),"BAG")) menu = 2;
		if (GUI.Button(Rect(10,160,100,30),"CHARACTER")) menu = 3;
		if (GUI.Button(Rect(10,190,100,30),"SAVE")) menu = 4;
		if (GUI.Button(Rect(10,220,100,30),"OPTIONS")) menu = 5;
		if (GUI.Button(Rect(10,250,100,30),"RESUME")) isPaused = false;
		if (GUI.Button(Rect(10,280,100,30),"EXIT GAME")) Application.Quit();
		switch (menu) {
			case 1:
				GUI.Box(Rect(110,70,200,300),"ANIMALS");
				other.Display();
				break;
			case 2:
				GUI.Box(Rect(110,70,200,300),"BAG");
				break;
			case 3:
				GUI.Box(Rect(110,70,200,300),"CHARACTER");
				break;
			case 4:
				GUI.Box(Rect(110,70,200,300),"SAVED");
				other.Save();
				break;
			case 5:
				GUI.Box(Rect(110,70,200,300),"OPTIONS");
				break;
			default:
				Debug.Log("No menu selected");
			break;
		}
	}
}

function Start () {
	
}

function Update () {
	if(Input.GetKeyDown("p")) {
		isPaused = !isPaused;
	}
}
