import React from 'react'
import './Header.scss'
import Dropdown from 'components/Dropdown/Dropdown'
const Header = () => {
  return (
	<div id='header'>
		<div className="header_wrapper">
			<div className="logo">
				<img src="/images/logo.svg" alt="logo" />
			</div>
			<div className="drop_down_wrapper">
				<Dropdown/>
			</div>
		</div>
	</div>
  )
}

export default Header