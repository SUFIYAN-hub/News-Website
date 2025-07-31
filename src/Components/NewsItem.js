import React from "react";
import "./NewsItem.css";
import fallback from "../assets/fallback_img.jpg";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="news-card">
        <img
        className="news-image"
          src={imageUrl}
          alt="news"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallback;
          }}
        />

        <div className="news-content">
          <h2 className="news-title">{title}</h2>
          <span className="news-badge">{source}</span>
          <p className="news-description">
            Short summary or teaser of the news {description}
          </p>

          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on{" "}
              {!isNaN(Date.parse(date))
                ? new Date(date).toUTCString()
                : "Date unavailable"}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="news-link"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
