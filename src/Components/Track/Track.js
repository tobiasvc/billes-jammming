import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.props = props;
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    // console.log(this.props);

  }
  addTrack(e){
    console.log(this.props.track);
    this.props.onAdd(this.props.track);
  }
  removeTrack(e){
    console.log(this.props.track);
    this.props.onRemove(this.props.track);
  }
  renderAction(isRemoval){
    console.log(this.props.isRemoval);
      if(isRemoval === "true"){
        return <a className="Track-action" onClick={this.addTrack} >+</a>
      }else{
        return <a className="Track-action" onClick={this.removeTrack} >-</a>
      }
  }
  render(){
    return(
    <div className="Track">
      <div className="Track-information">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
      </div>
      {this.renderAction(this.props.isRemoval)}
    </div>
    )
  }
}

export default Track;
