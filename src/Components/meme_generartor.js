import React, { Component } from 'react';
// import '../App.css';

class MemeGenerator extends Component {
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data;
            // console.log(memes[0]);
            this.setState({
                allImgs : memes
            })
        })
    }
    handleChange(event){
        const {name,value} = event.target;
        this.setState({
            [name] : value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        const randNum = Math.floor(Math.random() * this.state.allImgs.length);
        const randMemeImg = this.state.allImgs[randNum].url;
        this.setState({
            randomImg: randMemeImg
        })
    }
    render() { 
        return ( 
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit} >
                    <input type="text"
                     name="topText" 
                     placeholder="Top Text" 
                     value={this.state.topText} 
                     onChange={this.handleChange} 
                     />
                    <input type="text" 
                    name="bottomText" 
                    placeholder="Bottom Text" 
                    value={this.state.bottomText} 
                    onChange={this.handleChange} 
                    />
                <button>Generate</button>
                </form>
                <div className="meme">
                    <img src= {this.state.randomImg} />
                    <div className="top"><h2>{this.state.topText}</h2></div>
                    <div className="bottom"><h2>{this.state.bottomText}</h2></div>
                </div>
                {/* <h1>Hello</h1> */}
            </div>
         );
    }
}
 
export default MemeGenerator;