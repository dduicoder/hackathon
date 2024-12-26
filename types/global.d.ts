export {};

declare global {
  interface InboxItem {
    date: string;
    item: string;
    invoice: string;
  }

  interface UserData {
    rank: number;
    inbox: InboxItem[];
  }

  type NoticeType = {
    id: string;
    type: "SUCCESS" | "ERROR";
    message: string;
  };
}
