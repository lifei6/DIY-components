import IconArrowLeft from "@/asserts/svg/icon-arrow-left";
import IconArrowRight from "@/asserts/svg/icon-arrow-right";
import React, { memo, useEffect, useRef, useState } from "react";
import { ScrollViewWrapper } from "./style";

const ScrollView = memo((props) => {
  const { children,imgAddClass } = props;
  const [rightShow, setRightShow] = useState(false);
  const [leftShow, setLeftShow] = useState(false);
  // console.log("scroll渲染--children:",children);
  const [curIndex,setCurIndex] = useState(0)
  const [position, setPosition] = useState(0);
  // const [newWidth,setNewWidth] = useState(0)
  const scrollObj = useRef();
  const scroll = useRef();
  useEffect(() => {
    // 1.实际宽度（可滚动的宽度）
    const scrollWidth = scroll.current.scrollWidth;
    // 2.显示的宽度（隐藏部分后的可见宽度）
    const clientWidth = scroll.current.clientWidth;
    // 3.计算出隐藏宽度
    const hiddenWidth = scrollWidth - clientWidth;
    scrollObj.current  = hiddenWidth;
    if (hiddenWidth > 0) {
      setRightShow(true);
    }
    // console.log(scrollWidth,clientWidth,hiddenWidth)
  }, [children]);
  function controlScrollHandle(flag) {
    let newIndex = 0
    if(flag==='right'){
        newIndex = curIndex+1
    }else{
        newIndex=curIndex-1
    }
    const offset = scroll.current.children[newIndex].offsetLeft;
    setPosition(offset)
    setCurIndex(newIndex)
    // 判断是否显示左侧按钮
    setLeftShow(offset>0);
    // 判断是否显示右侧按钮
    setRightShow(scrollObj.current>=offset);
  }
//   console.log(position)
  return (
    <ScrollViewWrapper left={position} imgAddClass={imgAddClass}>
      {leftShow && (
        <div className='control left' onClick={e=>controlScrollHandle('left')}>
            <IconArrowLeft/>
        </div>
      )}
      {rightShow && (
        <div className='control right' onClick={e=>controlScrollHandle('right')}>
            <IconArrowRight/>
        </div>
      )}
      <div className='scroll'>
        <div className='scroll-content' ref={scroll}>
          {children}
        </div>
      </div>
    </ScrollViewWrapper>
  );
});

export default ScrollView;
