const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d04b3c33fdef62a142fce962d95f999281602714678; _ga=GA1.2.983017151.1602714683; _gid=GA1.2.1939282840.1602714683; _fbp=fb.1.1602714683032.400843939; __qca=P0-1321998147-1602714683110; __gads=ID=0526a20aad853cc3-2214d102337a000f:T=1602714777:S=ALNI_Mb0D4wmz7NNfEXj_p37P0kdTX4gxg; mp_mixpanel__c=2; mp_77967c52dc38186cc1aadebdd19e2a82_mixpanel=%7B%22distinct_id%22%3A%20%22983017151.1602714683%22%2C%22%24device_id%22%3A%20%22175293d44e41db-0d8ef68da00d66-5968372c-144000-175293d44e5183%22%2C%22Logged%20In%22%3A%20false%2C%22Is%20Editor%22%3A%20null%2C%22Is%20Moderator%22%3A%20null%2C%22Mobile%20Site%22%3A%20false%2C%22AMP%22%3A%20false%2C%22genius_platform%22%3A%20%22web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%22983017151.1602714683%22%7D; no_public_cache=true; flash=%7B%7D");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

$(document).ready(function () {
    // Song Name and Artist
    let songName = $('#song-name').text()
    console.log(songName);
    const uri = encodeURIComponent(songName)
    console.log(uri);
    let songPath = "";
    fetch(`https://api.genius.com/search?q=${uri}&access_token=rmzH73rX0vYovJ6sQLB0RDVoSJFOeD9qfA6lsegPqx_TU1SKwtZJrB0GWN8O4TiG`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.response.hits)
            // Song Cover
            for (let i = 0; i <= result.response.hits.length; i++) {
                if (i === result.response.hits.length) {
                    songName = result.response.hits[0].result.title;
                    i = 0;
                }
                if (result.response.hits[i].result.title === songName) {
                    const foundItem = result.response.hits[i].result
                    $('.song-art').attr('src', `${foundItem.song_art_image_url}`);
                    songPath = foundItem.api_path;
                    fetch(`https://api.genius.com${songPath}?access_token=rmzH73rX0vYovJ6sQLB0RDVoSJFOeD9qfA6lsegPqx_TU1SKwtZJrB0GWN8O4TiG`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            let video = '';
                            for (let i = 0; i < result.response.song.media.length; i++) {
                                if (result.response.song.media[i].provider === 'youtube') {
                                    video = result.response.song.media[i].url;
                                    break;
                                }
                            }
                            // Song Video
                            video = video.replace('watch?v=', 'embed/').replace(/&ab_channel.*$/, "").replace('http', 'https');
                            $('.video').append(`<iframe width="420" height="315" src="${video}" frameborder="0" allowfullscreen></iframe>`);
                            if (result.response.song.album.name) {
                                $('.album').text(result.response.song.album.name)

                            }
                            else {
                                $('.album').text('None')
                            }
                            $('.date').text(result.response.song.release_date_for_display)


                        })
                        .catch(error => console.log('error', error));
                    break;
                }

            }
        })
        .catch(error => console.log('error', error));
})