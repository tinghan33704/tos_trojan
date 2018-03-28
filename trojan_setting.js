var init_atk=0;
var magni=0;
var error=0;
var errorp=0;
var errora=0;
var percent=0;
var atk=0;
var attack_value=0;
var percent_value=0;
var temp_magni=0;
var max_m=0;
var trojan_max=0;

function percentToAtk()
{
	error=0;
	errorp=0;
	
	getInitAtk();
	if(error==0) getPercent();
	if(errorp==0 && error==0)
	{
		calculateAtk(percent);
		check_doubleStrike_p2a();
	}
	if(error==1 || errorp==1) document.getElementById("double_strike").style.visibility = 'hidden';
	
	if(!isNaN(percent) && errorp==1) 
	{
		document.getElementById("resultLabel").style.background = "#FCC";
		document.getElementById("resultLabel").style.color = "#F00";
		document.getElementById("resultLabel").style.border = "8px #F00 dashed";
		document.getElementById("resultLabel").style.visibility = "visible";
		document.getElementById("resultLabel").innerHTML = "E R R O R";
		document.getElementById("magnification").style.visibility = "hidden";
	}
	else if(!isNaN(percent) && errorp==0 && error==0) 
	{
		document.getElementById("resultLabel").style.background = "#CF9";
		document.getElementById("resultLabel").style.color = "#0A0";
		document.getElementById("resultLabel").style.border = "8px #0A0 dashed";
		document.getElementById("resultLabel").style.visibility = "visible";
		document.getElementById("resultLabel").innerHTML = "攻擊力： "+attack_value;
		
		document.getElementById("magnification").style.visibility = "visible";
		document.getElementById("magnification").innerHTML = "攻擊倍率："+(magni).toFixed(2)+" 倍";
	}
}

function atkToPercent()
{
	errora=0;
	error=0;
	
	getInitAtk();
	if(error==0) getAtk();
	if(errora==0 && error==0)
	{
		calculatePercent(atk);
		check_doubleStrike_a2p();
	}
	if(error==1 || errora==1) document.getElementById("double_strike2").style.visibility = 'hidden';
	
	if(!isNaN(atk) && errora==1) 
	{
		document.getElementById("resultLabel2").style.background = "#FCC";
		document.getElementById("resultLabel2").style.color = "#F00";
		document.getElementById("resultLabel2").style.border = "8px #F00 dashed";
		document.getElementById("resultLabel2").style.visibility = "visible";
		document.getElementById("resultLabel2").innerHTML = "E R R O R";
		document.getElementById("magnification2").style.visibility = "hidden";
	}
	else if(!isNaN(atk) && errora==0 && error==0) 
	{
		if(temp_magni<max_m)
		{
			document.getElementById("resultLabel2").style.background = "#CF9";
			document.getElementById("resultLabel2").style.color = "#0A0";
			document.getElementById("resultLabel2").style.border = "8px #0A0 dashed";
			document.getElementById("resultLabel2").style.visibility = "visible";
			document.getElementById("resultLabel2").innerHTML = "血量%數： "+(percent_value).toFixed(2)+"%";
		}
		else if(temp_magni==max_m)
		{
			document.getElementById("resultLabel2").style.background = "#CF9";
			document.getElementById("resultLabel2").style.color = "#0A0";
			document.getElementById("resultLabel2").style.border = "8px #0A0 dashed";
			document.getElementById("resultLabel2").style.visibility = "visible";
			document.getElementById("resultLabel2").innerHTML = "血量%數： 0~20%";
		}
		
		document.getElementById("magnification2").style.visibility = "visible";
		document.getElementById("magnification2").innerHTML = "攻擊倍率："+(atk/init_atk).toFixed(2)+" 倍";
	}
}

function getInitAtk()
{
	init_atk = document.getElementById("init_atk").value;
	
	if(isNaN(init_atk))
	{
		alert("[錯誤]數字格式不符，請重新輸入");
		error=1;
	}
	else if(eval(init_atk)<0)
	{
		alert("[錯誤]初始攻擊力不可小於0，請重新輸入");
		error=1;
	}
	else if(init_atk=='')
	{
		alert("[錯誤]請輸入初始攻擊力");
		error=1;
	}
}

