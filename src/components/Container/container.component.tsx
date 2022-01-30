import React from 'react';
import styles from './container.module.scss';

interface Props {
    children: React.ReactNode;
}

export function Container({children}: Props) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}