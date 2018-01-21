import React from 'react';
import "./TrackList.css";
import Track from '../Track/Track.js';
class TrackList extends React.Component{
  trackRender(){
    // let returnObj = this.props.tracks.map(track=>track);
    // console.log(returnObj);
    return this.props.tracks.map(track=>{
      return (
        <Track key={track.id}
        track={track}
        onAdd={this.props.onAdd}
        onRemove={this.props.onRemove}
        isRemoval={this.props.isRemoval}
        />
      )
    })
  }
  render(){
    return(
        <div className="TrackList">
             {this.trackRender()}
        </div>
      )
  }
}
export default TrackList;
