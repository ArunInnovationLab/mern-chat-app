// import React from "react";


// const Conversations = ({ handleUserClick }: { handleUserClick: any }) => {

//   return (
//     <div className="lg:w-1/4 w-full bg-gray-100 border-b lg:border-r border-gray-300 p-4 overflow-y-auto lg:overflow-scroll">
//       <h2 className="text-xl font-semibold mb-4">Online Users</h2>
//       <ul className="space-y-2">
//         {onlineUsers.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => handleUserClick(user.id)}
//             className={`flex items-center p-2 rounded-md cursor-pointer ${
//               user.status === "online" ? "bg-green-100" : "bg-gray-200"
//             } hover:bg-gray-300`}
//           >
//             <div className="w-10 h-10 bg-gray-400 rounded-full mr-3"></div>
//             <div>
//               <p className="font-medium">{user.name}</p>
//               <p
//                 className={`text-sm ${
//                   user.status === "online" ? "text-green-500" : "text-gray-500"
//                 }`}
//               >
//                 {user.status}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Conversations;
