import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { W3mAccountButton, useWeb3Modal } from '@web3modal/wagmi-react-native';
import { useAccount, useDisconnect } from 'wagmi'; // Import useDisconnect hook
import WebView from 'react-native-webview';

export default function HomeScreen() {
	const { open } = useWeb3Modal();
	const { address, isConnecting, isDisconnected, isConnected } = useAccount();
	const { disconnect } = useDisconnect(); // Add useDisconnect hook

	return (
		<>
			<View style={styles.container}>
				<W3mAccountButton disabled balance="show" />

				{isConnected && (
					<Pressable style={styles.button} onPress={() => disconnect()}>
						<Text>Disconnect Wallet</Text>
					</Pressable>
				)}

				{!isConnected && (
					<Pressable style={styles.button} onPress={() => open()}>
						{isConnecting ? <Text>Connecting...</Text> : <Text>Connect Wallet</Text>}
					</Pressable>
				)}
				{/* <WebView
					source={{ uri: 'http://192.168.2.29:7456/web-mobile/web-mobile/index.html' }}
					javaScriptEnabled={true}
					cacheEnabled={false} // Disable caching
				/> */}
			</View>

		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		marginVertical: 20,
		borderRadius: 10,
		padding: 8,
		backgroundColor: '#61dafb',
		color: '#000',
	},
});
