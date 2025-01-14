"use client";

import Modal from "../ui/modal"; 
import { useStoreModal } from "@/hooks/useStoreModal";

export const StoreModal = () => {
    const storeModal = useStoreModal()
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}> 
      Store Form
    </Modal>
  );
};
