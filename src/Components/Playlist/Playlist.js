import React from 'react';
import "./Playlist.css";
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event){
    // console.log(event.target);
    this.props.onNameChange(event.target.value)
  }
   render(){
     console.log(this.props);
      return(
        <div className="Playlist">
          <input value={this.props.playlistName?this.props.playlistName:"New Playlist"} onChange={this.handleNameChange}  />
          <TrackList
          tracks={this.props.playlistTracks}

          onRemove={this.props.onRemove}
          isRemoval="false"
          />
          <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
        </div>
      )
    }
   }
export default Playlist;
