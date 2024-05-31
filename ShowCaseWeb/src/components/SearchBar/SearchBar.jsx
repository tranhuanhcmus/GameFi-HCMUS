import React from 'react'
import './SearchBar.scss'

const SearchBar = () => {
  return (
	<div className='search_bar'>
    <div className="search_bar__icon">
      <img src="/images/search_icon.svg" alt="searchIcon" />
    </div>
    <input type="text" placeholder='Search' />
  </div>
  )
}

export default SearchBar