function getPercent()
{
	percent = document.getElementById("percent").value;
	
	if(isNaN(percent))
	{
		alert("[錯誤]數字格式不符，請重新輸入");
		errorp=1;
	}
	else if(eval(percent)<0 || eval(percent>100))
	{
		alert("[錯誤]比例應界於0~100之間，請重新輸入");
		errorp=1;
	}
	else if(percent=='')
	{
		alert("[錯誤]請輸入%數");
		errorp=1;
	}
}

function getAtk()
{
	atk = document.getElementById("atk").value;
	max_m=0;
	trojan_max = document.getElementById("trojan_select").value;
	switch(trojan_max)
	{
		case '0':
		case '1':
			max_m=20;
		break;
		case '2':
			max_m=10;
		break;
		case '3':
			max_m=3;
		break;
		case '4':
			max_m=2;
		break;
	}
	
	if(isNaN(atk))
	{
		alert("[錯誤]數字格式不符，請重新輸入");
		errora=1;
	}
	else if(eval(atk)<0)
	{
		alert("[錯誤]增強後攻擊力不可小於0，請重新輸入");
		errora=1;
	}
	else if(atk=='')
	{
		alert("[錯誤]請輸入增強後攻擊力");
		errora=1;
	}
	else if(eval(atk)<eval(init_atk))
	{
		alert("[錯誤]增強後攻擊力不可小於初始攻擊力("+init_atk+")，請重新輸入");
		errora=1;
	}
	else if(atk/init_atk>max_m)
	{
		alert("[錯誤]增強後攻擊力最大為 "+max_m+" 倍，請重新輸入");
		errora=1;
	}
}


function calculateAtk(p)
{
	trojan = document.getElementById("trojan_select").value;
	if(trojan==0 || trojan==1)
	{
		if(p>=50) magni=1+(((100-p)/50)*2);
		else if(p<50 && p>=35) magni=3+(((50-p)/15)*7);
		else if(p<35 && p>=20) magni=10+(((35-p)/15)*10);
		else if(p<20) magni=20;
	}
	else if(trojan==2)
	{
		if(p>=50) magni=1+(((100-p)/50)*1);
		else if(p<50 && p>=35) magni=2+(((50-p)/15)*3);
		else if(p<35 && p>=20) magni=5+(((35-p)/15)*5);
		else if(p<20) magni=10;
	}
	else if(trojan==3)
	{
		if(p>=20) magni=3.5-p/100*2.5;
		else if(p<20) magni=3;
	}
	else if(trojan==4)
	{
		if(p>=20) magni=2.25-p/100*1.25;
		else if(p<20) magni=2;
	}
	attack_value=Math.ceil(magni*init_atk);
}

function calculatePercent(a)
{
	trojan = document.getElementById("trojan_select").value;
	temp_magni=a/init_atk;
	if(trojan==0 || trojan==1)
	{
		if(temp_magni>=1 && temp_magni<3) percent_value=100-((temp_magni-1)/2*50);
		else if(temp_magni>=3 && temp_magni<10) percent_value=50-((temp_magni-3)/7*15);
		else if(temp_magni>=10 && temp_magni<20) percent_value=35-((temp_magni-10)/10*15);
		else if(temp_magni==20) percent_value=0;
		else if(temp_magni>20) errora=1;
	}
	else if(trojan==2)
	{
		if(temp_magni>=1 && temp_magni<2) percent_value=100-((temp_magni-1)/1*50);
		else if(temp_magni>=2 && temp_magni<5) percent_value=50-((temp_magni-2)/3*15);
		else if(temp_magni>=5 && temp_magni<10) percent_value=35-((temp_magni-5)/5*15);
		else if(temp_magni==10) percent_value=0;
		else if(temp_magni>10) errora=1;
	}
	else if(trojan==3)
	{
		if(temp_magni>=1 && temp_magni<3) percent_value=(3.5-temp_magni)/2.5*100;
		else if(temp_magni==3) percent_value=0;
		else if(temp_magni>3) errora=1;
	}
	else if(trojan==4)
	{
		if(temp_magni>=1 && temp_magni<2) percent_value=(2.25-temp_magni)/1.25*100;
		else if(temp_magni==2) percent_value=0;
		else if(temp_magni>2) errora=1;
	}
}

