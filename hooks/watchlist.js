import { useUpdateUser, useUser } from "./UserContext";

export function useAddToWatchlist(setLoading, movie, setError) {
  const updateUser = useUpdateUser();
  const user = useUser();
  return async () => {
    setLoading(true);
    const result = await addListItem(movie, user.userId);
    if (result === 1) {
      const watchlist = await getNewWatchlist(user.userId);
      updateUser({ ...user, watchlist });
    } else {
      setError(true);
    }
    setLoading(false);
  };
}

export function useRemoveFromWatchlist(setLoading, movie, setError) {
  const updateUser = useUpdateUser();
  const user = useUser();
  const { id } = movie;
  return async () => {
    setLoading(true);
    const result = await removeListItem(id, user.userId);
    if (result === 1) {
      const watchlist = await getNewWatchlist(user.userId);
      updateUser({ ...user, watchlist });
    } else {
      setError(true);
    }
    setLoading(false);
  };
}

async function addListItem(movie, user_id) {
  const { poster_path, title, overview, id } = movie;
  try {
    const add = await fetch("/api/addlistitem", {
      method: "POST",
      body: JSON.stringify({
        user_id,
        poster_path,
        title,
        overview,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return add.json();
  } catch {
    return 0;
  }
}

async function removeListItem(id, user_id) {
  try {
    const remove = await fetch("/api/removelistitem", {
      method: "DELETE",
      body: JSON.stringify({
        user_id,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return remove.json();
  } catch {
    return 0;
  }
}

async function getNewWatchlist(userId) {
  const resp = await fetch(`/api/getwatchlist/${userId}`);
  const watchlist = await resp.json();
  return watchlist;
}
