function handleIsUserloggedIn(req, res) {
  // console.log("From HandleUserLoggedIn", global.isAuthenticated);
  res.send([global.isAuthenticated]);
}
function handleIsUserloggedOut(req, res) {
  res.clearCookie("FoodAppToken");
  res.send([false]);
}

export { handleIsUserloggedIn, handleIsUserloggedOut };
