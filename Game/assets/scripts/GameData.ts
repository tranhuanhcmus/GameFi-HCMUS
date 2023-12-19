export enum GameState {
  PLAYING,
  PAUSE,
}
export class GameData  {
  private static instance: GameData | null = null;
  _state:GameState;
  public constructor(){

  }
  static getInstance(): GameData {
    if (!this.instance) {
      this.instance = new GameData();
    }
    return this.instance;
  }
  start() {}

  update(deltaTime: number) {}
}
