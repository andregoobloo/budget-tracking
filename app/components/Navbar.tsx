import Logo from "./Logo";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavbarItem from "./NavbarItem";
import ThemeSwitchBtn from "./ThemeSwitchBtn";
// import ThemeSwitchBtn from "./ThemeSwitchBtn";

const links = [
  { label: "Home", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Account", link: "/account" },
];

export default function Navbar() {
  return (
    <div className="flex border-separate border-b-2 justify-between px-8 mt-4 pb-4">
      <Logo />
      <div className="flex gap-4">
        {links.map((link) => (
          <NavbarItem key={link.label} link={link.link} label={link.label} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeSwitchBtn />
      </div>
    </div>
  );
}
