import { currentUser } from '@/lib/getSession';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { UserButton } from '../UserButton';

export interface NavbarProps {

}
const Navbar = async () => {
    
    return (
        <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <FaSearch size={14}/>
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] md:w-[400px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <UserButton />
      </div>
    </div>
    );
}

export default Navbar;