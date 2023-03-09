import React from "react";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const CATEGORY = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
]
const NewsApp = () => {
    const [articles, setArticles] = useState([])
    const [cat, setCat] = useState('sports')
    const [totalRecords, setTotalRecords] = useState(0)
    const [pageNum, setPageNum] = useState(1)
    const LoadNews = () => {
        axios({
            method: 'GET',
            url: "https://newsapi.org/v2/top-headlines",
            params: {
                country: "in",
                category: cat,
                page: pageNum,
                apikey: '6f7c523a9e6e48abae369c1d765ace91'
            }

        }).then((response) => {
            setArticles(response.data.articles)
            setTotalRecords(response.data.totalResults)

        }).catch((error) => {
            console.log('err', error)
        })
    }
    const handleCategorySelection = (Category) => {
        setCat(Category)
    }
    useEffect(() => {
        LoadNews()
    }, [])
    useEffect(() => {
        LoadNews()
    }, [cat, pageNum])
    return (
        <>
            <div style={{ display: "flex", margin: '20' }}>
                {
                    CATEGORY.map((Category, index) => {
                        return (
                            <button
                                className="btn btn-primary"
                                onClick={() => { handleCategorySelection(Category) }}
                            >{Category}</button>
                        )

                    })
                }
            </div>
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                pageCount={Math.ceil(totalRecords / 20)}
                onPageChange={(event) => {
                    setPageNum(event.selected + 1)
                }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    articles.map((article, index) => {
                        return (

                            <div class="card" style={{ width: '18rem', margin: 10 }}>
                                <img src={article.urlToImage} class="card-img-top" alt="..." style={{ minHeight: 200, backgroundColor: "gray" }} />
                                <div class="card-body">
                                    <h5 class="card-title" >{article.title}</h5>
                                    <p class="card-text" >{article.description}</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}
export default NewsApp
