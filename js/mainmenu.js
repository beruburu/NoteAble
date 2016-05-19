var expanded = false;

//Expands novice stage to reveal two levels when clicked
$(document).ready(function () {
    $("#novice").click(function () {

        var div = $("#novice");

        if (!expanded) {
            div.animate({ height: '64%' }, "slow");
            $("#intermediate").animate({ top: '100%' });
            $("#advanced").animate({ top: '100%' });
            expanded = true;
       
        } else {
            div.animate({ height: '15%' }, "slow");
            $("#intermediate").animate({ top: '37%' });
            $("#advanced").animate({ top: '64%' });

        }
    });
});

//Closes novice stage when re-clicked

