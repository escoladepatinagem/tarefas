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

    <div v-for="todo in todos" v-bind:key="todo" class="card mb-5" :class="{'has-background-success-light':todo.done}">
      <div class="card-content">
        <div class="content">
          <div class="columns is-vcentered">
            <div class="column" :class="{'has-text-success line-through':todo.done}">
              {{ todo.content }}
            </div>
            <div class="column">
              <button class="button" @click="togleTodo(todo.id)" :class="todo.done ? 'is-success' : 'is-light'" >
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
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const todos = ref([
  {
    id:'001',
    content:'shave my book',
    done:false
  },
  {
    id:'002',
    content:'shave my head',
    done:true
  },
  {
    id:'003',
    content:'shave my leg',
    done:true
  }
]);

//Ref tarefas
const addContTodo = ref("");

//AddTodo
const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    content: addContTodo.value,
    done: false,
  };
  todos.value.unshift(newTodo);
  addContTodo.value = "";
};

//DeleteTodo
const delTodo =id=>{
  todos.value=todos.value.filter(todo=>todo.id !== id )
}

//Alterar estado das Tarefas
const togleTodo=id=>{
  const index=todos.value.findIndex(todo=>todo.id===id)
  todos.value[index].done =!todos.value[index].done
}
</script>


<style>
  @import "bulma/css/bulma.min.css";

  .tarefas-todo{
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
  }
  .line-through{
    text-decoration: line-through;
  }
</style>