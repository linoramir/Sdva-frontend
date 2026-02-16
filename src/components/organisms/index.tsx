// Exportaciones de Organisms - Componentes complejos
import { CardUser, Detail, Ticket } from "./cards";
import { FormSignin } from "./forms/signin";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { PublicRoute } from "./routers/public";
import { PrivateRoute } from "./routers/private";
import { CustomTabs } from "./tabs/customTabs";

export { CardUser, Detail, Ticket, FormSignin, Header, Navbar, PublicRoute, PrivateRoute, CustomTabs };
export type { CardUserProps, DetailProps } from "./cards";
export type { HeaderProps, HeaderUser } from "./header";
export type { NavbarProps, NavbarMenuItem } from "./navbar";
