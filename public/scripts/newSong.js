// API Header
const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d04b3c33fdef62a142fce962d95f999281602714678; _ga=GA1.2.983017151.1602714683; _gid=GA1.2.1939282840.1602714683; _fbp=fb.1.1602714683032.400843939; __qca=P0-1321998147-1602714683110; __gads=ID=0526a20aad853cc3-2214d102337a000f:T=1602714777:S=ALNI_Mb0D4wmz7NNfEXj_p37P0kdTX4gxg; mp_mixpanel__c=2; mp_77967c52dc38186cc1aadebdd19e2a82_mixpanel=%7B%22distinct_id%22%3A%20%22983017151.1602714683%22%2C%22%24device_id%22%3A%20%22175293d44e41db-0d8ef68da00d66-5968372c-144000-175293d44e5183%22%2C%22Logged%20In%22%3A%20false%2C%22Is%20Editor%22%3A%20null%2C%22Is%20Moderator%22%3A%20null%2C%22Mobile%20Site%22%3A%20false%2C%22AMP%22%3A%20false%2C%22genius_platform%22%3A%20%22web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%22983017151.1602714683%22%7D; no_public_cache=true; flash=%7B%7D");


const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// Song Array
let songs = [];

// Event Listeners

let songString = "";
$('.song-text').on('keyup', function (e) {
    songString = $(this).val();
    if (e.which <= 90 && e.which >= 48) {
        fetch(`https://api.genius.com/search?q=${songString}&access_token=rmzH73rX0vYovJ6sQLB0RDVoSJFOeD9qfA6lsegPqx_TU1SKwtZJrB0GWN8O4TiG`, requestOptions)
            .then(response => response.json())
            .then(result => {
                for (let i = 0; i < result.response.hits.length; i++) {
                    if (songs.includes(result.response.hits[i].result.full_title) === false) songs.push(result.response.hits[i].result.full_title);
                }
            })
            .catch(error => console.log('error', error));
    }
});

// Prevents Submit on Enter
$('.song-form').submit(function (event) {
    if ($('.artist-text').val().length < 1) {
        event.preventDefault();
    }
})

// Displays an autocomplete form
$('.song-text').autocomplete({
    source: function (request, response) {
        let results = $.ui.autocomplete.filter(songs, request.term);
        response(results.slice(0, 10));
    },
    autoFocus: true
});

// Auto completes author form if there is any author in the name form
$('.song-text').on('change', function () {
    const songStr = $('.song-text').val().split("by")[0].trim();
    const artistStr = $('.song-text').val().split("by")[1].trim();
    $('.song-text').val(songStr);
    $('.artist-text').val(artistStr);
})