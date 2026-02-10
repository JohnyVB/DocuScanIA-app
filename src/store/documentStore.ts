import { create } from "zustand";
import { DocumentProps } from "../types/DocumentType";

type State = { documents: DocumentProps[] };

type Actions = { setDocuments: (documents: DocumentProps[]) => void };

const documentStore = create<State & Actions>((set) => ({
    documents: [],
    setDocuments: (documents: DocumentProps[]) => set({ documents }),
}));

export default documentStore;
