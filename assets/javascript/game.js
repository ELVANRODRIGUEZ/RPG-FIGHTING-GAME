// * * GLOBAL VARIABLES DECLARATION  BEGINING  ============================


var charSelection = true; // CHARACTER-SELECTION>> True for defender selection 
// and false for opponent selection.

var gameOn = false; // GAME-ON>> False for game not initialized
// and true for game ready to be played.

var figthOn = false; // FIGHT-0N>> False for fight no initialized
// and true for fight already started.

var backSongOn = false; // BACGROUND-SONG-ON>> A togller to avoid
// replaying the background song.

var winsCounter = 0; // WINS-COUNTER>> A counter for won battles.

var defLife = 0; // DEFENDER-LIFE>> For decimal multiplication 
// of defender green life bar.

var oppLife = 0; // DEFENDER-LIFE>> For decimal multiplication 
// of opponent green life bar.

var defDamAmount = 0.0625 * 1; // DEFENDER-DAMAGE-AMOUNT>> Damage 
// the defender will receive after a hit (1 \ multiples of 4).
// ! just use 4, 2 or 1.

var oppDamAmount = 0.0625 * 1; // OPPONENT-DAMAGE-AMOUNT>> Damage 
// the opponent will receive after a hit 
// ! just use 4, 2 or 1.

var powerUp = 2.1; // POWER-UP>> It will raise the probability
// for the defender character to win the dice rolling.

// SELECTED-CHARACTER>> An object variable templete to feed some
// selected defender and opponent variables.
var selectedChar = {
    name: "",
    rol: "",
    picAddres: "",
    Id: "",
    Company: ""

}

var defenderSong; // DEFENDER-SONG>> The song will be chosen out of two available and
// according to the selected defender character's company.

//
var startGameSong;

// CHARACTER-NAMES>> Available character names array.
var charNames = ["Athena", "Benimaru", "ChunLi", "Kim", "Mature", "Robert", "Ryu", "Terry"]

// CHARACTER-PIC-INDEX-ADRESS>> The source location for the selected character 
// gifs animation that will be displayed on the fighting frames. It matches
// the charNames indexes to make easy cross references. 
var charPicIndexAddres = [
    "assets/images/Athena.gif",
    "assets/images/Benimaru.gif",
    "assets/images/ChunLi.gif",
    "assets/images/Kim.gif",
    "assets/images/Mature.gif",
    "assets/images/Robert.gif",
    "assets/images/Ryu.gif",
    "assets/images/Terry.gif",
]

// CHARACTER-THUMBNAIL-PIC-ADRESS>> The source location for the 
// small pics that will be displayed on the selecting divs. It matches
// the charNames indexes to make easy cross references.
var charThumbnailPicSAddres = [
    "assets/images/Thum-Athena.JPG",
    "assets/images/Thum-Benimaru.JPG",
    "assets/images/Thum-ChunLi.JPG",
    "assets/images/Thum-Kim.JPG",
    "assets/images/Thum-Mature.JPG",
    "assets/images/Thum-Robert.JPG",
    "assets/images/Thum-Ryu.JPG",
    "assets/images/Thum-Terry.JPG",
]

// CHARACTER-SELECTED-COMPANY>> And array of the companies the characters
// might belong to (for song selectiong purposes). It matches
// the charNames indexes to make easy cross references.
var charSelCompany = [
    "SDK",
    "SDK",
    "Capcom",
    "SDK",
    "SDK",
    "SDK",
    "Capcom",
    "SDK",
]


// * * <<GLOBAL VARIABLES DECLARATION>>  END===============================



// * * <<EVENT-FUNCTIONS>>  BEGINING=======================================

