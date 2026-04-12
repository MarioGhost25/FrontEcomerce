import { useState } from "react";
import { DropdownItem } from "../../../../components/ui/dropdown/DropdownItem";
import { Dropdown } from "../../../../components/ui/dropdown/Dropdown";
import { Link } from "react-router";
import { ChevronDown, CircleHelp, ImageIcon, ImagePlusIcon, LogOut, Settings, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../../auth";
export default function UserDropdown({name, email, image}) {

  const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    function closeDropdown() {
        setIsOpen(false);
    }
    return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex  text-gray-700 dropdown-toggle dark:text-gray-400">
        <span className="mr-3 overflow-hidden place-content-center rounded-full h-8 w-8">
        {image ? <img src={image} alt={name}/> : <ImagePlusIcon/>}
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{name}</span>
        <ChevronDown className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} width={18} height={20} strokeWidth={1.5} />
      </button>

      <Dropdown isOpen={isOpen} onClose={closeDropdown} className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem onItemClick={closeDropdown} tag="a" to="/profile" className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
              <User className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" width={24} height={24} />
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem onItemClick={closeDropdown} tag="a" to="/profile" className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
              <Settings className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" width={24} height={24} />
              Account settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem onItemClick={closeDropdown} tag="a" to="/profile" className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
              <CircleHelp className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" width={24} height={24} />
              Support
            </DropdownItem>
          </li>
        </ul>
        <Link to="/signin" className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
          <LogOut className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300" width={24} height={24} />
          {dispatch && (
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Sign out
            </button>
          )}
        </Link>
      </Dropdown>
    </div>);
}
