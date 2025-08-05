import { Track, Album, Artist, Playlist } from '../types';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    coverUrl: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop Rock'
  },
  {
    id: '4',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Stay',
    duration: 141,
    coverUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Hip Hop'
  },
  {
    id: '5',
    title: 'Industry Baby',
    artist: 'Lil Nas X & Jack Harlow',
    album: 'MONTERO',
    duration: 212,
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Hip Hop'
  },
  {
    id: '6',
    title: 'Peaches',
    artist: 'Justin Bieber',
    album: 'Justice',
    duration: 198,
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'R&B'
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    year: 2020,
    tracks: [mockTracks[0]],
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Fine Line',
    artist: 'Harry Styles',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    year: 2019,
    tracks: [mockTracks[1]],
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'SOUR',
    artist: 'Olivia Rodrigo',
    coverUrl: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300',
    year: 2021,
    tracks: [mockTracks[2]],
    genre: 'Pop Rock'
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'The Weeknd',
    imageUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Canadian singer, songwriter, and record producer known for his distinctive voice.',
    followers: 85000000,
    topTracks: [mockTracks[0]],
    albums: [mockAlbums[0]]
  },
  {
    id: '2',
    name: 'Harry Styles',
    imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'English singer, songwriter, and actor, known as a member of One Direction.',
    followers: 65000000,
    topTracks: [mockTracks[1]],
    albums: [mockAlbums[1]]
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.slice(0, 4),
    createdBy: 'Spotify',
    isPublic: true
  },
  {
    id: '2',
    title: 'Chill Vibes',
    description: 'Relax and unwind with these chill tracks',
    coverUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.slice(2, 6),
    createdBy: 'Spotify',
    isPublic: true
  }
];