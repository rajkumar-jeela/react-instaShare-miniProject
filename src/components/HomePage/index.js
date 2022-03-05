import {Component} from 'react'

import Cookies from 'js-cookie'
import {Circles} from 'react-loader-spinner'
import HeaderPage from '../HeaderPage'
import PostCard from '../PostCard'
import StoriesCard from '../StoriesCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    homePostList: [],
    postApiStatus: apiStatusConstants.initial,
    homeStoriesList: [],
    storiesApiStatus: apiStatusConstants.initial,
    searchCaptionInput: '',
  }

  componentDidMount() {
    this.getHomePostList()
    this.getHomeStoriesList()
  }

  getHomePostList = async () => {
    this.setState({
      postApiStatus: apiStatusConstants.inProgress,
    })
    const {searchCaptionInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchCaptionInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.posts.map(each => ({
        comments: each.comments.map(each2 => ({
          userName: each2.user_name,
          userId: each2.user_id,
          comment: each2.comment,
        })),
        createdAt: each.created_at,
        likesCount: each.likes_count,
        postDetailsCaption: each.post_details.caption,
        postDetailsImageUrl: each.post_details.image_url,
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
      }))
      this.setState({
        homePostList: formattedData,
        postApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({postApiStatus: apiStatusConstants.failure})
    }
  }

  getHomeStoriesList = async () => {
    this.setState({
      storiesApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.users_stories.map(each => ({
        storyUrl: each.story_url,
        userId: each.user_id,
        userName: each.user_name,
      }))
      this.setState({
        homeStoriesList: formattedData,
        storiesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        storiesApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onSearchCaption = search => {
    this.setState({searchCaptionInput: search}, this.getHomePostList)
  }

  renderPostView = () => {
    const {homePostList, searchCaptionInput} = this.state

    return (
      <div className="resultsContainer">
        {searchCaptionInput !== '' && <h1>Search Results</h1>}
        <PostCard postData={homePostList} />
      </div>
    )
  }

  renderStoriesView = () => {
    const {homeStoriesList} = this.state
    return <StoriesCard storiesData={homeStoriesList} />
  }

  onRetryPost = () => {
    this.setState(
      {postApiStatus: apiStatusConstants.inProgress},
      this.getHomePostList,
    )
  }

  onRetryStory = () => {
    this.setState(
      {storiesApiStatus: apiStatusConstants.inProgress},
      this.getHomeStoriesList,
    )
  }

  renderPostFailureView = () => (
    <div className="failure-post-container">
      <img
        src="https://res.cloudinary.com/visvarma/image/upload/v1644594113/InstaShare%20%28Instagram-Clone%29/home-failure_vma1b7.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryPost}
      >
        Try again
      </button>
    </div>
  )

  renderStoriesFailureView = () => (
    <div className="failure-story-container">
      <img
        src="https://res.cloudinary.com/visvarma/image/upload/v1644594113/InstaShare%20%28Instagram-Clone%29/home-failure_vma1b7.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryStory}
      >
        Try again
      </button>
    </div>
  )

  renderNoSearchResultView = () => {
    const {homePostList, searchCaptionInput} = this.state
    if (homePostList.length === 0 && searchCaptionInput !== '') {
      return (
        <div className="zero-search-result">
          <img
            src="https://res.cloudinary.com/visvarma/image/upload/v1645026042/InstaShare%20%28Instagram-Clone%29/GroupSearchNotFound_xgt8xz.png"
            alt="search not found"
          />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      )
    }
    return null
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Circles
        testid="loader"
        type="TailSpin"
        color="#4094EF"
        height={50}
        width={50}
      />
    </div>
  )

  renderStoriesLoadingView = () => (
    <div className="stories-loader-container" testid="loader">
      <Circles
        testid="loader"
        type="TailSpin"
        color="#4094EF"
        height={50}
        width={50}
      />
    </div>
  )

  displayStoriesView = () => {
    const {storiesApiStatus} = this.state
    switch (storiesApiStatus) {
      case apiStatusConstants.success:
        return this.renderStoriesView()
      case apiStatusConstants.failure:
        return this.renderStoriesFailureView()
      case apiStatusConstants.inProgress:
        return this.renderStoriesLoadingView()
      default:
        return null
    }
  }

  displayPostView = () => {
    const {postApiStatus} = this.state
    switch (postApiStatus) {
      case apiStatusConstants.success:
        return this.renderPostView()
      case apiStatusConstants.failure:
        return this.renderPostFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderPage onSearchCaption={this.onSearchCaption} />
        {this.displayStoriesView()}
        <div className="HomePageContainer">{this.displayPostView()}</div>

        <div>{this.renderNoSearchResultView()}</div>
      </>
    )
  }
}

export default HomeRoute
