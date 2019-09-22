export default function setUser(user, authToken) {
	return { type: "SET_USER", user, authToken };
}
