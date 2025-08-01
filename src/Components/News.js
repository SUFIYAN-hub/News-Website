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

  // 🔄 Runs when category or country changes
  useEffect(() => {
    setPage(1);
    setArticles([]);
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.countries]);

  const fetchNews = async (page) => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/news?page=${page}&country=${props.countries}&category=${props.category}`);
      const data = await response.json();
      const newArticles = data.articles || [];

      setArticles(newArticles);
      setTotalResults(data.totalResults || newArticles.length);
      setPage(page);
    } catch (error) {
      console.error("Error fetching news:", error.message);
    }

    setLoading(false);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/news?page=${nextPage}&country=${props.countries}&category=${props.category}`);
      const data = await response.json();
      const newArticles = data.articles || [];

      setArticles(prev => prev.concat(newArticles));
      setTotalResults(data.totalResults || totalResults);
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
              date={article.publishedAt || article.published_at}
              source={article.source?.name || "Unknown"}
            />
          </div>
        ))}
      </div>

      {!loading && articles.length < totalResults && (
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
