import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavBar from "./navbar/NavBar";
import MainContent from "./MainContent";
import LandingPage from './components/LandingPage'
// import Dashboard from './components/Dashboard'
// import ProjectsBaord from './components/ProjectBoard/ProjectBoard'

export default function App() {
	return (
		<BrowserRouter>
			<NavBar />
			{/* <Container as="main"> */}
				<LandingPage />
			{/* </Container> */}
		</BrowserRouter>
	);
}
