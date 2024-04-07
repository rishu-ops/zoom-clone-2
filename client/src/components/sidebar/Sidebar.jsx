import React from 'react';

const Sidebar = () => {
  return (
    
      <div className='w-[100%] bg-[#f7f7fa] lg:h-screen md:h-screen h-[210px] overflow-y-scroll p-3 '>
       
        <h1 className='p-2 font-semibold'> PERSONAL </h1>
        <div className="pl-4 flex flex-col gap-2 font-semibold pb-4 ">
          <p className='hover:bg-blue-600 hover:text-white '> Home </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Profile </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Meetings </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Webinars </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Personal Contacts </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Personal Devices </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Whiteboard </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Recordings </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Scheduler </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Settings </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Reports </p>
        </div>
        <h1 className='p-2 font-semibold'> ADMIN </h1>
        <div className="pl-4 flex flex-col gap-2 font-semibold pb-4">
          <p  className='hover:bg-blue-600 hover:text-white '> Plans and Billing </p>
          <p  className='hover:bg-blue-600 hover:text-white '> User Management </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Device Management </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Room Management </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Workspaces Management</p>
          <p  className='hover:bg-blue-600 hover:text-white '> Account Management </p>
          <p  className='hover:bg-blue-600 hover:text-white '> Advanced </p>
        </div>
      </div>
      
    
  );
};

export default Sidebar;
