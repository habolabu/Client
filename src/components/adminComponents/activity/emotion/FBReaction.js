/* eslint-disable react/prop-types */
// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

import React, { useState } from 'react';
import LikeIcon from '../../../../assets/reaction/likeicon.png';
import Angry from '../../../../assets/reaction/angry.svg';
import Haha from '../../../../assets/reaction/laughing.svg';
import Like from '../../../../assets/reaction/like.svg';
import Sad from '../../../../assets/reaction/sad.svg';
import Wow from '../../../../assets/reaction/soaked.svg';
import Love from '../../../../assets/reaction/love.svg';
import Thuongthuong from '../../../../assets/reaction/thuongthuong.svg';
import { motion } from 'framer-motion';
import postEmotionServices from 'src/api/activityServices/postEmotionServices';

const FBReactions = ({ postId, reactChanged }) => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState({ img: LikeIcon, name: 'React', id: 0 });

  const reactPost = async (emotionId) => {
    try {
      const params = {
        postId: postId,
        emotionId: emotionId,
      };
      const res = await postEmotionServices.addPostEmotion(params);
      if (res && res.data) {
        reactChanged();
      }
    } catch (error) {
      console.log('Lấy danh sách cảm xúc thất bại: ', error);
    }
  };

  const handleReactionClick = ({ img, name, id }) => {
    if (id !== 0) {
      reactPost(id);
    }

    setSelectedReaction({ img, name, id });
    setBtnClicked(false);
  };

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'beforeChildren',
      },
      scale: 0.6,
    },
  };

  return (
    <motion.div className="reactions-wrapper" onClick={() => btnClicked === true && setBtnClicked(false)}>
      <motion.div className="reactionsHolder" variants={list} animate={btnClicked ? 'visible' : 'hidden'}>
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Like}
          alt="Thích"
          width="40"
          onClick={() => handleReactionClick({ img: Like, name: 'Thích', id: 1 })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Love}
          alt="Tim"
          width="40"
          onClick={() => handleReactionClick({ img: Love, name: 'Tim', id: 2 })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Thuongthuong}
          alt="Thương"
          width="40"
          onClick={() => handleReactionClick({ img: Thuongthuong, name: 'Thương', id: 3 })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Angry}
          alt="Giận dữ"
          width="40"
          onClick={() => handleReactionClick({ img: Angry, name: 'Giận dữ', id: 7 })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Sad}
          alt="Buồn"
          width="40"
          onClick={() => handleReactionClick({ img: Sad, name: 'Buồn', id: 6 })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Wow}
          alt="Wow"
          width="40"
          onClick={() => handleReactionClick({ img: Wow, name: 'Wow', id: 5 })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Haha}
          alt="Haha"
          width="40"
          onClick={() => handleReactionClick({ img: Haha, name: 'Haha', id: 4 })}
        />
      </motion.div>
      <div
        className="likeBtn"
        onClick={() => {
          if (selectedReaction.name === 'React') {
            setBtnClicked(true);
          } else {
            handleReactionClick({ img: LikeIcon, name: 'React', id: 0 });
          }
        }}
      >
        <motion.img src={selectedReaction.img} className="reactionsAction" />
        <motion.span>{selectedReaction.name}</motion.span>
      </div>
    </motion.div>
  );
};

export default FBReactions;
