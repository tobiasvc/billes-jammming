import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify from '../../util/Spotify.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName:"",
      playlistTracks:[],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.render = this.render.bind(this);
    Spotify.getAccessToken();
  }
  addTrack(track){
    // console.log("add",track.id);
    let isPresant = false;
    this.state.playlistTracks.map(track1=>{
      if(track1.id===track.id){
        isPresant = true;
      }
      return true;
    })
    if (!isPresant){
        this.state.playlistTracks.push(track);
        this.setState({playlistTracks:this.state.playlistTracks});
    };
    // console.log(this.state.playlistTracks);
    // this.render();
  }
  removeTrack(track){
    // console.log("remove",track.id);
    let isPresant = false;
    this.state.playlistTracks.map(track1=>{
      if(track1.id===track.id){
        isPresant = true;
      }
      return true;
    })
    if (isPresant){
        let array = this.state.playlistTracks;
        // console.log((array).indexOf(track));
        array.splice(array.indexOf(track),1);
        this.setState({playlistTracks:array});
    };
    // console.log(this.state.playlistTracks);
    // this.render();
  }
  updatePlaylistName(name){
    // console.log("oldname",this.state.playlistName);
    this.setState({playlistName:name});
    // console.log("newname",this.state.playlistName);
    // this.render();

  }
  savePlaylist(){
    let trackURIs = [];
    for (var i=0;i<this.state.playlistTracks.length;i++){
      trackURIs[i] = this.state.playlistTracks[i].uri;
    }
    // console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName,trackURIs);
    this.setState({playlistName:"New Playlist",searchResults:[],playlistTracks:[]});
    // this.render();
  }
  search(term){
    console.log("AppSearch",term);

    let promise = Spotify.search(term);
    promise.then(r=>this.setState({searchResults: r}));

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
                  searchResults={this.state.searchResults}
                  onAdd={this.addTrack}

                  />
            <Playlist
                  playlistName={this.state.playlistName}
                  playlistTracks={this.state.playlistTracks}
                  onRemove={this.removeTrack}
                  onNameChange={this.updatePlaylistName}
                  onSave={this.savePlaylist}
                  />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
