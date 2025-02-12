import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState("");

  const handleToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? "" : label);
  };

  return (
    <ul className="ml-4 mt-2 space-y-1 border-gray-600 pl-4">
      {item.map((subItem: any, index: number) => (
        <li key={index}>
          <Link
            href={subItem.route}
            onClick={() => handleToggle(subItem.label)}
            className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
          >
            {subItem.icon}
            {subItem.label}

            {subItem.children && (
              <svg
                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-transform duration-300 ${
                  openDropdown === subItem.label ? "rotate-180" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                />
              </svg>
            )}
          </Link>

          {subItem.children && (
            <div
              className={`translate transform overflow-hidden ${
                openDropdown !== subItem.label && "hidden"
              }`}
            >
              <SidebarDropdown item={subItem.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;