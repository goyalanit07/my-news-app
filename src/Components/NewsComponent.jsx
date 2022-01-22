import React,{useState,useEffect} from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import noimage from './noimage.jpg';
import InfiniteScroll from "react-infinite-scroll-component";
// import Articles from './SampleOutput';

function NewsComponent(props) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [spinner, setSpinner] = useState(false);

    const updatingNews = async ()=> {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=aae4f18e9efd4150b5b42ba6f1d118d4&page=${page}&pagesize=${props.pageSize}`;
        
        setSpinner(true);
        let data = await fetch(url);
        props.setProgress(40);
        let fetchData = await data.json();
        console.log('News data ', fetchData, 'and page no', page);
        setArticles(fetchData.articles);
        setTotalResults(fetchData.totalResults);
        setSpinner(false);
        console.log('article length ', articles.length);
        props.setProgress(100);

    }
    useEffect(() => {
      updatingNews();
    }, []);  // eslint-disable-line

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=aae4f18e9efd4150b5b42ba6f1d118d4&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page+1)
        setSpinner(true);
        let data = await fetch(url);
        let fetchData = await data.json();
        setArticles(articles.concat(fetchData.articles));
        setSpinner(false);
    }



    return (
        <div className='container'>
            <h3>
                Top HeadLines
                <small className="text-muted">  Results {totalResults} </small>
            </h3>
            {spinner && <Loader />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
            >
                <div className="row">
                    {articles.map((article) => {

                        return (
                            <div className="col-md-4 my-3" key={article.title} >
                                <NewsItem newsTitle={article.title} newsDescr={article.description} imgurl={article.urlToImage ? article.urlToImage : noimage} url={article.url} author={article.author} newsTime={article.publishedAt} />
                            </div>)
                    })}
                </div></InfiniteScroll>

        </div>
    )

}

export default NewsComponent
