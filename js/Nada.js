//Nothing to see here just move along
$('#secret').hide();

function doNothing(){
    $('#secret').show(500);

    $('#secret').trigger('play');

    setTimeout(function(){
        $('#secret').hide(500);
    }, 9500);
}

