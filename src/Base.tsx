import { MouseEvent, ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    index: number;
    onClick: (e: MouseEvent) => void
}

function Base({ children, className, index, onClick }: Props) {
    return (
        <>
        <section className={(className == undefined ? "" : className) + " w-[2.2rem] h-[2.2rem] text-[2rem] rounded-lg flex justify-center items-center col-span-1"}
            data-index={index}
            onClick={onClick}
        >
            {children}
        </section>
        </>
    );
}

export default Base;