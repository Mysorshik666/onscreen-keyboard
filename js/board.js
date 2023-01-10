'use strict'
let Shift='Up', Inputid, interval;
window.onload = function(){
	let fieldArray = document.getElementsByTagName('input');
	fieldArray[0].focus();
	Inputid = fieldArray[0];
	for (let y = 0; y<fieldArray.length; y++){
		if (fieldArray[y].type == "text"){	
				fieldArray[y].onfocus= function(){
					Inputid=this;
			}
			fieldArray[y].onclick= function(){
						getKeyBoard('Ru');
			}
		}
	}
} 

function key(obj,symbol){
	let board = document.getElementById("board");
	if (!symbol) symbol=obj.innerHTML;
	if (Inputid)
  	{
		symbol=symbol.replace('&amp;','&');
		symbol=symbol.replace('&lt;','<');
		symbol=symbol.replace('&gt;','>');
	}
	
	switch(symbol)
	{
		case 'space' :{Inputid.value=Inputid.value+' '; Inputid.focus();break;}
		case 'backspace' :{Inputid.value=Inputid.value.substr(0, Inputid.value.length-1); Inputid.focus();break;}
		case 'Close' :{board.parentNode.removeChild(board); break;}
		case 'Enter' :{if(Inputid.nextElementSibling == null){alert('ok()'); break;}Inputid.nextElementSibling.focus(); Inputid.scrollIntoView(true); break;}

	default:{Inputid.value=Inputid.value+symbol; Inputid.focus(); }
	}
}

  function getKeyBoard(type){
  	
	let Shift='Down', out="", id="board";
	
	if (type=='Ru')
	{
		out+="<div class='d16' onclick=key(this,'Close') >&#10060;</div>";
	    out+=getRowKey(Array('й','ц','у','к','е','н','г','ш','щ','з','х','backspace'),Shift);
	    out+=getRowKey(Array('ф','ы','в','а','п','р','о','л','д','ж','э'),Shift);
	    out+=getRowKey(Array('shift','я','ч','с','м','и','т','ь','б','ю','ъ'),Shift);
	    out+=getRowKey(Array('numeric','Eng','пробел','numeric', 'Enter'));
	}

	if (type=='Eng')
	{
		out+="<div class='d16' onclick=key(this,'Close') >&#10060;</div>";
	    out+=getRowKey(Array('q','w','e','r','t','y','u','i','o','p','backspace'),Shift);
	    out+=getRowKey(Array('a','s','d','f','g','h','j','k','l','*','@'),Shift);
	    out+=getRowKey(Array('shift','z','x','c','v','b','n','m',',','.','\\'),Shift);
	    out+=getRowKey(Array('numeric','Ru','space','numeric','Enter'));
	}

	if (type=='FullNumeric')
	{
		out+="<div class='d16' onclick=key(this,'Close') >&#10060;</div>";
	    out+=getRowKey(Array('1','2','3','4','5','6','7','8','9','0','backspace'));
	    out+=getRowKey(Array('-','/','\\',':',';','(',')','$','&','@','#'));
	    out+=getRowKey(Array('.',',','?','!','\'','"','[',']','_','{','}'));
	    out+=getRowKey(Array('<','>','Eng','space','Ru','Enter'));
	}

 	let board=document.getElementById(id);
 	
	if (board) board.innerHTML=out;
	else
	{
		let div = document.createElement('div');
			div.id = id;
			div.innerHTML = out;
	  		document.body.appendChild(div);
 	}
 }

function getRowKey(Key,Shift)
{
	let out='<table class="KeyAlphaBoard"><tr>';

	for (let b=0;b<Key.length;b++)
		{
		let	act='key(this)', name=Key[b], style='But', id='';

			if (Key[b]=='shift') {act='shift(this)'; name='<div class="d15"></div>'; }
			if (Key[b]=='Enter') {id='id="Enter"'; act='key(this,\'Enter\')'; style='mediumBut';}
			if (Key[b]=='space' || Key[b]=='пробел') {act='key(this,\'space\')'; style='space';}

			if (Key[b]=='numeric') {act='getKeyBoard(\'FullNumeric\');'; name='.?123';style='mediumBut';}
			if (Key[b]=='Ru') {act='getKeyBoard(\'Ru\');'; style='mediumBut';}
			if (Key[b]=='Eng') {act='getKeyBoard(\'Eng\');'; style='mediumBut';}

			if(Shift && Shift=='Up' && name.length<=1) name=name.toUpperCase();

			out+='<td onclick='+act+' class="'+style+'" '+id+'>'+name+'</td>';
		}

     return out+'</tr></table>';
}

function shift(){      

  let board=document.getElementById("board");

   if (board)
   {
	let td=board.getElementsByTagName('td');

	if (td)
	{
	  for(let i=0;i<td.length;i++)
	  {
	    if(td[i].innerHTML.length==1) td[i].innerHTML=(Shift=='Up')?td[i].innerHTML.toUpperCase():td[i].innerHTML.toLowerCase();
	  }
	}
     if (Shift=='Down') Shift='Up'; else Shift='Down';
   }
}

getKeyBoard('Ru');
