import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const colors = ["#e65c00","#992600","#cc00cc","#009900","#003399","#6600ff","#993300","#ff6600"];
class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quote: '',
      author: '',
      color: ''
    };
    
  }

    componentDidMount() {
      this.getQuote();
      this.getNewColor()
    }
    
   getQuote() {
      let url = 'https://type.fit/api/quotes'

      axios.get(url)
         .then(res => {
        let data = res.data;
        let quoteNum = Math.floor(Math.random() * data.length);
        let randomQuote = data[quoteNum];
       
        this.setState({
          quote: randomQuote['text'],
          author: randomQuote['author']
        })
      })
   }
    getNewColor = () => {
      this.setState({
        color: colors[Math.floor(Math.random() * colors.length)]
    })
    }

    getNewQuote = () => {
      this.getQuote();
      this.getNewColor();
    }
  render() {
    return (    
    <div id="background" className="color" style={{backgroundColor: this.state.color}}>
        <div id="quote-box" className="container-fluid">
          <div id="text">
            <p style={{color: this.state.color}} className="color"><i className="fa fa-quote-left color" style={{color: this.state.color}}></i> {this.state.quote}</p>
          </div>
          <div id="author"><h3 style={{color: this.state.color}} className="color">- {this.state.author}</h3></div>
          <div id="buttons">
            <a style={{backgroundColor: this.state.color}} className="color" id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${this.state.quote} -${this.state.author}`} target="_blank" title="Post quote on Twitter!">
              <span>
                  <i className="fab fa-twitter twitter-icon color" />
              </span>
            </a>
            <button id="new-quote" className="color" style={{backgroundColor: this.state.color}} onClick={this.getNewQuote}>New Quote</button>
          </div>
        </div>
    </div>
    )
  }  
};

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
