export {};

declare global {
  interface InboxItem {
    date: string;
    name: string;
    inv_num: string;
  }

  interface UserData {
    rank: number;
    inbox: InboxItem[];
  }
}
