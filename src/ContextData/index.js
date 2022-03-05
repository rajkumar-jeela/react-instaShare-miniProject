import React from 'react'

const ContextData = React.createContext({
  PostList: [],
  SearchedPostList: () => {},
  SearchInput: '',
  SearchInputChange: () => {},
  SearchValue: '',
  ChangeSearchValue: () => {},
  TrigerSearchValue: () => {},
})

export default ContextData
