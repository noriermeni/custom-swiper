import React from 'react';
import styles from "./arrowButton.module.scss";

import classNames from "classnames";

import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";

interface Props {
    position?: 'left' | 'right';
    onClick(): void;
}

export default function ArrowButton({position = 'left', onClick}: Props) {
    return (
        <div onClick={onClick}
             className={classNames({
                 [styles.iconWrapper]: true,
                 [styles.rightIconWrapper]: position === 'right'
             })}>
            <ArrowIcon />
        </div>
    )
}