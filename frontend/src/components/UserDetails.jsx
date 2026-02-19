import React from "react";

const UserDetails = ({ user, handleLogOut, handleProfile }) => (
  <ul className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-5">
    <div className="flex items-center gap-1 sm:gap-2 md:gap-2.5 lg:gap-3">
      {user && user.profile_picture && (
          <img
            src={user.profile_picture}
            alt={user.name}
            className="w-9 h-9 rounded-full border-2 border-white"
            onClick={handleProfile}
          />
      )}
      {user && user.firstName && user.lastName && (
        <p className="cursor-pointer" onClick={handleProfile}>
          {user.firstName+" "+user.lastName}
        </p>
      )}
    </div>
    <li
      onClick={handleLogOut}
      className="border p-1 rounded cursor-pointer hover:shadow-glow ml-4"
    >
      Log Out
    </li>
  </ul>
);

export default UserDetails;
