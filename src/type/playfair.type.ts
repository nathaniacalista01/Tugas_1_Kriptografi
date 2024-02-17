import { Coordinate } from "./coordinate.type";

export class Playfair {
  private value: string;
  private coordinate: Coordinate;

  constructor(value: string, x: number, y: number) {
    this.value = value;
    this.coordinate = new Coordinate(x, y);
  }

  public getValue() {
    return this.value;
  }

  public getCoordinate() {
    return this.coordinate;
  }
}

export class PlayfairMatrix {
  private key: string;
  private valueToCoordinateMap: { [key: string]: Coordinate } = {}; // Map for efficient lookups
  private coordinateToValueMap: { [key: string]: string } = {}; // Map for reverse lookup

  constructor(key: string) {
    this.key = key.toUpperCase().replace(/ /g, "").replace(/J/g, "");
    let x = 0;
    let y = 0;
    let alphabets = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    // Process key
    for (const char of this.key) {
      if (!this.valueToCoordinateMap[char]) {
        const playfair = new Playfair(char, x, y);
        this.valueToCoordinateMap[char] = playfair.getCoordinate();
        this.coordinateToValueMap[`${x},${y}`] = char; // Adding to reverse lookup map

        if (y < 4) {
          y += 1;
        } else {
          x += 1;
          y = 0;
        }
        alphabets = alphabets.replace(char, "");
      }
    }
    // Process remaining alphabets
    for (const char of alphabets) {
      const playfair = new Playfair(char, x, y);
      this.valueToCoordinateMap[char] = playfair.getCoordinate();
      this.coordinateToValueMap[`${x},${y}`] = char; // Adding to reverse lookup map

      if (y < 4) {
        y += 1;
      } else {
        x += 1;
        y = 0;
      }
    }
    console.log(this.coordinateToValueMap);
  }

  public getKey() {
    return this.key;
  }

  public getCoordinateByValue(value: string): Coordinate {
    return this.valueToCoordinateMap[value];
  }
  public getValueByCoordinate(x: number, y: number): string {
    return this.coordinateToValueMap[`${x},${y}`];
  }

  public isSameRow(first_text: string, second_text: string) {
    const first_coordinate = this.getCoordinateByValue(first_text);
    const second_coordinate = this.getCoordinateByValue(second_text);
    return first_coordinate.getX() === second_coordinate.getX();
  }

  public isSameCol(first_text: string, second_text: string) {
    const first_coordinate = this.getCoordinateByValue(first_text);
    const second_coordinate = this.getCoordinateByValue(second_text);
    return first_coordinate.getY() === second_coordinate.getY();
  }

  public sameRow(plain: string) {
    const current_coordinate = this.getCoordinateByValue(plain);
    const next =
      current_coordinate.getY() + 1 > 4 ? 0 : current_coordinate.getY() + 1;
    const value = this.getValueByCoordinate(current_coordinate.getX(), next);
    return value;
  }

  public sameColumn(plain: string) {
    const current_coordinate = this.getCoordinateByValue(plain);
    const next =
      current_coordinate.getX() + 1 > 4 ? 0 : current_coordinate.getX() + 1;
    const value = this.getValueByCoordinate(next, current_coordinate.getY());
    return value;
  }

  public differentColumnAndRow(first_text: string, second_text: string) {
    const first_coordinate = this.getCoordinateByValue(first_text);
    const second_coordinate = this.getCoordinateByValue(second_text);
    const first_value = this.getValueByCoordinate(
      first_coordinate.getX(),
      second_coordinate.getY()
    );
    const second_value = this.getValueByCoordinate(
      second_coordinate.getX(),
      first_coordinate.getY()
    );
    return [first_value, second_value];
  }
}
