import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SpoilerText = ({ text }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <TouchableOpacity onPress={() => setRevealed(!revealed)}>
      <Text style={{ backgroundColor: revealed ? 'transparent' : '#000', color: revealed ? '#000' : '#000' }}>
        {revealed ? text : 'Spoiler — Tap to Reveal'}
      </Text>
    </TouchableOpacity>
  );
};

export default SpoilerText;