function check_doubleStrike_p2a()
{
	if(percent<=30 && trojan<3) document.getElementById("double_strike").style.visibility = 'visible';
	else document.getElementById("double_strike").style.visibility = 'hidden';
}

function check_doubleStrike_a2p()
{
	if(percent_value<=30 && trojan<3) document.getElementById("double_strike2").style.visibility = 'visible';
	else document.getElementById("double_strike2").style.visibility = 'hidden';
}

var manual=0;
function manualText()
{
	manual++;
	if(manual%2==1)
	{
		document.getElementById("manual").style.visibility = 'visible';
		document.getElementById("calc").style.top = '600px';
	}
	else
	{
		document.getElementById("manual").style.visibility = 'hidden';
		document.getElementById("calc").style.top = '300px';
	}
}


function clearData()
{
	document.getElementById("percent").value='';
	document.getElementById("atk").value='';
	document.getElementById("init_atk").value='';
}

var formula_select=0;
function change_formula()
{
	formula_select=document.getElementById("trojan_select").value;
	switch(formula_select)
	{
		case '0':
			document.getElementById("formula").value="越戰越強 ‧ 白金  公式";
		break;
		case '1':
			document.getElementById("formula").value="越戰越強 ‧ 金  公式";
		break;
		case '2':
			document.getElementById("formula").value="越戰越強 ‧ 銀  公式";
		break;
		case '3':
			document.getElementById("formula").value="越戰越強 ‧ 銅  公式";
		break;
		case '4':
			document.getElementById("formula").value="越戰越強 ‧ 鐵  公式";
		break;
	}
}

var formula_change=0;
function formula()
{
	formula_change++;
	formula_select=document.getElementById("trojan_select").value;
	if(formula_change%2==1)
	{
		document.getElementById("formula_body").style.visibility = 'visible';
		switch(formula_select)
		{
			case '0':
			case '1':
				document.getElementById("formula_body").innerHTML = "50~100%：倍率=<font id=mark2>1+(((100%-敵血量比例)/50%)×2)</font><br>35~50%：倍率=<font id=mark2>3+(((50%-敵血量比例)/15%)×7)</font><br>20~35%：倍率=<font id=mark2>10+(((35%-敵血量比例)/15%)×10)</font><br>0~20%：倍率=<font id=mark2>20</font><br><font id=mark>敵血量比例30%以下(含)發動連擊</font><br>";
			break;
			case '2':
				document.getElementById("formula_body").innerHTML = "50~100%：倍率=<font id=mark2>1+(((100%-敵血量比例)/50%)×1)</font><br>35~50%：倍率=<font id=mark2>2+(((50%-敵血量比例)/15%)×3)</font><br>20~35%：倍率=<font id=mark2>5+(((35%-敵血量比例)/15%)×5)</font><br>0~20%：倍率=<font id=mark2>10</font><br><font id=mark>敵血量比例30%以下(含)發動連擊</font><br>";
			break;
			case '3':
				document.getElementById("formula_body").innerHTML = "20~100%：倍率=<font id=mark2>3.5-(敵血量比例×2.5)</font><br>0~20%：倍率=<font id=mark2>3</font><br><font id=mark>不會連擊</font><br>";
			break;
			case '4':
				document.getElementById("formula_body").innerHTML = "20~100%：倍率=<font id=mark2>2.25-(敵血量比例×1.25)</font><br>0~20%：倍率=<font id=mark2>2</font><br><font id=mark>不會連擊</font><br>";
			break;
		}
		
	}
	else
	{
		document.getElementById("formula_body").style.visibility = 'hidden';
	}
}