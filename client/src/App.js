import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavBar from "./navbar/NavBar";
import MainContent from "./MainContent";

export default function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Container as="main">
				<MainContent />
			</Container>
		</BrowserRouter>
	);
}
