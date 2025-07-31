import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import './News.css';
import Spinner from "./Spinner";
import fallback from '../assets/fallback_img.jpg';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalResults, setTotalResults] = useState(0);

  const accessKey = "6f6f4480f0c9d611a74c5defdf7b9ad3"; // mediastack
  const newsApiKey = "84ba0bee1f244231abd03afe7e1d83cb"; // newsapi

  useEffect(() => {
    fetchNews(page);
    // eslint-disable-next-line
  }, []);

  const fetchNews = async (page) => {
    setLoading(true);

    let url = "";

    if (props.countries === "in") {
      url = `http://api.mediastack.com/v1/news?access_key=${accessKey}&countries=${props.countries}&categories=${props.category}&languages=en&limit=${pageSize}&offset=${
        (page - 1) * pageSize
      }`;
    } else if (props.countries === "us") {
      url = `https://newsapi.org/v2/top-headlines?country=${props.countries}&category=${props.category}&pageSize=${pageSize}&page=${page}&apiKey=${newsApiKey}`;
    } else {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const newArticles = data.data || data.articles || [];

      setArticles(newArticles);
      setTotalResults(data.pagination?.total || data.totalResults || newArticles.length);
      setPage(page);
    } catch (error) {
      console.error("Error fetching news:", error.message);
    }

    setLoading(false);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setLoading(true);

    let url = "";

    if (props.countries === "in") {
      url = `http://api.mediastack.com/v1/news?access_key=${accessKey}&countries=${props.countries}&categories=${props.category}&languages=en&limit=${pageSize}&offset=${
        (nextPage - 1) * pageSize
      }`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${props.countries}&category=${props.category}&pageSize=${pageSize}&page=${nextPage}&apiKey=${newsApiKey}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const newArticles = data.data || data.articles || [];

      setArticles(prev => prev.concat(newArticles));
      setTotalResults(data.pagination?.total || data.totalResults || totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more news:", error.message);
    }

    setLoading(false);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">Top {props.category} Headlines</h1>

      {loading && <h4 className="text-center"><Spinner /></h4>}

      <div className="news-row">
        {articles.map((article, index) => (
          <div className="news-card" key={index}>
            <NewsItem
              title={article.title}
              description={article.description}
              imageUrl={article.image || article.urlToImage || fallback}
              newsUrl={article.url}
              author={article.author}
              date={article.published_at || article.publishedAt}
              source={article.source?.name || "Unknown"}
            />
          </div>
        ))}
      </div>

      {articles.length < totalResults && (
         <div className="text-center my-3">
             <button className="btn btn-dark" onClick={fetchMoreData}>
             Load More 
           </button> 
         </div>
      )}
    </div>
  );
};

export default News;
