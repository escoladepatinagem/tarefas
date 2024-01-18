<template>
  <div class="tarefas-todo">
    <div class="title has-text-centered">Tarefas</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="addContTodo"
            class="input"
            type="text"
            placeholder="Tarefas "
          />
        </p>
        <p class="control">
          <button :disabled="!addContTodo" class="button is-info">Add</button>
        </p>
      </div>
    </form>

    <div
      v-for="todo in todos"
      v-bind:key="todo"
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5">
              <button
                class="button"
                @click="togleTodo(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button @click="delTodo(todo.id)" class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { db } from "./firebase/index";
import { collection, onSnapshot, addDoc, deleteDoc,doc,updateDoc,query,limit,orderBy} from "firebase/firestore";

//firebase ref
const todosCollectionRef=collection(db, "tarefas")
const todosCollectionQuery = query(todosCollectionRef, orderBy('date', 'desc'));

const todos = ref([
  {
    id: "001",
    content: "shave my book",
    done: false,
  },
]);

//Ref tarefas
const addContTodo = ref("");

//GET todas as tarefas da db
onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    let fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});



//AddTodo
const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: addContTodo.value,
    done: false,
    date:Date.now()
  });
  addContTodo.value = "";
};

//DeleteTodo
const delTodo = id => {
  deleteDoc(doc(todosCollectionRef,id))
};

//AlterarTodo
const togleTodo = (id) => {

  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef,id),{
    done:!todos.value[index].done
  })
};
</script>


<style>
@import "bulma/css/bulma.min.css";

.tarefas-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>