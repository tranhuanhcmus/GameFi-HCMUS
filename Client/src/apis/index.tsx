import axios from "axios";
export const api = axios.create({
	//baseURL: process.env.BE_API,
	baseURL: "http://192.168.2.29:4500",
	timeout: 30000,
  });

// export function auth() {
// 	if (typeof window === 'undefined') {
// 		return {}
// 	}

// 	const headers = { Authorization: '', 'Content-Type': '' }
// 	var accessToken = localStorage.getItem('token') || ''
// 	accessToken = accessToken.replaceAll(`"`,'');
// 	headers.Authorization = `Bearer ${accessToken}`
// 	headers['Content-Type'] = 'application/json'
// 	return headers
// }