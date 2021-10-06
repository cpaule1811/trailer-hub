import { useUser } from "./UserContext";

export function useInWatchlist(id) {
  const { watchlist } = useUser();
  const watchlistIds = watchlist.map((item) => {
    return item.id;
  });
  return watchlistIds.includes(id);
}
