// Simple study demonstrating the use of a tablet-designed webpage. 
// Study is designed using simple JS/HTML/CSS, with data saves to a server
// controlled by call to a short php script. 

// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------


var numtrials = 40;

var numtest = 20;

var usesound = false;

// ---------------- HELPER ------------------

// show slide function
function showSlide(id) {
  $(".slide").hide(); //jquery - all elements with class of slide - hide
  $("#"+id).show(); //jquery - element with given id - show
}

//array shuffle function
shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

getCurrentDate = function() {
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	return (month + "/" + day + "/" + year);
}

function updateText(value) {
	$("#sliderlabel").html(value + "%");
}

//currently not called; could be useful for reaction time?
getCurrentTime = function() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();

	if (minutes < 10) minutes = "0" + minutes;
	return (hours + ":" + minutes);
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function createBins(dist) {
	var placeindist = 0
	for (i = 0; i < dist.length; i++) {
		bins[i][0] = placeindist;
		placeindist += dist[i];
		bins[i][1] = placeindist;
	}
	featureextent = placeindist;
}




// STIMULI AND TRIAL TYPES


var shapes = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];

var words = ["dax", "blicket", "wug", "toma", "gade", "sprock","koba","zorp", "flib", "boti", "quen", "lomet"];

var colors = ["red", "blue", "green", "purple"];

var trialtypes = [1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2];

var testtrials = [1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2];

var sizes = ["big","small"];

var left = [1, 1, 2, 2, 4, 6, 7, 7, 6, 4]

var right = [4, 6, 7, 7, 6, 4, 2, 2, 1, 1]

var center = [1, 2, 4, 6, 7, 7, 6, 4, 2, 1]

var bins = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]

var featureextent = 0;

var minsize = 100;

var maxsize = 500;

var binsize = (maxsize - minsize)/center.length


//-----------------------------------------------


createBins(left)

console.log(bins)

showSlide("prestudy");

