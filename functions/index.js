const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
var firebase = require("firebase/app");
require("firebase/database");

var firebaseConfig = {
    apiKey: "AIzaSyC9CHQ3rwtv_hk5h7eQN0TT1FBzOR1Ufcc",
    authDomain: "api-thirukkural.firebaseapp.com",
    databaseURL: "https://api-thirukkural.firebaseio.com",
    projectId: "api-thirukkural",
    storageBucket: "api-thirukkural.appspot.com",
    messagingSenderId: "517369172600",
    appId: "1:517369172600:web:36fb0c5407f95b73aa938d"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var sect_tam = ["அறத்துப்பால்", "பொருட்பால்", "காமத்துப்பால்"];

var sect_eng = ["Virtue", "Wealth", "Love"]

var chapgrp_tam = ["பாயிரவியல்", "இல்லறவியல்", "துறவறவியல்", "ஊழியல்", "அரசியல்", "அமைச்சியல்", "அரணியல்", "கூழியல்", "படையில்", "நட்பியல்", "குடியியல்", "களவியல்", "கற்பியல்"]

var chapgrp_eng = ["Prologue", "Domestic Virtue", "Ascetic Virtue", "Fate", "Royalty", "Minister of State", "The Essentials of a State", "Way of Making Wealth", "The Excellence of an Army", "Friendship", "Miscellaneous", "The Pre-marital love", "The Post-marital love"]

var chap_tam = ["கடவுள் வாழ்த்து", "வான்சிறப்பு", "நீத்தார் பெருமை", "அறன் வலியுறுத்தல்", "இல்வாழ்க்கை", "வாழ்க்கைத் துணைநலம்", "மக்கட்பேறு", "அன்புடைமை", "விருந்தோம்பல்", "இனியவை கூறல்", "செய்ந்நன்றியறிதல்", "நடுவு நிலைமை", "அடக்கம் உடைமை", "ஒழுக்கம் உடைமை", "பிறனில் விழையாமை", "பொறையுடைமை", "அழுக்காறாமை", "வெஃகாமை", "புறங்கூறாமை", "பயனில சொல்லாமை", "தீவினையச்சம்", "ஒப்புரவறிதல்", "ஈகை", "புகழ்", "அருளுடைமை", "புலால் மறுத்தல்", "தவம்", "கூடா ஒழுக்கம்", "கள்ளாமை", "வாய்மை", "வெகுளாமை", "இன்னா செய்யாமை", "கொல்லாமை", "நிலையாமை", "துறவு", "மெய்யுணர்தல்", "அவா அறுத்தல்", "ஊழ்", "இறைமாட்சி", "கல்வி", "கல்லாமை", "கேள்வி", "அறிவுடைமை", "குற்றங்கடிதல்", "பெரியாரைத் துணைக்கோடல்", "சிற்றினம் சேராமை", "தெரிந்து செயல்வகை", "வலியறிதல்", "காலமறிதல்", "இடனறிதல்", "தெரிந்து தெளிதல்", "தெரிந்து வினையாடல்", "சுற்றந் தழால்", "பொச்சாவாமை", "செங்கோன்மை", "கொடுங்கோன்மை", "வெருவந்த செய்யாமை", "கண்ணோட்டம்", "ஒற்றாடல்", "ஊக்கம் உடைமை", "மடி இன்மை", "ஆள்வினை உடைமை", "இடுக்கண் அழியாமை", "அமைச்சு", "சொல்வன்மை", "வினைத் தூய்மை", "வினைத்திட்பம்", "வினை செயல்வகை", "தூது", "மன்னரைச் சேர்ந்து ஒழுகல்", "குறிப்பறிதல்", "அவை அறிதல்", "அவை அஞ்சாமை", "நாடு", "அரண்", "பொருள் செயல்வகை", "படை மாட்சி", "படைச் செருக்கு", "நட்பு", "நட்பாராய்தல்", "பழைமை", "தீ நட்பு", "கூடா நட்பு", "பேதைமை", "புல்லறிவாண்மை", "இகல்", "பகை மாட்சி", "பகைத்திறம் தெரிதல்", "உட்பகை", "பெரியாரைப் பிழையாமை", "பெண்வழிச் சேறல்", "வரைவின் மகளிர்", "கள்ளுண்ணாமை", "சூது", "மருந்து", "குடிமை", "மானம்", "பெருமை", "சான்றாண்மை", "பண்புடைமை", "நன்றியில் செல்வம்", "நாணுடைமை", "குடிசெயல் வகை", "உழவு", "நல்குரவு", "இரவு", "இரவச்சம்", "கயமை", "தகை அணங்குறுத்தல்", "குறிப்பறிதல்", "புணர்ச்சி மகிழ்தல்", "நலம் புனைந்து உரைத்தல்", "காதற் சிறப்புரைத்தல்", "நாணுத் துறவுரைத்தல்", "அலர் அறிவுறுத்தல்", "பிரிவு ஆற்றாமை", "படர்மெலிந் திரங்கல்", "கண் விதுப்பழிதல்", "பசப்புறு பருவரல்", "தனிப்படர் மிகுதி", "நினைந்தவர் புலம்பல்", "கனவுநிலை உரைத்தல்", "பொழுதுகண்டு இரங்கல்", "உறுப்புநலன் அழிதல்", "நெஞ்சொடு கிளத்தல்", "நிறையழிதல்", "அவர்வயின் விதும்பல்", "குறிப்பறிவுறுத்தல்", "புணர்ச்சி விதும்பல்", "நெஞ்சொடு புலத்தல்", "புலவி", "புலவி நுணுக்கம்", "ஊடலுவகை"]

var chap_eng = ["The Praise of God", "The Blessing of Rain", "The Greatness of Ascetics", "Assertion of the Strength of Virtue", "Domestic Life", "The Worth of a Wife", "The Wealth of Children", "The Possession of Love", "Hospitality", "The Utterance of Pleasant Words", "Gratitude", "Impartiality", "The Possession of Self-restraint", "The Possession of Decorum", "Not coveting another's Wife", "The Possession of Patience", " Forbearance", "Not Envying", "Not Coveting", "Not Backbiting", "Against Vain Speaking", "Dread of Evil Deeds", "Duty to Society", "Giving", "Renown", "Compassion", "Abstinence from Flesh", "Penance", "Imposture", "The Absence of Fraud", "Veracity", "Restraining Anger", "Not doing Evil", "Not killing", "Instability", "Renunciation", "Truth-Conciousness", "Curbing of Desire", "Fate", "The Greatness of a King", "Learning", "Ignorance", "Hearing", "The Possession of Knowledge", "The Correction of Faults", "Seeking the Aid of Great Men", "Avoiding mean Associations", "Acting after due Consideration", "The Knowledge of Power", "Knowing the fitting Time", "Knowing the Place", "Selection and Confidence", "Selection and Employment", "Cherishing Kinsmen", "Unforgetfulness", "The Right Sceptre", "The Cruel Sceptre", "Absence of Terrorism", "Benignity", "Detectives", "Energy", "Unsluggishness", "Manly Effort", "Hopefulness in Trouble", "The Office of Minister of state", "Power of Speech", "Purity in Action", "Power in Action", "Modes of Action", "The Envoy", "Conduct in the Presence of the King", "The Knowledge of Indications", "The Knowledge of the Council Chamber", "Not to dread the Council", "The Land", "The Fortification", "Way of Accumulating Wealth", "The Excellence of an Army", "Military Spirit", "Friendship", "Investigation in forming Friendships", "Familiarity", "Evil Friendship", "Unreal Friendship", "Folly", "Ignorance", "Hostility", "The Might of Hatred", "Knowing the Quality of Hate", "Enmity within", "Not Offending the Great", "Being led by Women", "Wanton Women", "Not Drinking Palm-Wine", "Gambling", "Medicine", "Nobility", "Honour", "Greatness", "Perfectness", "Courtesy", "Wealth without Benefaction", "Shame", "The Way of Maintaining the Family", "Farming", "Poverty", "Mendicancy", "The Dread of Mendicancy", "Baseness", "The Pre-marital love", "Recognition of the Signs ", "Rejoicing in the Embrace", "The Praise of her Beauty", "Declaration of Love's special Excellence", "The Abandonment of Reserve", "The Announcement of the Rumour", "Separation unendurable", "Complainings", "Eyes consumed with Grief", "The Pallid Hue", "The Solitary Anguish", "Sad Memories", "The Visions of the Night", "Lamentations at Eventide", "Wasting Away", "Soliloquy", "Reserve Overcome", "Mutual Desire", "The Reading of the Signs", "Desire for Reunion", "Expostulation with Oneself", "Pouting", "Feigned Anger", "The Pleasures of Temporary Variance"]

exports.kural = functions.https.onRequest(function (req, res) {
    var n1 = parseInt(req.query.num);
    if (n1 > 0 && n1 <= 1330) {
        var n = n1 - 1;
        var sect_n, chapgrp_n, chap_n;

        if (n >= 1080)
            sect_n = 2;
        else if (n >= 380)
            sect_n = 1;
        else
            sect_n = 0;

        if (n >= 1150)
            chapgrp_n = 12;
        else if (n >= 1080)
            chapgrp_n = 11;
        else if (n >= 950)
            chapgrp_n = 10;
        else if (n >= 780)
            chapgrp_n = 9;
        else if (n >= 760)
            chapgrp_n = 8;
        else if (n >= 750)
            chapgrp_n = 7;
        else if (n >= 730)
            chapgrp_n = 6;
        else if (n >= 630)
            chapgrp_n = 5;
        else if (n >= 380)
            chapgrp_n = 4;
        else if (n >= 370)
            chapgrp_n = 3;
        else if (n >= 240)
            chapgrp_n = 2;
        else if (n >= 40)
            chapgrp_n = 1;
        else
            chapgrp_n = 0;

        db.ref("kural/" + n).once("value", function (e) {
            var kural_n = {
                "number": n + 1,
                "sect_tam": sect_tam[sect_n],
                "chapgrp_tam": chapgrp_tam[chapgrp_n],
                "chap_tam": chap_tam[parseInt(n / 10)],
                "line1": e.val()["line1"],
                "line2": e.val()["line2"],
                "tam_exp": e.val()["tam_exp"],
                "sect_eng": sect_eng[sect_n],
                "chapgrp_eng": chapgrp_eng[chapgrp_n],
                "chap_eng": chap_eng[parseInt(n / 10)],
                "eng": e.val()["eng"],
                "eng_exp": e.val()["eng_exp"]
            };
            cors(req, res, function () {
                res.status(200).send(kural_n);
            })

        })
    } else {
        cors(req, res, function () {
            res.status(400).send("Bad Request");
        })
    }
})

