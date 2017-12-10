
var storedMonster : monster;
var showText : boolean;

function OnGui(){
var other : PlayerStats;
	other = gameObject.Find("Player").GetComponent(PlayerStats);
//display user inventory
//display monster in chest

if (showText) {
		var npcStyle = new GUIStyle();
		npcStyle.fontSize = 16;
		npcStyle.font = Resources.Load("Retro Computer_DEMO");
		npcStyle.normal.textColor = Color.black;
		npcStyle.alignment = TextAnchor.MiddleCenter;
		npcStyle.normal.background = Texture2D.whiteTexture;
		npcStyle.wordWrap = true;
		npcStyle.padding = RectOffset(10,10,10,10);

		//show inventory in list form
		GUI.Label(Rect(Screen.width/2-200,Screen.height/2-200,400,100),""+other.monsterInventory[],npcStyle);
	}


}

// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update () {
}

function open(){

var other : PlayerStats;
	other = gameObject.Find("Player").GetComponent(PlayerStats);

	other.disableMovement = true;
	Debug.Log("lol");

	showText = true;

	yield WaitForSeconds(3);

	showText = false;

	other.disableMovement = false;

}
