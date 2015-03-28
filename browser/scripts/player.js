(function() {
    var SOUNDS = _.range(-12, 14).map(function(i) {
        return new Audio(Notes.getDataURI(i, {freq: 440, seconds: 0.1}));
    });
    var LAST_PLAYED_KEY = null;
    var SUPER_MARIO = [
        3, 3, 3, 1, 3, 5, -2, null,
        //1, 5 - 7, 3 - 7, 6 - 7, null,
        //0, 0, -1, -2, -3, 3, 5, 6, 4, 5, 3, 1, 2, 0, 1, -2, null,
        //-4, 1, 3, 5, 6, 4, 5, 3, 1, 2, null
    ]
    var note_map = {//换算公式
        'C': 1,
        'D': 2,
        'E': 3,
        'F': 4,
        'G': 5,
        'A': 6,
        'B': 7
    };
    var SUPER_MARIO_NOTES = [
        ["E4", 0.5], ["E4", 0.5], ["E4", 0.5], ["C4", 0.25], ["E4", 0.25], ["G4", 0.5], ["G3", 0.5], ["C4", 0.25], ["G3", 0.25], ["E3", 0.5], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.25], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.25], ["E4", 0.25], ["C4", 0.25], ["D4", 0.25], ["B3", 0.5], ["C4", 0.5], ["G3", 0.25], ["E3", 0.25], ["A3", 0.5], ["B3", 0.25], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.5], ["A4", 0.5], ["F4", 0.5], ["G4", 0.5], ["E4", 0.5], ["D4", 0.25], ["C4", 0.25], ["B3", 1], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["G3", 0.5], ["A3", 0.5], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.5], ["E4", 0.5], ["E4", 0.5], ["C5", 0.5], ["C5", 0.5], ["C5", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.5], ["E4", 0.5], ["D4", 0.5], ["C4", 0.5], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.25], ["E4", 0.25], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.25], ["C4", 0.25], ["D4", 0.25], ["G4", 0.5], ["F4", 0.25], ["F4", 0.25], ["E4", 0.5], ["E4", 0.5], ["C4", 0.5], ["C4", 0.5], ["C4", 0.5], ["G4", 0.25], ["F4", 0.25], ["F4", 0.25], ["E4", 0.25], ["E4", 0.5], ["G3", 0.25], ["A3", 0.25], ["C4", 0.5], ["A3", 0.5], ["C4", 0.25], ["D4", 0.25], ["E4", 0.5], ["D4", 0.5], ["C4", 0.5], ["C4", 0.25], ["C4", 0.25], ["C4", 0.25], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["A3", 0.25], ["G3", 1], ["C4", 0.25], ["C4", 0.5], ["C4", 0.25], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["C4", 0.25], ["C4", 0.5], ["C4", 0.25], ["D4", 0.25], ["E4", 0.25], ["C4", 0.25], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["E4", 0.25], ["E4", 0.5], ["C4", 0.25], ["E4", 0.25], ["G4", 0.5], ["G3", 0.5], ["C4", 0.5], ["G3", 0.5], ["E3", 0.5], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["F4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.5], ["E4", 0.25], ["C4", 0.25], ["D4", 0.5], ["B3", 0.5], ["C4", 0.25], ["G3", 0.25], ["E3", 1], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["F4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.5], ["E4", 0.25], ["C4", 0.25], ["D4", 0.5], ["B3", 0.5], ["C4", 0.5], ["G3", 0.5], ["E3", 1], ["A3", 0.5], ["B3", 0.5], ["Bb3", 0.5], ["A3", 0.5], ["G3", 0.5], ["E4", 0.5], ["G4", 0.25], ["A4", 0.25], ["F4", 0.25], ["G4", 0.25], ["E4", 0.25], ["C4", 0.25], ["D4", 0.25], ["B3", 0.5], ["E4", 0.25], ["C4", 0.25], ["G3", 0.25], ["G3", 0.25], ["A3", 0.25], ["F4", 0.5], ["F4", 0.5], ["A3", 0.5], ["B3", 0.5], ["A4", 0.5], ["A4", 0.5], ["A4", 0.5], ["G4", 0.5], ["F4", 1], ["E4", 1], ["C4", 1], ["A3", 0.5], ["G3", 0.5], ["E4", 0.25], ["C4", 0.25], ["G3", 0.5], ["G3", 0.25], ["A3", 0.25], ["F4", 0.25], ["F4", 0.25], ["A3", 1], ["B3", 0.5], ["F4", 0.5], ["F4", 0.25], ["F4", 0.5], ["E4", 0.25], ["D4", 0.25], ["C4", 0.25], ["E3", 0.5], ["E3", 0.25], ["C4", 0.5]
    ];
    var MIN_NOTE = 24; // G3
    var MAX_NOTE = 36; // C5

    SUPER_MARIO_NOTES = [].concat(SUPER_MARIO_NOTES, SUPER_MARIO_NOTES);

    var Player = {
        _self : this,
        simpleSheetMusicOneNote: new simple_player(),
        rhythm : '', //当前权值，对外接口
        onLrcUpdate: null,
        playASound: function(key) {
            //key = parseInt(key, 10) % 24;
            if (key < 0) {
                return;
            }
            //if (LAST_PLAYED_KEY == key) {
            //    return;
            //}
            SOUNDS[key].play();
            LAST_PLAYED_KEY = key;
        },

        playAMusic: function(music) {
            var sleepTime = 0;
            $.each(music, function (index, value) { // TODO 一点点小问题
                setTimeout(function() {
                    Player.simpleSheetMusicOneNote.playOneNote(value);
                    //console.log(value[0]);
                    Player.rhythm = Player.getRhythm(value);
                    if (Player.onLrcUpdate !== null) {
                        Player.onLrcUpdate(
                            Math.ceil(Player.getRhythm(music[index]) - MIN_NOTE),
                            Math.ceil(Player.getRhythm(music[index + 1]) - MIN_NOTE),
                            Math.ceil(Player.getRhythm(music[index + 2]) - MIN_NOTE),
                            Math.ceil(Player.getRhythm(music[index + 3]) - MIN_NOTE),
                            Math.ceil(Player.getRhythm(music[index + 4]) - MIN_NOTE)
                        );
                    }
                }, sleepTime);
                sleepTime += value[1] * 60 * 1000 / Player.simpleSheetMusicOneNote.tempo;
            });
        },

        demoPlay: function(keyDelta) { // TODO 调整音高 / 调整间隔
            _.each(SUPER_MARIO, function (key, i) {
                setTimeout(function () {
                    if (key != null) {
                        Player.playASound(key + keyDelta);
                    }
                }, 400 * i);
            });
        },

        getRhythm : function(note){
            // TODO 换算结果
            var match = /([CDEFGAB])b?(\d)/.exec(note[0]);
            var value = Number(match[2]) * 7 + note_map[match[1]];
            return Number(value);
        },

        playMario: function() {
            Player.playAMusic(SUPER_MARIO_NOTES);
        }

    };
    window.Player = Player;
})();

