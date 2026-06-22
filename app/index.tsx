// App.tsx
import { TaskItem } from '@/components/TaskItem';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { PriorityType, Task } from './types';

export default function App() {
  const [taskText, setTaskText] = useState<string>('');
  const [priority, setPriority] = useState<PriorityType>('Baja');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    console.log(`[Sincronización]: ${tasks.length} tareas activas.`);
  }, [tasks]);

  const handleAddTask = (): void => {
    if (taskText.trim() === '') {
      Alert.alert('Campo Obligatorio', 'Por favor, ingresa una descripción.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: taskText.trim(),
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setTaskText('');
    setPriority('Baja');
  };

  const toggleCompleteTask = (id: string): void => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteOriginalTask = (id: string): void => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const purgeCompletedTasks = (): void => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=200' }} 
          style={styles.headerImage} 
        />
        <Text style={styles.headerTitle}>Gestor de Hábitos</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. Estudiar para el examen..." 
          placeholderTextColor="#888"
          value={taskText}
          onChangeText={setTaskText}
        />

        <View style={styles.prioritySelector}>
          {(['Baja', 'Media', 'Alta'] as PriorityType[]).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.priorityBtn, priority === p && styles.priorityBtnSelected]}
              onPress={() => setPriority(p)}
            >
              <Text style={[styles.priorityBtnText, priority === p && styles.priorityBtnTextSelected]}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleAddTask}>
          <Text style={styles.submitButtonText}>Agregar Tarea</Text>
        </TouchableOpacity>
      </View>

      {tasks.some(t => t.completed) && (
        <TouchableOpacity style={styles.purgeButton} onPress={purgeCompletedTasks}>
          <Text style={styles.purgeButtonText}>Purgar Completadas</Text>
        </TouchableOpacity>
      )}

      <FlatList 
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem 
            item={item} 
            onToggleComplete={toggleCompleteTask} 
            onDelete={deleteOriginalTask} 
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay tareas ni hábitos registrados.</Text>
        }
      />
    </View>
  );
}