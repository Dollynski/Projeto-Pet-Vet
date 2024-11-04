import { create } from 'zustand'
import { TutorI } from '@/utils/types/tutores'

type TutorStore = {
  tuto: TutorI
  logaTutor: (tutoLogado: TutorI) => void
  deslogaTutor: () => void
}

export const useTutorStore = create<TutorStore>((set) => ({
  tuto: {} as TutorI,
  logaTutor: (tutoLogado) => set({ tuto: tutoLogado }),
  deslogaTutor: () => set({ tuto: {} as TutorI }),

  // tuto: {
  //   id: "dfsdsfdfsdfs",
  //   nome: "Luisa Farias",
  //   email: "luisa@fdssdf.cc"
  // } 
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}))