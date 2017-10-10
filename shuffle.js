var SEP = "\n";
var ANIMATION_LOOPS = 50;

var audio = new Audio("giveyouup.mp3");
var celebrate = new Audio("wubalubadubdub.mp3");

function $(id) {
	return document.getElementById(id);
}

function shuffle(a) {
    for (var i = 0; i < a.length; i++) {
		// swap each element i with another randomly chosen element in
		// the range [i, a.length)
        var j = i + parseInt(Math.random() * (a.length - i));
        if (i != j) {
			var temp = a[i];  // swap
			a[i] = a[j];
			a[j] = temp;
		}
    }
    return a;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function martyRunShuffleMulti() {
	audio.play();
	$("expectedText").style.color = "black";
	var num = Math.floor(Math.random() * 4);
	console.log(num);
	$("expectedText").style.backgroundImage = "url(dance" + num + ".gif)";
    if ($("animation").checked) {
        for (var i = 1; i <= ANIMATION_LOOPS; i++) {
            setTimeout(martyRunShuffle, i * 100);
        }
    } else {
        martyRunShuffle();
    }
	await sleep(ANIMATION_LOOPS * 100);
	audio.pause();
	var text = $("expectedText").value;
	console.log(text);
	var line = text.split(/\n/);
	console.log(line[0]);
	if (line[0] == ("BONUS SPIN")) {
		$("expectedText").style.backgroundImage = "url(mindblown.gif)";
		$("expectedText").style.color = "white";
		celebrate.play();
		for (var i = 0; i < 20; i++) {
			if (i % 2 == 0) {
				document.body.style.backgroundColor = "red";
			} else {
				document.body.style.backgroundColor = "yellow";
			}
			await sleep(100);
		}
		martyRunShuffleMulti();
	} else {
		var text = $("expectedText").value;
		var line = text.split(/\n/);
		alert(line[0] + " goes first!");
	}
 }

function martyRunShuffle() {
    var trimBlankLines = $("trimBlankLines").checked;
    var text = $("expectedText").value;
    if (trimBlankLines) {
        while (text.length > 0 && text.charAt(text.length - 1) == "\n") {
            text = text.substring(0, text.length - 1);
        }
    }

    var lines = text.split(/\n/);
    lines = shuffle(lines);
    var text = "";

    for (var i = 0; i < lines.length; i++) {
        if (trimBlankLines && !lines[i]) {
            continue;
        }
        if (text.length > 0) {
            text += SEP;
        }
        text += lines[i];
    }


    $("expectedText").value = text;
}
