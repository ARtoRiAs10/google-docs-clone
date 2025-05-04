import { Loader2Icon } from "lucide-react";
import {cn} from '@/lib/utils';

interface FullScreenLoaderProps {
    label?: string;
    className?: string;
}

export const FullScreenLoader = ({ label, className }: FullScreenLoaderProps) => {
    return (
        <div className={cn('flex min-h-screen flex-col items-center justify-center gap-2', className)}>

            <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
            {!!label && <p className="text-sm text-muted-foreground">{label} </p>}
        </div>
    )
}