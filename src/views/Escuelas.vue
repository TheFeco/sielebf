<template>
  <v-container>
    <v-card>
      <v-card-title>
        Escuelas
        <v-spacer></v-spacer>
        <v-btn @click="formulario.open=true">Agregar</v-btn>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:item.actions="{item}">
          <IconButton icon="mdi-pencil" @click="editar(item)"/>
          <IconButton icon="mdi-delete" @click="eliminar(item)"/>
        </template>
      </v-data-table>
  </v-card>

  <Confirm
    v-model="open"
    descripcion="Seguro de querer eliminar el registro"
    @aceptar="aceptar"
  />

  <Modal v-model="formulario.open" :data="formulario.data"/>
  </v-container>
</template>

<script>

  export default {
    components: {
      IconButton: () => import('@/components/Common/IconButton'),
      Confirm: () => import('@/components/Common/Confirm'),
      Modal: () => import('@/components/Escuelas/Modal'),
    },
    async created(){

      try{
        const data = await this.$api.escuelas.index()

        this.data = data
      }catch(err){
        console.log(err)
      }
    },
    data () {
      return {
        search: '',
        item: null,
        open: false,

        formulario: {
          open: false, 
          data: {}
        },

        headers: [
          { text: 'CTT', value: 'calories' },
          {
            text: 'Nombre',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '', value: 'actions', sortable: false, width: '100px' },
        ],
        data:[],
      }
    },
    computed:{
      items(){
        return this.data
      }
    },
    methods: {
      editar(data){ console.log(data)},
      eliminar(data){ 
        this.item = data
        this.open = true
      },
      aceptar(){
        this.item = null
        this.open = false
      }
    }
  }
</script>