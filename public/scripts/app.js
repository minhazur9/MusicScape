
// Event Listeners

$('.delete-playlist').on('click', function() {
    $('#delete').show();
    $('.index-front').css('filter', 'blur(8px)');
    $('body').append(`<div class="warning"><h4>Are you sure? <br>It will be gone forever!</h4>
    <input class="warning-button-no" type="submit" value="No..">
    <input class="warning-button-yes" type="submit" value="Yes"></div>`);
    $('#delete').appendTo('.warning')
    $('.warning-button-yes').appendTo('#delete');
    addCancel();
})

function addCancel() {
    $('.warning-button-no').on('click', function() {
        $('#delete').appendTo('body');
        $('.warning').remove();
        $('.index-front').css('filter', 'none');
        $('#delete').hide();
    })
}