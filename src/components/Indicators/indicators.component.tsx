import React from "react";
import styles from "./indicators.module.scss";

import _ from 'lodash';
import classNames from "classnames";

import { SlidersType } from "../../types/Sliders/sliders.type";

interface Props {
    sliders: Array<SlidersType>;
    activeSlider: number;
    indicatorClick(idx: number): void;
}

export default function Indicators({indicatorClick, activeSlider, sliders}: Props) {
    return (
        <div className={styles.indicators}>
            <div className={styles.indicatorsWrapper}>
                {sliders && sliders.map((item: SlidersType, idx: number) => (
                    <div key={item.id} className={styles.indicatorWrapper}>
                        <div onClick={() => indicatorClick(idx)}
                             className={classNames({
                                [styles.indicator]: true,
                                [styles.activeIndicator]: activeSlider === idx })} >
                            <img src={item.thumbnailUrl} alt="" />
                        </div>
                        <span>{_.head(item.title.split(" "))}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}