// ON-CLICK function for the defender selection.
$(".charSelCol").on("click", ".charSel", function () {

    // Test the toggler for character selection and execute on true.
    if (charSelection) {
        // Assign the selected character to the character object name.
        selectedChar.name = $(this).attr("fighter")
        // Assign the selected character array
        // index to the character object id to facilitate further 
        // arrays selection.
        selectedChar.Id = charNames.indexOf(selectedChar.name);
        // Select character fighting pic using the previously
        // created Object character id.
        selectedChar.picAddres = charPicIndexAddres[selectedChar.Id];
        // Select character company name and the corresponding 
        // background song path.
        selectedChar.Company = charSelCompany[selectedChar.Id];
        if (selectedChar.Company == "SDK") {
            defenderSong =
                "assets/sounds/" +
                "The KoF 95 - Aozora ni Flute.mp3";
        } else {
            defenderSong =
                "assets/sounds/" +
                "Street Fighter - Guile Theme.mp3";
        }
        // *? console.log(selectedChar.Company);
        // Show defender gif animation on fighting frame.
        $("#defendChar").attr("src", selectedChar.picAddres);

        // Call redoArrays function to populate the bottom opponent
        // seletcion row.
        redoArrays();

        // Iterate through the newly redone arrays to show all
        // the available character for opponent choosing.
        for (var i = 0; i < charNames.length; i++) {

            // Append available characters with proper name,
            // company name, and picture address attributes.
            $(".OppSelCol").append(
                "<button class='charSel' fighter='" +
                charNames[i] +
                "' state='onStandBy' company=" +
                charSelCompany[i] +
                "><img class='onSelecMode' src='" +
                charThumbnailPicSAddres[i] +
                "'></button>"
            );

        }

    }

    // Create an empty container with a small css given height
    // to allocate victory meddals avoiding sudden layout 
    // rearranging. 
    $(".charSelCol").html("<div id='victoriesCont'></div>");
    // Fill the life bar for the defender character.
    $("#leftLifeBarInd").css("width", "200px");
});

// ON-CLICK function for the opponent selection.
$(".OppSelCol").on("click", ".charSel", function () {

    // Create a sound object to play the Go sound with specific
    // volume and from specific path.
    var goSound = new Audio("assets/sounds/Go.wav")
    goSound.volume = .25;
    // Create a sound object to play the New Challenger sound with specific
    // volume and from specific path.
    var newChallSound = new Audio("assets/sounds/Challenger.wav")
    newChallSound.volume = .25;

    // Test the toggler for character selection and execute on true.
    if (charSelection) {
        // Assign the selected opponent 
        // character to the character object name.
        selectedChar.name = $(this).attr("fighter");
        // Assign the selected opponent character array
        // index to the character object id to facilitate further 
        // arrays selection.
        selectedChar.Id = charNames.indexOf(selectedChar.name);
        // Select opponent character fighting pic using the previously
        // created Object character id.
        selectedChar.picAddres = charPicIndexAddres[selectedChar.Id];
        // Select opponent character company name.
        selectedChar.Company = charSelCompany[selectedChar.Id];
        // *? console.log(selectedChar.name);

        // Show opponent gif animation on fighting frame.
        $("#opponChar").attr("src", selectedChar.picAddres);
        // Hide selected opponent thumbnail from the choosing 
        // row by assigning a CSS prestylized class. 
        $(this).attr("class", "charSel defeatedOpp");

        // Test the toggler for general Game initialized
        // and execute on false. It will only toggle once.
        if (!gameOn) {
            // Play background song object.
            goSound.play();
            // Create a background song
            // object to play it with specific previously 
            // assigned path.
            startGameSong = new Audio(defenderSong)
            // Set background song volume.
            startGameSong.volume = .30;
            // Set background song loop to true so it keeps
            // playing.
            startGameSong.loop = true;
            // Play background song object with delay.
            setTimeout(function () {
                startGameSong.play()
            }, 1500);
            // Toggle gameOn to true to indicate that the 
            // game has been initialized.
            gameOn = true;
            // Counter for deffender wins to beat the game;
            winsCounter = charNames.length;
            // Life bar to 100% (in decimal). to play with
            // CSS div width once the fighters attack each other.
            defLife = 1;
            oppLife = 1;

            // If the game is on but an opponent character has been selected
            // just the New Challenger sound will be played.        
        } else {
            newChallSound.play();

        }

        // The new opponent selected character will have 100% life.
        oppLife = 1;

        // The defender will refill life bar up to 68.75% if it is bellow
        // that.
        if (defLife < .6875) {
            defLife = .6875;
            // Multiplying lifebar by refill value.
            $("#leftLifeBarInd").css("width", 200 * defLife + "px");

        }

        // Show new selected opponent character's lifebar full.
        $("#rightLifeBarInd").css("width", "200px");
        // Exit character selection mode.
        charSelection = false;
        // Initialize fight.
        fightOn = true;
    }

});