// MAIN EXPERIMENT
var experiment = {

	subid: "",

	subage: 0,

	counter: 1,

	trialtype: 0,

	sizeasked: "",

	targetshape: "",

	targetcolor: "",

	targetsize: 0,

	targetword: "",

	abnormalsize: "",

	normalsize: "",

	distractorsize: "",

	distractorshape: "",

	numclicks: 0,
		
	date: getCurrentDate(),
		//the date of the experiment
	timestamp: getCurrentTime(),
		//the time that the trial was completed at 

	shapes: [],

	colors: [],

	words: [],

	trialtypes: [],

	testtrials: [],

	rtsearch: 0,

	rtsort: 0,

	data: [],

	trialsounds: [],

	allstims: [],

	choseunique: false,

	uniqueness: [false,false,false,false],

	canclick: false,

	objects: [],


	startexp: function() {

		document.body.style.background = "white";
		$("#pauseslide").hide();
		setTimeout(function () {
			experiment.start();
		}, 100);
	},

	pauseslide: function() {

		experiment.trialtypes = shuffle(trialtypes);
		experiment.shapes = shuffle(shapes);
		experiment.colors = shuffle(colors);
		experiment.words = shuffle(words);

		experiment.testtrials = shuffle(testtrials);

		experiment.abnormalsize = sizes.pop()
		experiment.normalsize = sizes.pop()

		if (usesound) {
			for (i=0; i < words.length; i++) {
				
		    	stimsound = new WebAudioAPISound("stimsounds/"+words[i]);
		    	experiment.trialsounds.push(stimsound);
		    	experiment.allstims.push(words[i]);
		    	for (j=0; j < sizes.length; j++) {
		    		stimsound = new WebAudioAPISound("stimsounds/"+sizes[j] + words[i]);
		    		experiment.trialsounds.push(stimsound);
		    		experiment.allstims.push(sizes[j]+words[i]);
		    	}	
			}
		}

		experiment.targetword = experiment.words.pop();

  		experiment.targetshape = experiment.shapes.pop();

  		experiment.distractorshape = experiment.shapes.pop();

		$("#prestudy").hide();
		$(startimg).attr("src", "images/orange-button.png");

		$( "#startimg" ).click(function() {
			setTimeout(function() {
				$("#pauseslide").fadeOut(1000);
				experiment.startexp();
			}, 1000);
		});

		showSlide("pauseslide");
		
	},

	// this function only used in ipad version
	checkInput: function() {
		experiment.pauseslide();
	},


	//the end of the experiment
    end: function () {
    	setTimeout(function () {
    		$("#searchstage").fadeOut();
    	}, 100);
    	
    	// use line below for mmturkey version
    	setTimeout(function() { turk.submit(experiment, true) }, 1500);
    	showSlide("finish");
    	document.body.style.background = "black";
    },

	//concatenates all experimental variables into a string which represents one "row" of data in the eventual csv, to live in the server
	processOneRow: function() {
		
		var dataforRound = experiment.subid; 
		dataforRound += "," + experiment.counter + "," + experiment.trialtype + "," + experiment.targetname;
		dataforRound += "," + experiment.sizeasked;
		dataforRound += "," + experiment.targetshape + "," + experiment.targetcolor + "," + experiment.targetword;
		dataforRound += "," + experiment.date + "," + experiment.timestamp + "," + experiment.rtsearch;
		dataforRound += "\n";
		//$.post("https://callab.uchicago.edu/experiments/grice-select-ipad/datasave.php", {postresult_string : dataforRound});
		// use line below for mmturkey version
		experiment.data.push(dataforRound);	
	},

	getBin: function(number) {
		for (i = 0; i < bins.length; i++) {
			if (bins[i][0] <= number && number < bins[i][1]) {
				return i;
			}
		}
	},

	drawFeature: function() {
		randomdraw = Math.random()*featureextent
		bin = experiment.getBin(randomdraw)
		size = (bin + 1) * binsize + minsize + (Math.random()*binsize);
		console.log(size)
		return size;
	},

	drawUniform: function() {
		randomdraw = Math.random()*(maxsize - minsize)
		size = randomdraw + minsize;
		console.log(size)
		return size;
	},

	test: function(phase) {
		if (experiment.counter > (numtrials + numtest)) {
			$("#teststage").hide()
			$("#bin1").hide();
			$("#bin2").hide();
			$("#tobject1").hide();
			experiment.end()
			return;
		}

		experiment.trialtype = experiment.testtrials[(experiment.counter - numtrials) - 1];

		trialcolors = experiment.colors.slice();

		trialcolors = shuffle(trialcolors);

		$("#teststage").hide()
		$("#bin1").hide();
		$("#bin2").hide();
		$("#tobject1").hide();

		experiment.targetcolor = trialcolors.pop();

		if (experiment.trialtype == 1) {
			$("#tobject1").attr("src","stim-images/object" + experiment.targetshape + experiment.targetcolor + experiment.abnormalsize + ".jpg")
		} else if (experiment.trialtype == 2) {
			$("#tobject1").attr("src","stim-images/object" + experiment.targetshape + experiment.targetcolor + experiment.normalsize + ".jpg")
		} else if (experiment.trialtype == 3) {
			$("#tobject1").attr("src","stim-images/object" + experiment.distractorshape + experiment.targetcolor + experiment.abnormalsize + ".jpg")
		} else if (experiment.trialtype == 4) {
			$("#tobject1").attr("src","stim-images/object" + experiment.distractorshape + experiment.targetcolor + experiment.normalsize + ".jpg")
		}

		

		// ADD START TIME FOR RTS

		if (experiment.counter == (numtrials + 1)) {

			$("#bin1").attr("src","images/red-bucket.png")
			$("#bin2").attr("src","images/green-bucket.png")
			$(document).keypress(function(e){
    				var checkWebkitandIE=(e.which==26 ? 1 : 0);
    				var checkMoz=(e.which==122 && e.ctrlKey ? 1 : 0);

    				if (checkWebkitandIE || checkMoz) $("body").append("<p>ctrl+z detected!</p>");
    				experiment.rtsearch = Date.now() - experiment.starttime;
				
						experiment.processOneRow();

						
						experiment.counter++;
						
						setTimeout(function() {
							$("#searchstage").fadeOut(100);
							experiment.test("test");
						}, 100);
				});
				$( "#bin1" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						//$(sobject1).css({"border-color": "#000000", 
	         			//"border-width":"2px", 
	         			//"border-style":"solid"});

	         			experiment.rtsearch = Date.now() - experiment.starttime;
				
						experiment.processOneRow();

						
						experiment.counter++;
						
						setTimeout(function() {
							$("#teststage").fadeOut(1000);
							experiment.test("test");
						}, 250);
					}
				});
				$( "#bin2" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						//$(sobject1).css({"border-color": "#000000", 
	         			//"border-width":"2px", 
	         			//"border-style":"solid"});

	         			experiment.rtsearch = Date.now() - experiment.starttime;
				
						experiment.processOneRow();

						
						experiment.counter++;
						
						setTimeout(function() {
							$("#teststage").fadeOut(1000);
							experiment.test("test");
						}, 250);
					}
				});
				
			}

		
		$("#bin1").show()
		$("#bin2").show()

		setTimeout(function(){
			$("#teststage").fadeIn(100)
			$("#bin1").show()
			$("#bin2").show()
			$("#tobject1").show()
		},1500);
		experiment.canclick = true
		experiment.starttime = Date.now();
	},
	

	// MAIN DISPLAY FUNCTION
  	next: function(phase) {

  		experiment.objects = createArray(3,2)

  		// disables all scrolling functionality to fix a slide in place on the ipad
		// document.ontouchmove = function(event){
  // 			 event.preventDefault();
		// }

  		$("#selector").hide();
  		$("#target").hide();
  		$("#searchstage").hide();

  		experiment.canclick = false;

  		experiment.targetname = "";
  		experiment.chosetarget = false;
  		experiment.choselure = false;
  		experiment.choseunique = false;
  		experiment.uniqueness = [false,false,false,false];
  		experiment.targetpos = 0;
  		experiment.lurepos = 0;

  		if (experiment.counter > (numtrials)) {
			//experiment.attnCheck();

            experiment.test("test")
			return;
		}

		experiment.trialtype = experiment.trialtypes[experiment.counter - 1];

		experiment.searchtype = ""

		// if (experiment.trialtype%2 == 0) {
		// 	experiment.sizeasked = true;
		// } else {
		// 	experiment.sizeasked = false;
		// }
	

		if (phase == "search") {

			trialcolors = experiment.colors.slice();

			trialcolors = shuffle(trialcolors);

  			experiment.targetcolor = trialcolors.pop();

			experiment.numclicks = 0;

			// if (experiment.sizeasked == true) {
			// 	$("#sobject1").attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + experiment.abnormalsize + ".jpg");
			// 	$("#sinstructions").text("\"Tap on the " + experiment.abnormalsize + " " + experiment.targetword + "!\"")
			// } else {
			// 	$("#sobject1").attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + experiment.normalsize + ".jpg");
			// 	$("#sinstructions").text("\"Tap on the " + experiment.targetword + "!\"")
			// }

			experiment.targetsize = experiment.drawFeature()

			if (experiment.trialtype == 1) {
				$("#sobject1").attr("src", "stim-images/object" + experiment.targetshape + experiment.targetcolor + "big.jpg");
				$("#sinstructions").text(experiment.targetword)
			} else {
				var shapenum = Math.round(Math.random()*10)
				var shape = experiment.shapes[shapenum]
				var name = experiment.words[shapenum]
				$("#sobject1").attr("src", "stim-images/object" + shape + experiment.targetcolor + "big.jpg");
				$("#sinstructions").text(name)
			}

			$("#sobject1").width(experiment.targetsize)

			$("#sinstructions2").text("Press J for " + experiment.targetword + " fruits. Press F for all other fruits.")
			

			$(sobject1).css({"border-color": "#FFFFFF", 
         			"border-width":"2px", 
         			"border-style":"solid"});


  			if (experiment.counter == 1) {
  				$(document).keypress(function(e){
    				var checkWebkitandIE=(e.which==26 ? 1 : 0);
    				var checkMoz=(e.which==122 && e.ctrlKey ? 1 : 0);

    				if (checkWebkitandIE || checkMoz) $("body").append("<p>ctrl+z detected!</p>");
    				experiment.rtsearch = Date.now() - experiment.starttime;
				
						experiment.processOneRow();

						
						experiment.counter++;
						
						setTimeout(function() {
							$("#searchstage").fadeOut(100);
							experiment.next("search");
						}, 100);
				});

				$( "#sobject1" ).click(function() {
					if (experiment.canclick) {
						experiment.canclick = false;
						//$(sobject1).css({"border-color": "#000000", 
	         			//"border-width":"2px", 
	         			//"border-style":"solid"});

	         			experiment.rtsearch = Date.now() - experiment.starttime;
				
						experiment.processOneRow();

						
						experiment.counter++;
						
						setTimeout(function() {
							$("#searchstage").fadeOut(1000);
							experiment.next("search");
						}, 250);
					}
				});
				
			}


			setTimeout(function(){$("#searchstage").fadeIn(100)},100);
			$("#sinstructions").show()
			$("#sinstructions2").show()
					

			if (usesound) {
				if (experiment.sizeasked == true) {
					trialsound = experiment.trialsounds[experiment.allstims.indexOf(experiment.abnormalsize+experiment.targetword)]
				} else {
					trialsound = experiment.trialsounds[experiment.allstims.indexOf(experiment.targetword)]
				}
			}
			
		    experiment.starttime = Date.now();
		    if (usesound) {setTimeout(function() {trialsound.play();}, 1500)}
		    setTimeout(function() {experiment.canclick = true;}, 100)

		} 
	},

	start: function() {

		// put column headers in data file
		//var coltitles = "subid, counter, trialtype, chosetarget, choselure, targetname, chosenname, sizeasked, searchtype, choseunique, targetshape, targetcolor, targetword, distractorshape1, distractorshape2, distractorcolor1, distractorcolor2, date, timestamp, rtsearch, targetpos, lurepos, obj1shape,obj1color,obj2shape,obj2color,obj3shape,obj3color \n";
		//$.post("https://callab.uchicago.edu/experiments/grice-select-ipad/datasave.php", {postresult_string : coltitles});

		
	 	// for ipad version to prevent scrolling
	 // 	document.ontouchmove = function(event){
  // 			 event.preventDefault();
		// }

		
		experiment.next("search");
	},

    
}
		