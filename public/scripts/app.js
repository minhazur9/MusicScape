// Event Listeners

$('#delete').hide()
$('.delete-playlist').on('click', function () {
    $('#delete').show()
    $('.index-front').css('filter', 'blur(8px)');
    $('#delete').show()
    $('body').append(`<div class="warning"><h4>Are you sure? <br>It will be gone forever!</h4>
    <input class="warning-button-no" type="submit" value="No..">
    <input class="warning-button-yes" type="submit" value="Yes"></div>`);
    $('#delete').appendTo('.warning')
    $('.warning-button-yes').appendTo('#delete');
    addCancel();
})

// Adds the cancel button after putting delete
function addCancel() {
    $('.warning-button-no').on('click', function () {
        $('#delete').appendTo('body').hide();
        $('.warning').remove();
        $('.index-front').css('filter', 'none');
        $('#delete').hide();
    })
}


$('.song-form').submit(function (event) {
    if ($('.artist-text').val().length < 1) {
        event.preventDefault();
    }
})
$('.song-text').autocomplete({
    source: function (request, response) {
        let results = $.ui.autocomplete.filter(songs, request.term);
        response(results.slice(0, 10));
    },
    autoFocus: true
},
);
$('.song-text').on('change', function () {
    const songStr = $('.song-text').val().split("by")[0].trim();
    const artistStr = $('.song-text').val().split("by")[1].trim();
    $('.song-text').val(songStr);
    $('.artist-text').val(artistStr);
    // $('.artist-text').val(re)  
})

