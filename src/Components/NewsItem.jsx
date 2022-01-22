import React from 'react';

function NewsItem(props) {
    const { newsTitle, newsDescr, imgurl, url, author, newsTime } = props;
    return (
        <>
            <div className="card">
                <img src={imgurl} className="card-img-top" alt="not" />
                <div className="card-body">
                    <h5 className="card-title">{newsTitle}</h5>
                    <p className="card-text">{newsDescr}</p>
                    <p className="card-text"><small className="text-muted">Source : {author}  {new Date(newsTime).toLocaleString()}</small></p>
                    <a href={url} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">More info</a>
                </div>
            </div>
        </>
    )

}

export default NewsItem;
