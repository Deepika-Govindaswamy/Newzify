import React from 'react'

export default function NewsItem (props) {
  
    return (
      <div>
        <div className="card" >
            <img src={props.imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.title} ...</h5>
                <p className="card-text">{props.description}...</p>
                <p className="card-text">{props.author}, {new Date(props.publishedAt).toGMTString()
                }</p>
                <a rel="noreferrer" href={props.newsUrl} target = "_blank" className="btn btn-dark btn-sm">Read More</a>
            </div>
</div>
      </div>
    )
  
}


