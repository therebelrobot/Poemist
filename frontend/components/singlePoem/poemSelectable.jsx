var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var DropDown = require('.././userNav/dropDown');
var PoemFooter = require('./poemFooter');
var PoemTop = require('./poemTop');
var Word = require('./word');
var LoadingPoems = require('../indexViews/loadingPoems');


module.exports = React.createClass({
  inCreateView: function(){
    // highly breakable if div nesting or class change
    return this.props.className === "newPoem";
  },


  render: function () {
    var poem = this.props.poem;

    var classes = "";
    classes += poem.centered ? 'centered' : ' '+ classes;
    classes += " sinlgePoem noSelect";

    if(poem.wordLetters){
      var poemWords = poem.wordLetters.map(function(word, wordIdx){

        // last letter weirdness fix--hacky should figure out whats going on with formatLetters
        var lastIdx = poem.wordLetters.length - 1;
        if(lastIdx === wordIdx){
          return;
        }

        return (<Word word={word} key={wordIdx} wordIdx={wordIdx}/>);
      });
    }

    var poemTextClasses = "poemText .pre-loading ";
    poemTextClasses += this.props.poem.select_by_word ? 'selectByWord' : 'selectByLetter';

    return(
      <div className={classes}>
        <div className="backgroundImg"></div>
        <PoemTop poem={poem} inCreateView={true}/>
        <LoadingPoems />
        <div className={poemTextClasses}>
          {poemWords}
        </div>
        <PoemFooter poem={poem} inCreateView={true} currentUser={this.props.currentUser}/>
      </div>
    );
  }

});
