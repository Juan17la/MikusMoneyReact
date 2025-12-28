import { useLocation } from "react-router";
import LogoutButton from "./LogoutButton";

type navItemProps = {
  itemName: string;
  itemLink: string;
  active?: boolean;
};

function NavItem({ itemLink, itemName, active }: navItemProps) {
  return (
    <a
      href={itemLink}
      className={`rounded-t-xs shadow-outer border border-accent-alpha border-b-0 px-4 py-1 transition-colors duration-200 text-contrast font-semibold text-center ${
        active
          ? "bg-linear-to-b from-accent-weak/40 to-accent/40 hover:from-white-2 hover:to-black-8"
          : "bg-linear-to-b from-white-2 to-black-8 hover:from-accent-weak/40 hover:to-accent/40"
      }`}
    >
      {itemName}
    </a>
  );
}

export function Navbar() {
  const location = useLocation();

  const navItems: navItemProps[] = [
    { itemName: "Account", itemLink: "/account" },
    { itemName: "Savings Pig", itemLink: "/savings-pig" },
    { itemName: "Profile", itemLink: "/profile" },
  ];

  return (
    <nav className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-2 px-6">
      {navItems.map((item) => (
        <NavItem
          key={item.itemName}
          itemName={item.itemName}
          itemLink={item.itemLink}
          active={item.itemLink === location.pathname}
        />
      ))}
      <LogoutButton />
    </nav>
  );
}
