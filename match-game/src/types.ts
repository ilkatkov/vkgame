export type GameData = {
  logoURL: string;
  background: number;
  welcomeTitle: string;
  welcomeBody: string;
  subject: string;
  leaveTitle: string;
  leaveBody: string;
  leaveURL: string;
  gameType: "CLASSIC" | "MATCHCARDS";
  classicCards: {
    term: string;
    description: string;
  }[];
  rounds: number | null;
  matchCards: {
    imageURL: string;
    name: string;
    description: string;
  }[];
};
