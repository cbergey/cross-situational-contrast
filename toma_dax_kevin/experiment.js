        var timeline = [];

        var consent_form = {
            type: 'html-button-response',
            stimulus: "<div id='consent'>" +
            "<img src='img/cmu_logo.png' alt='Carnegie Mellon University'>" +
            "<p id='logo-text'><u>Online Consent Form</u></p>" +

            "<p class='block-text-wide'>This game is part of a research study conducted by Daniel Yurovsky at Carnegie Mellon University. </p>" +

            "<p class='block-text-wide'><b>Summary</b>  In this game, you be presented a series of inoffensive stimuli designed to measure how people learn and communicate. You will be asked to make responses via mouse and keyboard. There are no foreseeable risks to you in this study, and participation will take no more than 20 minutes. Being in this study is voluntary – it is your choice.</p>" +

            "<p class='block-text-wide'><b>Purpose</b> In this study, we are investigating the development of language and communication.  Our research explores how infants and young children learn new words so quickly from the language spoken around them, as well as how adults learn language.  We are also interested in how adults foster this rapid vocabulary growth.</p>" +

            "<p class='block-text-wide'><b>Procedures</b> We will present you with a variety of stimuli, including natural and artificial language samples, pictures of known or unknown objects, and/or movies of people talking. Sometimes some of the speech you will hear will be from a foreign or made-up language. You will be asked to make judgments about these stimuli using the mouse and keyboard. This study will take at most 20 minutes and can completed online in your browser.</p>" +

            "<p class='block-text-wide'><b>Participant Requirements</b> Participation in this study is limited to individuals age 18 and older who are fluent speakers of English.</p>" +

            "<p class='block-text-wide'><b>Risks</b> The risks and discomfort associated with participation in this study are no greater than those ordinarily encountered in daily life or during other online activities. You may become bored with the game." +

            "<p class='block-text-wide'><b>Benefits</b> There may be no personal benefit from your participation in the study but the knowledge received may be of value to humanity." +

            "<p class='block-text-wide'><b>Compensation & Costs</b> You will be compensated at the rate at least $6/hour for your participation in this research. This duration is determined by the maximum time allotted for this study, not the amount of time you take to complete it." +
            "<br>" +
            "There will be no cost to you if you participate in this study.</p>" +

            "<p class='block-text-wide'><b>Future Use of Information and/or Bio-Specimens</b> In the future, once we have removed all identifiable information from your data, we may use the data for our future research studies, or we may distribute the data to other investigators for their research studies.  We would do this without getting additional informed consent from you (or your legally authorized representative).  Sharing of data with other researchers will only be done in such a manner that you will not be identified." +

            "<p class='block-text-wide'><b>Confidentiality</b> The data captured for the research does not include any personally identifiable information about you beyond your Amazon Mechanical Turk id and IP address." +

            "<p class='block-text-wide'><b>Right to Ask Questions & Contact Information</b>" +
            " If you have any questions about this study, you should feel free to ask them by contacting the Principal Investigator now at: Daniel Yurovsky, Psychology Department, 5000 Forbes Ave, Pittsburgh, PA 15213. Phone: (412) 268-6266 Email: yurovsky@cmu.edu. If you have questions later, desire additional information, or wish to withdraw your participation please contact the Principal Investigator by mail, phone or e-mail in accordance with the contact information listed above." +
            "<br>" +
            "If you have questions pertaining to your rights as a research participant; or to report concerns to this study, you should contact the Office of Research integrity and Compliance at Carnegie Mellon University. Email: irb-review@andrew.cmu.edu. Phone: 412-268-1901 or 412-268-5460. </p>" +

            "<p class='block-text-wide'><b>Voluntary Participation</b> Your participation in this research is voluntary. You may discontinue participation at any time during the research activity. You may print a copy of this consent form for your records.</p>" +

            "<p class='block-text-wide'>I am age 18 or older." +
            "<input type='radio' name='age' value='eighteen' onclick=enable('start')> Yes" +
            "<input type='radio' name='age' value='not_eighteen' onclick=disable('start')> No</p>" +

            "<p class='block-text-wide'>I have read and understand the information above." +
            "<input type='radio' name='understand' value='understood' onclick=enable('start')> Yes" +
            "<input type='radio' name='understand' value='not_understood' onclick=disable('start')> No</p>" +

            "<p class='block-text-wide'>I want to participate in this research and continue with the game." +
            "<input type='radio' name='give_consent' value='consent' onclick=enable('start')> Yes" +
            "<input type='radio' name='give_consent' value='not_consent' onclick=disable('start')> No </p>" +

            "</div>", 
            button_html: "<button type='button' DISABLED id='start'>Start Experiment</button>",
            choices: ["Start Experiment"]
        }
        timeline.push(consent_form);

        /* var consent = {
            type: "external-html",
            url: "consent/consent.html",
            cont_btn: "start"
        };
        timeline.push(consent); */

        var audio_instructions = {
            type: 'image-button-response', 
            stimulus: "img/speaker.png",
            stimulus_height: 375,
            stimulus_width: 375, 
            prompt: "Make sure your audio is on. Press the button above to begin.",
            choices: ['Start']
        }
        timeline.push(audio_instructions);
        
        var names = ["dax", "blicket", "wug", "toma", "gade", "sprock","koba","zorp", "flib", "boti", "quen", "lomet"];
        var shapes = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
        
        var colors = ["red", "blue", "green", "purple"];
        var sizes = [ [500], [400], [300], [200] ] ;
        var littleSizes = [150, 200, 200, 200, 250, 250, 250, 250, 250, 300, 300, 300, 350]; /* size is 13 */
        var bigSizes = [300, 350, 350, 350, 400, 400, 400, 400, 400, 450, 450, 450, 500];

        var shuffled_little = jsPsych.randomization.shuffle(littleSizes);
        var shuffled_big = jsPsych.randomization.shuffle(bigSizes);

        var names_sample = jsPsych.randomization.sampleWithoutReplacement(names, 2);
        var shapes_sample = jsPsych.randomization.sampleWithoutReplacement(shapes, 2); 

        var left = [1, 1, 2, 2, 4, 6, 7, 7, 6, 4]
        var right = [4, 6, 7, 7, 6, 4, 2, 2, 1, 1]
        var center = [1, 2, 4, 6, 7, 7, 6, 4, 2, 1]
        var bins = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        var featureextent = 0;
        var minsize = 0;
        var maxsize = 0;
        var binsize = 0

        function createBins(dist) {
            var placeindist = 0
            for (i = 0; i < dist.length; i++) {
                bins[i][0] = placeindist;
                placeindist += dist[i];
                bins[i][1] = placeindist;
            }
            featureextent = placeindist;
        }

        function getBin (number) {
            for (i = 0; i < bins.length; i++) {
                if (bins[i][0] <= number && number < bins[i][1]) {
                    return i;
                }
            }
        }

        function drawFeature(isTarget) {
            randomdraw = Math.random()*featureextent
            bin = getBin(randomdraw)
            if (isTarget) {
                minsize = 250;
                maxsize = 500;
                binsize = (maxsize - minsize)/center.length
            } else {
                minsize = 100;
                maxsize = 350;
                binsize = (maxsize - minsize)/center.length
            }
            size = (bin) * binsize + minsize + (Math.random()*binsize);
            return size;
        }
        
        var targetShape = shapes_sample[0]; /*  number */
        var targetName = names_sample[0];  /*  name */ 

        var distractorShape = shapes_sample[1];
        var distractorName = names_sample[1];

        /* first i want to have the training phase where people just press 
        F for some fruit and J for another fruit */

        var test_stimuli = [
            {stimulus: targetShape, name: targetName},
            {stimulus: distractorShape, name: distractorName}
        ];   /* not using */ 
        
        /* for later, if i want to separate the actual trial from the procedure
        var trial = {}
        */

        var procedure = {
            timeline: [
                /*  {
                    type:"html-keyboard-response", 
                    stimulus: targetName + chooseFruit,
                    trial_duration: chooseFruit * 1000,
                    choices: jsPsych.NO_KEYS
                }, */
                {
                    type: "html-keyboard-response", 
                    stimulus: function() {
                        /*
                        if (jsPsych.timelineVariable("name", true) == targetName) {
                            var size = shuffled_little.pop();
                        } else {
                            var size = shuffled_big.pop();
                        } */

                        /* var randNumber = Math.floor(Math.random() * 4); 
                        var size = sizes[randNumber];   */

                        createBins(center);
                        if (jsPsych.timelineVariable("name", true) == targetName) {
                            var size = drawFeature(true);
                        } else {
                            var size = drawFeature(false);
                        }

                        return "<audio src='stimsounds/" + jsPsych.timelineVariable("name", true) + ".mp3', autoplay='true'></audio>" + 
                        "<div class='displayed'>" + 
                        "<div style='width: 700px;'>" + 
                        "<div style='float: center;'>" + 
                        "<img src='stim-images/object" + jsPsych.timelineVariable("stimulus", true) + "bluebig.jpg' width='" + size + "' height='" + size + "'></img></div></div></div>" + 
                        "<div class='absolute'><p>Press F for all " + targetName + " objects. Press J for all " +  distractorName + " objects.</p></div>" + "size" + size
                        + "<div id='rectangle'></div>"
                    },
                    choices: ["f", "j"],
                    /*
                    response_ends_trial: false,
                    trial_duration: 3000,
                    */
                    post_trial_gap: 750
                }
            ],
            timeline_variables:  [
                {stimulus: targetShape, name: targetName},
                {stimulus: distractorShape, name: distractorName}
            ],
            sample: {
                type: "fixed-repetitions", 
                size: 2
            }
            /* randomize_order: true, 
            repetitions: 13  */  /* because 13 size choices for toma, 13 size choices for dax */  
        }
        timeline.push(procedure);

        var breakTime = {
            timeline: [
                {
                    type: "html-keyboard-response", 
                    stimulus: "We will now begin the testing phase. <p>Press F for " + targetName + ". Press J for " + distractorName + ".</p> <p>Press Space to begin.</p>",
                    choices: ["space"]
                }
            ]
        }
        timeline.push(breakTime);

        var testing = {
            timeline: [
                {
                    type: "html-keyboard-response", 
                    stimulus: function() {
                        createBins(center);
                        if (jsPsych.timelineVariable("name", true) == targetName) {
                            var size = drawFeature(true);
                        } else {
                            var size = drawFeature(false);
                        }

                        return "This is " + jsPsych.timelineVariable("name", true) + ". " +  
                        "<div class='displayed'>" + 
                        "<div style='width: 700px;'>" + 
                        "<div style='float: center;'>" + 
                        "<img src='stim-images/object" + jsPsych.timelineVariable("stimulus", true) + "bluebig.jpg' width='" + size + "' height='" + size + "'></img></div></div></div>" + 
                        "<div class='absolute'><p>Press F for all " + targetName + " objects. Press J for all " +  distractorName + " objects.</p></div>" + "size" + size
                        + "<div id='rectangle'></div>"
                    },
                    choices: ["f", "j"],
                    post_trial_gap: 750
                }
            ],
            timeline_variables:  [
                {stimulus: targetShape, name: targetName},
                {stimulus: distractorShape, name: distractorName}
            ],
            sample: {
                type: "fixed-repetitions", 
                size: 50
            }
            /*randomize_order: true,
            repetitions: 50*/
        }
        timeline.push(testing);
        
        /* reference below for image size adjusting */
        /* return "<img style='width:100px; height:100px;' src='"+jsPsych.timelineVariable('image', true)+"'></img>";*/
        
        /*  for preloading images
        var images = ['stim-images/object' + targetShape + 'bluebig.jpg',
        "stim-images/object" + shapes_sample[3] + "bluebig.jpg",
        "stim-images/object" + shapes_sample[2] + "bluebig.jpg",
        "stim-images/object" + shapes_sample[1] + "bluebig.jpg",
        "stim-images/object" + shapes_sample[0] + "bluebig.jpg"]; */

        jsPsych.init({
            timeline: timeline,
            on_finish: function() {
                jsPsych.data.displayData();
            }
            /*preload_images: images
            default_iti: 500*/
        });
    