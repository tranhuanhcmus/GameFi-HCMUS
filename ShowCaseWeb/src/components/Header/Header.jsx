import React from 'react'
import './Header.scss'
import Menu from 'components/Menu/Menu'
import SearchBar from 'components/SearchBar/SearchBar'
import WalletButton from './WalletButton'
import NotificationButton from './NotificationButton'
const Header = () => {
  return (
	<div id='header'>
		<div className="header_wrapper">
			<div className="logo">
				<img src="/images/logo.svg" alt="logo" />
			</div>
			<div className="header_menu_wrapper">
				<Menu/>
				<Menu/>
			</div>
			<div className="search_wrapper">
				<SearchBar/>
			</div>
			<div className="control_wrapper">
				<NotificationButton/>
				<WalletButton/>
			</div>
		</div>
	</div>
  )
}

export default Header