import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import noimage from './noimage.jpg';
// import Articles from './SampleOutput';

export class NewsComponent extends Component {
    noimage = noimage;

    constructor() {
        super();
        console.log('Constructor ');
        this.state = {
            articles: [],
            page: 1,
            spinner: false
        }
    }
    async updatingNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=aae4f18e9efd4150b5b42ba6f1d118d4&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ spinner: true });
        let data = await fetch(url);
        let fetchData = await data.json();
        console.log('News data ', fetchData,'and page no',this.state.page);
        this.setState({
            articles: fetchData.articles,
            totalResults: fetchData.totalResults,
            spinner: false
        })
        console.log('Page no',this.state.page);

    }
    async componentDidMount() {
        this.updatingNews();
    }
    preFn = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=aae4f18e9efd4150b5b42ba6f1d118d4&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        this.setState({ spinner: true });
        let data = await fetch(url);
        let fetchData = await data.json();
        console.log('News data ', fetchData,'and page no',this.state.page);
        this.setState({
            articles: fetchData.articles,
            totalResults: fetchData.totalResults,
            spinner: false,
            page: this.state.page-1
        })

    }
    nextFn = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=aae4f18e9efd4150b5b42ba6f1d118d4&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        this.setState({ spinner: true });
        let data = await fetch(url);
        let fetchData = await data.json();
        console.log('News data ', fetchData,'and page no',this.state.page);
        this.setState({
            articles: fetchData.articles,
            totalResults: fetchData.totalResults,
            spinner: false,
            page: this.state.page+1
        })       
    }


    render() {
        return (
            <div className='container'>
                <h3>
                    Top HeadLines
                    <small className="text-muted">  Results {this.state.totalResults} </small>
                </h3>
                {this.state.spinner && <Loader />}
                <div className="row">
                    {!this.state.spinner && this.state.articles.map((article) => {
                        
                        return (
                            <div className="col-md-4 my-3" key={article.title} >
                                <NewsItem newsTitle={article.title} newsDescr={article.description} imgurl={article.urlToImage ? article.urlToImage : noimage} url={article.url} author={article.author} newsTime={article.publishedAt} />
                            </div>)
                    })}
                </div>
                <div className="container d-flex justify-content-between" >
                    <button type="button" disabled={this.state.page < 2} className="btn btn-secondary" onClick={this.preFn}>Previous</button>
                    <button type="button" disabled={this.state.page > this.state.totalResults / this.props.pageSize} className="btn btn-secondary" onClick={this.nextFn}>Next</button>
                </div>

            </div>
        )
    }
}

export default NewsComponent
