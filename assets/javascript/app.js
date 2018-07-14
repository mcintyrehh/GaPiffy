
$(document).ready(function () {
    var queryURL;
    var gifArray = ["Snoop Dogg", "Nas", "Wu-Tang", "Biggie", "Bone Thugz", "Gucci Mane", "Lil Wayne", "Tupac", "Kanye", "Tyler the Creator", "Busta Rhymes", "Lil Pump", "RiFF RAFF", "Action Bronson", "Bird Man"];
    var gifArraySearch = ["Snoop Dogg", "Nas", "Wu-Tang", "Biggie", "Bone Thugz", "Gucci Mane", "Lil Wayne", "Tupac", "Kanye", "Tyler the Creator", "Busta Rhymes", "Lil Pump", "RiFF RAFF", "Action Bronson", "Bird Man"];
    //replacing spaces in array with "_" for giphy api search
    for (var i = 0; i < gifArraySearch.length; i++) {
        for (var j = 0; j < (gifArraySearch[i].length); j++) {
            if (gifArraySearch[i][j] == " ") {
                gifArraySearch[i] = gifArraySearch[i].replace(" ", "+");
            }
        }
    }
    var toggleAddFresh = "fresh";
    $('.add').on("click", function() {
        toggleAddFresh = "add";
        console.log(toggleAddFresh);
    });
    $('.fresh').on("click", function() {
        toggleAddFresh = "fresh";
        console.log(toggleAddFresh);
    });
    $(".toggle.btn").on("click", function() {
        $(this).button('toggle');
        $(this).addClass('btn-primary');
        $(this).removeClass('btn-secondary');
        
    });
    console.log(gifArraySearch);
    console.log(gifArraySearch[0]);
    // array with texts to type in typewriter
    var dataText = ["Type text here to search for gifs", "5 best rappers of all time"];

    // // type one text in the typwriter
    // // keeps calling itself until the text is finished
    // function typeWriter(text, i, fnCallback) {
    //     // chekc if text isn't finished yet
    //     if (i < (text.length)) {
    //         // add next character to h1
    //         document.querySelector("#typedtext").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

    //         // wait for a while and call this function again for next character
    //         setTimeout(function () {
    //             typeWriter(text, i + 1, fnCallback);
    //         }, 100);
    //     }
    //     // text finished, call callback if there is a callback function
    //     else if (typeof fnCallback == 'function') {
    //         // call callback after timeout
    //         setTimeout(fnCallback, 700);
    //     }
    // }
    // // start a typewriter animation for a text in the dataText array
    // function StartTextAnimation(i) {
    //     if (typeof dataText[i] == 'undefined') {
    //         setTimeout(function () {
    //             $(".search-bar").html('<div class="input-group mb-3">' +
    //                 '<input type="text" class="form-control mt-3" placeholder="type a name in and hit enter to search gifs!">' +
    //                 '<div class="input-group-append">' +
    //                 '<button class="btn btn-success mt-3" type="button">add</button>' +
    //                 '</div>' +
    //                 '</div>');
    //             $(".gifs").empty();
    //         }, 3100);
    //     }
    //     // check if dataText[i] exists
    //     else if (i < dataText[i].length) {
    //         // text exists! start typewriter animation
    //         typeWriter(dataText[i], 0, function () {
    //             // after callback (and whole text has been animated), start next text
    //             StartTextAnimation(i + 1);
    //         });
    //     }
    //     if (i === 1) {
    //         setTimeout(function () {
    //             $(".gifs").html('<img class="dylan" src="assets/images/giphy.gif" alt="dylan"/>');
    //         }, 3000);

    //     }
    // }
    // // start the text animation
    // StartTextAnimation(0);

    for (var r = 0; r < gifArray.length; r++) {
        var val = gifArraySearch[r];

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
            console.log(response.data[0].images.fixed_width_still.url);
            console.log(toggleAddFresh);
            function addGifs(x) {
            //     $(".posters").append('<div class="card m-2 bg-dark text-center text-white">'+
            //     '<img class="card-img" src="'+ cardPoster + '" alt="test poster">'+
            //     '<div class="card-img-overlay d-flex flex-column justify-content-end hover-text">'+
            //         '<h5 class="card-title movie-name hide">'+ array.Search[x].Title + '</h5>'+
            //         '<p class="card-text movie-year hide">' + array.Search[x].Year + '</p>'+
            //         '<p class="card-text col-small movie-IMDb hide"> IMDb id: ' + array.Search[x].imdbID + '</p>' +
            //         '<button  class="btn btn-success hide">Add Movie</button>' +
            //         '</div>'+
            // '</div>');
                
                // creating a card for each gif, setting static and gif variables as their respective URLs
                var gifCard = $("<div>");
                gifCard.addClass("card m-2 bg-dark text-center text-white");
                var b = $("<img>");
                var static = x.images.fixed_height_still.url;
                var gif = x.images.fixed_height.url;
                //setting classes, static, gif and state attributes so they can be switched between on click
                b.addClass("gif");
                b.attr("src", static);
                b.attr("data-static", static);
                b.attr("data-gif", gif);
                b.attr("data-state", "still");
                //adding the image to the card
                gifCard.append(b);
                var overlay = $("<div>");
                overlay.addClass("card-img-overlay d-flex flex-column justify-content-end hover-text");
                overlay.append('<h5 class="card-title gif-name hide">' + x.title + '</h5>' +
            '<button class="btn dl-btn hide"><i class="fa fa-download"></i> Download</button>');
                 gifCard.append(overlay);
                 $(".gifs").append(gifCard);
                 $('.hide').hide();
            }
            if (toggleAddFresh === "fresh") {
                $(".gifs").empty();
                array.data.forEach(function(element) {
                    return addGifs(element);
                });
            }
                
            array.data.forEach(function (element) {
                    return addGifs(element);
                });
            $(".card" ).hover(
                function() {
                  $(this).find(".gif").css("opacity", "0.2");
                  $(this).find(".hide").show();
                }, function() {
                  $(this).find(".gif").css("opacity", "1");
                  $(this).find(".hide").hide();
                
                }
              );

            $(".card").on("click", function () {
                var state = $(this).find(".gif").attr("data-state");
                var img = $(this).find('.gif');
                if (state === 'still') {
                    img.attr('src', img.attr('data-gif'));
                    img.attr('data-state', 'animate');
                } 
                else if (state === 'animate') {
                    img.attr('src', img.attr('data-static'));
                    img.attr('data-state', 'still');
                }
            });
        });
    });

});


