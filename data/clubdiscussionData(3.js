const clubDiscussionData = Array.from({ length: 100 }, (_, clubIndex) => {
    const clubId = clubIndex + 1;
  
    const generateDiscussion = (type) =>
      Array.from({ length: 20 }, (_, i) => ({
        id: `${clubId}-${type}-${i + 1}`,
        profileImage: `https://picsum.photos/seed/${type}-club${clubId}-user${i}/50`,
        username: `User_${type}_${i + 1}`,
        time: `${Math.floor(Math.random() * 24)}h ago`,
        subject: `${type === 'couch' ? 'Discussion' : 'Topic'} #${i + 1}`,
        content: `This is a sample ${type} discussion message #${i + 1} for Club ${clubId}.`,
      }));
  
    const generateMembers = () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: `${clubId}-member-${i + 1}`,
        name: `Member_${i + 1}`,
        image: `https://picsum.photos/seed/member-club${clubId}-${i}/60`,
      }));
  
    return {
      clubId,
      createdAt: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      about: `This is a brief description about Club ${clubId}. It focuses on anime genre ${clubId % 10}.`,
      membersCount: (Math.random() * 100).toFixed(1), // in k
      image: `https://picsum.photos/seed/club${clubId}/100`,
      couch: generateDiscussion('couch'),
      cabinet: generateDiscussion('cabinet'),
      members: generateMembers(),
    };
  });
  
  export default clubDiscussionData;
  