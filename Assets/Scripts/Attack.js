#pragma strict

public class Attack {
	var name : Move;
	var damage : float;
	var type : AttackType;
	var accuracy : float;
}

enum AttackType {
incSpeed,
decSpeed,
incDefense,
decDefense,
incAttack,
decAttack,
health,
physical
}

enum Move {
Whip,
Roar,
Stomp,
Procreate,
Sleep,
Eucalyptus,
Fall,
Climb,
Swim,
Bump,
Slap,
Bite,
Slam,
Intimidate,
Stalk,
Hide,
Scratch,
Hunt,
Fly,
Peck,
Hoot,
Hibernate,
Blink,
PlayDead,
Hang,
Eat,
Snore,
Sting,
Pollinate,
Buzz,
Kick,
Box,
Jump,
Run,
Poison,
Poop,
Squawk,
Suffocate,
Ink,
Slash,
BodySlam,
Rush,
Howl,
Lick,
Boomerang,
Snap,
Drown,
Puff,
Bubble,
Beach,
Tongue,
Ribbit,
Croak,
Flop,
RadiateDepression,
Twerk,
BlowAir,
Sniff
}