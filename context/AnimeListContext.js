import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, createContext, useRef } from 'react';

export const AnimeListContext = createContext();

export const AnimeListProvider = ({ children }) => {
  const [animeList, setAnimeList] = useState([]);
  const didLoadRef = useRef(false);

  const addAnime = (animeEntry) => {
    if (!animeEntry?.anime?.mal_id) return;

    setAnimeList(prevList => {
      const index = prevList.findIndex(item => item.anime?.mal_id === animeEntry.anime.mal_id);
      if (index !== -1) {
        const updated = [...prevList];
        updated[index] = animeEntry;
        return updated;
      }
      return [...prevList, animeEntry];
    });
  };

  const removeAnime = (mal_id) => {
    setAnimeList(prevList =>
      prevList.filter(item => item.anime?.mal_id !== mal_id)
    );
  };

  const updateAnime = (updatedEntry) => {
    if (!updatedEntry?.anime?.mal_id) return;

    setAnimeList(prevList =>
      prevList.map(item =>
        item.anime?.mal_id === updatedEntry.anime.mal_id ? updatedEntry : item
      )
    );
  };

  const loadList = async () => {
    try {
      const data = await AsyncStorage.getItem('myAnimeList');
      if (data) {
        setAnimeList(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load anime list:', error);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  useEffect(() => {
    if (didLoadRef.current) {
      AsyncStorage.setItem('myAnimeList', JSON.stringify(animeList));
    } else {
      didLoadRef.current = true;
    }
  }, [animeList]);

  return (
    <AnimeListContext.Provider
      value={{
        animeList,
        addAnime,
        removeAnime,
        updateAnime,
        loadList,
      }}
    >
      {children}
    </AnimeListContext.Provider>
  );
};
