import React, { useEffect, useState } from "react";

interface Props {
    className?: string;
    swiperRef?: any;
    children: React.ReactNode;

    triggerSwipe?(value: string): void;
}

const Swiper = ({triggerSwipe, className, swiperRef, children}:  Props) => {
    const [ startValue, setStartValue ] = useState<number>();
    const [ endValue, setEndValue ] = useState<number>();

    useEffect(() => {
        if(startValue && endValue) {
            if (triggerSwipe && startValue < endValue) {
                 triggerSwipe('right');
            } else if (triggerSwipe){
                startValue > endValue && triggerSwipe('left');
            }
        }
    }, [endValue])

    return (
        <div
            className={className}
            ref={swiperRef}
            onTouchStart={(e: any) => setStartValue(e.changedTouches[0].screenX)}
            onTouchEnd={(e: any) => setEndValue(e.changedTouches[0].screenX)}>
            {children}
        </div>
    )
}

export default Swiper;