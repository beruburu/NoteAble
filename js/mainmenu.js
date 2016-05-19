var expanded = false;

//Expands novice stage to reveal two levels when clicked
$(document).ready(function () {
    $("#novice").click(function () {
        var div = $("#novice");

        if (!expanded) {
            div.animate({ height: '64%' }, "slow");
            $("#intermediate").animate({ top: '100%' });
            $("#advanced").animate({ top: '100%' });
            $("#novicecontent").slideToggle();           
            expanded = true;

        } else {
            $("#novicecontent").slideToggle();
            div.animate({ height: '15%' }, "slow");
            $("#intermediate").animate({ top: '37%' });
            $("#advanced").animate({ top: '64%' });
            expanded = false;
        }
    });
});

//Expands intermediate stage to reveal two levels when clicked
$(document).ready(function () {
    $("#intermediate").click(function () {
        var div = $("#intermediate");

        if (!expanded) {
            $("div").animate({top: '10%'});
            div.animate({ height: '56%' }, "slow");
            $("#novice").animate({ top: '100%' });
            $("#advanced").animate({ top: '100%' });
            $("#intermediatecontent").slideToggle(); 
            expanded = true;
       
        } else {
            $("#intermediatecontent").slideToggle();
            div.animate({ height: '15%' }, "slow");
            $("#novice").animate({ top: '10%' });
            $("#advanced").animate({ top: '64%' });
            expanded = false;
        }
    });
});

//Expands advanced stage to reveal two levels when clicked
$(document).ready(function () {
    $("#advanced").click(function () {
        var div = $("#advanced");

        if (!expanded) {
            $("div").animate({top: '0%'});
            div.animate({ height: '64%' }, "slow");
            $("#intermediate").animate({ top: '100%' });
            $("#novice").animate({ top: '100%' });
            $("#advancedcontent").slideToggle();           
            expanded = true;

        } else {
            div.animate({ height: '15%' }, "slow");
            $("#intermediate").animate({ top: '37%' });
            $("#novice").animate({ top: '10%' });
            expanded = false;
        }
    });
});