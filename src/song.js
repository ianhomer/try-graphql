export default class Song {
  constructor(id, { name, artist, year, length }) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.year = year;
    this.length = length;
  }
}
