var checked=new Array(-1, -1, -1, -1, -1);
var size=new Array(2, 7, 5, 3, 14);
var relative=0;
var done=0;
var ignore=0;
var Vscr=0;
var NVscr=0;
var minhcp=0;
var Rscr=0;
var decVul=0;
var defVul=0;
var decWinning=0;
var majFit=0;
var minFit=0;
var hcps=0;
var alerting=0;
var imps=[20, 50, 90, 130, 170, 220, 270, 320, 370, 430, 500, 600, 750, 900, 1100, 1300, 1500, 1750, 2000, 2250, 2500, 3000, 3500, 4000, 100000];
var table=[
[30, 10, 90, 70, 120, 120, -20, -40, -40, -60, -60, -70, 20, -10],
[60, 30, 140, 130, 160, 240, 30, 0, 20, -10, 40, 40, 40, 20],
[100, 100, 170, 200, 230, 310, 60, 50, 60, 70, 70, 100, 60, 50],
[140, 180, 260, 330, 280, 380, 80, 80, 90, 110, 160, 260, 90, 80],
[190, 310, 330, 450, 370, 510, 160, 180, 170, 200, 260, 320, 160, 150],
[270, 410, 390, 550, 400, 570, 190, 270, 260, 400, 320, 450, 220, 290],
[350, 500, 430, 630, 440, 640, 320, 440, 340, 500, 420, 560, 310, 480],
[400, 580, 470, 690, 510, 730, 360, 490, 410, 590, 480, 680, 390, 580],
[420, 630, 540, 750, 640, 920, 390, 580, 470, 680, 590, 870, 420, 600],
[450, 660, 600, 860, 720, 1050, 420, 640, 530, 770, 670, 1000, 440, 630],
[550, 770, 730, 1050, 920, 1320, 490, 740, 670, 990, 850, 1250, 470, 660],
[620, 900, 890, 1280, 1020, 1470, 560, 840, 820, 1210, 950, 1400, 510, 710],
[770, 1120, 970, 1400, 1070, 1550, 710, 1060, 900, 1330, 1000, 1480, 640, 900],
[910, 1310, 1010, 1460, 1110, 1610, 840, 1240, 940, 1390, 1040, 1540, 820, 1170]
];

function clicked(row, col)
{
	if(checked[4]==-1 && row==1) relative=1;
	if (document.getElementById("r"+row+"c"+col).getAttribute("class")=="new"){
		unCheckAll(row);
	}
	if (checked[row]!=-1) document.getElementById("r"+row+"c"+checked[row]).setAttribute("class", "unchecked");
	document.getElementById("r"+row+"c"+col).setAttribute("class", "checked");
	if (row==1 && relative==1) rename(col+7);
	checked[row]=col;
	if(ignore==0) setScore();
}

function unCheckAll(row){
	for(i=0; i<size[row]; i++)
		document.getElementById("r"+row+"c"+i).setAttribute("class", "unchecked");
}

function rename(level)
{
	
	oldLevel=checked[1]+7;
	tricks=checked[4]+level-oldLevel;
	if(tricks>13) tricks=13;
	if(tricks<0) tricks=0;
	if(checked[4]!=-1 && checked[1]!=-1 && relative==1){
	ignore=1;
		clicked(4, tricks);
		ignore=0;
	}
	for(i=0; i<=13; i++){
		if(i<level) document.getElementById("r"+4+"c"+i).innerHTML = "-"+(level-i);
		if(i==level) document.getElementById("r"+4+"c"+i).innerHTML = "=";
		if(i>level) document.getElementById("r"+4+"c"+i).innerHTML = "+"+(i-level);
	}
}

function setScore(){
	vul=calculate(1);
	nonvul=calculate(0);
	if(vul!=nonvul){
		
	document.getElementById("r1").innerHTML = "<th>Score</th><td id=\"scoreNVul\" colspan=\"3\"></td><td id=\"scoreVul\" colspan=\"3\"></td><td id=\"reset\" onclick=\"reset()\" class=\"new\">reset</td>";
	document.getElementById("scoreVul").innerHTML = vul;
	Vscr=vul;
	NVscr=nonvul;
	document.getElementById("scoreNVul").innerHTML = nonvul;
	
	}
	else{
	if(vul==0) return;
	document.getElementById("r1").innerHTML = "<th>Score</th><td id=\"score\" colspan=\"6\"></td><td id=\"reset\" onclick=\"reset()\" class=\"new\">reset</td>";
	document.getElementById("score").innerHTML = vul;
	NVscr=vul;
	Vscr=vul;
	
	}

	compensator();
	setDone();
	done=1;
}


function setDone() 
{
	for(i=1; i<5; i++){	document.getElementById("r"+i+"c"+checked[i]).setAttribute("class", "done");
	}
}

