#pragma strict

var talkMessage : String[];
var displayText : String;
var showText : boolean;

function OnGUI() {
	if (showText) {
		var npcStyle = new GUIStyle();
		npcStyle.fontSize = 16;
		npcStyle.font = Resources.Load("Retro Computer_DEMO");
		npcStyle.normal.textColor = Color.black;
		npcStyle.alignment = TextAnchor.MiddleCenter;
		npcStyle.normal.background = Texture2D.whiteTexture;
		npcStyle.wordWrap = true;
		npcStyle.padding = RectOffset(10,10,10,10);
		GUI.Label(Rect(Screen.width/2-200,Screen.height/2-200,400,100),""+displayText,npcStyle);
	}
}
function Start () {
	
}

function Update () {
	
}

function talk() {
	var other : PlayerStats;
	other = gameObject.Find("Player").GetComponent(PlayerStats);

	other.disableMovement = true;

	showText = true;

	for (var i = 0; i < talkMessage.Length; i++) {
		displayText = talkMessage[i];
		yield WaitForSeconds(3);
	}
	showText = false;
	other.disableMovement = false;
}