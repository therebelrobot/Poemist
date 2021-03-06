var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var PoemStore = require('../../stores/poemStore.js');
var UserStore = require('../../stores/userStore.js');
var Poem = require('../singlePoem/poem.jsx');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  getInitialState: function () {
    var user = UserStore.find(this.props.user_id);
    var poems = [];
    if(user){
      poems = PoemStore.findPoems(user.poem_ids);
    }
    return { user: user, poems: poems, page: 1, areMorePoems: true};
  },
  componentDidMount: function () {
    if(this.props.user_id){
      ApiUtil.getUser(this.props.user_id);
      this.loadNextPage();
    }
    this.userListener = UserStore.addListener(this._updateUser);
    this.poemListener = PoemStore.addListener(this._updatePoems);
  },
  componentWillReceiveProps: function (nextProps) {
    if(nextProps.user_id !== this.props.user_id){
      // New Props
      ApiUtil.getUser(nextProps.user_id);
      this.loadNextPage();
    }
  },
  componentWillUnmount: function () {
    this.userListener.remove();
    this.poemListener.remove();
  },
  _updateUser: function (){
    var user = UserStore.find(this.props.user_id);
    if(user){
      this.setState({ user: user,
        poems: PoemStore.findPoems(user.poem_ids)});
      if(this.state.page < 2){
        this.loadNextPage();
      }
    }
  },
  _updatePoems: function (){
    if(this.state.user){
      this.setState({ poems: PoemStore.findPoems(this.state.user.liked_poem_ids), areMorePoems: PoemStore.areMorePoems()});
    }
  },
  loadNextPage: function (){
    if(this.state.user){
      ApiUtil.getLikedPoems(this.state.user.id, this.state.page);
      this.setState({ page: this.state.page+1 });
    }
  },
  render: function () {
    var username = (typeof this.state.user === 'undefined') ? "user" : this.state.user.username;
    var title = <h2>{username}'s Likes</h2>;
    if(this.props.myLikes){
      title = "";
    }
    return(
      <div className="likedView">
        {title}
          <PoemsDisplay
            poems={this.state.poems}
            currentUser={this.props.currentUser}
            loadNextPage={this.loadNextPage}
            parent="likesView"
            areMorePoems={this.state.areMorePoems}
            toggleShowLogin={this.props.toggleShowLogin}/>
      </div>
    );
  }
});
