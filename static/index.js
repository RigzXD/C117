//Create date variable
var date = new Date()
let display_date = "date: " + date.toLocaleDateString()

//Load HTML DOM
$(document).ready(function(){
    $("#display_date").html(display_date)
})

//Define variable to store predicted emotion
let predicted_emotion

//HTML-->JavaScript--->Flask
//Flask--->JavaScript--->HTML

//jQuery selector and click action

$(function () {
    $("#predict_button").click(function () {
        //AJAX call
        let input_data = {
            "text":$("#text").val()
        }
        $.ajax({
            type:'POST', 
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function(result)
              {
                
                // Result Received From Flask ----->JavaScript
                predicted_emotion = result.data.predicted_emotion
                emote_url = result.data.predicted_emotion_img_url
                // Display Result Using JavaScript----->HTML
                $("#prediction").html(predicted_emotion)
                $("#prediction").css("display", "block")
                $("#emo_img_url").attrs('src', emo_url)
                $("#emo_img_url").css("display", "block")
            },
            //Error function
            error: function(result){
                alert(result.responseJSON.message)
            }
        });
    });
})
