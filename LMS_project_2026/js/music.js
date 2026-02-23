/* ==================== 
   Music Player JavaScript
   Background music for relaxation
   ==================== */

// Music Player Class
class MusicPlayer {
  constructor() {
    this.audio = null;
    this.currentTrack = 0;
    this.isPlaying = false;
    this.volume = 70;
    this.playlist = [];
    this.init();
  }
  
  init() {
    // Initialize audio element
    this.audio = new Audio();
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.nextTrack());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
  }
  
  loadPlaylist(tracks) {
    this.playlist = tracks;
    if (this.playlist.length > 0) {
      this.loadTrack(0);
    }
  }
  
  loadTrack(index) {
    if (index < 0 || index >= this.playlist.length) return;
    
    this.currentTrack = index;
    const track = this.playlist[index];
    
    // Use a data URI or generated audio (since we don't have real files)
    this.audio.src = track.src || this.generateAudioDataUri();
    
    // Update UI
    document.getElementById('playerTitle').textContent = track.title;
    document.getElementById('playerArtist').textContent = track.artist;
    
    // Highlight current track in playlist
    document.querySelectorAll('.playlist-item').forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Update play button
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
      playBtn.textContent = '⏸️';
    }
    
    this.isPlaying = false;
  }
  
  play() {
    if (!this.audio.src) return;
    
    this.audio.play();
    this.isPlaying = true;
    
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
      playBtn.textContent = '⏸️';
    }
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
      playBtn.textContent = '▶️';
    }
  }
  
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  nextTrack() {
    let nextIndex = this.currentTrack + 1;
    if (nextIndex >= this.playlist.length) {
      nextIndex = 0; // Loop to beginning
    }
    this.loadTrack(nextIndex);
    if (this.isPlaying) {
      this.play();
    }
  }
  
  previousTrack() {
    let prevIndex = this.currentTrack - 1;
    if (prevIndex < 0) {
      prevIndex = this.playlist.length - 1;
    }
    this.loadTrack(prevIndex);
    if (this.isPlaying) {
      this.play();
    }
  }
  
  setVolume(volume) {
    this.volume = volume;
    this.audio.volume = volume / 100;
  }
  
  seek(position) {
    if (!isNaN(this.audio.duration)) {
      this.audio.currentTime = position;
    }
  }
  
  updateProgress() {
    if (!this.audio.duration) return;
    
    const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    
    if (progressFill) {
      progressFill.style.width = progressPercent + '%';
    }
    
    if (currentTimeEl) {
      currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }
  }
  
  updateDuration() {
    const durationEl = document.getElementById('duration');
    if (durationEl) {
      durationEl.textContent = this.formatTime(this.audio.duration);
    }
  }
  
  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  generateAudioDataUri(duration = 225) {
    // Simple tone generator - creates a basic audio stream
    // In a real app, you would use actual audio files or Web Audio API
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Create a soothing frequency around 432 Hz (healing frequency)
    oscillator.frequency.value = 432;
    oscillator.type = 'sine';
    
    // Fade in
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.5);
    
    // Fade out at end
    const endTime = context.currentTime + duration;
    gainNode.gain.linearRampToValueAtTime(0.3, endTime - 2);
    gainNode.gain.linearRampToValueAtTime(0, endTime);
    
    oscillator.start(context.currentTime);
    oscillator.stop(endTime);
    
    // For demo purposes, return a placeholder
    // In production, you'd use actual audio files/URLs
    return 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAA==';
  }
}

// Global music player instance
let musicPlayer = null;

// Initialize music player
function initMusicPlayer() {
  musicPlayer = new MusicPlayer();
}

// Load music playlist
function loadMusicPlaylist() {
  const playlistTracks = [
    {
      id: 1,
      title: 'Ambient Study Music',
      artist: 'LMS Collection',
      duration: 225,
      src: null
    },
    {
      id: 2,
      title: 'Peaceful Meditation',
      artist: 'LMS Collection',
      duration: 240,
      src: null
    },
    {
      id: 3,
      title: 'Focus & Concentrate',
      artist: 'LMS Collection',
      duration: 210,
      src: null
    },
    {
      id: 4,
      title: 'Relaxing Piano',
      artist: 'LMS Collection',
      duration: 300,
      src: null
    },
    {
      id: 5,
      title: 'Nature Sounds',
      artist: 'LMS Collection',
      duration: 225,
      src: null
    },
    {
      id: 6,
      title: 'Jazz for Reading',
      artist: 'LMS Collection',
      duration: 240,
      src: null
    },
    {
      id: 7,
      title: 'Classical Music Mix',
      artist: 'LMS Collection',
      duration: 300,
      src: null
    },
    {
      id: 8,
      title: 'Electronic Chill',
      artist: 'LMS Collection',
      duration: 270,
      src: null
    }
  ];
  
  if (!musicPlayer) {
    initMusicPlayer();
  }
  
  musicPlayer.loadPlaylist(playlistTracks);
  displayPlaylist(playlistTracks);
  
  // Load first track info
  if (playlistTracks.length > 0) {
    document.getElementById('duration').textContent = musicPlayer.formatTime(playlistTracks[0].duration);
  }
}

