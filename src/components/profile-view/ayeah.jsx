useEffect(() => {
  if (!token) {
    return;
  }

  fetch(
    '[testingmovieapi-l6tp.onrender.com/users](https://testingmovieapi-l6tp.onrender.com/users)',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('Users data: ', data);
      const currentUser = data.find((u) => u.username === localUser.username);
      setUser(currentUser);
      const favMovies = movies.filter((m) =>
        currentUser.favoriteMovies.includes(m.title)
      );
      setFavoriteMovies(favMovies);
    })
    .catch((error) => {
      console.error(error);
    });
}, [token, localUser.username, movies]);