function calculate(vul){
	
	if(vul==-1) return 0;
	
	level=checked[1];
	if(level==-1) return 0;
	level++;
	expected=level+6;
	
	trickValue=20;
	bonus=0;
	if(checked[2]==-1) return 0;
	switch(checked[2]){
	case 4:
		bonus=10;
	case 3:
	case 2:
		trickValue=30;
	}
	
	risk=checked[3];
	if(risk==-1) risk=0;
	risk*=2;
	if(risk==0) risk=1;
	
	if(alerting==1) document.getElementById("msg").innerHTML = 'ENTER RESULT';

	
	tricks=checked[4];
	if(tricks==-1) return 0;
	
	score=0;
	
	if(tricks>=expected) {
		score+=bonus+level*trickValue;
		score*=risk;
		if(score>=100){
			if(vul==1) score+=500;
			else score+=300;
		}
		else score+=50;
		if(risk>1){
			score+=25*risk;
			if(vul==1) trickValue=100*risk;
			else trickValue=50*risk;
		}
			
		score+=(tricks-expected)*trickValue;
		
		if(level==6){
			if(vul==1) score+=750;
			else score+=500;
		}

		if(level==7){
			if(vul==1) score+=1500;
			else score+=1000;
		}
		
		
	}
	else{
		if(vul==1) trickValue=100;
		else trickValue=50;
		score-=(expected-tricks)*risk*trickValue;
		if(risk>1){
			score-=(expected-tricks-1)*risk*50;
			if(vul==0 && expected-tricks>3) score-=(expected-tricks-3)*risk*50;
		}
	
	
	}
	
	if(alerting==1) document.getElementById("msg").innerHTML = 'ENTER DEAL INFORMATION';
	
	return score;

}

function reset()
{
	for(i=1; i<5; i++){
		for(j=0; j<size[i]; j++){
			document.getElementById("r"+i+"c"+j).setAttribute("class", "new");
			if(i==4){
				document.getElementById("r"+i+"c"+j).innerHTML = j;
			}
		}
		checked[i]=-1;
	
	}
	relative=0;
	done=0;
	document.getElementById("r1").innerHTML = "";
	document.getElementById("r2").innerHTML = "";
	document.getElementById("r3").innerHTML = "";
	document.getElementById("r4").innerHTML = "<th>Score</th><td id=\"noScore\" colspan=\"6\">0</td><td id=\"reset\" onclick=\"reset()\" class=\"unchecked\">reset</td>";

}

function compensator()
{
	minhcp=parseInt(checked[4]*5/2-1);
	if(checked[2]!=4) minhcp-=3;
	printhcps();

}

function printhcps()
{
	if (minhcp<0) minhcp=0;
	if (minhcp>31) minhcp=31;

	setMessage("How many combined HCPs did<br/>the declarer + dummy have?");

	var buffer;
	buffer='<th></th>';
	buffer+='<td colspan="2" onclick="less()" class="green">less</td>';
	for (i=minhcp; i<minhcp+5; i++) {
		buffer+='<td id="gray" onclick="hcp('+i+')" class="new">'+i+'</td>';
	}
	document.getElementById("r3").innerHTML = buffer;
	
	buffer='<th></th>';
	for (i=minhcp+5; i<minhcp+10; i++) {
		buffer+='<td onclick="hcp('+i+')" class="new">'+i+'</td>';
	}
	buffer+='<td colspan="2" onclick="more()" class="blue">more</td>';
	document.getElementById("r4").innerHTML = buffer;
}

function hcp(hcpz){
	hcps=hcpz;
	if(hcps==20) findWinningLine();
	if(hcps<20) defWinningLine();
	if(hcps>20) decWinningLine();
}

function clearComp(){
	document.getElementById("r2").innerHTML = "";
	document.getElementById("r3").innerHTML = "";
	document.getElementById("r4").innerHTML = "";
}

function findWinningLine(){
	clearComp();
	setMessage("Who was the dealer?");
	document.getElementById("r4").innerHTML = '<th></th><td class="blue" onclick="decWinningLine()" colspan="4">declarer or dummy</td><td class="green" colspan="3" onclick="defWinningLine()">DEFENDER</td>';
}

function decWinningLine(){
	decWinning=1;
	isDecInVul();
}

function decInVul(vul){
	decVul=vul;
	findFit();
}
function defInVul(vul){
	defVul=vul;
	if(Vscr!=NVscr) {
		isDecInVul();
	}
	else findFit();
}

function isDecInVul(){
	clearComp();
	setMessage("Was the declarer vulnerable?");
	document.getElementById("r4").innerHTML = '<th></th><td class="red" onclick="decInVul(1)" colspan="4">yes</td><td class="green" colspan="3" onclick="decInVul(0)">no</td>';
}
function isDefInVul(){
	clearComp();
	setMessage("Were the DEFENDERS vulnerable?");
	document.getElementById("r4").innerHTML = '<th></th><td class="red" onclick="defInVul(1)" colspan="4">yes</td><td class="green" colspan="3" onclick="defInVul(0)">no</td>';
}
function defWinningLine(){
	decWinning=0;
	isDefInVul();

}


