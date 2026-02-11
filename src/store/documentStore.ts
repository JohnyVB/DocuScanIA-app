import { create } from "zustand";
import { DocumenTypes } from "../types/DocumentType";

type State = { documents: DocumenTypes[] };

type Actions = { setDocuments: (documents: DocumenTypes[]) => void };

const documentStore = create<State & Actions>((set) => ({
    documents: [],
    setDocuments: (documents: DocumenTypes[]) => set({ documents }),
}));

export default documentStore;
