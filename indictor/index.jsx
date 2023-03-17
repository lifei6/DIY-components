import React, { memo, useEffect, useRef,useState } from 'react'
import { IndictorWrapper } from './style'

const Indictor = memo((props) => {
  const [translateDistant,setTranslateDistant] =useState(0)
  const {children,curIndex} = props
  const contianerRef = useRef()
  useEffect(()=>{
    // 0.获取容器
    const contianer = contianerRef.current
    // 1.获取当前应居中的元素
    const El = contianer.children[curIndex]
    // 2.计算元素相关属性(偏移量相对于最近的开启定位的祖先元素)
    const offsetEl = El.offsetLeft
    // 元素的宽度（可见大小）
    const widthEl = El.clientWidth
    // 3.计算容器（被隐藏时的）大小（clientWidth为被父元素隐藏后的可见大小）和可滚动大小
    const widthContianer = contianer.clientWidth
    const scrollConstianer =contianer.scrollWidth
    // 4.计算容器应左右移动的距离(负代表不需要移动的元素)
    let distant = offsetEl+widthEl*0.5-widthContianer*0.5
    if(distant<0)distant=0//左边不需要移动情况
    if(distant>scrollConstianer-widthContianer)distant=scrollConstianer-widthContianer//右边不需要移动情况

    // console.log(offsetEl,widthEl,widthContianer,contianer.scrollWidth,distant)
    // 5.动态改变容器移动样式
    setTranslateDistant(distant)
  },[curIndex])
  return (
    <IndictorWrapper translateDistant={-translateDistant}>
        <div className='contianer' ref={contianerRef}>
          {children}
        </div>
    </IndictorWrapper>
  )
})

export default Indictor