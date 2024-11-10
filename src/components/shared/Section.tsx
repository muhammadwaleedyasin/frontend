import React, { ReactNode } from "react";

const Section = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div className={`lg:max-w-screen-2xl mx-auto px-5 ${className || ""}`}>
            {children}
        </div>
    );
};

export default Section;