// components/ProgressBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  const progressWidth = `${progress * 100}%`;

  return (
    <View style={styles.container}>
      {/* Faktyczny pasek postępu */}
      <View style={[styles.progressBar, { width: progressWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: '100%',
    backgroundColor: '#E0E0E0', 
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2', 
    borderRadius: 4,
  },
});

export default ProgressBar;