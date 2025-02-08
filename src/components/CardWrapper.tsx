import React, { CSSProperties, ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { cn } from "@/lib/utils"
import { Social } from './Social';
import { Header } from './Header';

export interface CardWrapperProps {
    className?: string
    style?: CSSProperties
    showSocial?: boolean
    headerTitle: string
    headerLabel: string
    children: ReactNode
    footer?: ReactNode
}

const CardWrapper = ({className, headerTitle, headerLabel, footer, style, children, showSocial}:CardWrapperProps) => {
    const cardClassName = cn(className, "w-[400px] shadow-md")
    return (
        <Card className={cardClassName} style={style}>
            <CardHeader>
                <Header title={headerTitle}  label={headerLabel} />
            </CardHeader>
            <CardContent>
                { children }
            </CardContent>
            { showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                {footer}
            </CardFooter>
        </Card>
    );
}

export default CardWrapper;

