
$(document).ready(function () {
    var queryURL;
    var gifArray = ["Snoop Dogg", "Nas", "Biggie", "Bone Thugz", "Gucci Mane", "Lil Wayne", "Tupac", "Kanye", "Tyler the Creator", "Busta Rhymes", "Lil Pump", "RiFF RAFF", "Action Bronson", "Bird Man"];
    var gifArraySearch = ["Snoop Dogg", "Nas", "Biggie", "Bone Thugz", "Gucci Mane", "Lil Wayne", "Tupac", "Kanye", "Tyler the Creator", "Busta Rhymes", "Lil Pump", "RiFF RAFF", "Action Bronson", "Bird Man"];
    //replacing spaces in array with "_" for giphy api search
    for (var i = 0; i < gifArraySearch.length; i++) {
        for (var j = 0; j < (gifArraySearch[i].length); j++) {
            if (gifArraySearch[i][j] == " ") {
                gifArraySearch[i] = gifArraySearch[i].replace(" ", "+");
            }
        }
    }
    console.log(gifArraySearch);
    console.log(gifArraySearch[0]);
    // array with texts to type in typewriter
    var dataText = ["Type text here to search for gifs", "5 best rappers of all time"];

    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
        // chekc if text isn't finished yet
        if (i < (text.length)) {
            // add next character to h1
            document.querySelector("#typedtext").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            // wait for a while and call this function again for next character
            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback);
            }, 100);
        }
        // text finished, call callback if there is a callback function
        else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 700);
        }
    }
    // start a typewriter animation for a text in the dataText array
    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            setTimeout(function () {
                $(".search-bar").html('<div class="input-group mb-3">' +
                    '<input type="text" class="form-control mt-3" placeholder="type a name in and hit enter to search gifs!">' +
                    '<div class="input-group-append">' +
                    '<button class="btn btn-success mt-3" type="button">add</button>' +
                    '</div>' +
                    '</div>');
                $(".gifs").empty();
            }, 3100);
        }
        // check if dataText[i] exists
        else if (i < dataText[i].length) {
            // text exists! start typewriter animation
            typeWriter(dataText[i], 0, function () {
                // after callback (and whole text has been animated), start next text
                StartTextAnimation(i + 1);
            });
        }
        if (i === 1) {
            setTimeout(function () {
                $(".gifs").html('<img class="dylan" src="assets/images/giphy.gif" alt="dylan"/>');
            }, 3000);

        }
    }
    // start the text animation
    StartTextAnimation(0);

    for (var r = 0; r < gifArray.length; r++) {
        var val = gifArraySearch[r];
        console.log(val);
        $('.buttons').append("<button class=\"btn btn-primary gen-button\" type=\"button\" id=\"button_" + r + "\">" + gifArray[r] + "</div>");
        $('#button_' + r).data("name", val);
    }
    $('.gen-button').on("click", function () {
        // var array;
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).data("name") + "&api_key=s9kLWgDVn7rUQdMDmUSknpwBTvdwPrzT&limit=10";
        console.log($(this).data("name"));
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var array = response; 
            console.log(response);
            console.log(array.data[0].images.fixed_width_still.url);
            
            function addGifs(x) {
                var gifData = array.data[x];
                
                $('.gifs').append('<img src="' + gifData.images.fixed_width_still.url + '">');
//***Maybe add a return: gifData??? */
            }
            for (var j = 0; j < 11; j++) {
                addGifs(j);
            }
        });
    });
});