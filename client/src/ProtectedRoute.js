import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({
	path,
	exact,
	redirectIf,
	redirectTo,
	component: Component,
	render: _render
}) {
	return (
		<Route
			path={path}
			exact={exact}
			render={routeProps => {
				if (redirectIf) return <Redirect to={redirectTo} />;

				if (_render) return _render(routeProps);

				return <Component {...routeProps} />;
			}}
		/>
	);
}
