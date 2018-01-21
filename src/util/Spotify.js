let usersAccessToken;
const clientId = "acf647139a5649e9b896a3d600f96baa";
// let userId;
const spotify = {
  getAccessToken(){
    // const redirectUri2 = "http://localhost:3000/"
    const redirectUri2 = "http://billes-jammming.surge.sh/"
    if(usersAccessToken){
      return usersAccessToken;
    }
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch =  window.location.href.match(/expires_in=([^&]*)/);
      // console.log(accessTokenMatch,expiresInMatch);
      if(accessTokenMatch&&expiresInMatch){
        usersAccessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(()=> usersAccessToken = "", expiresIn *1000);
        window.history.pushState("Access Token", null,"/");
        return usersAccessToken;
      }else{
        let url =`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri2}&response_type=token&scope=playlist-modify-private`
        window.location = url;
      }

  },
  search(term){
    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`
    return fetch(url,{
      headers:{Authorization:"Bearer "+usersAccessToken},
  }).then(response=>{
    if(response.ok ===true){
      return response.json();
    }
  })
  .then(jsonResponse=>{
    let array=[];
    if(jsonResponse){
        array = jsonResponse.tracks.items.map(track=>{
                    return {
                      id:     track.id,
                      name:   track.name,
                      artist: track.artists[0].name,
                      album:  track.album.name,
                      uri:    track.uri
                    }
        })
      }
      return array;
    }
  )
  },
  // getUserId(accessToken){
    // return
  // },
  savePlaylist(name, trackUris){
    const accessToken = usersAccessToken;
    let headers={
      method: "POST",
      headers:{
        // Host: "api.spotify.com",
        // "Content-Length": 0,
        // "Accept-Encoding": "gzip, deflate, compress",
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body:JSON.stringify({
        name:name,
        public:false
      }),
      json:true
    };
    let userId;
    let playlistId;
    if(!name || !trackUris.length){
      return;
    }
    return fetch('https://api.spotify.com/v1/me',{
      "headers":{
        "Authorization":"Bearer "+accessToken,
      }
    }).then(response=>{
      if(response.ok){return response.json()}
    }).then(jsonResponse=>{
      // console.log(jsonResponse);
      userId = jsonResponse.id;
      // console.log("user id ",userId);
      let url = `https://api.spotify.com/v1/users/${userId}/playlists/`;
      return fetch(url, headers).then(response=>{
        if(response.ok){return response.json()}
      }).then(jsonResponse=>{
        playlistId = jsonResponse.id;
        console.log("playlistId ",playlistId)
        let trackUrisStr="";
         // trackUrisStr= "?"+JSON.stringify(trackUris).replace(/[\[\"\]]/g,"").replace(/\:/g,"%3A");
        let url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks${trackUrisStr}`;
        let headers1={
          method: "POST",
          headers:{
            Authorization: `Bearer ${accessToken}`,
          },
          body:JSON.stringify({
            uris:trackUris
          }),
          json:true
        };
        console.log(headers1);

        return fetch(url, headers1).then(response=>{
            if(response.ok){
              return response.json();
            }else{
              throw new Error("Could not reach the API: " + response.statusText);
            }
          }
        ).then(data=>{
          console.log(data)
        }).catch(function(error) {
            console.log(error.message);
        });
      })
    })
      // spotify.getUserId(accessToken);



    // const accessToken = spotify.getAccessToken();
    // const headers = {Authorization: `Bearer ${accessToken}`};
    // let userId;

    // return fetch();
    // let post = {
    //   headers:{Authorization:"Bearer "+accessToken},
    //   method: "POST",
    //   body: JSON.stringify({name:name})
    // };
  }
};


export default spotify;
