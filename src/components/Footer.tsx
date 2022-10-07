import { Navbar, NavbarGroup } from "@blueprintjs/core";

export default function Footer() {
  return (
    <div className="flex flex-row justify-end items-center gap-2 px-5 bg-slate-50">
      <a
        className="px-2 text-gray-500 bg-transparent hover:text-gray-700 hover:bg-yellow-500"
        href="https://raw.githubusercontent.com/antoniovizuete/clickhouser/main/DISCLAIMER.md"
        target="_blank"
        rel="noreferrer"
      >
        Disclaimer
      </a>
      <a
        href="https://github.com/antoniovizuete/clickhouser"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  );
}
