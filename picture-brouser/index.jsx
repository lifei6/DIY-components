import IconArrowLeft from "@/asserts/svg/icon-arrow-left";
import IconArrowRight from "@/asserts/svg/icon-arrow-right";
import IconTriangleTop from "@/asserts/svg/icon-tirangle-top";
import IconTop from "@/asserts/svg/icon-top";
import IconTriangleBottom from "@/asserts/svg/icon-triangle-bottom";
import React, { memo, useEffect, useState } from "react";
import Indictor from "../indictor";
import { BrouserWrapper } from "./style";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import classNames from "classnames";

const PictureBrouser = memo((props) => {
  const [triangleIsClick, setTriangleIsClick] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [curIndex, setCurIndex] = useState(0);
  const { pictureUrls, setShowBrouser } = props;

  // 事件监听操作DOM
  useEffect(() => {
    // 1.1渲染完成取消滚动条
    document.body.style.overflow = "hidden";
    return () => {
      // 1.2.组件销毁恢复滚动条
      document.body.style.overflow = "auto";
    };
  }, []);

  // 事件处理逻辑
  // 2.左右按钮点击事件
  function btnClickHandle(isNext) {
    let newIndex = isNext ? curIndex + 1 : curIndex - 1;
    // 实现循环
    if (newIndex < 0) newIndex = pictureUrls.length - 1; //左边极限
    if (newIndex > pictureUrls.length - 1) newIndex = 0; //右边极限
    // 更新当前索引
    setCurIndex(newIndex);
    // 判断动画走向
    setIsNext(isNext);
  }

  // 3.指示器中元素点击事件处理
  function elClickHandle(index) {
    // 判断动画走向
    let right = curIndex - index < 0 ? true : false;
    setIsNext(right);
    // 设置新索引
    setCurIndex(index);
  }

  // 4.指示器显示与隐藏按钮
  function triangleClickHandle() {
    let newValue = !triangleIsClick;
    setTriangleIsClick(newValue);
  }

  // 结构
  let listEl = (
    <div className="list">
      <div className="control">
        <div className="left btn" onClick={(e) => btnClickHandle(false)}>
          <IconArrowLeft width="80" height="80" />
        </div>
        <div className="right btn" onClick={(e) => btnClickHandle(true)}>
          <IconArrowRight width="80" height="80" />
        </div>

        <div className="big-img">
          <SwitchTransition mode="in-out">
            <CSSTransition
              key={pictureUrls[curIndex]}
              classNames="pic"
              timeout={200}
            >
              <img src={pictureUrls[curIndex]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
  return (
    <BrouserWrapper isNext={isNext} triangleIsClick={triangleIsClick}>
      <div className="top">
        <div className="close-btn" onClick={(e) => setShowBrouser(false)}>
          <IconTop />
        </div>
      </div>

      {pictureUrls && listEl}

      <div className="indicator">
        <div className="wrapper">
          <div className="desc">
            <div className="total-count">
              <span>
                {curIndex + 1}/{pictureUrls.length}:
              </span>
              <span>Veluvana Bali - Owl Bamboo House图片{curIndex + 1}</span>
            </div>
            <div className="toggle" onClick={triangleClickHandle}>
              <span>{!triangleIsClick ? "隐藏" : "显示"}照片列表</span>
              {!triangleIsClick ? <IconTriangleBottom /> : <IconTriangleTop />}
            </div>
          </div>

          <div className="img-list">
            <Indictor curIndex={curIndex}>
              {pictureUrls?.map((item, index) => {
                return (
                  <div
                    className={classNames("img-item", {
                      active: index === curIndex,
                    })}
                    key={item}
                    onClick={(e) => elClickHandle(index)}
                  >
                    <img src={item} alt="" />
                    <div className="img-cover"></div>
                  </div>
                );
              })}
            </Indictor>
          </div>
        </div>
      </div>
    </BrouserWrapper>
  );
});

export default PictureBrouser;
