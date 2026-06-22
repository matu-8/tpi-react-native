// components/TaskItem.tsx
import { styles } from '@/app/styles';
import { Task } from '@/app/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Definimos qué funciones y datos necesita este componente para operar (Props)
interface TaskItemProps {
  item: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ item, onToggleComplete, onDelete }) => {
  const priorityStyle = 
    item.priority === 'Alta' ? styles.priorityAlta :
    item.priority === 'Media' ? styles.priorityMedia : styles.priorityBaja;

  return (
    <View style={[styles.taskCard, item.completed && styles.taskCompleted]}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskText, item.completed && styles.textLineThrough]}>
          {item.text}
        </Text>
        <Text style={[styles.priorityBadge, priorityStyle]}>
          {item.priority}
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.btnComplete]} 
          onPress={() => onToggleComplete(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>
            {item.completed ? 'Deshacer' : '✔'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.btnDelete]} 
          onPress={() => onDelete(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};