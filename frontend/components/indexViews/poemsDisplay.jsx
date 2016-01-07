var React = require('react');
var History = require('react-router').History;
var Poem = require('../singlePoem/poem.jsx');
var LodaingPoems = require('./loadingPoems');

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return ({clickable: true, numPoems: 0});
  },
  goTo: function(url){
    this.history.pushState(null, url);
  },
  poemsInHtml: function(poems){
    var poemsLis = poems.map(function(poem, idx){
      return (<li key={poem.id} className="newPeomAdded">
        <Poem
          poem={poem}
          currentUser={this.props.currentUser}
          toggleShowLogin={this.props.toggleShowLogin}/>
        </li>);
    }.bind(this));
    return poemsLis;

  },
  componentDidMount: function(){
    var that = this;
    document.addEventListener('scroll', function (event) {
      console.log("scrolling");
    if (document.body.scrollHeight ==
        document.body.scrollTop + window.innerHeight) {
        console.log("hit");
        that.handleLoadClick();
      }
    });
  },
  componentWillReceiveProps: function(newProps){
    var ul = document.querySelector(".poemDisplay ul");
  },
  componentDidUpdate: function(){
    this.fadeIn();
  },
  handleLoadClick: function(){
    // if(this.props.morePoems){
      this.props.loadNextPage();
    // }
  },
  fadeIn: function(){
    var ul = document.querySelector(".poemDisplay ul");
    if(!ul){
      return;
    }
    function fadeInLi(i){
      if (i < ul.childNodes.length) {
        var li = ul.childNodes[i];
        if(li.className !== ""){
          li.className = "";
          setTimeout(function(){
            fadeInLi(i+1);
          }, 200);
        }else{
          fadeInLi(i+1);
        }
      }
    }
    fadeInLi(0);
  },
  render: function () {
    var poemsList = this.poemsInHtml(this.props.poems);
    var loadClasses = "clear-fix ";

    // loadClasses += this.props.morePoems ? "" : "hidden";
    return(
      <div className="poemDisplay">
        <ul>
        <li className="newPeomAdded">
          <div onClick={this.goTo.bind(this, "new/create")}
            className="sinlgePoem link createBtn">
            <span className="plus">➕</span>
            <br/>Create a Poem
            </div>
          </li>
        {poemsList}
      </ul>
        <div className={loadClasses}>
          <LodaingPoems />
        </div>
      </div>
    );
  }
});
