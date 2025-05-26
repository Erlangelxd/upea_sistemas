
import React from 'react';
import { motion } from 'framer-motion';
import UserProfileSidebar from '@/components/Feed/UserProfileSidebar'; 
import PostsSection from '@/components/Feed/PostsSection'; // Import the new component

function Feed({ isAuthenticated, user, onUpdateUser }) { 
  

  
  // Available subjects and semesters for filters/upload (can be fetched or static)
  const subjects = [];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  


  return (
    <>
      {/* Conditionally render sidebar only if authenticated */}
      {isAuthenticated && <UserProfileSidebar user={user} onUpdateUser={onUpdateUser} />}
      
      {/* Main content area - spans remaining columns or full width */}
      {/* Apply 'content' class for base styling, layout.css handles column span */}
      {/* The parent .main-content gets 'main-content-unauthenticated' class for centering */}
      <div className={`content ${!isAuthenticated ? 'content-centered-feed' : ''}`}> 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PostsSection 
            isAuthenticated={isAuthenticated} 
            user={user} 
            subjects={subjects} 
            semesters={semesters} 
          />
        </motion.div>
      </div>
    </>
  );
}

export default Feed;
