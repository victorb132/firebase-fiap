import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../../config/firebase";
import { query, getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Container,
  Body,
  List,
  ContainerList,
  Text,
  Icon,
  Form,
  Input,
  Button
} from './styles';

export default function Home() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  async function addTask() {
    const search = task.filter(task => task === newTask);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");

    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar Task",
      "Tem certeza que deseja remover esta anotação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter(tasks => tasks !== item))
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregaDadosFirebase() {
      const q = query(collection(db, "tasks"));

      const querySnapshot = await getDocs(q);

      let tasks = [];

      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      setTask(tasks);
      console.log('tasks', tasks)
    }
    carregaDadosFirebase();
  }, []);

  let addTaskFirebase = async () => {
    let todoTask = {
      id: Math.random().toString(36),
      task: newTask,
    };
    const docRef = await addDoc(collection(db, "tasks"), todoTask);
    todoTask.id = docRef.id;

    let updatedTasks = [...task, todoTask];
    updatedTasks.push(todoTask);

    setTask(updatedTasks);
    setNewTask("");

    Keyboard.dismiss();
  };

  let deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    let updatedTasks = [...task].filter((item) => item.id != taskId);
    setTask(updatedTasks);
  };

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <Container>
          <Body>
            <List
              data={task}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ContainerList>
                  <Text>{item.task}</Text>
                  <Icon onPress={() => deleteTask(item.id)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                    />
                  </Icon>
                </ContainerList>
              )}
            />
          </Body>

          <Form>
            <Input
              placeholderTextColor="#999"
              autoCorrect={true}
              value={newTask}
              placeholder="Adicione uma tarefa"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
            />
            <Button onPress={() => addTaskFirebase()}>
              <Ionicons name="ios-add" size={20} color="white" />
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}