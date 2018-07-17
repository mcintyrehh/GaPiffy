
$(document).ready(function () {
    var queryURL;
    var favoriteGifs = [];
    var gifArray = ["Snoop Dogg", "Nas", "Wu-Tang", "Biggie", "Bone Thugz", "Gucci Mane", "Lil Wayne", "Tupac", "Kanye", "Tyler the Creator", "Busta Rhymes", "Lil Pump", "RiFF RAFF", "Action Bronson", "Bird Man"];
    var gifArraySearch = ["Snoop Dogg", "Nas", "Wu-Tang", "Biggie", "Bone Thugz", "Gucci Mane", "Lil Wayne", "Tupac", "Kanye", "Tyler the Creator", "Busta Rhymes", "Lil Pump", "RiFF RAFF", "Action Bronson", "Bird Man"];
    var x = 10;

    //replacing spaces in array with "_" for giphy api search
    for (var i = 0; i < gifArraySearch.length; i++) {
        for (var j = 0; j < (gifArraySearch[i].length); j++) {
            if (gifArraySearch[i][j] == " ") {
                gifArraySearch[i] = gifArraySearch[i].replace(" ", "+");
            }
        }
    }
    //toggle for additive gifs, or for fresh ones each time a button is pressed
    var toggleAddFresh = "fresh";
    $('.add').on("click", function () {
        toggleAddFresh = "add";
        console.log(toggleAddFresh);
    });
    $('.fresh').on("click", function () {
        toggleAddFresh = "fresh";
        console.log(toggleAddFresh);
    });
    $(".toggle.btn").on("click", function () {
        $(this).button('toggle');
        $(this).addClass('btn-primary');
        $(this).removeClass('btn-secondary');
    });

    for (var r = 0; r < gifArray.length; r++) {
        var val = gifArraySearch[r];

        $('.buttons').append("<button class=\"btn btn-primary gen-button\" type=\"button\" id=\"button_" + r + "\">" + gifArray[r] + "</div>");
        $('#button_' + r).data("name", val);
    }
    $('#add').on("click", function () {
        var newButton = $('#typedtext').val().trim();
        gifArray.push(newButton);
        var newIndex = gifArray.indexOf(newButton);
        var newName = gifArray[newIndex];
        console.log(newIndex);
        $('#button_' + newIndex).data("name", newName);
        console.log($('#button_15').data("name"));
        $('#button_' + newIndex).on("click", function () {
            onClickGifs($(this));
        });
    });
    $('.gen-button').on("click", function () {
        x = 10;
        console.log(x);
        onClickGifs($(this));
    });
    $('#fav-button').on("click", function() {
        $('.gifs').empty();
        favoriteGifs.forEach(function(element) {
            addFavs(element.static, element.title, element.gif);
        });
    });
    function addFavs(x, y, z) {
        // creating a card for each gif, setting static and gif variables as their respective URLs
        var gifCard = $("<div>");
        gifCard.addClass("card m-2 bg-dark text-center text-white");
        var b = $("<img>");
        var static = x;
        var title = y;
        var gif = z;
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
        overlay.append('<h5 class="card-title gif-name hide">' + title + '</h5>' + '<span class="fav-div" data-static="' + static + '" data-gif="' + gif + '" data-title="' + title + '" fav-saved="no"><i class="far fa-star mx-auto fav btn hide"></i></span>' +
            '<iframe class="download_iframe" style="display:none;"></iframe><button class="btn dl-btn hide" data-gif="' + gif + '"><i class="fa fa-download"></i> Download</button>');
        gifCard.append(overlay);
        $(".gifs").append(gifCard);
        //elements with the hide class will only be shown on hover
        $('.hide').hide();
        hoverLogic(gifCard);


    }
    $('.gifs').on("click", ".dl-btn", function() {
        console.log($(this).attr("data-gif"));
        $(this.download_iframe).attr("href", $(this).attr("data-gif"));
    });
    function onClickGifs(gif) {
        // var buttonClicked = 
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif.data("name") + "&api_key=s9kLWgDVn7rUQdMDmUSknpwBTvdwPrzT&limit=50";
        console.log(gif.data("name"));
        x = 10;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var array = response;
            var downloadLink = array.data[x].url;
            console.log(response);
            console.log(response.data[0].images.fixed_width_still.url);
            console.log(toggleAddFresh);
            function addGifs(x) {
                // creating a card for each gif, setting static and gif variables as their respective URLs
                var gifCard = $("<div>");
                gifCard.addClass("card m-2 bg-dark text-center text-white");
                var b = $("<img>");
                var static = array.data[x].images.fixed_height_still.url;
                var gif = array.data[x].images.fixed_height.url;
                var title = array.data[x].title;
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
                overlay.append('<h5 class="card-title gif-name hide">' + title + '</h5>' + '<span class="fav-div" data-static="' + static + '" data-gif="' + gif + '" data-title="' + title + '" fav-saved="no"><i class="far fa-star mx-auto fav btn hide"></i></span>' +
                    '<iframe class="download_iframe" style="display:none;"></iframe><button class="btn dl-btn hide" data-gif="' + gif + '"><i class="fa fa-download"></i> Download</button>');
                gifCard.append(overlay);
                $(".gifs").append(gifCard);
                //elements with the hide class will only be shown on hover
                $('.hide').hide();
                hoverLogic(gifCard);


            }
            if (toggleAddFresh === "fresh") {
                $(".gifs").empty();
                $('.more').html('<div class="col-md-2 btn btn-success mx-auto d-flex justify-content-center more">Load More</div>');

                for (i = (x - 10); i < x; i++) {
                    addGifs(i);
                }
                $('.more').html('<div class="col-md-2 btn btn-success mx-auto d-flex justify-content-center">Load More</div>');
                $('.more').on("click", function () {
                    x = (x + 10);
                    console.log(x);
                    for (i = (x - 10); i < x; i++) {
                        addGifs(i);
                    }
                });
            }
            else {
                $('.more').html('<div class="col-md-2 btn btn-success mx-auto d-flex justify-content-center more">Load More</div>');

                for (j = (x - 10); j < x; j++) {
                    addGifs(j);

                }
            }
            // hoverLogic('.card');
        });

    }
    
        $(".gifs").on("click", ".fav-div", function () {
            if ($(this).attr("fav-saved") === "no") {
                $(this).attr("fav-saved", "yes");
                $(this).empty().html('<i class="fas fa-star mx-auto fav btn hide"></i>');
                var newFav = {
                    title: $(this).attr("data-title"),
                    static: $(this).attr("data-static"),
                    gif: $(this).attr("data-gif")
                };
                console.log(newFav);
                favoriteGifs.push(newFav);
                console.log(favoriteGifs[0]);
            }
            else if ($(this).attr("fav-saved") === "yes") {
                $(this).attr("fav-saved", "no");
                $(this).empty().html('<i class="far fa-star mx-auto fav btn hide"></i>');
                console.log($(this).attr("fav-saved"));
            }

        });
    
  
    function hoverLogic(hover) {
        $(hover).hover(
            function () {
                $(this).find(".gif").css("opacity", "0.2");
                $(this).find(".hide").show();
            }, function () {
                $(this).find(".gif").css("opacity", "1");
                $(this).find(".hide").hide();

            }
        );
        $(hover).on("click", function () {
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
    }
});