function less(){
	minhcp-=10;
	printhcps();
}

function more(){
	minhcp+=10;
	printhcps();
}

function setMessage(mes){
	document.getElementById("r2").innerHTML = '<th></th><td colspan="7">'+mes+'</td>';
}

function findFit(){
	majFit=7;
	minFit=7;
	s='DEFENDERS';
	if(decWinning==1) s='declarer';
	clearComp();
	setMessage('Which fit did the '+s+' have?');
	document.getElementById("r4").innerHTML = '<th></th><td class="new" onclick="fitFound(0)" colspan="2">no fit</td><td class="red" onclick="fitFound(1)" colspan="2">major</td><td class="green" onclick="fitFound(2)" colspan="2">minor</td><td class="blue" onclick="fitFound(3)">both</td>';
}

function fitFound(fit){

	if(fit==0){
		compensate();
	}
	if(fit==1){
		clearComp();
		setMessage('How long was the major fit?');
		document.getElementById("r4").innerHTML = '<th></th><td class="new" onclick="major(8)" colspan="3">8-card</td><td class="new" onclick="major(9)" colspan="2">9-card</td><td class="new" onclick="major(10)" colspan="2">10+ card</td>';
	}

	if(fit==2){
		clearComp();
		setMessage('How long was the minor fit?');
		document.getElementById("r4").innerHTML = '<th></th><td class="new" onclick="minor(8)" colspan="3">8-card</td><td class="new" onclick="minor(9)" colspan="2">9-card</td><td class="new" onclick="minor(10)" colspan="2">10+ card</td>';
	}
	
	if(fit==3){
		clearComp();
		setMessage('How long was the major fit?');
		document.getElementById("r4").innerHTML = '<th></th><td class="new" onclick="both(8)" colspan="3">8-card</td><td class="new" onclick="both(9)" colspan="2">9-card</td><td class="new" onclick="both(10)" colspan="2">10+ card</td>';
	}

	
}

function major(fit){
	majFit=fit;
	compensate();
}

function minor(fit){
	minFit=fit;
	compensate();
}

function both(fit){
	majFit=fit;
	fitFound(2);
}

function compensate(){
		clearComp();	
		winVul=decVul;
		if(decWinning==0) winVul=defVul;
		if(hcps<20) hcps=40-hcps;
		bonus=0;
		if(hcps>33) {
			bonus=(hcps-33)*(100+50*winVul);
			hcps=33;
		}
		expScr=0;
		
		if(majFit!=7 && minFit!=7) {
			mjScr=table[hcps-20][(majFit-8)*2+winVul];
			mnScr=table[hcps-20][(minFit-8+3)*2+winVul];
			if(mjScr>mnScr) expScr=mjScr;
			else expScr=mnScr;
		}
		if(majFit!=7 && minFit==7) expScr=table[hcps-20][(majFit-8)*2+winVul];
		if(majFit==7 && minFit!=7) expScr=table[hcps-20][(minFit-8+3)*2+winVul];
		if(majFit==7 && minFit==7) expScr=table[hcps-20][6*2+winVul];
		expScr+=bonus;
		
		score=NVscr;
		if(decVul==1) score=Vscr;
		if(decWinning==0) score*=-1;
		
		dif=score-expScr;
		
		
		winningWon=1;
		if(dif<0){
			winningWon=0;
			dif*=-1;
		}
		
		imp=0;
		while(dif>=imps[imp]) imp++;
		
		
		w='DEFENDERS';
		if(winningWon==1 && decWinning==1) w='declarer';
		if(winningWon==0 && decWinning==0) w='declarer';
		
		
		
		
		if(expScr<0){ 
			expScr*=-1;
			decWinning++;
		}
		
		s='DEFENDERS';
		if(decWinning==1) s='declarer';
		
		
		document.getElementById("r3").innerHTML = '<th></th><td colspan="5">Expected score for the '+s+'</td><td colspan="2">'+expScr+'</td>';
		document.getElementById("r4").innerHTML = '<th></th><td colspan="5">IMPs for the '+w+'</td><td colspan="2">'+imp+'</td>';
		
	if(alerting==1){ document.getElementById("msg").innerHTML = 'Bridge compensation score calculator';
	alerting=0;
		}
		
}



function goAlert(){
		setTimeout("go()", 2000);
}

function go(){
	alerting=1;
	for(i=1; i<=4; i++){
		if(checked[i]!=-1) alerting=0;
	}
	if(alerting==1) document.getElementById("msg").innerHTML = 'ENTER CONTRACT';

}






