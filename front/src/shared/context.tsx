import { createContext, ReactNode, useState } from "react";
import { defaultUser } from "./helpers/user.helper";
import { FlashMessage, Nil } from "./interfaces/misc.interfaces";
import User from "./interfaces/user.interfaces";

const UserContext = createContext({ user: defaultUser, setUser: (user: User): void => { } });
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };

const emptyFlash: FlashMessage = [Nil, ""];

const FlashMessageContext = createContext({ flashMessage: emptyFlash, setFlashMessage: (flashMessage: FlashMessage) => { } });
const FlashMessageProvider = ({ children }: { children: any }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage>([Nil, ""]);

  return (
    <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  )
}

export { FlashMessageContext, FlashMessageProvider };