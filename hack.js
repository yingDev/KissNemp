const ipc = require('electron').ipcRenderer;
ipc.on("playControl", (e, msg)=>
{
	var btnClassNames = {next: 'nxt', previous: 'prv', playPause: 'ply'};

	var btn = document.getElementsByClassName(btnClassNames[msg])[0];
	if(btn)
	{
		btn.click();
		if(msg != 'playPause')
		{
			var playBtn = document.getElementsByClassName('ply')[0];
			if( ! playBtn.classList.contains('pas')) //is playing ?
			{
				playBtn.click();
			}
		}
	}
});

ipc.on('windowControl', (e, msg)=>
{
	if(msg == 'toggleMiniMode')
	{
		toggleMiniMode();
	}
});


window.addEventListener("DOMContentLoaded", topLevelStyleFix);

window.addEventListener("hashchange", ()=>
{
	var poll = setInterval(()=>
	{
		var contentFrame = document.getElementById("g_iframe");
		if(contentFrame)
		{
			var doc = contentFrame.contentWindow.document;
			const id = "hackStyleNode";

			if(doc.getElementById(id) || doc.getElementsByTagName('head').length == 0)
			{
				//clearInterval(poll);
				return;
			}

			var styleNode = doc.createElement('style');
			styleNode.id = id;

			styleNode.type = "text/css";		    
	    	var styleText = doc.createTextNode(
	    		'.g-sd3.u-scroll.n-musicsd.f-pr.j-flag { padding-top: 0; }' +
	    		'.f-ff1 { font-family: inherit; font-weight: normal; }' +
	    		'#flag_dl, .m-table .icn-dl, .u-btni.u-btni-dl, .m-multi, .download { display:none!important; }' +
	    		'.ban.f-pr { width: 100%; }' + 
	    		'.n-ban .wrap { width: 800px; }'
	    		);
	    	styleNode.appendChild(styleText);

		    doc.getElementsByTagName('head')[0].appendChild(styleNode);
		}
	}, 500);
});

function topLevelStyleFix()
{
	var styleNode = document.createElement('style');
	styleNode.id = "hackStyleNode";

	styleNode.type = "text/css";		    
	var styleText = document.createTextNode(
	    		'.m-top .wrap { width: 950px; }' +
	    		'.m-nav.j-tflag > li.lst{ display: none; }' + 
			'body { overflow: hidden; }'
	    		);
	styleNode.appendChild(styleText);

	document.getElementsByTagName('head')[0].appendChild(styleNode);

	//fix topbar
	var topbar = document.getElementById("g-topbar");
	//prevent style change
	Object.defineProperty(topbar, "style", {});

	//play bar fix
	var playBar = document.getElementsByClassName("m-playbar")[0];
	if(playBar)
	{
		var lockBtnContainer = playBar.getElementsByClassName("left f-fl")[0];
		var lockBtn = lockBtnContainer.getElementsByClassName("btn")[0];
		var bg = playBar.getElementsByClassName("bg")[0];

		playBar.style.top = (-playBar.offsetHeight) + "px";

		if (playBar.classList.contains("m-playbar-unlock")) 
		{
			lockBtn.click();
		}
		lockBtn.style.display = "none";

		lockBtnContainer.style.background = bg.style.background.toString();
		lockBtnContainer.style["background-position"] = "0 0";
		lockBtnContainer.style.top = "0";
	}
	//window.top.playControl['next'] = document.getElementsByClassName("nxt")[0].click;
}

function toggleMiniMode()
{
	const id = "miniModeStyle";
	var minStyle = document.getElementById(id);
	if(minStyle)
	{
		minStyle.remove();
		return;
	}

	var styleNode = document.createElement('style');
	styleNode.id = id;

	styleNode.type = "text/css";		    
	var styleText = document.createTextNode(
	    		'#g_player { left:0;margin:0; }' + 
	    		'.m-nav { display: none; }' + 
	    		'.logo { transform: scale(0.5) translate(-100px, -40px) }' + 
	    		'.m-playbar .btns { width: 125px;margin: -42px 120px; scale: 0.9; }' +
	    		'.src { display:none; }' + 
	    		'.m-playbar .play { width: 350px; }' + 
	    		'.m-playbar .words { width: 350px; text-align:center; }' + 
	    		'.f-fl { float: none; }' +
	    		'.m-pbar, .m-pbar .barbg { width: 330px; margin-left: 7px; }' + 
	    		'.m-playbar .head, .m-pbar .time { display: none; }'


	    		);
	styleNode.appendChild(styleText);

	document.getElementsByTagName('head')[0].appendChild(styleNode);

}
