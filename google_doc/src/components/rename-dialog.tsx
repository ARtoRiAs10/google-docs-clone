import { PropsWithChildren, useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RenameDialogProps {
    documentId: Id<'documents'>;
    initialTitle: string;
}


export const RenameDialog = ({ documentId, initialTitle, children}: PropsWithChildren<RenameDialogProps>) => {
    const update = useMutation(api.documents.updateById)
    const [isUpdating, setIsUpdating] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        update({id: documentId, title: title.trim() || 'untitled Document' })
            .then(()=> setOpen(false))
            .catch((error) => {
                const errorMessage = error instanceof ConvexError ? error.data : "Something went wrong!";
                toast.error(errorMessage);
            })
            .finally(() => setIsUpdating(false));
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent onClick={() => {}}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename document</DialogTitle>
                        <DialogDescription> Enter a new name for this document.</DialogDescription>
                    </DialogHeader>

                    <div className="my-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Untitled Document"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild >
                            <Button type="button" variant="outline" disabled={isUpdating} onClick={(e) => e.stopPropagation()}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={isUpdating || !title.trim()} onClick={(e) => e.stopPropagation()}> 
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}