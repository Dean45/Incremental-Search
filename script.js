( () => {
    var textField = $("input");
    var results = $("#results");

    textField.on("input focus", () => {
        var val = textField.val();
        if (!val) {
            results.hide();
        } else {
            results.show();
        }

        $.ajax({
            url: "https://flame-egg.glitch.me/", //list of countries
            data: {
                q: val
            },
            success: (data) => {
                if (val == textField.val()) { // prevents results from later requests (second, third letter typed) to appear together with first one
                    var res = "";
                    for (var i = 0; i < data.length; i++) {
                        var x = "<div class='result'>" + data[i] + "</div>";
                        res += x;
                    }

                    $("#results").html(res);
                }

                if (data.length == 0) {
                    $("#results").html("<div class='empty'>No results</div>");
                }
            }
        });

    });

    // Keyboard commands for up, down arrow keys and Enter
    textField.on("keydown", (e) => {
        var highlighted = $(".highlight");
        if (e.keyCode == 40) {
            if ($(".result").hasClass("highlight") == false) {
                $(".result").eq(0).addClass("highlight");
            }
            highlighted
                .next().addClass("highlight")
                .prev().removeClass("highlight");
        }

        if (e.keyCode == 38) {
            if ($(".result").hasClass("highlight") == false) {
                $(".result").eq(4).addClass("highlight");
            }
            highlighted
                .prev().addClass("highlight")
                .next().removeClass("highlight");
        }

        if (e.keyCode == 13) {
            textField.val(highlighted.eq(0).html());
            results.hide();
        }


    });

    textField.on("blur", () => {
        results.hide();
        results.html("");
    });

    // Mouse
    results.on("mouseover", ".result", (e) => {
        $(".result").removeClass("highlight");
        $(e.target).addClass("highlight");
    });

    results.on("mousedown", (e) => {
        textField.val($(e.target).eq(0).html());
        results.hide();
    });

})();
