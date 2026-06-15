import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Reminder } from "@/types/reminderTypes";
import { useMutation } from "@tanstack/react-query";
import { completeReminder } from "@/services/reminderService";
import { Link } from "expo-router";

type ReminderListItemProps = {
  reminderItem: Reminder;
}

export default function ReminderListItem({ reminderItem }: ReminderListItemProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(reminderItem.completed);

  const { mutate: completeTask } = useMutation({
    mutationFn: (isReminderCompleted: boolean) => completeReminder(reminderItem.id, isReminderCompleted),
    onSuccess: (data) => {
      setIsCompleted(data.completed);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    }
  });

  return (
    <TouchableOpacity
      onPress={() => completeTask(isCompleted)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        paddingBottom: 10,
      }}
    >
      {isCompleted
        ? <MaterialCommunityIcons name="circle-slice-8" size={22} color="#FF8C00" style={{ alignSelf: 'flex-start' }} />
        : <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={22} color="grey" style={{ alignSelf: 'flex-start' }} />
      }
      <View style={{ gap: 5, flexShrink: 1 }}>
        <Text style={{ fontSize: 15 }}>{reminderItem.reminder}</Text>
        {!!reminderItem.notes && (
          <Text style={{ fontSize: 13, color: 'grey' }}>{reminderItem.notes}</Text>
        )}
      </View>
      <Link href={`createUpdateReminder/?id=${reminderItem.id}`} asChild>
        <AntDesign
          name="info-circle"
          size={17}
          color="#FF8C00"
          style={{ marginLeft: 'auto', marginRight: 5, alignSelf: 'flex-start' }}
        />
      </Link>
    </TouchableOpacity>
  )
}