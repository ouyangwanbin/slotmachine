const PRICE_TYPE = ['espresso', 'coffee', 'tea'];
    var slotResult = [];

    /*remove duplicate times of value, bacause values 0 and 128*3 is the same*/
    var reset = function() {
        slotResult.forEach(function(item) {
            $("#" + item.reel).css("background-position-y", item.type * 128);
        });
        $("#bet").removeClass("disabled")
    }

    var jackpot = function() {
        return slotResult.length === 3 && slotResult[0].type === slotResult[1].type && slotResult[1].type === slotResult[2].type;
    }

    var callback = function(reel, type) {
        slotResult.push({
            reel: reel,
            type: type
        });
        if (jackpot()) {
            $("#welcome").hide();
            $("#win").show();
            $("#win").addClass(PRICE_TYPE[slotResult[0].type]);
            reset();
            slotResult = [];
        } else if (slotResult.length === 3) {
            reset();
            slotResult = [];
            $("#welcome").hide();
            $("#fail").show();
        }
    }

    $(document).ready(function() {
        $("#bet").click(function() {
        	if($("#bet").hasClass("disabled")){
        		return false;
        	}
            $("#welcome").show();
            $("#win").hide();
            $("#fail").hide();
            $("#bet").addClass("disabled");
            var reel1_move = 20 + Math.floor((Math.random() * 100) + 1);
            var reel2_move = 20 + Math.floor((Math.random() * 100) + 1);
            var reel3_move = 20 + Math.floor((Math.random() * 100) + 1);
            $("#reel1").animate({
                backgroundPositionY: reel1_move * 128 + 'px'
            }, 5000, callback.bind(this, "reel1", reel1_move % 3));
            $("#reel2").animate({
                backgroundPositionY: reel2_move * 128 + 'px'
            }, 5000, callback.bind(this, "reel2", reel2_move % 3));
            $("#reel3").animate({
                backgroundPositionY: reel3_move * 128 + 'px'
            }, 5000, callback.bind(this, "reel3", reel3_move % 3));
        });
    });