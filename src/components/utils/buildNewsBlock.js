import React from 'react';
import "~/components/pages/news/css/news.scss";
import arrow from '~/static/img/arrow.png';
import bookmark from '~/static/img/book.png';
import bookmarkActive from '~/static/img/book-active.png';


function BuildNewsBlock({item, mainItem = false, isBookmark, toggleBookmark}){
    const date = new Date(item?.datetime);
          
    return (
        <div
            className="news_item_container"
            key={item?.id}
        >
            <a
                className={`news_item${mainItem? " main_item" : ""}`}
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div
                    className="news_item__image_box"
                    style={{
                        backgroundImage: `url(${item?.image})`
                    }}
                />
                <div className="news_item__overflow" />
                <div className="news_item__content">
                    {mainItem && (
                        <div className="main_badge">
                            latest news
                        </div>
                    )}
                    <div className="related">
                        {item?.related}
                    </div>
                    <div className="news_item__title">
                        {item?.headline}
                    </div>
                    <div className="news_item__sub_title">
                        {item?.summary}
                    </div>
                    <div className="news_item__bottom-line">
                        {mainItem
                            ? (
                                <div className="read">
                                    <img src={arrow} alt=""/>
                                    Read the research
                                </div>
                              )
                            : (
                                item?.source  
                              )
                        }
                        <div className="date">
                            {`${date.getDay()} ${date?.toLocaleString('default', { month: 'short' })}`}
                        </div>
                    </div>
                </div>
            </a>
            <div className="bookmark" onClick={toggleBookmark}>
                {isBookmark
                    ? <img src={bookmarkActive} alt="" />
                    : <img src={bookmark} alt="" />
                }
            </div>
        </div>
    )
}

export {BuildNewsBlock}