"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"

interface modalProps {
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void
    children?: React.ReactNode
}

const Modal = ({title, description, isOpen, onClose, children}: modalProps) => {

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal