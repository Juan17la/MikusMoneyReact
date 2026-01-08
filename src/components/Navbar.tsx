import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
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
      className={`rounded-t-xs shadow-outer border border-accent-alpha border-b-0 px-2 sm:px-4 py-1 transition-colors duration-200 text-contrast font-semibold text-center text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center ${
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
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems: navItemProps[] = [
    { itemName: "Account", itemLink: "/account" },
    { itemName: "Transactions", itemLink: "/transactions" },
    { itemName: "Savings Pig", itemLink: "/savings-pig" },
    { itemName: "Loans", itemLink: "/loans" },
    { itemName: "Profile", itemLink: "/profile" },
  ];

  const currentPage = navItems.find((item) => item.itemLink === location.pathname);
  const currentPageName = currentPage?.itemName || "Menu";

  const handleNavigation = (link: string) => {
    navigate(link);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="w-full max-w-5xl px-6">
      {/* Desktop Navigation */}
      <div className="hidden md:grid md:grid-cols-6 md:gap-2">
        {navItems.map((item) => (
          <NavItem
            key={item.itemName}
            itemName={item.itemName}
            itemLink={item.itemLink}
            active={item.itemLink === location.pathname}
          />
        ))}
        <LogoutButton className="rounded-t-xs border-b-0" />
      </div>

      {/* Mobile/Tablet Dropdown Navigation */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full rounded-t-xs shadow-outer border border-accent-alpha border-b-0 px-4 py-2 bg-linear-to-b from-accent-weak/40 to-accent/40 hover:from-white-2 hover:to-black-8 text-contrast font-semibold text-center transition-colors duration-200 flex items-center justify-between"
        >
          <span>{currentPageName}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface-primary border border-accent-alpha shadow-lg rounded-b-md overflow-hidden z-50">
            {navItems
              .filter((item) => item.itemLink !== location.pathname)
              .map((item) => (
                <button
                  key={item.itemName}
                  onClick={() => handleNavigation(item.itemLink)}
                  className="w-full px-4 py-3 text-left hover:bg-accent/20 transition-colors duration-200 text-contrast font-medium border-b border-accent-alpha/30 last:border-b-0"
                >
                  {item.itemName}
                </button>
              ))}
            <div className="border-t border-accent-alpha">
              <LogoutButton className="w-full px-4 py-3 text-left hover:bg-accent/20 transition-colors duration-200 text-contrast font-medium rounded-t-0" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
