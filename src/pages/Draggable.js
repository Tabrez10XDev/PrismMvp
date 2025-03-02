import { useEffect, useRef, useState } from 'react';
import { addPointerInfo, motion, useDragControls } from 'framer-motion';
import clsx from 'clsx';
import pancake from "./assets/pancake.png"
import genderIcon1 from "./assets/genderIcon1.png"
import coin1 from "./assets/coin1.png"
import coin2 from "./assets/coin2.png"
import coin3 from "./assets/coin3.png"
import coin4 from "./assets/coin4.png"
import coin5 from "./assets/coin5.png"
import coin6 from "./assets/coin6.png"


function Draggable(props) {

  const positions = [
    ['80vh','80vw'],
    ['95vw',100],
    ['10vw',200],
    [120,'60vh'],
    ['80vh',200],
    ['70vw','80vh'],
    ['80vh','80vw'],
    ['836','272'],
    ['450','280'],
    ['50vh','80vw'],
    ['40vh','70vw'],
    [100,100],
    ['90vh','90vw'],
    ['50vh','95vw'],


  ]


  
    const [state, setState] = useState(false)

    const images = [coin1, coin2, coin3, coin4, coin5]
  
  
  
    const [isRemoved, setRemoved] = useState(false)
    const controls = useDragControls()
  
    const dragging = positions[props.i]
    const [dragStarted, setDragStarted] = useState(false)
  
  
    function isInside(point) {
      if (point.x >= (window.innerWidth / 2 - 225) &&
        point.x <= (window.innerWidth / 2 + 225) &&
        point.y >= (window.innerHeight / 2 - 200) &&
        point.y <= (window.innerHeight / 2 + 200)) setState(true)
      else setState(false)
    }
  
  
    return (
      <>{
        <motion.div
          drag
          dragControls={controls}
  
          dragConstraints={{
            top: 100,
            left: 100,
            right: 100,
            bottom: 100,
          }}
          dragMomentum={false}
          dragElastic={0}
          dragTransition={{
            power: 0,
          }}
  
          onPointerDown={() => setDragStarted(true)}
          onDragEnter={() => setDragStarted(true)}
  
          onDragStart={() => setDragStarted(true)}
          onHoverStart={() => setDragStarted(true)}
          onDrag={(e, { point }) => {
            isInside(point)
          }}
          onDragEnd={() => {
            setDragStarted(false)
            if (state) {
              // setRemoved(true)
            }
          }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, Math.floor(Math.random() * 501) - 250, 0],
          }}
          transition={{
            ease: "easeInOut",
            repeat: Infinity, duration: 5, repeatType: 'reverse', repeatDelay: 0
          }}
          key={props.i}
          style={{ top: dragging[0], left: dragging[1]}}
          className={`blurred-circle ${state ? "active" : ""}`}          >
          <img
            src={images[props.i%5]}
            alt="Your Image"
            className="full-circle"
          />
        </motion.div>}
      </>
    )
  }

  export default Draggable