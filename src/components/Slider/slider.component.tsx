import React, { useState, useRef, useEffect } from "react";
import styles from './slider.module.scss';

import { useElementResizeHook } from "../../hooks/useElementResize/useElementResize.hook";

import Indicators from "../Indicators/indicators.component";
import ArrowButton from "../ArrowButton/arrowButton.component";
import Swiper from "../Swiper/swiper.component";

import { SlidersType } from "../../types/Sliders/sliders.type";

interface Props {
    data: Array<SlidersType>;
}

const Slider = ({data}: Props) => {
    const wrapperElementRef = useRef<HTMLDivElement>(null);
    const scrollableElement = useRef<HTMLDivElement>(null);
    const { elementWidth } = useElementResizeHook(wrapperElementRef);
    const [ activeSlider, setActiveSlider ] = useState<number>(0);

    useEffect(() => {
        if(scrollableElement?.current) {
            scrollableElement.current.scrollLeft = 0;
            setActiveSlider(0);
        }
    }, [elementWidth])

    const customStyle = { width: elementWidth }

    const _indicatorClickedEvent = (idx: number) => {
        setActiveSlider(idx);
    }

    const _triggerSwipe = (swipe: string) => {
        let changedValue = swipe === 'left' ? activeSlider + 1 : activeSlider - 1
        changedValue < data.length && changedValue >= 0 && setActiveSlider(changedValue);
        changedValue === data.length && setActiveSlider(0);
        changedValue <= 0 && setActiveSlider(data.length - 1);
    }

    const sliderList = () => {
        return (
            <div className={styles.sliderWrapper}
                 ref={wrapperElementRef}>
                <Swiper className={styles.sliderScrollableWrapper}
                        triggerSwipe={_triggerSwipe}
                        swiperRef={scrollableElement} >
                    <div className={styles.slider} style={{ transform: `translateX(-${elementWidth * activeSlider}px)` }}>
                        {data && data.map((item: SlidersType) => <div key={item.id} className={styles.slideElement} style={customStyle}>
                            <img src={item.url} alt={item.title} />
                        </div>)}
                    </div>
                </Swiper>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Indicators
                indicatorClick={_indicatorClickedEvent}
                activeSlider={activeSlider}
                sliders={data} />
            <div className={styles.sliderContainer}>
                <ArrowButton onClick={() => _triggerSwipe('right')} />
                {sliderList()}
                <ArrowButton position={'right'} onClick={() => _triggerSwipe('left')} />
            </div>
        </div>
    );
}

export default Slider;