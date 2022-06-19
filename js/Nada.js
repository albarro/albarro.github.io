//Nothing to see here just move along
$('#secret').hide();

function doNothing(){
    $('#secret').show();

    $('#secret').trigger('play');

    setTimeout(function(){
        $('#secret').hide();
    }, 10000);
}

