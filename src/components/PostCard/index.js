import Cookies from 'js-cookie'
import PostListItem from '../PostListItem'

import './index.css'

const PostCard = props => {
  const {postData} = props

  const onLikeUnlikePost = async (postId, likeStatus) => {
    const token = Cookies.get('jwt_token')
    console.log(likeStatus)
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const post = {like_status: likeStatus}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
      method: 'POST',
    }
    await fetch(apiUrl, options)
  }

  return (
    <ul className="post-container">
      {postData.map(each => (
        <PostListItem
          key={each.postId}
          data={each}
          likeUnlike={onLikeUnlikePost}
        />
      ))}
    </ul>
  )
}

export default PostCard
