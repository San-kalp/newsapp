import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        this.state={
            articles : [],
            loading: false,
            page:1
            
        }
    }

   async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=45e56f4470654d5393e761af0b968370&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})

    }

     handlePreviousClick= async ()=>{
        //console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=45e56f4470654d5393e761af0b968370&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        //console.log(parsedData);
        //console.log("Next");
        this.setState({
            articles: parsedData.articles,
            page: this.state.page-1,
            
        })
        

    }

     handleNextClick= async ()=>{
        if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=45e56f4470654d5393e761af0b968370&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        //console.log(parsedData);
        //console.log("Next");
        this.setState({
            articles: parsedData.articles,
            page: this.state.page+1,
            
        })
    }

    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">News monkey top head-lines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
          return  <div className="col-md-4"  key = {element.url} >
             <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageURL={element.urlToImage} newsID={element.url}/>
             </div>

        })}
        </div>
       
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default News

