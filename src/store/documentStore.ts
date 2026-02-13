import { create } from "zustand";
import { DocumentTypes } from "../types/DocumentType";

type State = { documents: DocumentTypes[] };

type Actions = { setDocuments: (documents: DocumentTypes[]) => void };

const documentStore = create<State & Actions>((set) => ({
    documents: [],
    setDocuments: (documents: DocumentTypes[]) => set({ documents }),
}));

export default documentStore;
