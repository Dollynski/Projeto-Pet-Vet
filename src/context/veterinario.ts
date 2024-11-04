import { create } from 'zustand'
import { VeterinarioI } from '@/utils/types/veterinarios'

type VeterinarioStore = {
  veterinario: VeterinarioI
  logaVeterinario: (veterinarioLogado: VeterinarioI) => void
  deslogaVeterinario: () => void
}

export const useVeterinarioStore = create<VeterinarioStore>((set) => ({
  veterinario: {} as VeterinarioI,
  logaVeterinario: (veterinarioLogado) => set({ veterinario: veterinarioLogado }),
  deslogaVeterinario: () => set({ veterinario: {} as VeterinarioI }),

  // veterinario: {
  //   id: "dfsdsfdfsdfs",
  //   nome: "Luisa Farias",
  //   email: "luisa@fdssdf.cc"
  // } 
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}))