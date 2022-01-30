import { useCallback, useEffect, useState, RefObject } from "react";

export const useElementResizeHook = (wrapperElementRef: RefObject<HTMLDivElement>) => {

    const [ elementWidth, setElementWidth ] = useState<number>(0);

    const updateContainersWidth = useCallback(() => {
        if (wrapperElementRef && wrapperElementRef.current) {
            setElementWidth(wrapperElementRef.current.offsetWidth);
        }
    }, [wrapperElementRef]);

    useEffect(() => {
        if (wrapperElementRef && wrapperElementRef.current) {
            setElementWidth(wrapperElementRef.current.offsetWidth);
        }
    },[])

    useEffect(() => {
        window.addEventListener('resize', updateContainersWidth);
        return () => {
            window.removeEventListener('resize', updateContainersWidth);
        };
    }, [wrapperElementRef?.current?.offsetWidth, elementWidth, updateContainersWidth])

    return { elementWidth }
}