// ON-CLICK function for the attack golden button.
$("#Attack").on("click", function () {

    if (fightOn) {

        // Create hitSound, winSound, koSound and gameOver
        // sound objects to play accordingly. Set their respective
        // volume levels.
        var hitSound = new Audio("assets/sounds/Hit1.wav");
        hitSound.volume = .15;
        //Play hit sound.
        hitSound.play();
        var winSound = new Audio("assets/sounds/YouWin.wav");
        winSound.volume = .25;
        var koSound = new Audio("assets/sounds/KO.wav");
        koSound.volume = .25;
        var gameOverSound = new Audio("assets/sounds/GameOver.wav");
        gameOverSound.volume = .25;

        // Call rollDice function to determine who gets hit.
        rollDice();

        // Change lifebar of both characters width according 
        // the Dice rolling to the depleted life after.
        $("#leftLifeBarInd").css("width", 200 * defLife + "px");
        $("#rightLifeBarInd").css("width", 200 * oppLife + "px");

        // Test for the winner with the Life variable metter.
        if (oppLife === 0) {
            // Add a win for the defender.
            winsCounter--;
            // Decrease preference on rollDice function through 
            // leveling down the powerUp variable after each win.
            // Winning becomes more complicated as defender keeps
            // winning.
            powerUp -= .3;
            // Clear opponent fighting frame.
            $("#opponChar").attr("src", "");
            // Give margin to the character selection row 
            // for now it is gonna alocate the winning medals.
            $(".charSelCol").css("margin-left", "110px");
            // Append medals for each winning.
            $("#victoriesCont").append("<img id='defenderWins' src='assets/images/Victories.png'>");

            // Test if the last opponent has been defeated.
            if (winsCounter === 0) {
                // Call end background song.
                endBackSong();
                // Play Win sound with delay.
                setTimeout(function () {
                    winSound.play()
                }, 3750);
                // Clear fighting frames starting with the 
                // looser.
                setTimeout(function () {
                    $("#opponChar").attr("src", "")
                }, 4250);
                setTimeout(function () {
                    $("#defendChar").attr("src", "")
                }, 5000);
                // Reload page to start over.
                setTimeout(function () {
                    location.reload()
                }, 5750);
            }

            // Play KO sound.
            koSound.play();

            // Enter character selection mode.
            charSelection = true;
            // Exit fighting mode.
            fightOn = false;

            // Test if defender's life has reached Zero.
        } else if (defLife === 0) {
            // Play KO sound.
            koSound.play();
            // Call end background song.
            endBackSong();
            // Play Game Over sound with delay.
            setTimeout(function () {
                gameOverSound.play()
            }, 3750);
            // Clear fighting frames starting with the 
            // looser.
            setTimeout(function () {
                $("#defendChar").attr("src", "")
            }, 4250);
            setTimeout(function () {
                $("#opponChar").attr("src", "")
            }, 5000);
            // Reload page to start over.
            setTimeout(function () {
                location.reload()
            }, 5750);

            // Enter character selection mode.
            charSelection = true;
            // Exit fighting mode.
            fightOn = false;

        }
    }


});


// * * <<EVENT-FUNCTIONS>>  END============================================



// * * <<FUNCTIONS>>  BEGINING=============================================


// REDO-ARRAYS>> It redoes the arrays teking out the defender selected
// character.
function redoArrays() {
    // Pop out the selected defender character id from the original 
    // array.
    charNames.splice(selectedChar.Id, 1);
    // Pop out the selected defender character Pid Addres id  
    // from the original array.
    charPicIndexAddres.splice(selectedChar.Id, 1);
    // Pop out the selected defender character Thumbnail Pid Addres id  
    // from the original array.
    charThumbnailPicSAddres.splice(selectedChar.Id, 1);
    // Pop out the selected defender character Company id  
    // from the original array.
    charSelCompany.splice(selectedChar.Id, 1);

}

// ROLL-DICE function to determine which character
// takes the damage.
function rollDice() {
    // Create a variable for defender's dice rolling
    // and assign an initial power up to facilitate the 
    // progress. This will be reduced as the defender wins,
    // thus making it more complicated to win.
    var defHit = Math.floor(Math.random() * 6) + 1 + powerUp;
    // Create a variable for opponent's dice rolling.
    var oppHit = Math.floor(Math.random() * 6) + 1;

    // Assing damage to the rolldice winner according to the 
    // respective damage amount variables.
    if (defHit > oppHit) {
        oppLife = oppLife - oppDamAmount
    } else {
        defLife = defLife - defDamAmount
    }

};

// END-BACKGROUND-SONG function is a small procedure to finish
// the backgroun song little by little.
function endBackSong() {
    // Reduce background song volume 
    // using delays until it pauses completely.
    setTimeout(function () {
        startGameSong.volume = .25
    }, 750);
    setTimeout(function () {
        startGameSong.volume = .15
    }, 1500);
    setTimeout(function () {
        startGameSong.volume = .05
    }, 2250);
    setTimeout(function () {
        startGameSong.pause()
    }, 3000);

};


// * * <<FUNCTIONS>>  END==================================================