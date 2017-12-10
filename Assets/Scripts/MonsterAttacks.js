#pragma strict

var mainScript : Main1;
var e : monster;
var m : monster;

function Awake () {
	mainScript = gameObject.Find("Main").GetComponent(Main1);
}

function useAbility(attack : Attack, turn : int) {
	e = mainScript.enemyMonster;
	m = mainScript.monsterInventory[mainScript.monsterOnField];

	if (turn == 0 && attack.accuracy*(m.curSpd/e.curSpd) >= Random.Range(0,100)) {
		if (attack.type == AttackType.physical)
			e.curHp -= youDamage(attack);
		else if (attack.type == AttackType.incSpeed)
			m.curSpd += youDamage(attack);
		else if (attack.type == AttackType.decSpeed) {
			e.curSpd -= youDamage(attack);
			if (mainScript.enemyMonster.curSpd < 1) e.curSpd = 1;
		}
		else if (attack.type == AttackType.incAttack)
			m.curAtk += youDamage(attack);
		else if (attack.type == AttackType.decAttack) {
			e.curAtk -= youDamage(attack);
			if (e.curAtk < 1) e.curAtk = 1;
		}
		else if (attack.type == AttackType.health) {
			m.curHp += youDamage(attack);
			if (m.curHp > m.baseHp) m.curHp = m.baseHp;
		}
		return youDamage(attack);
	}
	else if(turn == 1 && attack.accuracy*(e.curSpd/m.curSpd) >= Random.Range(0,100)) {
		if (attack.type == AttackType.physical)
			m.curHp -= enemyDamage(attack);
		else if (attack.type == AttackType.incSpeed)
			e.curSpd += enemyDamage(attack);
		else if (attack.type == AttackType.decSpeed) {
			m.curSpd -= enemyDamage(attack);
			if (m.curSpd < 1) m.curSpd = 1;
		}
		else if (attack.type == AttackType.incAttack)
			e.curAtk += enemyDamage(attack);
		else if (attack.type == AttackType.decAttack) {
			m.curAtk -= enemyDamage(attack);
			if (m.curAtk < 1) m.curAtk = 1;
		}
		else if (attack.type == AttackType.health) {
			e.curHp += enemyDamage(attack);
			if (e.curHp > e.baseHp) e.curHp = e.baseHp;
		}
		return enemyDamage(attack);
	}
	return 0;
}

function youDamage(attack : Attack) {
	e = mainScript.enemyMonster;
	m = mainScript.monsterInventory[mainScript.monsterOnField];
	return System.Math.Truncate(((2*m.level/5+2)*attack.damage*m.curAtk/e.curDef)/50+2);
}

function enemyDamage(attack : Attack) {
	e = mainScript.enemyMonster;
	m = mainScript.monsterInventory[mainScript.monsterOnField];
	return System.Math.Truncate(((2*e.level/5+2)*attack.damage*e.curAtk/m.curDef)/50+2);
}
