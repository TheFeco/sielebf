<template>
  <v-app style="background-color:#f5f5f5">
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
    <v-btn text small to="escuelas">Escuelas</v-btn>
    <v-btn text small to="examenes">Examenes</v-btn>
    <v-btn text small to="alumnos">Alumnos</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

