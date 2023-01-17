import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: any,
    elementId: string
}

const CustomPortal: FC<PortalProps> = ({ children, elementId }) => {
    const mount = document.getElementById(elementId)
    // создаём свой div
    const el = document.createElement('div')

    useEffect(() => {
        // добавляем свой див к искомому элементу
        if (mount) mount.appendChild(el)
        return () => {
            // удаляем элемент от искомого при завершении компоненты
            if (mount) mount.removeChild(el)
        }
    }, [ el, mount ])
   
    // отменяем отрисовку при отсутствии искомого элемента
    if (!mount) return null
    // собственно, пририсовываем React-элемент в div к искомому HTML
    return createPortal(children, el)
};


export default dynamic(() => Promise.resolve(CustomPortal), {
    ssr: false
  });
