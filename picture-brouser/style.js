import styled from "styled-components";

export const BrouserWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #333;

  display: flex;
  flex-direction: column;

  .top {
    height: 86px;
    position: relative;

    .close-btn {
      position: absolute;
      right: 36px;
      top: 20px;
    }
  }

  .list {
    flex: 1;
    display: flex;
    .control {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      color: #fff;

      .btn {
        position: absolute;
        z-index: 999;
      }

      .left {
        left: 28px;
      }

      .right {
        right: 28px;
      }
    }

    .big-img {
        overflow:hidden;
      width: 50%;
      height: 100%;
      position: relative;
      margin:0 auto;
      img {
        position: absolute;
        z-index: 99;
        margin: 0 auto;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: 100%;
      }

      .pic-enter {
        transform: translateX(${(props) => (props.isNext ? "-100%" : "100%")});
        opacity: 0;
      }

      .pic-enter-active {
        transform: translateX(0);
        opacity: 1;
        transition: all 200ms ease;
      }

      .pic-exit {
        /* transform: translateX(0); */
        opacity: 1;
      }

      .pic-exit-active {
        /* transform: translateX(${(props) => (props.isNext ? "100%" : "-100%")}); */
        opacity: 0;
        transition: all 200ms ease;
      }
    }
  }

  .indicator {
    color: #fff;
    height: 100px;
    width: 100%;
    margin: 10px auto 20px;
    display: flex;
    justify-content: center;
    position: relative;
    .wrapper {
      position: absolute;
      bottom: 0;
      width: 50%;
      height: ${(props) => (props.triangleIsClick ? "0px" : "100%")};
      transition: height 2s ease;
      .desc {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .img-list {
        /* width: 100%; */
        overflow: hidden;
        margin: 0 -4px;
        .img-item {
          position: relative;
          box-sizing: border-box;
          width: 14.2857%;
          height: 68px;
          padding: 0 4px;
          img {
            width: 100%;
            /* height:100%; */
            object-fit: cover;
          }

          .img-cover {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
          }

          &.active {
            .img-cover {
              opacity: 0;
            }
          }
        }
      }
    }
  }
`;
