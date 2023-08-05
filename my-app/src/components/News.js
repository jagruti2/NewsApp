
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from 'react';



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  //  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;


  News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }

  //  constructor(props)
  // {
  //   super(props);
  //   console.log("Hello I am a constructor from new component");
  // }



  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ad13172a76d847e5bf0204499740bdd1&page=$page&pageSize=${props.pageSize}`;
    
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    console.log(parsedData);

  }

  useEffect(() => {
    updateNews();
  }, [])

  // async componentDidMount() {
  //   this.updateNews();
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ad13172a76d847e5bf0204499740bdd1&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json()
  //   // console.log(parsedData);
  //   // this.setState({ articles: parsedData.articles,
  //   //    totalArticles: parsedData.totalResults,
  //   //   loading:false })
  // }

  const handleNextClick = () => {
    console.log("next")
    setPage(page+1)
    updateNews();
  }

  const handlePrevClick = () => {
    console.log("prev")
    setPage(page-1)
    updateNews();
  }

  //   handlePrevClick = async () =>{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=business&category=${props.category}&apiKey=ad13172a76d847e5bf0204499740bdd1&page=${this.state.page-1}&pageSize=20`;
  //     console.log("Previous")
  //     let data = await fetch(url);
  //    let parsedData = await data.json()
  //    console.log(parsedData);
  //    this.setState({
  //     page:this.state.page - 1,
  //     articles:parsedData.articles})

  //  }

  //   handleNextClick = async () =>{
  //   console.log("Next");
  //     if ( this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
  //   }
  //     else {
  //       let url=
  //       `https://newsapi.org/v2/top-headlines?country=${props.country}&category=business&category=${props.category}&apiKey=ad13172a76d847e5bf0204499740bdd1&page=${this.state.page+1}&pageSize=20`;
  //     let data = await fetch(url);
  //    let parsedData = await data.json()
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles:parsedData.articles
  //     } )
  //     }


  //  }

  const fetchMoreData = () =>{

  }

  console.log("render")
  return (
    <div className='container' my-3>
      <h1 className='text-center' style={{ margin: "30px 0px" , marginTop:'90px'}}>NewsMonkey -Top  {capitalizeFirstLetter(props.category)} category </h1>
      {/* {this.state.loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.lengt !== totalResults}
        loader={<Spinner />}
      >



        <div className="row">
          {articles.map((element) => {
            return <div className='col-md-4'>
              <NewsItem key={element.url} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.url ? element.urlToImage : ""} author={element.author} date={element.publishedAt}
                source={element.source.name} />
            </div>

          }
          )}

        </div>
      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
          <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ad13172a76d847e5bf0204499740bdd1&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
            this.setState({loading:true});
            console.log("Previous")
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({
              page: this.state.page - 1,
              articles: parsedData.articles,
              loading:false
            })
            this.setState({page : this.state.page - 1})
            this.updateNews();
            
          }}> &larr; Previous</button>

          <button disabled={( this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))} type="button" className="btn btn-dark" onClick={async () => {
              console.log("Next");
            if (!(this.state.page + 1 > Math.ceil(this.state.totalResults /props.pageSize)) ){
            
              let url =
                `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ad13172a76d847e5bf0204499740bdd1&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
              this.setState({loading:true});
                let data = await fetch(url);
              let parsedData = await data.json()
              this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading:false
              })
            }
            this.setState({page : this.state.page + 1})
            this.updateNews();
          }}>Next &rarr;</button>
        </div>  */}
    </div>
  )
}


export default News;
