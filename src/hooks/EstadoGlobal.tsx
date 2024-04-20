import React, { createContext, useContext, useState } from 'react';

interface Tarefa {
  id: number;
  titulo: string;
}

interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (titulo: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
}

const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  tarefas: [],
  adicionarTarefa: () => {},
  editarTarefa: () => {},
  excluirTarefa: () => {},
});

export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const adicionarTarefa = (titulo: string) => {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  const editarTarefa = (id: number, novoTitulo: string) => {
    const novasTarefas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, titulo: novoTitulo } : tarefa
    );
    setTarefas(novasTarefas);
  };

  const excluirTarefa = (id: number) => {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(novasTarefas);
  };

  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};
