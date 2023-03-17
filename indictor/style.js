import styled from "styled-components";


export const  IndictorWrapper = styled.div`
    position:relative;
    overflow:hidden;
    /* 指示器宽度由外接传入 */
    /* 还是外接直接设置好 */
    /* border:1px solid orange; */
    .contianer {
        display:flex;
        /* !!!!避免浮动默认压缩子元素 */
        >*{
            flex-shrink:0;
        }
        /* 动态的移动容器 */
        transform:translateX(${props=>props.translateDistant}px);
        /* 动画 */
        transition:transform 0.5s ease;
    }

` 