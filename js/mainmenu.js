var expanded = false;

//Expands novice stage to reveal two levels when clicked
$(document).ready(function () {
    $("#novice").click(function () {
        var div = $("#novice");

        if (!expanded) {
            div.animate({ height: '64%' }, "slow");
            $("#noviceword").animate({ top: '8.75%' });
            $("#novicenote").animate({ top: '6.25%' });
            $("#intermediate").animate({ top: '100%' });
            $("#advanced").animate({ top: '100%' });
            $("#novicecontent").slideToggle();           
            expanded = true;

        } else {
            div.animate({ height: '15%' }, "slow");
            $("#noviceword").animate({ top: '37%' });
            $("#novicenote").animate({ top: '26%' });
            $("#intermediate").animate({ top: '22%' });
            $("#advanced").animate({ top: '64%' });
			$("#novicecontent").slideToggle();
            expanded = false;
        }
    });
});

//Expands intermediate stage to reveal two levels when clicked
$(document).ready(function () {
    $("#intermediate").click(function () {
        var div = $("#intermediate");

        if (!expanded) {
            div.animate({ top: '-5%' }, "slow");
            div.animate({ height: '64%' }, "slow");
            $("#intermediateword").animate({ top: '10%' });
            $("#intermediatenote").animate({ top: '8%' });
            $("#novice").animate({ top: '100%' });
            $("#advanced").animate({ top: '100%' });
            $("#intermediatecontent").slideToggle();
            expanded = true;

        } else {
            $("#intermediatecontent").slideToggle();
            div.animate({ height: '15%' }, "slow");
            div.animate({ top: '22%' }, "slow");            
            $("#intermediateword").animate({ top: '38.5%' });
            $("#intermediatenote").animate({ top: '30%' });
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
            div.animate({ top: '10%' }, "slow");
            div.animate({ height: '64%' }, "slow");
            $("#advancedword").animate({ top: '10%' });
            $("#advancednote").animate({ top: '8%' });
            $("#intermediate").animate({ top: '100%' });
            $("#novice").animate({ top: '100%' });
            $("#advancedcontent").slideToggle();
            expanded = true;

        } else {
            $("#advancedcontent").slideToggle();
            div.animate({ height: '15%' }, "slow");
            div.animate({ top: '64%' }, "slow");
            $("#advancedword").animate({ top: '38.5%' });
            $("#advancednote").animate({ top: '24%' });
            $("#intermediate").animate({ top: '22%' });
            $("#novice").animate({ top: '10%' });

            expanded = false;
        }
    });
});
