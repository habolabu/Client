import React, { useState } from 'react';
import LikeIcon from '../../../../assets/reaction/likeicon.png';
import Angry from '../../../../assets/reaction/angry.svg';
import Laughing from '../../../../assets/reaction/laughing.svg';
import Like from '../../../../assets/reaction/like.svg';
import Sad from '../../../../assets/reaction/sad.svg';
import Soaked from '../../../../assets/reaction/soaked.svg';
import Love from '../../../../assets/reaction/love.svg';
import { motion } from 'framer-motion';
import emotionServices from 'src/api/activityServices/emotionServices';
import { useEffect } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const FBReactions = () => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState({ img: LikeIcon, name: 'React' });
  const [emotionList, setEmotionList] = useState([]);

  const getEmotionAll = async () => {
    try {
      const params = {
        page: 1,
      };
      const res = await emotionServices.getEmotionAll(params);
      console.log(res.data.response.body);
      if (res && res.data) {
        setEmotionList(res.data.response.body);
      }
    } catch (error) {
      console.log('Lấy danh sách cảm xúc thất bại: ', error);
    }
  };

  // get data page
  useEffect(() => {
    getEmotionAll();
  }, []);

  const handleReactionClick = ({ img, name }) => {
    setSelectedReaction({ img, name });
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
          alt="Like"
          width="40"
          onClick={() => handleReactionClick({ img: Like, name: 'Like' })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Love}
          alt="Love"
          width="40"
          onClick={() => handleReactionClick({ img: Love, name: 'Love' })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Angry}
          alt="Angry"
          width="40"
          onClick={() => handleReactionClick({ img: Angry, name: 'Angry' })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Sad}
          alt="Sad"
          width="40"
          onClick={() => handleReactionClick({ img: Sad, name: 'Sad' })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Soaked}
          alt="Soaked"
          width="40"
          onClick={() => handleReactionClick({ img: Soaked, name: 'Soaked' })}
        />
        <motion.img
          whileHover={{
            scale: 1.5,
          }}
          src={Laughing}
          alt="Laughing"
          width="40"
          onClick={() => handleReactionClick({ img: Laughing, name: 'Laughing' })}
        />
      </motion.div>
      <div className="d-flex align-items-center">
        <div
          className="likeBtn"
          onClick={() => {
            console.log(selectedReaction.name);
            if (selectedReaction.name === 'React') {
              setBtnClicked(true);
            } else {
              handleReactionClick({ img: LikeIcon, name: 'React' });
            }
          }}
        >
          <motion.img src={selectedReaction.img} className="reactionsAction" />
          <motion.span>{selectedReaction.name}</motion.span>
        </div>
        <div className="comment-action__like me-4">
          <ChatBubbleOutlineIcon />
          Bình luận
        </div>
      </div>
    </motion.div>
  );
};

export default FBReactions;
