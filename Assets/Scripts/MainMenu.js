import UnityEngine.SceneManagement;
import System.Collections;
import UnityEngine.UI;
import UnityEngine.YieldInstruction;

var back : GameObject;
var sad : Sprite; 
var ahImage : Image; 

function LoadGame(){
	ahImage = back.GetComponent(Image);
	ahImage.sprite = sad;
	yieldPls();
}

function OnGUI() {
	var titleStyle = new GUIStyle();
	titleStyle.fontSize = 40;
	titleStyle.font = Resources.Load("Bubble");
	titleStyle.normal.textColor = Color.black;
	titleStyle.alignment = TextAnchor.MiddleCenter;
	titleStyle.wordWrap = true;
	titleStyle.padding = RectOffset(10,10,10,10);
	GUI.Label(Rect(Screen.width/2-300,Screen.height/2-300,600,200),"Poach-E-Mon",titleStyle);
}

function QuitGame(){
	SceneManager.UnloadSceneAsync("Gamev1");
}

function yieldPls(){
	yield WaitForSeconds(2);
	SceneManager.LoadScene("Gamev1");
}

