import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News (props) {

  const [articles, setArticles] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const capitalize =(heading) => {
      return heading.charAt(0).toUpperCase() + heading.slice(1)
  }

  const updateNews = async() => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.page+1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40)
    let parsedData = await data.json();
    props.setProgress(80)

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect( () => {
    updateNews()
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async() => {
  
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.page +1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setPage(page +1)
  }


    return (
      <>
      
        <h1 className="text-center" style={{ marginTop: 90 + "px" }}>
          Newzify - {capitalize(props.category)}
        </h1>

        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalResults} loader={<Spinner/>} >
        
        <div className="container">
          <div className="row my-4">
            {articles.map((element, index) => {
                return (
                  <div className="col-md-4 my-4" key={index}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={ element.description ? element.description.slice(0, 88) : ""}
                      imgUrl={element.urlToImage ? element.urlToImage : "https://cdn.ndtv.com/common/images/ogndtv.png"}
                      newsUrl={element.url} author={element.author} publishedAt={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        </InfiniteScroll>
      </>
    );
}


News.propTypes = {
  pageSize: PropTypes.number,
  totalResults: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

// News.defaultProps = {
//   pageSize: 6,
//   country: "in",
//   category: "general",
//   totalResults: 0
// };