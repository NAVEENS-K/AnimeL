// mockAnimeData.js
const mockAnimeData = [
    {
      id: 1,
      title: "Attack on Titan",
      image: "https://example.com/attack_on_titan.jpg",
      rating: 8.7,
      views: 1200000,
      description: "A story about humanity's fight against giant humanoid creatures known as Titans.",
      releaseDate: "2013-04-07",
      genres: ["Action", "Drama", "Fantasy"],
      cast: ["Yuki Kaji", "Marina Inoue", "Kaito Ishikawa"],
      relatedAnime: [
        { id: 2, title: "Attack on Titan: The Final Season" },
        { id: 3, title: "Shingeki no Kyojin: Lost Girls" }
      ]
    },
    {
      id: 2,
      title: "Naruto",
      image: "https://example.com/naruto.jpg",
      rating: 8.3,
      views: 2500000,
      description: "The story of Naruto Uzumaki, a young ninja with dreams of becoming the strongest in his village.",
      releaseDate: "2002-10-03",
      genres: ["Action", "Adventure", "Shounen"],
      cast: ["Junko Takeuchi", "Noriaki Sugiyama", "Chie Nakamura"],
      relatedAnime: [
        { id: 4, title: "Naruto: Shippuden" },
        { id: 5, title: "Boruto: Naruto Next Generations" }
      ]
    },
    {
      id: 3,
      title: "One Piece",
      image: "https://example.com/one_piece.jpg",
      rating: 8.9,
      views: 5000000,
      description: "Monkey D. Luffy and his pirate crew sail the Grand Line in search of the world's ultimate treasure known as the 'One Piece'.",
      releaseDate: "1999-10-20",
      genres: ["Action", "Adventure", "Comedy"],
      cast: ["Mayumi Tanaka", "Tony Beck", "Kazuya Nakai"],
      relatedAnime: [
        { id: 6, title: "One Piece: The Movie" },
        { id: 7, title: "One Piece: Strong World" }
      ]
    },
    {
      id: 4,
      title: "Fullmetal Alchemist: Brotherhood",
      image: "https://example.com/fullmetal_alchemist.jpg",
      rating: 9.0,
      views: 6000000,
      description: "Two brothers search for a way to restore their bodies after an alchemical experiment goes wrong.",
      releaseDate: "2009-04-05",
      genres: ["Action", "Adventure", "Fantasy"],
      cast: ["Vic Mignogna", "Aaron Dismuke", "Romi Park"],
      relatedAnime: [
        { id: 8, title: "Fullmetal Alchemist" },
        { id: 9, title: "Fullmetal Alchemist: The Sacred Star of Milos" }
      ]
    },
    {
      id: 5,
      title: "Demon Slayer",
      image: "https://example.com/demon_slayer.jpg",
      rating: 8.8,
      views: 7000000,
      description: "Tanjiro Kamado, a young boy, becomes a demon slayer after his family is slaughtered by demons.",
      releaseDate: "2019-04-06",
      genres: ["Action", "Supernatural", "Demon"],
      cast: ["Natsuki Hanae", "Akari Kito", "Hiro Shimono"],
      relatedAnime: [
        { id: 10, title: "Demon Slayer: Mugen Train" },
        { id: 11, title: "Demon Slayer: Entertainment District Arc" }
      ]
    },
    {
      id: 6,
      title: "Death Note",
      image: "https://example.com/death_note.jpg",
      rating: 8.6,
      views: 4000000,
      description: "A high school student discovers a supernatural notebook that allows him to kill anyone whose name is written in it.",
      releaseDate: "2006-10-03",
      genres: ["Mystery", "Psychological", "Supernatural"],
      cast: ["Mamoru Miyano", "Brad Swaile", "Shidou Nakamura"],
      relatedAnime: [
        { id: 12, title: "Death Note: The Last Name" },
        { id: 13, title: "Death Note: Rewrite" }
      ]
    },
    {
      id: 7,
      title: "My Hero Academia",
      image: "https://example.com/my_hero_academia.jpg",
      rating: 8.5,
      views: 8000000,
      description: "In a world where almost everyone has superpowers, a boy born without them still dreams of becoming a hero.",
      releaseDate: "2016-04-03",
      genres: ["Action", "Superhero", "Shounen"],
      cast: ["Daiki Yamashita", "Kenta Miyake", "Takahiro Sakurai"],
      relatedAnime: [
        { id: 14, title: "My Hero Academia: Two Heroes" },
        { id: 15, title: "My Hero Academia: Heroes Rising" }
      ]
    },
    {
      id: 8,
      title: "Tokyo Ghoul",
      image: "https://example.com/tokyo_ghoul.jpg",
      rating: 8.4,
      views: 3000000,
      description: "Ken Kaneki, a college student, becomes a half-ghoul after a near-fatal encounter with a ghoul.",
      releaseDate: "2014-07-03",
      genres: ["Action", "Horror", "Supernatural"],
      cast: ["Natsuki Hanae", "Sora Amamiya", "Kishou Taniyama"],
      relatedAnime: [
        { id: 16, title: "Tokyo Ghoul √A" },
        { id: 17, title: "Tokyo Ghoul:re" }
      ]
    },
    // Add more anime entries here...
  ];
  
  export default mockAnimeData;
  