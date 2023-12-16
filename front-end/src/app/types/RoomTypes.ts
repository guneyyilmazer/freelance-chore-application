type room = { name: string };
export type {room}
type DirectMessagesRoom = {
    name: string;
    users: [{ userId: string; username: string; profilePicture: string }];
    lastMessage: {
      sender: {
        username: string;
        userId: string;
        content: string;
        sent: string;
        seenBy: [string];
      };
    };
  };
  export type {DirectMessagesRoom}