// Display playlist
function displayPlaylist(tracks) {
  const playlistContainer = document.getElementById('playlistContainer');
  if (!playlistContainer) return;
  
  playlistContainer.innerHTML = tracks.map((track, index) => `
    <div class="playlist-item ${index === 0 ? 'active' : ''}" onclick="playTrack(${index})">
      <div class="playlist-item-title">🎵 ${track.title}</div>
      <div class="playlist-item-duration">${musicPlayer?.formatTime(track.duration)}</div>
    </div>
  `).join('');
}

// Play track
function playTrack(index) {
  if (musicPlayer) {
    musicPlayer.loadTrack(index);
    musicPlayer.play();
  }
}

// Toggle play/pause
function togglePlay() {
  if (musicPlayer) {
    musicPlayer.togglePlay();
  }
}

// Next track
function nextTrack() {
  if (musicPlayer) {
    musicPlayer.nextTrack();
  }
}

// Previous track
function previousTrack() {
  if (musicPlayer) {
    musicPlayer.previousTrack();
  }
}

// Set volume
function setVolume(volume) {
  if (musicPlayer) {
    musicPlayer.setVolume(volume);
  }
}

// Seek in track
function seek(event) {
  if (!musicPlayer || !musicPlayer.audio.duration) return;
  
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = x / rect.width;
  const seekPosition = percentage * musicPlayer.audio.duration;
  
  musicPlayer.seek(seekPosition);
}

// Keyboard shortcuts for music player
document.addEventListener('keydown', function(event) {
  if (!musicPlayer || event.target.tagName === 'INPUT') return;
  
  switch(event.code) {
    case 'Space':
      if (document.activeElement !== document.body) return;
      event.preventDefault();
      togglePlay();
      break;
    case 'ArrowRight':
      if (event.ctrlKey) {
        nextTrack();
      }
      break;
    case 'ArrowLeft':
      if (event.ctrlKey) {
        previousTrack();
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      const volumeSlider = document.getElementById('volumeSlider');
      if (volumeSlider) {
        volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 5);
        setVolume(volumeSlider.value);
      }
      break;
    case 'ArrowDown':
      event.preventDefault();
      const volumeSliderDown = document.getElementById('volumeSlider');
      if (volumeSliderDown) {
        volumeSliderDown.value = Math.max(0, parseInt(volumeSliderDown.value) - 5);
        setVolume(volumeSliderDown.value);
      }
      break;
  }
});

// Music player features
class MusicPlayerFeatures {
  static addToFavorites(trackId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteTracks')) || [];
    
    if (!favorites.includes(trackId)) {
      favorites.push(trackId);
      localStorage.setItem('favoriteTracks', JSON.stringify(favorites));
      return true;
    }
    
    return false;
  }
  
  static removeFromFavorites(trackId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteTracks')) || [];
    favorites = favorites.filter(id => id !== trackId);
    localStorage.setItem('favoriteTracks', JSON.stringify(favorites));
    return true;
  }
  
  static isFavorite(trackId) {
    const favorites = JSON.parse(localStorage.getItem('favoriteTracks')) || [];
    return favorites.includes(trackId);
  }
  
  static createPlaylist(name, trackIds) {
    let playlists = JSON.parse(localStorage.getItem('musicPlaylists')) || [];
    
    playlists.push({
      id: Date.now(),
      name,
      trackIds,
      createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('musicPlaylists', JSON.stringify(playlists));
    return true;
  }
  
  static enableEqualizer() {
    // Placeholder for equalizer functionality
    console.log('Equalizer enabled');
  }
  
  static enableRepeat() {
    // Placeholder for repeat functionality
    console.log('Repeat enabled');
  }
  
  static enableShuffle() {
    // Placeholder for shuffle functionality
    console.log('Shuffle enabled');
  }
}

// Initialize favorites storage
if (!localStorage.getItem('favoriteTracks')) {
  localStorage.setItem('favoriteTracks', JSON.stringify([]));
}

if (!localStorage.getItem('musicPlaylists')) {
  localStorage.setItem('musicPlaylists', JSON.stringify([]));
}
